import { API } from '@/lib/API'

// 排车相关类型定义
export interface VehicleInfo {
  vehicleInfoId: number
  id?: number
  vehicleModel?: {
    id?: number
    vehicleUnionName?: string
    vehicleBrandName?: string
  }
  license?: string
  tagList?: Array<{
    tagName?: string;
  }>
  regDateMillSecond?: number | null
}

export interface StockInfo {
  sourceType?: number
  id?: string | number
  startTime?: number | string
  endTime?: number | string
}

export interface OrderInfo {
  id?: number
  pickupStoreId?: number
  pickupDate?: string | number
  returnDate?: string | number
  vehicleModel?: {
    id?: number
    vehicleUnionName?: string
  }
  orderSource?: string | number
  levelCorrEarliestRegisterTime?: number | null
}

export interface DistributeVehicleProps {
  info?: OrderInfo
  sourceEnumMap?: Record<string, string>
  occupy?: {
    storeId?: number
  }
  onConfirmed?: (vehicleId: number) => void;
  onCancel?: () => void
  ok?: () => void
  open?: boolean
}


export type ServiceItemType = {
  id: number,
  name: string,
  required: 0 | 1,
  amount: number,
}
export type StockBusyItemType = {
  id: number,
  autoSchedule: number,
  channelId: number,
  parentSourceId: number,
  sourceId: number,
  sourceTypName: string,
  sourceType: number,
  storeId: number,
  vehicleId: number,
  startTime: number,
  endTime: number,
}

export type SearchCalculateListParamsType = {
  pickupDate: number,
  pickupStoreId: number,
  pickupStoreType: number,
  returnDate: number,
  returnStoreId: number,
  returnStoreType: number,
  serviceItemList: ServiceItemType[],
  vehicleModelId: number,
  doorSendAmount: unknown,
  doorPickupAmount: unknown,
}

export type CalculateItemType = {
  vehicleId: number,
  vehicleModelName: string,
  vehicleTag: string,
  vehicleNo: string,
  totalAmount: number,
  addedList: ServiceItemType[],
  insuranceList: ServiceItemType[],
  serviceItemAmountDTOS: ServiceItemType[],
  hasStock: boolean,
  stockVehicleBusyVOList: StockBusyItemType[],
}
// 司机类型
export enum DriverType {
  取车 = 0,
  还车 = 1,
}

/**
 * 根据车型获取服务列表
 * @param vehicleModelId
 * @param storeId
 */
export const getServiceList = async (vehicleModelId: string, storeId: unknown) => {
  return API<{ addedList: ServiceItemType[], insuranceList: ServiceItemType[] }>(
    '/vehicle/model/v1/service/list/',
    {
      data: {
        vehicleModelId,
        storeId
      },
      json: false
    }
  )
}
/**
 * 获取服务算价列表
 * @param data
 */
export const getCalculateList = async (data: SearchCalculateListParamsType) => {
  return API<CalculateItemType[]>('/order/v1/price/new_calculate', {
    data: {
      ...data
    }
  })
}

/**
 * 获取订单列表
 * @param data
 */
export const getOrderList = async (data: unknown) => {
  const { orderType, pickupOrReturnStatus, longOrderStatus, ...formatted } = data
  if (orderType !== 1 && pickupOrReturnStatus) formatted.pickupOrReturnStatusList = [pickupOrReturnStatus]
  if (orderType === 1 && longOrderStatus) formatted.longOrderStatusList = [longOrderStatus]
  if (orderType === 1) formatted.orderType = orderType

  if (typeof formatted.storeIdList === 'number') formatted.storeIdList = [formatted.storeIdList]

  return API('/order/v1/list', {
    data: formatted,
  })
}

// 只返回订单基本信息的列表
export async function getOrderBaseList(data: unknown) {
  return API('/order/v1/base_list', { data })
}

/**
 * 获取订单相关枚举列表
 */
export const getOrderEnumList = async () => {
  return API<unknown>('/order/v1/base/emun/list', {
    method: 'GET'
  })
}
export const downOrderExcel = async (data: any) => {
  return API<unknown>('/pick_diver/downExcel/v1', {
    method: 'POST',
    data: {
      ...data
    }
  })
}
/**
 * 获取订单详情
 */
export const getOrderDetail = async (orderId: unknown) => {
  return API('/order/v1/detail', {
    data: {
      orderId
    },
    json: false
  })
}
/**
 * 新增订单备注
 */
