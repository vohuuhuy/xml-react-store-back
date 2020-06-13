import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'

@Resolver('Cus')
export class CusResolve {
  @Mutation('updateCus')
  async updateCus(
    @Args('input') Cus
  ) {
    try {
      await R.DB.updateCus(JSON.parse(Cus))
      return 'Cập nhật thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('addCus')
  async addCus(
    @Args('input') Cus
  ) {
    try {
      await R.DB.addCus(JSON.parse(Cus))
      return 'Thêm thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('deleteCuss')
  async deleteCuss(
    @Args('Mas') Mas
  ) {
    try {
      await R.DB.deleteCuss(Mas)
      return 'Xóa thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Query('findAllCus')
  async findAllCus () {
    try {
      return JSON.stringify(await R.DB.findAllCus())
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}