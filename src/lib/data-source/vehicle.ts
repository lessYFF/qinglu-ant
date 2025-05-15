/**
 * 车辆相关数据
 */
import { useCallback, useEffect, useState } from 'react'
import { API } from '@/lib/API'
import { truthy } from '@/lib/lang'

// 车辆来源
export enum VehicleSource {
  自有 = 1,
  长期借调 = 2,
  临时借调 = 3,
  挂靠 = 4,
  托管 = 5,
  融资租赁 = 6,
  虚拟库存 = 7,
  默认 = 8,
  股东持有 = 9,
  平台车辆 = 10
}

// 购入方式
export enum PurchaseWay {
  全额购车 = 0,
  贷款购车 = 1,
}
export enum SalesChannel {
  通用 = 1,
  非通用 = 0,
}

// 车辆状态
export enum VehicleStatus {
  待上线 = 1,
  未租赁 = 2,
  租赁中 = 3,
  维修中 = 4,
  保养中 = 5,
  调车中 = 6,
  事故中 = 7,
  年检中 = 8,
}
// 平台车辆状态
export enum CripVehicleStatus {
  系统下线 = 0,
  待上线 = 1,
  待租赁 = 10,
  永久下线 = 20,
}
// 平台审核状态
export enum CripAuditStatus {
  审核中 = 0,
  审核通过 = 1,
  审核失败 = 2,
}

// 行驶证 - 使用性质
export enum UsageNature {
  非营运 = 1,
  租赁 = 2,
  旅游客运 = 3,
  预约出租客运 = 4,
  营运转非 = 5,
  其他 = 6,
}

// 保险单 - 额度类型
export enum ThirdInsuranceType {
  '20万' = 1,
  '30万' = 2,
  '50万' = 3,
  '100万' = 4,
  '150万' = 5,
  '200万' = 6,
  '200万以上' = 7,
}

/**
 * ===========================
 * 车辆
 * ===========================
 */
export interface Vehicle {
  includeDel: boolean
  id: number
  vehicleImgUrl: string // 车型图片
  vehicleModelId: number
  vehicleModelName: string // 车型名称
  licenseTypeName: string // 牌照类型
  license: string // 行驶证 - 车牌号
  frameNum: string // 行驶证 - 车架号
  vehicleSource: VehicleSource // 车辆来源
  vehicleStatus: VehicleStatus // 车辆状态
  storeId: number // 所属店铺ID
  storeName: string // 所属店铺名称
  storeNameUnion: string // 所属店铺名（用于展示）
  belongCityName: string // 归属城市名
  purchase: VehiclePurchase | null
  auditStatus: number
  auditFailReason: string
  etcActivateStatus:string
  etcIcNo:string
  platformSold: number // 售卖渠道 0 非通用 1通用
}

export interface VehiclesQuery {
  license?: string
  storeId?: number | string | null
  vehicleModelId?: number | string | null
  vehicleSource?: VehicleSource | -1
  vehicleStatus?: VehicleStatus | -1
  ctripVehicleStatus?: number | null
  ctripVehicleAuditStatus?: number | null
  frameNumList?: string[]
  includeDel?:boolean
  pageIndex?: number
  pageSize?: number
  desc?: boolean
}
export interface TabStatistics {
  totalNum?: number;
  leaseNum?: number;
  yearlyInspectionExpiredNum?: number;
  maintenanceExpiredNum?: number;
  illegalUnhandNum?: number;
  insuranceExpiredNum?: number;
}

export async function getVehicles(query?: VehiclesQuery) {
  return API<{ count: number; list: Vehicle[] }>('/vehicle/info/v1/list', {
    data: {
      ...query,
      desc: false,
    },
  })
}

export async function getVehiclesForSelect(query: {
  license?: string
  storeId?: number
  vehicleModelId?: number
}) {
  return API<Vehicle[]>('/vehicle/info/v1/select', {
    data: {
      ...query,
    },
  })
}

export async function getVehiclesSelect(query) {
  return API<Vehicle[]>('/vehicle/info/v1/select', {
    data: {
      ...query,
    },
  })
}

