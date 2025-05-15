import { API } from '@/lib/API'

export const salesStatusMap = {
  0: '停售中',
  1: '售卖中',
}

export type YesOrNoType = 0 | 1

export type PriceListParamType = {
  desc?: boolean // true表示倒序展示， false表示正序展示
  orderBy?: string
  pageIndex?: number // 分页页码
  pageSize?: number // 分页查询条数
  status?: 0 | 1 // 售卖状态 1：售卖中 0: 停售中
  storeId?: number // 门店Id
  vehicleModelIdList?: number[] // 车型ID
}

export type CreditUndepositItem = {
  id: number
  channelName: string
}

export type TagListItemType = {
  id: number
  tagName: string
}

export type CalendarListItemType = {
  id: number
  rentName: string // 价格名称
  latestBookingTime: number // 最短预定时间
  leastRentalTime: number // 最短起租租期
  calendarType: 0 | 1 | 2 // 价格日历类型 0:基础价格(平时，周末);1:节假日;2:自定义价格
  startDate: number // 节假日和自定义价格开始时间
  endDate: number // 节假日和自定义价格结束时间
  price: number | string // 平日价、单日价
  priceWeekend: number | string // 周末价
  latestBookingUnit: number
}

export type ChannelPriceItemType = {
  channelId: number
  channelName: string
  calendarList: CalendarListItemType[]
}

export type InsuranceServicePriceBaseSettingType = {
  damageInsurance: YesOrNoType // 车损险 0:无需用户承担;1:用户承担
  damageInsuranceAmount: number // 车损金额多少以下用户承担,精确到分
  depreciation: YesOrNoType // 折旧费 0:无须用户承担;1:用户承担
  depreciationFee: number // 折旧费大于xx元,及以上需用户承担,精确到分
  repairFeeRatio: number // 收取维修费用的比例,xx%
  tire: YesOrNoType // 包含轮胎 0:否;1:是
  glass: YesOrNoType // 包含玻璃 0:否;1:是
  thirdPartyInsurance: number // 三者险保额
  outageFee: YesOrNoType // 停运费 0:无需用户承担;1:用户承担
  required: YesOrNoType // 是否必须 0:否;1:是
}

export type InsuranceServicePriceType = {
  insuranceServiceSettingId: number
  insuranceServiceSettingName: string
  onHighestPrice: 0 | 1 // 是否开启封顶价格 0:否;1:是
  highestPrice: number | null
  price: number | string // 价格
  baseSetting: InsuranceServicePriceBaseSettingType
  status: YesOrNoType // 状态 0:禁用;1:启用
  insuranceServicePriceChannelVoList: InsuranceServicePriceChannel[]
}
export interface InsuranceServicePriceChannel {
  id: number
  rentBaseId: number
  vehicleModelId: number
  storeId: number
  insuranceServicePriceId: number
  insuranceServiceSettingId: number
  channel: number
  channelName: string
  price: number
  status: 0 | 1 | 2 // 启用状态固定为 1
}

export type AddedServiceBaseSettingType = {
  required: YesOrNoType // 是否必须 0:否;1:是
}

export type AddedServiceType = {
  addedServiceSettingId: number
  addedServiceSettingName: string
  onCharge: YesOrNoType // 是否收费 0:免费;1:收费
  price: number | string // 价格
  baseSetting: AddedServiceBaseSettingType
  status: YesOrNoType // 状态 0:禁用;1:启用
  addedServiceChannelVoList: AddedServiceChannel[]
}
export interface AddedServiceChannel {
  id: number
  rentBaseId: number
  addedServiceId: number
  vehicleModelId: number
  storeId: number
  addedServiceSettingId: number
  channel: number
  channelName: string
  price: number
  status: 0 | 1 | 2 // 启用状态固定为 1
}

