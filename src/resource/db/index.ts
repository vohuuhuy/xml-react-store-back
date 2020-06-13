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
  const { QLTH: { NguoiDung } } = await getAll()
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

// manu
export const findAllManu = async () => {
  const { QLTH: { NhaCungCap } } = await getAll()
  return [].concat(NhaCungCap)
}

export const addManu = async (input) => {
  const { QLTH } = await getAll()
  const manus = await findAllManu()
  const MaNCC = 'NCC' + `000${parseInt(manus?.sort()[manus?.length - 1].MaNCC['$t'].substr(3)) + 1}`.substr(-3)
  manus.push({ MaNCC: { '$t': MaNCC }, ...input })
  const newXML = {
    ...QLTH,
    NhaCungCap: manus
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const updateManu = async (input) => {
  const { QLTH } = await getAll()
  const { NhaCungCap } = QLTH
  let newNhaCungCap
  if (NhaCungCap?.length) {
    newNhaCungCap = NhaCungCap.map(i => {
      if (i.MaNCC['$t'] === input.MaNCC['$t']) return ({
        ...i,
        ...input
      })
      return i
    })
  } else if (NhaCungCap.MaNCC['$t'] === input.MaNCC['$t']) {
    newNhaCungCap = {
      ...NhaCungCap,
      ...input
    }
  }
  const newXML = {
    ...QLTH,
    NhaCungCap: newNhaCungCap
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const deleteManus = async (Mas = []) => {
  const { QLTH } = await getAll()
  const manus = await findAllManu()
  const newXML = {
    ...QLTH,
    NhaCungCap: manus.filter(Manu => !Mas.includes(Manu.MaNCC['$t']))
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

// cus
export const findAllCus = async () => {
  const { QLTH: { KhachHang } } = await getAll()
  return [].concat(KhachHang)
}

export const addCus = async (input) => {
  const { QLTH } = await getAll()
  const cuss = await findAllCus()
  const MaKH = 'KH' + `000${parseInt(cuss?.sort()[cuss?.length - 1].MaKH['$t'].substr(2)) + 1}`.substr(-3)
  cuss.push({ MaKH: { '$t': MaKH }, ...input })
  const newXML = {
    ...QLTH,
    KhachHang: cuss
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const updateCus = async (input) => {
  const { QLTH } = await getAll()
  const { KhachHang } = QLTH
  let newKhachHang
  if (KhachHang?.length) {
    newKhachHang = KhachHang.map(i => {
      if (i.MaKH['$t'] === input.MaKH['$t']) return ({
        ...i,
        ...input
      })
      return i
    })
  } else if (KhachHang.MaKH['$t'] === input.MaKH['$t']) {
    newKhachHang = {
      ...KhachHang,
      ...input
    }
  }
  const newXML = {
    ...QLTH,
    KhachHang: newKhachHang
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const deleteCuss = async (Mas = []) => {
  const { QLTH } = await getAll()
  const cuss = await findAllCus()
  const newXML = {
    ...QLTH,
    KhachHang: cuss.filter(Cus => !Mas.includes(Cus.MaKH['$t']))
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

// cus
export const findAllModel = async () => {
  const { QLTH: { MauHang } } = await getAll()
  return [].concat(MauHang)
}

export const addModel = async (input) => {
  const { QLTH } = await getAll()
  const models = await findAllModel()
  const MaMH = 'MH' + `000${parseInt(models?.sort()[models?.length - 1].MaMH['$t'].substr(2)) + 1}`.substr(-3)
  models.push({ MaMH: { '$t': MaMH }, ...input })
  const newXML = {
    ...QLTH,
    MauHang: models
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const updateModel = async (input) => {
  const { QLTH } = await getAll()
  const { MauHang } = QLTH
  let newMauHang
  if (MauHang?.length) {
    newMauHang = MauHang.map(i => {
      if (i.MaMH['$t'] === input.MaMH['$t']) return ({
        ...i,
        ...input
      })
      return i
    })
  } else if (MauHang.MaMH['$t'] === input.MaMH['$t']) {
    newMauHang = {
      ...MauHang,
      ...input
    }
  }
  const newXML = {
    ...QLTH,
    MauHang: newMauHang
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

export const deleteModels = async (Mas = []) => {
  const { QLTH } = await getAll()
  const models = await findAllModel()
  const newXML = {
    ...QLTH,
    MauHang: models.filter(Model => !Mas.includes(Model.MaMH['$t']))
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}