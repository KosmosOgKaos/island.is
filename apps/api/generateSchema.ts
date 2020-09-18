import { NestFactory } from '@nestjs/core'
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { writeFileSync } from 'fs'
import { HelloWorldResolver } from '@island.is/api/domains/hello-world'
import { ContentSearchResolver } from '@island.is/api/domains/content-search'
import { CmsResolver } from '@island.is/api/domains/cms'
import { ApplicationResolver } from '@island.is/api/domains/application'
import { FileUploadResolver } from '@island.is/api/domains/file-upload'
import { DocumentResolver } from '@island.is/api/domains/documents'
import { TranslationsResolver } from '@island.is/api/domains/translations'

export async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule)
  await app.init()

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
  const schema = await gqlSchemaFactory.create([
    HelloWorldResolver,
    ContentSearchResolver,
    CmsResolver,
    ApplicationResolver,
    FileUploadResolver,
    DocumentResolver,
    TranslationsResolver,
  ])

  writeFileSync('apps/api/src/api.graphql', printSchema(schema))
}

generateSchema()
