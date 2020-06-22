import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'

@Resolver('Stock')
export class StockResolve {
  @Query('findAllStock')
  async findAllStock () {
    try {
      const models = await R.DB.findAllModel()
      return JSON.stringify((await R.DB.findAllStock()).map(stock => ({
        ...stock,
        MauHang: models.find(model => model.MaMH['$t'] === stock.MaMH['$t'])
      })))
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}