export type PriceItemInfo = {
  id: number
  vehicleModelName: string // 车型名称
  vehicleModelId: number // 车型id
  storeName: string // 门店名称
  storeId: number // 门店id
  status: 0 | 1 // 售卖状态
  statusStr?: string
  illegalDeposit: number // 违章押金
  rentDeposit: number // 租车押金
  creditUndepositList: CreditUndepositItem[] // 支持双免的渠道
  mileage: number // 里程限制
  mileageLimit: 0 | 1 // 里程限制 0:无;1:有
  mileageRent: number // 里程超出金额:元/km 精确到分
  tagList: TagListItemType[] // 车型标签
  vehicleCount: number // 车辆数量
  channelPriceList: ChannelPriceItemType[]
  insuranceServicePriceList: InsuranceServicePriceType[] // 保险服务
  addedServiceList: AddedServiceType[] // 附加服务
  ctripStandardFee: boolean
}

export type AddedServiceItemType = {
  id: number
  limitPerOrder: number // 每单限量
  name: string // 附加服务名称
  status: 0 | 1 // 状态 0:禁用;1:启用
  required: 0 | 1
  preset: 0 | 1
  storeId: number
}

export type InsuranceServiceItemType = {
  id: number
  name: string // 保险服务名称
  damageInsurance: YesOrNoType // 车损险 0:无需用户承担;1:用户承担
  damageInsuranceAmount: number // 车损金额多少以下用户承担,精确到分
  depreciation: YesOrNoType // 折旧费 0:无须用户承担;1:用户承担
  depreciationFee: number // 折旧费大于xx元,及以上需用户承担,精确到分
  repairFeeRatio: number // 收取维修费用的比例,xx%
  tire: YesOrNoType // 包含轮胎 0:否;1:是
  glass: YesOrNoType // 包含玻璃 0:否;1:是
  thirdPartyInsurance: number // 三者险保额
  outageFee: YesOrNoType // 停运费 0:无需用户承担;1:用户承担
  required: YesOrNoType // 是否必须 0:否;1:是
  status: YesOrNoType // 状态 0:禁用;1:启用
  preset: YesOrNoType // 是否是预设数据 0:禁用;1:启用
}

/**
 * 获取价格管理列表
 * @param data
 */
export const getPriceList = (data: PriceListParamType) => {
  const { storeId, vehicleModelIdList = [], ...rest } = data
  const storeIdList = storeId ? [storeId] : []
  return API<{ count: number; list: PriceItemInfo[] }>('/price/v1/list', {
    data: {
      ...rest,
      storeIdList,
      vehicleModelIdList: vehicleModelIdList?.length > 0 ? vehicleModelIdList : null,
    },
    method: 'POST',
  })
}

/**
 * 查询携程押金数据
 * @param null
 */
export const getCtripStandardFee = (storeId:number, vehicleModelId:number) => {
  return API('/price/v1/standardFee/find', {
    data: {
      storeId,
      vehicleModelIds:[vehicleModelId]
    },
  })
}

/**
 * 修改状态
 * @param id
 * @param status
 */
export const updateStatus = (id: number, status: 0 | 1) => {
  return API('/price/v1/updStatus', {
    data: {
      id,
      status,
    },
    json: false,
  })
}

/**
 * 获取价格详情
 * @param id
 */
export const getPriceDetail = (id: string) => {
  return API<PriceItemInfo>('/price/v1/find', {
    data: {
      id,
    },
    json: false,
  })
}
/**
 * 获取价格详情
 * @param data
 */
export const savePrice = (data: PriceItemInfo) => {
  return API<PriceItemInfo>('/price/v1/save', {
    data: {
      ...data,
    },
  })
}

/**
 * 附加服务列表
 * @param data
 */
export const getAddedServiceList = (data: { pageIndex: number; pageSize: number }) => {
  return API<AddedServiceItemType[]>('/price/addedService/v1/list', {
    data: {
      ...data,
    },
  })
}

/**
 * 添加附加服务
 * @param data
 */
