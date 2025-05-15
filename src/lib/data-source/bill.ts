import { API } from '@/lib/API'

export interface DetailQuery {
  billId?: number // 账单 id
  status?: number // 账单状态
  createStartTime?: number // 创建订单开始时间
  createEndTime?: number // 创建订单结束时间
  backStartTime?: number // 还车开始时间
  backEndTime?: number // 还车结束时间
}

/**
 * 获取账户信息
 */
export interface AccountInfo {
  id: number
  merchantId: number
  totalAmount: number // 可用额度
  invoicableAmount: number // 可开票
  arrearsTime: null | number
  serviceCloseTime: null | number
  arreared: number
  serviceClosed: null | number
  invoicableNum: null | number // 可开票数量
}
export const getAccountInfo = async (params: DetailQuery) => {
  return API<AccountInfo>('/merchant_account/v1/get_account', {
    data: params,
  })
}

/**
 * 获取账单列表
 */
export const getBillList = async (params: DetailQuery) => {
  return API<unknown>('/order/bill/list/v1', {
    data: params,
  })
}

/**
 * 账单明细导出
 */
export async function billExport(query: unknown) {
  return API<Blob>('/order/bill/downExcel/v1', { data: query })
}

/**
 * 发起退款申请
 */
export const applyRefund = async params => {
  return API<unknown>('/order/bill/apply_refund/v1', {
    data: params,
  })
}

/**
 * 查询退款详情
 */
export const getRefundApply = async params => {
  return API<unknown>('/order/bill/get_refund_apply/v1', {
    data: params,
    json: false,
  })
}

/**
 * 审核退款申请
 */
export const reviewRefund = async params => {
  return API<unknown>('/order/bill/audit_refund/v1', {
    data: params,
  })
}

/**
 * 获取充值列表
 */
export const getRechargeList = async (params: unknown) => {
  return API<unknown>('/recharge/v1/getRechargeList', {
    data: params,
  })
}

/**
 * 获取可退款的充值记录
 */
export const getRefundRechargeList = async (params: unknown) => {
  return API<unknown>('/recharge/v1/getRefundRechargeList', {
    data: params,
  })
}

/**
 * 充值
 */
export const rechargeSubmit = async (params: unknown) => {
  return API<unknown>('/recharge/v1/rechargeSubmit', {
    data: params,
  })
}

/**
 * 微信退款
 */
export const applyWechatPayRefund = async (params: unknown) => {
  return API<unknown>('/wechatPay/v1/applyWechatPayRefund', {
    data: params,
  })
}

/**
 * 微信获取充值二维码
 */
export const getWechatPayUrl = async (params: unknown) => {
  return API<unknown>('/wechatPay/v1/getWechatPayUrl', {
    data: params,
  })
}
/**
 * 收款主体下微信获取充值二维码
 */
export const getSubjectWechatPayUrl = async (params: unknown) => {
  return API<unknown>('/wechatPay/v2/getWechatPayUrl', {
    data: params,
  })
}

/**
 * 支付宝退款
 */
export const applyAliPayRefund = async (params: unknown) => {
  return API<unknown>('/aliPay/v1/applyAliPayRefund', {
    data: params,
  })
}

/**
 * 支付宝获取充值二维码
 */
export const getAliPayUrl = async (params: unknown) => {
  return API<unknown>('/aliPay/v1/getAliPayUrl', {
    data: params,
  })
}
/**
 * 收款主体下支付宝获取充值二维码
 */
export const getSubjectAliPayUrl = async (params: unknown) => {
  return API<unknown>('/aliPay/v2/getAliPayUrl', {
    data: params,
  })
}

/**
 * 充值导出
 */
export async function rechargeExport(query: unknown) {
  return API<Blob>('/recharge/v1/recharge/export', { data: query })
}

/**
 * 获取提现列表
 */
export const getRefundList = async (params: DetailQuery) => {
  return API<unknown>('/recharge/v1/getRefundList', {
    data: params,
  })
}

/**
 * 提现导出
 */
export async function refundExport(query: unknown) {
  return API<Blob>('/recharge/v1/refund/export', { data: query })
}

// ---支付宝收款码---
export enum typeEmum {
  创建订单 = 1,
  取车加购 = 2,
  续租 = 3,
  还车 = 4,
}
export type AliPayQrcodeQuery = {
  orderId: string
  type: typeEmum
  payFeeItemsVo?: object
}

export type AliPayResult = {
  payUrl: string
  payNo: string
  payAmount: number
}

export type AliPayStatusQuery = {
  orderId: number
  payNo: string
}
// 获取支付宝收款码信息
export const getAliPayQrcode = async (
  body: { payFeeItemsVo: object },
  query: AliPayQrcodeQuery
) => {
  return API<AliPayResult>('/order/v1/get_pay_url', {
    query,
    data: body,
  })
}

// 获取支付宝付款状态
export const getAliPayStatus = async (query: AliPayStatusQuery) => {
  return API<unknown>('/order/v1/query_pay_result', {
    query,
  })
}

// 取消支付订单
export const cancelPayOrder = async (query: AliPayStatusQuery) => {
  return API<unknown>('/order/v1/cancel_order_pay', {
    query,
  })
}

// 商家是否开通支付宝收款码
export const getMerchatSetting = async () => {
  return API<unknown>('/merchant/pay/v1/setting', { method: 'get' })
}

export interface PayChannelInfo {
  id: number
  merchantId: number
  paymentChannelId: number
  paymentChannelTypeCode: string
  paymentChannelName: string
  paymentChannelTypeIcon: string
  paymentChannelTypeName: string
  paymentChannelTypeSort:string
  entityName: string
}
// 查询商户支付渠道列表
export const getPayChannelList = async data => {
  return API<PayChannelInfo>('/merchant-payment-channels/v1/list', { data: data, method: 'get' })
}
