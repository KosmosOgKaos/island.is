import { NestFactory } from '@nestjs/core'
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { writeFileSync } from 'fs'

import {
  UserResolver,
  DiscountResolver,
  FlightResolver,
  FlightLegResolver,
} from 'apps/air-discount-scheme/api/src/app/modules'

import { HelloWorldResolver } from '@island.is/api/domains/hello-world'
import { ContentSearchResolver } from '@island.is/api/domains/content-search'
import { CmsResolver } from '@island.is/api/domains/cms'
import { ApplicationResolver } from '@island.is/api/domains/application'
import { FileUploadResolver } from '@island.is/api/domains/file-upload'
import { DocumentResolver } from '@island.is/api/domains/documents'
import { TranslationsResolver } from '@island.is/api/domains/translations'

import { logger } from '@island.is/logging'

import { execShellCommand } from './execShellCommand'

const { GENERATE_EXCLUDES_SCHEMA } = process.env

const generateSchema = async ({
  path,
  resolvers,
}: {
  path: string
  resolvers: any[] // TODO
}) => {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule)
  await app.init()

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
  const schema = await gqlSchemaFactory.create(resolvers)

  const data = `# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

${printSchema(schema)}
  `

  await writeFileSync(path, data)
}

const exec = async (command: string) => {
  try {
    console.log('-command', command)
    await execShellCommand(command)
  } catch (e) {
    logger.error('Error while trying to run execShellCommand', {
      message: e.message,
    })
  }
}

const run = async () => {
  logger.info('Running generate schema script...')
  logger.info('Generating graphql schema files...')

  const excludes = GENERATE_EXCLUDES_SCHEMA?.replace(/\s/g, '')?.split(',')
  console.log('-excludes', excludes)

  /**
   * We start to generate the autoSchemaFile from each modules using it
   * We use the resolvers to be able to get the graphql file without running the server
   *
   * apps/air-discount-schema
   * apps/api
   * apps/skilavottord -> but doesn't have resolvers
   */

  if (excludes.find((app) => app !== 'air-discount-schema')) {
    await generateSchema({
      path: 'apps/air-discount-scheme/api.graphql',
      resolvers: [
        UserResolver,
        DiscountResolver,
        FlightResolver,
        FlightLegResolver,
        CmsResolver,
      ],
    })

    await exec('yarn nx run air-discount-scheme-api:codegen')
  }

  if (excludes.find((app) => app !== 'api')) {
    // We need this first to be able to generate api/api.graphql
    await exec('yarn nx run api:contentful-types')

    await generateSchema({
      path: 'apps/api/src/api.graphql',
      resolvers: [
        HelloWorldResolver,
        ContentSearchResolver,
        CmsResolver,
        ApplicationResolver,
        FileUploadResolver,
        DocumentResolver,
        TranslationsResolver,
      ],
    })

    await exec('yarn nx run api:codegen')
    await exec('yarn nx run web:codegen')
  }

  await exec('yarn nx run gjafakort-api:codegen')
}

run()