export const saveAddedService = (data: Partial<AddedServiceItemType>) => {
  return API<AddedServiceItemType[]>('/price/addedService/v1/save', {
    data: {
      ...data,
    },
  })
}

/**
 * 删除附加服务
 * @param id
 */
export const deleteAddedService = (id: number) => {
  return API<AddedServiceItemType[]>('/price/addedService/v1/delete', {
    data: {
      id,
    },
    json: false,
  })
}

/**
 * 启用/禁用状态修改
 * @param data
 */
export const updateAddedServiceStatus = (data: { id: number; status: 0 | 1 }) => {
  return API<AddedServiceItemType[]>('/price/addedService/v1/updStatus', {
    data: {
      ...data,
    },
    json: false,
  })
}

/**
 * 保险服务列表
 */
export const getInsuranceServiceList = () => {
  return API<InsuranceServiceItemType[]>('/price/insuranceService/v1/list', {
    data: {},
  })
}

/**
 * 保险服务保存
 * @param data
 */
export const saveInsuranceService = (data: InsuranceServiceItemType) => {
  return API('/price/insuranceService/v1/save', {
    data: { ...data },
  })
}

/**
 * 删除保险服务
 * @param id
 */
export const deleteInsuranceService = (id: number) => {
  return API('/price/insuranceService/v1/delete', {
    data: { id },
    json: false,
  })
}

/**
 * 启用/禁用状态修改
 * @param data
 */
export const updateInsuranceService = (data: { id: number; status: 0 | 1 }) => {
  return API<AddedServiceItemType[]>('/price/insuranceService/v1/updStatus', {
    data: {
      ...data,
    },
    json: false,
  })
}

export type BatchAddedServiceListParamsType = {
  desc?: boolean // true表示倒序展示， false表示正序展示
  pageIndex?: number
  pageSize?: number
  searchType?: 1 | 2 // 搜索类型 1:按附加服务 2：按车型
  storeId?: number // 门店ID
  vehicleModelId?: any // 车型ID
  addedServiceSettingId?: number // 附加服务id
}

/**
 * 附加服务价格列表
 * @param data
 */
export const getBatchAddedServiceList = (data: BatchAddedServiceListParamsType) => {
  return API<{ list: any[]; count: number }>('/price/batch/v1/findAddedList', {
    data: {
      ...data,
    },
  })
}

/**
 * 根据保险服务获取车型列表
 * @param data
 */
export const getBatchInsuranceList = (data: any) => {
  return API<{ list: any[]; count: number }>('/price/batch/v1/findInsuranceList', {
    data: {
      ...data,
    },
  })
}
/**
 * 根据渠道获取车型列表
 * @param data
 */
export const getBatchChannelList = (data: any) => {
  return API<{ list: any[]; count: number }>('/price/batch/v1/findUndepositList', {
    data: {
      ...data,
    },
  })
}

/**
 * 获取批量价格设置数据
 * @param storeId
 */
export const getRentHolidayPrice = (storeId: any,vehicleModelId?:number,vehicleModelGroup?:number) => {
  return API<any[]>('/price/batch/v1/getRentHolidayPrice', {
    data: {
      storeId,
      vehicleModelId:`${vehicleModelId ? vehicleModelId : ''}`,
      vehicleModelGroup
    },
    json: false,
  })
}

/**
 * 获取门店列表
 */
export const getStoreList = () => {
  return API<any>('/store/v1/storeListByAuth', {
    data: {},
    json: false,
  })
}

/**
 * 获取渠道列表
 */
export const getChannelList = () => {
  return API<any>('/channel/v1/list', {
    data: {},
  })
}

/**
 * 获取车型列表
 */
// /vehicle/model/v1/list/vehicle_model/select 之前的
export const getVehicleList = (data) => {
  return API<any>('/vehicle/model/v1/queryListByStoreIds', {
    data,
  })
}

/**
 * 服务价格或状态批量更新
 * @param data
 */