export async function exportVehicles(query: VehiclesQuery) {
  return API<Blob>('/vehicle/info/v1/downExcel', { data: query })
}

export interface VehicleTips {
  vehicleId: number

  bizInsuranceExpired: 1 | 0 | null
  bizInsuranceExpireTime: null | string // 2023-09-30
  bizInsuranceExpireDayNum: null | number // -20

  saliInsuranceExpired: 1 | 0 | null
  saliInsuranceExpireTime: null | string
  saliInsuranceExpireDayNum: null | number

  yearlyInspectionExpired: 1 | 0 | null
  nextYearlyInspectionDate: null | string
  yearlyInspectionExpiredDayNum: null | number

  maintenanceExpired: 1 | 0 | null
  expireMaintenanceMileage: number

  unHandleIllegalNum: number | null
  auditStatus: number
  auditFailReason: string
  maintenanceStartTime: string
  maintenanceEndTime:string
  maintenanceAmount: string | number
  maintenanceAfterMileage: number | string
  illegalUnhand: 1 | 0 | null // 是否有未处理的违章
  leased : 1 | 0 | null // tab行租赁中
  
  ctripAuditFailReason: string // 携程审核失败原因
  ctripAuditStatus: number // 携程审核状态
  ctripVehicleStatus: number // 携程车辆状态
  ctripVehicleStatusReason: string // 携程车辆状态永久下线原因
  ctripAuditTime: string // 携程审核时间
  ctripUrgeAuditStatus: 2 | 1 | 0 | null //（null：不展示 0 ：置灰 1: 可催审 2 : 已催审）
}
export async function getVehiclesTips(ids: number[]) {
  return API<VehicleTips[] | null>('/vehicle/info/v1/vehicle_tips', {
    data: {
      vehicleIdList: ids,
    },
  })
}

/**
 * ===========================
 * 车辆详情
 * ===========================
 */

/**
 * 保险信息
 */
export interface BizInsuranceInfo {
  id: number
  filePathList: { id: 0; filePath: string; fileType: number }[] // 图片列表
  insuranceCompany: string // 保险公司
  insuranceNum: string // 保险单号
  insuranceIdcard: string // 投保证件号
  insuranceStartDate: string // 保险开始日期，格式：2012-02-12
  insuranceEndDate: string // 保险结束日期
  thirdInsuranceType: ThirdInsuranceType // 第三者险额度类型
  damageAmount: number // 车损起陪额度
  frameNum: string // 车架号
  engineNum: string // 发动机号
  insuranceHolder: string // 投保人
}

export interface SaliInsuranceInfo {
  id: number
  filePathList: { id: 0; filePath: string; fileType: number }[] // 图片列表
  insuranceCompany: string // 保险公司
  insuranceNum: string // 保险单号
  insuranceIdcard: string // 投保证件号
  insuranceStartDate: string // 保险开始日期，格式：2012-02-12
  insuranceEndDate: string // 保险结束日期
  frameNum: string // 车架号
  engineNum: string // 发动机号
  insuranceHolder: string // 投保人
}

export interface VehiclePurchase {
  purchaseWay: PurchaseWay
  SalesChannel: SalesChannel
  purchaseAmount: number
  leaseTime: number
  monthlyRent: number
  vehicleSupplier: string
  shareholder: string
}

export interface VehicleDetail
  extends Pick<
    Vehicle,
    | 'vehicleModelName'
    | 'storeId'
    | 'storeName'
    | 'vehicleSource'
    | 'vehicleStatus'
    | 'license'
    | 'frameNum'
  > {
  id: number
  shareholder: string  // 股东
  vehicleColorId: number // 车辆颜色 ID
  vehicleModelId: number // 车型 ID
  merchantId: number // 所属商家 ID
  mileage: number // 里程数
  maintenanceInterval: number // 保养间隔公里数
  nextMaintenanceMileage: number // 下次保养公里数
  maintenanceStartTime:string | Date
  maintenanceEndTime: string | Date
  maintenanceAfterMileage: string
  vehicleImgUrl: string // 车辆图片
  platformSold: number // 售卖渠道 0 非通用 1通用
  vehicleTip: VehicleTips[] | null // 车辆审核提示
  licenseParam: {
    // 行驶证信息
    filePath: string
    engineNum: string // 发动机号
    regDate: string // 注册日期
    usageNature: UsageNature // 使用性质
    owner: string // 所有人
  } & Pick<Vehicle, 'license' | 'frameNum'>

  yearlyInspectionPeriodParam: {
    // 年检证
    filePath: string | null
    yearlyInspectionPeriod: string // 有效期至
  }

  bizInsuranceParamList: BizInsuranceInfo[] // 商业险列表
  saliInsuranceParamList: SaliInsuranceInfo[] // 交强险列表

  purchase: VehiclePurchase | null
}

