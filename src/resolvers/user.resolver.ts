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

  @Mutation('updateUser')
  async updateUser(
    @Args('input') NguoiDung
  ) {
    try {
      await R.DB.updateUser(JSON.parse(NguoiDung))
      return 'Cập nhật thông tin thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('addUser')
  async addUser(
    @Args('input') NguoiDung
  ) {
    try {
      await R.DB.addUser(JSON.parse(NguoiDung))
      return 'Thêm người dùng thành công'
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation('deleteUsers')
  async deleteUsers(
    @Args('TaiKhoans') TaiKhoans
  ) {
    try {
      await R.DB.deleteUsers(TaiKhoans)
      return 'Xóa thành công'
    } catch (err) {
      throw new ApolloError(err)
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

  @Query('findUser')
  async findUser (
    @Args('TaiKhoan') TaiKhoan
  ) {
    try {
      return JSON.stringify(await R.DB.findUser(TaiKhoan))
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query('findAllUser')
  async findAllUser () {
    try {
      return JSON.stringify(await R.DB.findAllUser())
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}