export const saveAddedList = (data: any) => {
  return API<any>('/price/batch/v1/saveAddedList', {
    data: { ...data },
  })
}

/**
 * 保险价格或状态批量更新
 * @param data
 */
export const saveInsuranceList = (data: any) => {
  return API<any>('/price/batch/v1/saveInsuranceList', {
    data: { ...data },
  })
}

/**
 * 批量更新渠道状态
 * @param data
 */
export const saveUndepositList = (data: any) => {
  return API<any>('/price/batch/v1/saveUndepositList', {
    data: { ...data },
  })
}

/**
 * 更新渠道状态
 * @param data
 */
export const updUndepositStatus = (data: any) => {
  return API<any>('/price/batch/v1/updUndepositStatus', {
    data: { ...data },
    json: false,
  })
}

/**
 * 查询门店所有车型信息
 * @param data
 */
export const findAllSampleModelList = (data: any) => {
  return API<any>('/price/v1/findAllSampleModelList', {
    data: { ...data },
    json: false,
  })
}

/**
 * 查询已关联车型信息
 * @param data
 */
export const findRelationModelList = (data: any) => {
  return API<any>('/price/v1/findRelationModelList', {
    data: { ...data },
    json: false,
  })
}

/**
 * 关联车型列表更新
 * @param data
 */
export const updRelationModelList = (data: any) => {
  return API<any>('/price/v1/updRelationModelList', {
    data: { ...data },
  })
}

/**
 * 查询商家日历（添加价格类型模块）
 * @param storeId
 */
export const findCalendarList = (storeId: number) => {
  return API<{
    calendarList: Calendar[]
    storeId: number
  }>('/price/v1/findCalendarList', {
    data: { storeId },
    json: false,
  })
}
// 试用门店   价格分门店
export const storeListByAuth = (data) => {
  return API('/store/v1/storeListByAuth', {data})
}
export interface Calendar {
  calendarType: 0 // 0 平日，1 节日，2 自定义
  id: number
  rentName: string
  price: null
  priceWeekend: null
  startDate: number // 开始日期（单位 ms）
  endDate: number // 结束日期（单位 ms）
  basePricePeriod: string // 周末时段。7位字符串，为 1 的为视为周末
  latestBookingTime: number // 最短预定时间
  leastRentalTime: number // 最短起租时间
  channelId: null
  holidayId: number // 代表是什么节日。1 平日 2 元旦... 自定义日历为 0
}

/**
 * 查询商家日历（添加价格类型模块）保存按钮
 * @param data
 */
export const saveCalendarList = (data: any) => {
  return API<any>('/price/batch/v1/saveCalendarList', {
    data: { ...data },
  })
}
/**
 * 更新批量价格
 * @param data
 */
export const updRentHolidayPrice = (data: any) => {
  return API<any>('/price/batch/v1/updRentHolidayPrice', {
    data: { ...data },
  })
}
/**
 * paixu
 * @param data
 */
export const sortSerialNumber = (data: any) => {
  return API<any>('/price/batch/v1/serialNumber', {
    data: { ...data },
  })
}
/**
 * 日历删除
 * @param id
 */
export const delCalendarList = (id: any) => {
  return API<any>('/price/batch/v1/delCalendarList', {
    data: { id },
    json: false,
  })
}
/**
 * 携程无忧租设置列表
 * @param data
 */
export const getWorryFreeService = (data: any) => {
  return API<any>('/price/worryFreeService/v1/batch/list', {
    data: { ...data },
  })
}

/**
 * 携程无忧租设置保存
 * @param data
 */
export const saveBatchSaveWorryFree = (data: any) => {
  return API<any>('/price/worryFreeService/v1/batch/save', {
    data: { ...data },
  })
}


/**
 * 日志列表
 * @param data
 */
export const getLogList = (data: any) => {
  return API<any>('/opLog/v1/list', {
    data: { ...data },
  })
}