export async function getVehicleDetail(id: number) {
  return API<VehicleDetail>('/vehicle/info/v1/get_by_id', { data: { id }, json: false })
}

/**
 * ===========================
 * 车辆颜色
 * ===========================
 */
export interface VehicleColor {
  id: number
  colorName: string
}

export function useVehicleColors() {
  const [colors, setColors] = useState<VehicleColor[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<VehicleColor[]>('/vehicle/color/v1/list_all').then(res => {
      setLoading(false)
      if (res.success) {
        setColors(res.data)
      }
    })
  }, [])

  useEffect(() => load(), [load])

  return { colors, loading, refresh: load }
}

/**
 * ===========================
 * 调车单
 * ===========================
 */

export enum ShuntingStatus {
  调车中 = 1,
  已到达 = 2,
  已作废 = 3,
}

export interface ShuntingQuery {
  license?: string
  shunter?: string
  shuntingStatus?: ShuntingStatus | -1
  pageIndex: number
  pageSize: number
}

export interface ShuntingTicket {
  id: number // 单据 ID
  shuntingStatus: ShuntingStatus // 调度状态
  vehicleInfoId: number // 车辆ID
  license: string // 车牌号
  vehicleModelName: string // 车型名称
  transferOutStoreId: number // 调出店铺 ID
  transferOutStoreName: string // 调出店铺名
  transferInStoreId: number // 调入店铺 ID
  transferInStoreName: string // 调入店铺名
  transferOutTime: number // 调出时间
  transferInTime: number // 调入时间（为 -1 代表尚未调入）
  shunter: string // 颂车员名称
  remark: string // 备注
  cancelReason?: string // 作废原因
}

export function useShuntingTickets(query: ShuntingQuery) {
  const [tickets, setTickets] = useState<{ count: number; list: ShuntingTicket[] }>({
    count: 0,
    list: [],
  })
  const [loading, setLoading] = useState(false)

  const search = useCallback((query: ShuntingQuery) => {
    setLoading(true)

    const { license, ...rest } = query
    const usedQuery = {
      ...rest,
      licenseList: truthy(license) ? license.split(';') : undefined,
      shuntingStatus: query.shuntingStatus === -1 ? undefined : query.shuntingStatus,
    }
    void API<{ count: number; list: ShuntingTicket[] }>('/vehicle/shunting/v1/list', {
      data: usedQuery,
    }).then(res => {
      setLoading(false)
      if (res.success) {
        setTickets(res.data)
      }
    })
  }, [])

  useEffect(() => search(query), [query])

  const refresh = useCallback(() => search(query), [query])

  return { tickets, loading, refresh }
}

export type ShuntingDetail = ShuntingTicket

export async function getShuntingDetail(id: number) {
  return API<ShuntingDetail>('/vehicle/shunting/v1/get_by_id', { data: { id }, json: false })
}

export async function exportShuntingTickets(query: ShuntingQuery) {
  return API<Blob>('/vehicle/shunting/v1/downExcel', { data: query })
}

// 确认到达
export async function shuntingConfirm(id: number) {
  return API(`/vehicle/shunting/v1/confirm_arrived?id=${id}`)
}

// 删除调车单
export async function shuntingDelete(id: number) {
  return API(`/vehicle/shunting/v1/delete?id=${id}`)
}

