import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { CmsModule } from '@island.is/api/domains/cms'

import {
  AuthModule,
  UserModule,
  DiscountModule,
  FlightModule,
  FlightLegModule,
} from './modules'
import { BackendAPI } from '../services'

const debug = process.env.NODE_ENV === 'development'
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === 'true'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug,
      playground,
      autoSchemaFile: 'apps/air-discount-scheme/api.graphql', // TODO shared env
      path: '/api/graphql',
      context: ({ req }) => ({ req }),
      dataSources: () => ({
        backendApi: new BackendAPI(),
      }),
    }),
    AuthModule,
    UserModule,
    DiscountModule,
    FlightModule,
    FlightLegModule,
    CmsModule,
  ],
  providers: [BackendAPI],
})
export class AppModule {}
