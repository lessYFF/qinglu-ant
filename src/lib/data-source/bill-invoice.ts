import { API } from '../API'

export enum InvoiceNature {
  电子票 = 1
}

export enum InvoiceType {
  普通发票 = 7,
  专用发票 = 8
}
export const invoiceTypeMap = {
  [InvoiceType.普通发票]: '全电发票(普通) ',
  [InvoiceType.专用发票]: '全电发票(专用)',
}

// 税率
export const taxRateMap = {
  [InvoiceType.普通发票]: 0.01,
  [InvoiceType.专用发票]: 0.01,
}

export enum InvoiceStatus {
  开票中 = 1,
  已开票 = 2,
  退票中 = 3,
  已红冲 = 4,
  已作废 = 5
}

export enum RefundReason {
  发票信息错误 = 1,
  发票类型错误 = 2
}

export interface BaseInvoice {
  invoiceNature: InvoiceNature, // 发票性质
  invoiceType: InvoiceType, // 发票类型
  taxRate: number, // 税率
  invoiceBody: string, // 开票主体（我方公司）
  invoiceTitle: string, // 发票抬头
  uscc: string | null, // 统一社会信用代码（仅专票）
  openBank: string | null, // 开户行（仅专票）
  openAccount: string | null, // 开户账号（仅专票）
  registerAddress: string | null, // 注册地址（仅专票）
  registerPhone: string | null, // 注册电话（仅专票）
  content: string, // 开票内容（固定为：软件服务费）
  invoiceAmount: number, // 开票金额
  email: string, // 邮箱
  remark: string, // 备注
}

export type InvoiceItem = Pick<BaseInvoice, 'invoiceNature' | 'invoiceBody' | 'invoiceTitle' | 'invoiceType' | 'invoiceAmount' | 'email'> & {
  id: number,
  createTime: number,     // 申请时间
  invoiceStatus: InvoiceStatus, // 开票状态
  billLinkAddress: string | null, // 发票文件地址
}

export interface InvoiceSource {
  id: number, // 充值单ID
  rechargePrice: number, // 充值金额
  createTime: number, // 创建时间
  opTime: number, // 充值单支付时间
}

export type InvoiceDetail = BaseInvoice & InvoiceItem & {
  invoiceNo: string | null, // 发票号
  noList: InvoiceSource[], // 对应充值单列表
}

export async function queryInvoices(params: unknown) {
  return API<{ count: number, list: InvoiceItem[] }>('/invoice/v1/list', { method: 'GET', query: params })
}

export async function refundInvoice(data: unknown) {
  return API('/invoice/v1/refund', { data })
}

export async function resendInvoice(params: unknown) {
  return API('/invoice/v1/send', { query: params })
}

export async function exportInvoices() {
  return API<Blob>('/invoice/v1/excel/export')
}

export async function getInvoiceDetail(id: number) {
  return API<InvoiceDetail>('/invoice/v1/detail', { method: 'GET', query: { id } })
}

export async function createInvoice(data: unknown) {
  return API('/invoice/v1/bill', { data })
}

export async function getInvoiceBody() {
  const res = await API<{ invoiceBody: { name: string } }>('/invoice/v1/base/emun/list', { method: 'GET' })
  return res.success ? res.data.invoiceBody.name : ''
}