// 作废调车单
export async function shuntingCancel(id: number, reason: string) {
  return API(`/vehicle/shunting/cancel/v1?id=${id}&cancelReason=${encodeURIComponent(reason)}`)
}

/**
 * ===========================
 * 维保单
 * ===========================
 */

// 维保厂
export interface RepairDepot {
  id: number
  depotName: string
}
// 获取维保厂
export async function getRepairDepots() {
  return API<RepairDepot[]>('/vehicle/repair_maintenance/repair_depot/list/v1')
}
// 创建维保厂
export async function addRepairDepot(name: string) {
  name = encodeURIComponent(name)
  return API(`/vehicle/repair_maintenance/repair_depot/save/v1?depotName=${name}`)
}
// 删除维保厂
export async function removeRepairDepot(id: number) {
  return API(`/vehicle/repair_maintenance/repair_depot/delete/v1?id=${id}`)
}

// 费用项
export interface ExpenseItem {
  id: number
  expenseName: string
}
// 获取费用项
export async function getExpenseItems() {
  return API<ExpenseItem[]>('/vehicle/repair_maintenance/expense_item_prop/list/v1')
}
// 创建费用项
export async function addExpenseItem(name: string) {
  name = encodeURIComponent(name)
  return API(`/vehicle/repair_maintenance/expense_item_prop/save/v1?itemName=${name}`)
}
// 删除费用项
export async function removeExpenseItem(id: number) {
  return API(`/vehicle/repair_maintenance/expense_item_prop/delete/v1?id=${id}`)
}

// 维保单状态
export enum MaintainceStatus {
  维保中 = 1,
  已完成 = 2,
  已作废 = 3,
}

// 维保单类型
export enum MaintainceType {
  维修单 = 0,
  保养单 = 1,
}

// 维保单 - 费用项信息
export interface ExpenseInfo {
  id: number
  workOrderId: number
  expensePropId: number
  expenseName: string
  amount: number
}

// 维保单
export interface BaseMaintainceTicket {
  workOrderType: MaintainceType
  vehicleInfoId: number // 车辆ID
  startTime: number // 开始时间
  endTime: number | null // 结束时间
  handlerUserId: number // 处理人ID
}

export interface MaintainceTicket extends BaseMaintainceTicket {
  id: number
  workOrderNo: string // 维保单编号
  licenseNo: string // 车牌号
  vehicleModelId: number
  vehicleModelName: string
  storeId: number
  storeNameUnion: string
  handlerUserName: string // 处理人名称
  status: MaintainceStatus // 单据状态
}

export interface MaintainceDetail extends MaintainceTicket {
  depotId: number // 维保厂
  depotName: string
  beforeMileage: number | null // 进厂公里数
  afterMileage: number | null // 出厂公里数
  relationOrderId: number | null // 关联订单ID
  expenseList: ExpenseInfo[] // 费用项
  proofUrlList: string[] // 凭证图片
  remark: string // 备注
  cancelReason: string // 取消原因
}

// 创建维保单
export async function createMaintaince(data: unknown) {
  return API('/vehicle/repair_maintenance/save/v1', { data })
}

// 处理维保单
export async function handleMaintaince(data: unknown) {
  return API('/vehicle/repair_maintenance/handle/v1', { data })
}

// 取消维保单
export async function cancelMaintaince(id: number, reason: string) {
  return API(
    `/vehicle/repair_maintenance/cancel/v1?id=${id}&cancelReason=${encodeURIComponent(reason)}`
  )
}

// 查询维保单
export async function queryMaintaince(query: unknown) {
  return API<{ list: MaintainceTicket[]; count: number }>('/vehicle/repair_maintenance/list/v1', {
    data: query,
  })
}

// 维保单详情
export async function getMaintainceDetail(id: number) {
  return API<MaintainceDetail>(`/vehicle/repair_maintenance/detail/v1?id=${id}`)
}

export async function exportMaintaince() {
  return API<Blob>('/vehicle/repair_maintenance/v1/downExcel')
}

/**
 * ===========================
 * 年检单
 * ===========================
 */

export enum YearlyStatus {
  待年检 = 0,
  年检中 = 1,
  已完成 = 2,
  已作废 = 3,
}

