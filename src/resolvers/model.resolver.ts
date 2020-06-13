import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'

@Resolver('Model')
export class ModelResolve {
  @Mutation('updateModel')
  async updateModel(
    @Args('input') Model
  ) {
    try {
      await R.DB.updateModel(JSON.parse(Model))
      return 'Cập nhật thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('addModel')
  async addModel(
    @Args('input') Model
  ) {
    try {
      await R.DB.addModel(JSON.parse(Model))
      return 'Thêm thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('deleteModels')
  async deleteModels(
    @Args('Mas') Mas
  ) {
    try {
      await R.DB.deleteModels(Mas)
      return 'Xóa thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Query('findAllModel')
  async findAllModel () {
    try {
      return JSON.stringify(await R.DB.findAllModel())
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}