export const saveRemark = async (orderId: unknown, remark: unknown, urlList?: string[]) => {
  return API('/order/v1/remark/save', {
    data: {
      orderId,
      urlList,
      remark,
    }
  })
}

/**
 * 取消政策
 */
export const getCancelRulesList = async (orderId: unknown) => {
  return API<unknown[]>('/order/v1/cancel_rule', {
    data: {
      orderId
    },
    json: false
  })
}

/**
 * 押金政策
 */
export const getDepositList = async (orderId: unknown) => {
  return API<unknown>('/order/v1/deposit_policy', {
    data: {
      orderId
    },
    json: false
  })
}

/**
 * 押金政策
 */
export const getServiceDetail = async (serviceId: unknown, orderId: unknown) => {
  return API<unknown>('/order/v1/service_detail', {
    data: {
      serviceId,
      orderId
    },
    json: false
  })
}

/**
 * 创建订单
 * @param data
 */
export const createOrder = async (data: unknown) => {
  return API('/order/v1/create', {
    data: {
      ...data
    }
  })
}

/**
 * 取还车信息
 * @param orderId
 */
export const pickReturnInfo = async (orderId: unknown) => {
  return API<unknown>('/order/v1/pick_retuen', {
    data: {
      orderId
    },
    json: false
  })
}

/**
 * 确认取车
 * @param data
 */