export interface BaseYearlyTicket {
  vehicleInfoId: number // 车辆ID
  inspectionTime: number // 年检开始时间
  inspectionEndTime: number | null // 年检结束时间（历史遗留数据为 null）
  nextInspectionTime: number | null // 下次年检时间
  handlerUserId: number // 处理人ID
  completedImmediately: 0 | 1 // 是否即时完成
}

export interface YearlyTicket extends BaseYearlyTicket {
  id: number
  workOrderNo: string // 单据编号
  licenseNo: string // 车牌号
  vehicleModelId: number
  vehicleModelName: string
  storeId: number
  storeNameUnion: string
  handlerUserName: string // 处理人名称
  status: YearlyStatus // 单据状态
}

export interface YearlyDetail extends YearlyTicket {
  depotId: number // 维保厂
  depotName: string
  relationOrderId: number | null // 关联订单ID
  expenseItemList: ExpenseInfo[] // 费用项
  remark: string // 备注
  cancelReason: string // 取消原因
}
export interface ThirdVehicleBatchAdd {
  channelId: string
  list: Array<any>
}

// 创建年检单
export async function createYearly(data: unknown) {
  return API('/vehicle/yearly_inspection/save/v1', { data })
}

// 处理年检单
export async function handleYearly(id: number) {
  return API('/vehicle/yearly_inspection/handle/v1?id=' + id.toString())
}

// 取消年检单
export async function cancelYearly(id: number, reason: string) {
  return API(
    `/vehicle/yearly_inspection/cancel/v1?id=${id}&cancelReason=${encodeURIComponent(reason)}`
  )
}

// 查询年检单
export async function queryYearly(query: unknown) {
  return API<{ list: YearlyTicket[]; count: number }>('/vehicle/yearly_inspection/list/v1', {
    data: query,
  })
}

// 年检单详情
export async function getYearlyDetail(id: number) {
  return API<YearlyDetail>(`/vehicle/yearly_inspection/detail/v1?id=${id}`)
}

export async function exportYearly() {
  return API<Blob>('/vehicle/yearly_inspection/v1/downExcel')
}

// =====================================

// 获取车型
export async function getThirdModel(channelId: number, subSeryId: number) {
  return API<unknown>('/vehicle/model/third_model/v1', {
    data: {
      channelId,
      subSeryId,
    },
    json: true,
  })
}

export async function getSeryList(vehicleSubSeryId: number) {
  return API<unknown>(`/vehicle/sub_sery/bind/list/v1?vehicleSubSeryId=${vehicleSubSeryId}`, {
    json: true,
  })
}
export const getVehicleThirdList = (channelId: string) => {
  return API<any>('/vehicle/model/v1/third/list/get', {
    data: { channelId },
    method: 'GET',
  })
}
export const getVehicleList = (queryData: any) => {
  return API<any>('/vehicle/model/v1/list', {
    data: queryData,
    method: 'POST',
  })
}
export const addMatchVehicleList = (data: ThirdVehicleBatchAdd) => {
  return API<any>('/vehicle/model/v1/third/match/add', {
    data: data,
    method: 'POST',
  })
}
export const useGetMatchVehicleList = (channelId: string, open: boolean) => {
  const [list, setList] = useState<Array<any>>([])
  useEffect(() => {
    if (channelId && open) {
      API<any>('/vehicle/model/v1/third/match/list/get?channelId=' + channelId, {
        data: { channelId },
        method: 'GET',
      }).then(res => {
        if (res.success) {
          console.log(res.data, 'datdataatat')
          setList(res.data)
        } else {
          console.log('数据不存在')
          setList([])
        }
      })
    }
  }, [channelId, open])
  return list
}
export const deleteMatchVehicleItem = (data: any) => {
  return API<any>('/vehicle/model/v1/third/match/delete?id=' + data.id, {
    data: data,
    method: 'POST',
  })
}

// 查询渠道车辆详情
export async function getChannelVehicleDetail(vehicleId: string) {
  return API<any>('/vehicle/v1/upd_tip?', {
    query: { vehicleId },
  })
}

