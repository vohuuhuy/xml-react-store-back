import * as fs from 'fs'
import * as xml2json from 'xml2json'
import * as path from 'path'

export const getAll = async () => {
  const result = fs.readFileSync(path.resolve(__dirname, './QLTH.xml').replace('dist', 'src'))
  return JSON.parse(xml2json.toJson(result, { reversible: true }))
}

export const findUser = async (TaiKhoan) => {
  const { QLTH: { NguoiDung } } = await getAll()
  return [].concat(NguoiDung)?.find(i => i.TaiKhoan["$t"] === TaiKhoan)
}
