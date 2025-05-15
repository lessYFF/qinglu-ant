import { API } from '@/lib/API'

// 订单详情（拉取数据会用到）
export interface OrderDetail {
  allowedOnlinePay: 0 | 1
  allowOnlineRefund: 0 | 1
  fromSource: number
  orderInfoVo: {
    orderId: number
    vehicleId: number
    orderMemberVo: {
      userName: string
      idcardNo: string
    }
  }
}

// 违章处理状态
export enum HandleStatus {
  待处理 = 0,
  已处理 = 1,
  无需处理 = 2,
}

// 违章类型
export enum IllegalType {
  现场单 = 0,
  非现场单 = 1,
}

// 违章处理方
export enum ProcessorType {
  租车公司处理 = 0,
  客户处理 = 1,
}

// 扣款方式
export enum DeductionType {
  渠道扣款 = 1,
  线下代扣 = 2,
}

export interface BaseIllegalInfo {
  orderId: number // 关联订单 ID
  illegalTime: number // 违章时间
  illegalCityId: number // 违章城市 ID
  illegalAddr: string // 违章地点
  illegalAction: string // 违章行为
  fraction: number // 扣分
  penaltyAmount: number // 罚款
  realHandleStatus: number // 罚款金额
}

// 列表中返回的违章单信息
export interface IllegalInfo extends Omit<BaseIllegalInfo, 'proofList'> {
  id: number
  orderNo: string // 订单号
  vehicleId: number // 车辆 ID
  licenseNo: string // 车牌号
  vehicleModelName: string | null // 车型名称
  storeId: number // 车辆所属门店 ID
  storeNameUnion: string // 门店名称
  illegalCityName: string // 违章城市名称
  handleStatus: HandleStatus // 处理状态
  contractDamageAmount: number // 总费用
  opTime: number // 最新操作时间
  paymentStatus: number | null
  transferStatus: number | null
  createTime: null | Date
}

// 违章详情
export type IllegalDetail = Omit<
  IllegalInfo,
  'vehicleId' | 'vehicleModelName' | 'contractDamageAmount'
> & {
  engineNum: string // 发动机编号
  frameNum: string // 车架号
  proofList: { proofUrl: string }[] // 凭证图片（最多5张）
  agencyFee: number | null // 代办费用
  totalFee: number | null // 总金额
  illegalType: IllegalType // 违章类型
  deductionType: DeductionType | null
  processorType: ProcessorType | null
  handleDriverName: string | null
  handleDriverlicNo: string | null
  handleUserName: string | null
  remark: string | null
}

export async function queryIllegalOrders(query: unknown) {
  return API<{ list: IllegalInfo[]; count: number }>('/vehicle/illegal_order/list/v1', {
    data: query,
  })
}

export async function removeIllegalOrder(id: number) {
  return API(`/illegal_order/delete/v1?id=${id}`)
}

export async function getIllegalDetail(id: number) {
  return API<IllegalDetail>(`/vehicle/illegal_order/detail/v1?id=${id}`)
}

export interface IllegalCount {
  appendingNum: number // 待处理数据
  unpaidNum: number // 待缴纳数量
}
export async function getIllegalCount() {
  return API<IllegalCount>('/vehicle/illegal_order/unhandle_num/v1')
}

export async function exportIllegalOrders(data) {
  return API<Blob>('/vehicle/illegal_order/v1/export',{data})
}

export async function createIllegalOrderFromVehicle(data: unknown) {
  return API('/vehicle/illegal_order/save/v1', { data })
}

export async function handleIllegalOrder(data: unknown) {
  return API('/vehicle/illegal_order/handle/v1', { data })
}

export async function createIllegalFromOrder(data: unknown) {
  return API('/illegal_order/save/v1', { data })
}
