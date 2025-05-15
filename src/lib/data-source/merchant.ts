import { API, type Response } from '@/lib/API'
import { type Moment } from 'moment'
import type { Media, EditMedia, Editing } from '@/lib/data-source'
import type { ReplaceFields } from '@/lib/lang'
import { type InvoiceType } from '@/lib/data-source/bill-invoice'


// 公司类型枚举
export enum MerchantType {
  未指定 = 0,
  无限公司 = 1,
  有限责任公司 = 2,
  两合公司 = 3,
  股份有限责任公司 = 4
}

// 商家联系人
export interface MerchantContact {
  id: number,
  linkDesc: string,   // 职务描述（如：财务联系人）
  linkName: string,   // 联系人姓名
  linkPhone: string,  // 联系电话
}
export type EditMerchantContact = Editing<MerchantContact>

// 商家基本信息
export interface MerchantBase {
  id: number,             // 商家ID
  name: string,           // 商家名称
  nameShort: string,      // 商家名称简写
  isTest: 0 | 1,          // 是否测试商家
  merchantType: MerchantType,   // 公司类型
  address: string,        // 地址
  uscc: string,           // 统一社会信用代码
  validityStart: string,  // 营业执照有效期开始（YYYY-MM-DD）
  validityEnd: string,    // 营业执照有效期结束（9999-99-99：长期有效）
  countryCode: string,    // 负责人手手机国家区号
  phone: string,          // 负责人手机号
  linkName: string,       // 负责人姓名
  legalName: string,      // 法人姓名
  legalPhone: string,     // 法人手机号
  legalIdNo: string,      // 法人身份证号
  fileList: Media[],      // 照片列表 [营业执照, 身份证人像面, 身份证国徽面]
  contactList: MerchantContact[],   // 前两个不可删除，固定为 财务联系人 和 运营联系人
}

export type EditValidity = { long: true, start: Moment | null } | { long: false, range: [Moment | null, Moment | null] }
export type EditMerchantBase = ReplaceFields<Editing<Omit<MerchantBase, 'validityStart' | 'validityEnd'>>, {
  validity: EditValidity,
  fileList: [EditMedia, EditMedia, EditMedia],
  contactList: EditMerchantContact[],
}>


export async function getMerchantBaseInfo() {
  const res = await API('/merchant/info/v1/find')
  return (res.success
    ? { ...res, data: res.data ? { ...res.data, contactList: res.data.contantList } : {} }
    : res) as Response<MerchantBase>
}


export async function saveMerchantBaseInfo(data: unknown) {
  const { contactList, ...rest } = data
  return API('/merchant/info/v1/save', {
    data: {
      ...rest,
      contantList: contactList
    }
  })
}



// ==============================



export interface Invoice {
  invoiceType: InvoiceType,   // 默认开票类型
  openAccount: string,        // 开户账户
  openBank: string,           // 开户银行&支行
  receiveAddress: string,     // 收件人地址
  receiveProvinceId: number,  // 收件人省ID（0 代表空）
  receiveCityId: number,      // 收件人城市ID（0 代表空）
  receiveAreaId: number,      // 收件人区县ID（0 代表空）
  receiveMail: string,        // 收件邮箱（电子发票接收）
  receiveName: string,        // 收件人姓名
  receivePhone: string,       // 收件人电话
  registerAddress: string,    // 注册地址
  registerPhone: string,      // 注册固定电话
  title: string,              // 发票抬头
  uscc: string,               // 统一社会信用代码
}

export type EditInvoice = Omit<Invoice, 'receiveProvinceId' | 'receiveCityId' | 'receiveAreaId'> & {
  receiveArea: {
    provinceId?: number,
    cityId?: number,
    areaId?: number,
  },
}


export async function getInvoice() {
  return API<Invoice | null>('/merchant/invoice/v1/getInvoice')
}


export async function saveInvoice(data: unknown) {
  return API('/merchant/invoice/v1/saveInvoice', { data })
}


export type Area = { id: number, name: string, subList: Area[] | null }

export async function getAreaList(depth=3) {
  return API<Area[]>('/area/v1/list?depth=' + depth.toString())
}
