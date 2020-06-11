import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import Config from '@config'
import * as Resolvers from './resolvers'

@Module({
  imports: [
    GraphQLModule.forRootAsync(Config.Graphql)
  ],
  controllers: [],
  providers: [...Object.values(Resolvers)],
})
export class AppModule {}
