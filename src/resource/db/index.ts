import * as fs from 'fs'
import * as xml2json from 'xml2json'
import * as path from 'path'
import { PATH_XML } from 'resource/variables'

export const getAll = async () => {
  console.log(PATH_XML || path.resolve(__dirname, './QLTH.xml').replace('dist', 'src'))

  const result = fs.readFileSync(PATH_XML || path.resolve(__dirname, './QLTH.xml').replace('dist', 'src'))
  return JSON.parse(xml2json.toJson(result, { reversible: true }))
}

export const findUser = async (TaiKhoan) => {
  const { QLTH: { NguoiDung } } = await getAll()
  return [].concat(NguoiDung)?.find(i => i.TaiKhoan["$t"] === TaiKhoan)
}
