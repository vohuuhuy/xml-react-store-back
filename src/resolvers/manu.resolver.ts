import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'

@Resolver('Manu')
export class ManuResolve {
  @Mutation('updateManu')
  async updateManu(
    @Args('input') Manu
  ) {
    try {
      await R.DB.updateManu(JSON.parse(Manu))
      return 'Cập nhật thông tin thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('addManu')
  async addManu(
    @Args('input') Manu
  ) {
    try {
      await R.DB.addManu(JSON.parse(Manu))
      return 'Thêm thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('deleteManus')
  async deleteManus(
    @Args('Mas') Mas
  ) {
    try {
      await R.DB.deleteManus(Mas)
      return 'Xóa thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Query('findAllManu')
  async findAllManu () {
    try {
      return JSON.stringify(await R.DB.findAllManu())
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}