export const pickUpSave = async (data: unknown) => {
  return API('/order/vehicle/pick_return/pick_up/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 确认还车
 * @param data
 */
export const returnVehicleSave = async (data: unknown) => {
  return API('/order/vehicle/pick_return/return_vehicle/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 确认还车
 * @param expense_type
 */
export const returnExpenseItem = async (expense_type: unknown) => {
  return API<unknown[]>('/order/vehicle/pick_return/return_expense_item/list/v1', {
    data: {
      expense_type
    },
    json: false
  })
}

/**
 * 获取取还车司机列表
 * @param storeId
 */
export const getDriverList = async (storeId: unknown) => {
  return API<{ model: { id: number, simpleName: string, name: string }[] }>('/user/v1/driver/box', {
    data: {
      storeId
    },
    method: 'GET',
    json: false
  })
}

/**
 * 排司机
 * @param data
 */
export const arrangeDriver = async (data: unknown) => {
  return API<unknown>('/pick_diver/arrange/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 根据车型获取车辆列表
 * @param orderId
 * @param vehicleModelId
 */
export const getAvailableVehicleList = async (orderId: unknown, vehicleModelId: unknown) => {
  return API<unknown>('/order/v1/available_vehicle/list', {
    data: {
      orderId,
      vehicleModelId
    },
    json: false
  })
}

/**
 * 根据车型获取车辆列表
 * @param orderId
 * @param vehicleId
 */
export const listConflictStock = async (orderId: unknown, vehicleId: unknown) => {
  return API<unknown>('/order/v1/list_conflict_stock', {
    data: {
      orderId,
      vehicleId
    },
    json: false
  })
}

/**
 * 确认排车
 * @param orderId
 * @param vehicleId
 * @param vehicleModelId
 */
export const planVehicle = async (orderId: unknown, vehicleId: unknown, vehicleModelId: unknown) => {
  return API<unknown>('/order/v1/plan_vehicle/update', {
    data: {
      orderId,
      vehicleId,
      vehicleModelId
    },
    json: false
  })
}

/**
 * 新增车损记录
 * @param data
 */
export const saveOrderDamage = async (data: unknown) => {
  return API<unknown>('/damage_order/save/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 新增车损记录
 */
export const getAreaList = async () => {
  return API<unknown>('/area/v1/list', {
    data: {
      depth: 2
    },
    json: false
  })
}

/**
 * 新增违章记录
 * @param data
 */
export const saveOrderIllegal = async (data: unknown) => {
  return API<unknown>('/illegal_order/save/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 违章记录退款
 * @param id
 * @param refund_amount
 */
export const illegalRefund = async (id: unknown, refund_amount: unknown) => {
  return API<unknown>('/illegal_order/refund/v1', {
    data: {
      id,
      refund_amount
    },
    json: false
  })
}
/**
 * 车损记录退款
 * @param id
 * @param refund_amount
 */
export const damageRefund = async (id: unknown, refund_amount: unknown) => {
  return API<unknown>('/damage_order/refund/v1', {
    data: {
      id,
      refund_amount
    },
    json: false
  })
}

/**
 * 获取任务列表
 * @param data
 */
export const getTaskList = async (data: unknown) => {
  return API<unknown>('/pick_diver/list/driver_num/v1', {
    data: {
      ...data
    }
  })
}

/**
 * ocr
 * @param url // 图片URL
 * @param type // 证件类型：1: 身份证正面 2: 身份证反面 3: 驾驶证 4:行驶证正页 5:行驶证副页
 */
export const ocrImage = async (url: string, type: 1 | 2 | 3 | 4 | 5) => {
  return API<unknown>('/upload/v1/ocr', {
    data: {
      url,
      type
    },
    json: false
  })
}

/**
 * 获取账单明细
 * @param orderId
 */
export const getBillDetail = async (orderId: unknown) => {
  return API<unknown>('/order/v1/bill_detail', {
    data: {
      orderId
    },
    json: false
  })
}

/**
 * 更新用户证件信息
 * @param orderId
 * @param data
 */
export const certificateInfoUpdate = async (orderId: unknown, data: unknown) => {
  return API<unknown>(`/order/v1/certificate/update?orderId=${orderId}`, {
    data: {
      ...data
    }
  })
}

/**
 * 取消订单
 * @param orderId
 * @param reduceAmount
 */
export const orderCancel = async (orderId: unknown, reduceAmount: unknown) => {
  return API<unknown>('/order/v1/cancel', {
    data: {
      orderId,
      reduceAmount
    },
    json: false
  })
}


// /**
//  * 车损撤销接口 
//  * @param orderId
//  */
// export const vehicleDamageCancel = async (vehicleDamageId: unknown,) => {
//   return API<unknown>('/damage_order/cancel/v1 ', {
//     data: {
//       orderId:vehicleDamageId,
//     },
//     json: false
//   })
// }


export async function vehicleDamageCancel(id: number) {
  return API(`/damage_order/cancel/v1?id=${id}`)
}
export async function vehicleIllegalCancel(id: number) {
  return API(`/illegal_order/delete/v1?id=${id}`)
}
/**
 * 报销列表
 * @param data
 */
export const getPickExpenseList = async (data: unknown) => {
  return API<unknown>('/pick_expense/pick_expense/list/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 报销列表
 * @param data
 */
export const getDriverOrderList = async (data: unknown) => {
  return API<unknown>('/pick_diver/list/v1', {
    data: {
      ...data
    }
  })
}

/**
 * 续租的预计价
 * @param orderId
 * @param rerentTime
 */
export const getReRentPreCalculate = async (orderId: unknown, rerentTime: unknown) => {
  return API<unknown>('/order/v1/rerent/pre_calculate', {
    data: {
      orderId,
      rerentTime
    },
    json: false
  })
}

/**
 * 确认续租(创建续租单)
 * @param data
 */
export const createReRent = async (data: unknown) => {
  return API<unknown>('/order/v1/rerent/create', {
    data: {
      ...data
    },
    json: false
  })
}

/**
 * 确认续租(创建续租单)
 * @param orderId
 */
export const getReRentServiceList = async (orderId: unknown) => {
  return API<unknown>('/order/v1/rerent/service_list', {
    data: {
      orderId
    },
    json: false
  })
}

/**
 * 取消续租
 * @param orderId //续租订单id
 */
export const cancelReRent = async (orderId: unknown) => {
  return API<unknown>('/order/v1/rerent/cancel', {
    data: {
      orderId
    },
    json: false
  })
}
/**
 * 获取排司机信息
 * @param order_id //订单id
 */
export const getPickDriverInfo = async (order_id: unknown) => {
  return API<unknown>('/pick_diver/list_by_order/v1', {
    data: {
      order_id
    },
    json: false
  })
}

export async function exportOrder(query: unknown) {
  console.log('导出订单',query)
  if (typeof query.storeIdList === 'number') query.storeIdList = [query.storeIdList]
  return API<Blob>('/order/v1/downExcel', { data: query })
}

export async function getListOrderStore() {
  return API<unknown>('/pick_diver/list_store_order/v1')
}

export async function getAllServiceList() {
  return API<unknown>('/order/v1/service/all', { data: {}, json: false })
}

export async function getPickupDeposit(orderId: unknown) {
  return API<unknown>('/order/v1/pickup_deposit', { data: { orderId }, json: false })
}

export async function savePickExpense(data: unknown) {
  return API<unknown>('/pick_expense/pick_expense/batch_save/v1', { data })
}

export async function batchUpdateExpenseStatus(data: unknown) {
  return API<unknown>('/pick_expense/pick_expense/batch_update/status/v1', { data })
}

// 长租订单生成分期计划
export async function initInstalment(data: unknown) {
  return API<unknown>('/order/v1/init_instalment', { data })
}

// 长租订单列表查询单个订单分期计划
export async function instalmentList(data: unknown) {
  return API<unknown>('/order/v1/instalment_list', {
    data,
    json: false
  })
}

// 长租订单列表查询单个订单当前分期
export async function getInstalmentPay(data: unknown) {
  return API<unknown>('/order/v1/get_instalment_pay', {
    data,
    json: false
  })
}

// 长租订单列表查询单个订单当前分期支付情况
export async function saveInstalmentPay(data: unknown) {
  return API<unknown>('/order/v1/save_instalment_pay', {
    data,
    json: false
  })
}

/**
 * 获取长租订单详情
 */
export const getLongOrderDetail = async (orderId: unknown) => {
  return API('/order/v1/long_detail', {
    data: {
      orderId
    },
    json: false
  })
}

/**
 * 获取长租订单详情
 */
export const updateLongOrderDeposit = async (data: unknown) => {
  return API('/order/v1/update_longorder_deposit', {
    data,
    json: false
  })
}

/**
 * 订单取消后，退违约金
 */
export const penaltyRefund = async (data: unknown) => {
  return API('/order/v1/penalty_refund', {
    data,
    json: false
  })
}

/**
 * 获取订单来源列表
 * @param includeOffLine 线下
 * @param includeSub 子渠道
 * @param includeSync 爬虫同步
 */
export const getChannelBusiList = (data: unknown) => {
  return API<any>('/apiConn/v1/listChannelBusi', {
    data,
  })
}

/**
 * 获取商家订单标签
 */
export const getMerchantOrderTagList = () => {
  return API<any>('/order/v1/order_tag/all')
}

/**
 * 保存商家订单标签
 */
export const saveMerchantOrderTag = (params: any) => {
  return API<any>('/order/v1/order_tag/save', {
    data: params,
    json: false
  })
}

/**
 * 获取标签关联订单
 */
export const getOrderTagRelatedList = (tagId: unknown) => {
  return API<any>(`/order/v1/order_tag/relation_list?tagId=${tagId}`, {
    data: { tagId },
  })
}

/**
 * 删除商家订单标签
 */
export const deleteMerchantOrderTag = (tagId: any) => {
  return API<any>(`/order/v1/order_tag/del?tagId=${tagId}`, {
    data: { tagId }
  })
}

/**
 * 获取订单关联标签
 */
export const getOrderTagList = (orderId: unknown) => {
  return API<any>(`/order/v1/order_tag/list?orderId=${orderId}`, {
    data: { orderId },
  })
}

/**
 * 保存订单关联标签
 */
export const saveOrderRelatedTag = (params: any) => {
  return API<any>('/order/v1/order_tag_relation/save', {
    data: params,
    json: false
  })
}
/*
 * 获取订单来源列表
 * @param orderId 订单 id
 * @param discountType 折扣方式 0 整单优惠 1 补充金额
 * @param discountAmount 折扣金额
 */
export const adjustOrderAmount = (data: unknown) => {
  return API<any>('/order/v1/adjust_amount', {
    data,
    json: false,
  })
}

/**
 * 取消订单接口
 * @param orderId 订单-id
 * @param type 服务项类型：1=订单费用项，2=还车费用项
 * @param itemId 服务项Id
 */
export const cancelOrderService = (query: unknown) => {
  return API<any>('/order/v1/cancel_service', {
    query,
  })
}

export function formatAddedServiceItemList(items: any[]){
  const bestInsuranceItem = items.find(item => item.name === '尊享保险')
  const betterInsuranceItem = items.find(item => item.name === '优享保险')
  // 商家配置了尊享保险和优享保险
  if (bestInsuranceItem && betterInsuranceItem) {
    // 已选尊享保险，要禁用优享保险
    if (bestInsuranceItem.select) {
      betterInsuranceItem.disabled = true
    }
  }
  items.forEach(item => {
    if (item.amount < 0) {
      item.disabled = true
    }
  })
  return items
}
