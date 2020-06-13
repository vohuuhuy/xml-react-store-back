import * as fs from 'fs'
import * as xml2json from 'xml2json'
import * as path from 'path'
import { PATH_XML } from 'resource/variables'

const header = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="QLTH.xsl" ?>
<QLTH
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="QLTH.xsd"
>`

const headerFail = `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="QLTH.xsd"`

const footer = `</QLTH>`

const pathXML = PATH_XML || path.resolve(__dirname, './QLTH.xml').replace('dist', 'src')

const convertXML = object => (xml2json.toXml(JSON.stringify(object)).replace(headerFail, header) + footer).trim()

export const getAll = async () => {
  const result = fs.readFileSync(pathXML)
  return JSON.parse(xml2json.toJson(result, { reversible: true }))
}

export const findUser = async (TaiKhoan) => {
  console.log(pathXML)
  const { QLTH: { NguoiDung } } = await getAll()
  console.log(NguoiDung)
  return [].concat(NguoiDung)?.find(i => i.TaiKhoan['$t'] === TaiKhoan)
}

export const findAllUser = async () => {
  const { QLTH: { NguoiDung } } = await getAll()
  return [].concat(NguoiDung)
}

export const addUser = async (input) => {
  const { QLTH } = await getAll()
  const users = await findAllUser()
  if (users.find(user => user.TaiKhoan['$t'] === input.TaiKhoan['$t'])) return 'Tài khoản đã tồn tại'
  const MaND = 'ND' + `000${parseInt(users?.sort()[users?.length - 1].MaND['$t'].substr(2)) + 1}`.substr(-3)
  users.push({ MaND: { '$t': MaND }, ...input })
  const newXML = {
    ...QLTH,
    NguoiDung: users
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const updateUser = async (input) => {
  const { QLTH } = await getAll()
  const { NguoiDung } = QLTH
  let newNguoiDung
  if (NguoiDung?.length) {
    newNguoiDung = NguoiDung.map(i => {
      if (i.TaiKhoan['$t'] === input.TaiKhoan['$t']) return ({
        ...i,
        ...input
      })
      return i
    })
  } else if (NguoiDung.TaiKhoan['$t'] === input.TaiKhoan['$t']) {
    newNguoiDung = {
      ...NguoiDung,
      ...input
    }
  }
  const newXML = {
    ...QLTH,
    NguoiDung: newNguoiDung
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const deleteUsers = async (TaiKhoans = []) => {
  const { QLTH } = await getAll()
  const users = await findAllUser()
  const newXML = {
    ...QLTH,
    NguoiDung: users.filter(user => !TaiKhoans.includes(user.TaiKhoan['$t']))
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}
