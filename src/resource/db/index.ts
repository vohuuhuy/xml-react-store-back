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
  const MaND = users?.length ? 'ND' + `000${parseInt(users?.sort()[users?.length - 1].MaND['$t'].substr(2)) + 1}`.substr(-3) : 'ND001'
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
  const MaNCC = manus?.length ? 'NCC' + `000${parseInt(manus?.sort()[manus?.length - 1].MaNCC['$t'].substr(3)) + 1}`.substr(-3) : 'NCC001'
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
  const MaKH = cuss?.length && cuss[0]?.MaKH  ? 'KH' + `000${parseInt(cuss?.sort()[cuss?.length - 1].MaKH['$t'].substr(2)) + 1}`.substr(-3) : 'KH01'
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

// model
export const findAllModel = async () => {
  const { QLTH: { MauHang } } = await getAll()
  return [].concat(MauHang)
}

export const addModel = async (input) => {
  const { QLTH } = await getAll()
  const models = await findAllModel()
  const MaMH = models?.length ? 'MH' + `000${parseInt(models?.sort()[models?.length - 1].MaMH['$t'].substr(2)) + 1}`.substr(-3) : 'MH01'
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

// import
export const findAllImport = async () => {
  const { QLTH: { DonHangNhap } } = await getAll()
  return [].concat(DonHangNhap)
}

export const addImport = async (input) => {
  const { QLTH } = await getAll()
  const imports = await findAllImport()
  const MaDHN = imports?.length ? 'DHN' + `000${parseInt(imports?.sort()[imports?.length - 1].MaDHN['$t'].substr(3)) + 1}`.substr(-3) : 'DHN001'
  const imp = { MaDHN: { '$t': MaDHN }, ...input }
  imports.push(imp)
  const newXML = {
    ...QLTH,
    DonHangNhap: imports
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return imp
}

// sale
export const findAllSale = async () => {
  const { QLTH: { DonHangXuat } } = await getAll()
  return [].concat(DonHangXuat)
}

export const addSale = async (input) => {
  const { QLTH } = await getAll()
  const sales = await findAllSale()
  const MaDHX = sales?.length ? 'DHX' + `000${parseInt(sales?.sort()[sales?.length - 1].MaDHX['$t'].substr(3)) + 1}`.substr(-3) : 'DHX001'
  const sale = { MaDHX: { '$t': MaDHX }, ...input }
  sales.push(sale)
  const newXML = {
    ...QLTH,
    DonHangXuat: sales
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return sale
}

// stock import
export const findAllStockImport = async () => {
  const { QLTH: { Hang_DonHangNhap } } = await getAll()
  return [].concat(Hang_DonHangNhap)
}

export const addStockImport = async (input) => {
  const { QLTH } = await getAll()
  const stockImports = await findAllStockImport()
  stockImports.push(input)
  const newXML = {
    ...QLTH,
    Hang_DonHangNhap: stockImports
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

// stock sale
export const findAllStockSale = async () => {
  const { QLTH: { Hang_DonHangXuat } } = await getAll()
  return [].concat(Hang_DonHangXuat)
}

export const addStockSale = async (input) => {
  const { QLTH } = await getAll()
  const stockSales = await findAllStockSale()
  stockSales.push(input)
  const newXML = {
    ...QLTH,
    Hang_DonHangXuat: stockSales
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}

// stock
export const findAllStock = async () => {
  const { QLTH: { Hang } } = await getAll()
  return [].concat(Hang)
}

export const addStock = async (input) => {
  const { QLTH } = await getAll()
  const stocks = await findAllStock()
  const MaH = stocks?.length ? 'H' + `000${parseInt(stocks?.sort()[stocks?.length - 1].MaH['$t'].substr(3)) + 1}`.substr(-3) : 'H001'
  const stock = { MaH: { '$t': MaH }, ...input }
  stocks.push(stock)
  const newXML = {
    ...QLTH,
    Hang: stocks
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return stock
}

export const updateStock = async (input) => {
  const { QLTH } = await getAll()
  const { Hang } = QLTH
  let newHang
  if (Hang?.length) {
    newHang = Hang.map(i => {
      if (i.MaH['$t'] === input.MaH['$t']) return ({
        ...i,
        ...input
      })
      return i
    })
  } else if (Hang.MaH['$t'] === input.MaH['$t']) {
    newHang = {
      ...Hang,
      ...input
    }
  }
  const newXML = {
    ...QLTH,
    Hang: newHang
  }
  fs.writeFileSync(pathXML, convertXML(newXML))
  return true
}