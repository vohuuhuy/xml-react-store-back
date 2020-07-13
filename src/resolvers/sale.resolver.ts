import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'

@Resolver('Sale')
export class SaleResolve {
  @Query('findAllSale')
  async findAllSale () {
    try {
      const sales = await R.DB.findAllSale()
      const cuss = await R.DB.findAllCus()
      const stockSales = await R.DB.findAllStockSale()
      const stocks = await R.DB.findAllStock()
      const models = await R.DB.findAllModel()
      return JSON.stringify(sales.map(sale => ({
        ...sale,
        KhachHang: cuss.find(kh => kh.MaKH['$t'] === sale.MaKH['$t']),
        Hang: stockSales.filter(stockSale => stockSale.MaDHX['$t'] === sale.MaDHX['$t'])
          .map(stockSale => ({
            ...stockSale,
            MauHang: models.find(model => model.MaMH['$t'] === stocks.find(stock => stock.MaH['$t'] === stockSale.MaH['$t']).MaMH['$t'])
          }))
      })))
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation('createSale')
  async createSale (
    @Args('sale') saleString,
    @Args('stocks') stocksString
  ) {
    try {
      const sale = JSON.parse(saleString)
      const allStock = await R.DB.findAllStock()
      const stocks = (JSON.parse(stocksString) || []).map(stock => {
        const stockFind = allStock.find(s => s.MaH['$t'] === stock.MaH['$t'])
        return  ({
          ...stockFind,
          SoLuong: { $t: parseInt(stockFind.SoLuong['$t']) - parseInt(stock.SoLuong['$t']) }
        })
      })
      const saleAdded = await R.DB.addSale(sale)
      for (const stock of stocks) {
        await R.DB.updateStock(stock)
      }
      const stocksSales = stocks.map(stock => ({
        MaDHX: saleAdded.MaDHX,
        MaH: stock.MaH,
        SoLuong: stock.SoLuong,
        GiaBan: stock.GiaBan
      }))
      for (const stocksSale of stocksSales) {
        await R.DB.addStockSale(stocksSale)
      }
      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}