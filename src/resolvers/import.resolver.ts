import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'

@Resolver('Import')
export class ImportResolve {
  @Query('findAllImport')
  async findAllImport () {
    try {
      const imports = await R.DB.findAllImport()
      const manus = await R.DB.findAllManu()
      const stockImports = await R.DB.findAllStockImport()
      const stocks = await R.DB.findAllStock()
      const models = await R.DB.findAllModel()
      return JSON.stringify(imports.map(im => ({
        ...im,
        NCC: manus.find(ma => ma.MaNCC['$t'] === im.MaNCC['$t']),
        Hang: stockImports.filter(stockImport => stockImport.MaDHN['$t'] === im.MaDHN['$t'])
          .map(stockImport => ({
            ...stockImport,
            MauHang: models.find(model => model.MaMH['$t'] === stocks.find(stock => stock.MaH['$t'] === stockImport.MaH['$t']).MaMH['$t'])
          }))
      })))
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation('createImport')
  async createImport (
    @Args('imp') impString,
    @Args('stocks') stocksString,
    @Args('newStocks') newStocksString
  ) {
    try {
      const imp = JSON.parse(impString)
      const newStocks = JSON.parse(newStocksString)
      const allStock = await R.DB.findAllStock()
      const stocks = (JSON.parse(stocksString) || []).map(stock => {
        const stockFind = allStock.find(s => s.MaH['$t'] === stock.MaH['$t'])
        return  ({
          ...stockFind,
          SoLuongThem: stock.SoLuong,
          SoLuong: { $t: parseInt(stock.SoLuong['$t']) + parseInt(stockFind.SoLuong['$t']) }
        })
      })
      const impAdded = await R.DB.addImport(imp)
      for (const stock of stocks) {
        await R.DB.updateStock(stock)
      }
      for (const stock of newStocks) {
        const newAddedStock =  await R.DB.addStock(stock)
        stocks.push(newAddedStock)
      }
      const stocksImports = stocks.map(stock => ({
        MaDHN: impAdded.MaDHN,
        MaH: stock.MaH,
        SoLuong: stock.SoLuongThem || stock.SoLuong,
        GiaNhap: stock.GiaNhap
      }))
      for (const stocksImport of stocksImports) {
        await R.DB.addStockImport(stocksImport)
      }
      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}