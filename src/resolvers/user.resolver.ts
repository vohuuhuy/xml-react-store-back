import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'
import { User } from 'graphql.schema'

@Resolver('User')
export class UserResolve {
  @Mutation('createUser')
  async createUser (
    @Args() args
  ): Promise<User | any> {
    try {
      return null
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query('login')
  async login(@Args() args) {
    try {
      const { username, password } = args
      const result = await R.DB.findUser(username)
      if (result?.MatKhau["$t"] === password) {
        return JSON.stringify(result)
      }
      return null
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}