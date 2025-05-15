import { API } from '@/lib/API'
import type { VehicleStatus, ShuntingStatus } from './vehicle'
import { VehicleSource } from './vehicle'

export enum OrderStatus {
  未提交 = 0,
  已提交 = 1,
  确认中 = 2,
  已确认 = 3,
  已排车 = 4,
  已取车 = 5,
  已还车 = 6,
  取消中 = 7,
  已取消 = 8,
}

export interface StockQuery {
  storeId: number
  vehicleModelId?: number // 0 代表“全部车型”
  vehicleModelIds?: number[] | null | number
  startTime: number // 应为选定日期的第一秒
  endTime: number // 应为选定日期的最后一秒
}

/**
 * ============================
 * 占用情况
 * ============================
 */

export interface StockOccupy {
  storeId:number,
  storeName:string
  overList: OccupyVehicle[] // 冲突车辆
  occupyList: OccupyVehicle[] // 占用车辆
}

export interface OccupyVehicle {
  vehicleId: number // 车辆 ID
  license: string // 车牌号
  status: VehicleStatus // 车辆状态
  detailList: OccupyRecord[] // 占用记录
  vehicleModelId: number // 车型ID
  vehicleModelName: string // 车型名称
  vehicleSource: VehicleSource // 车辆来源
  vehicleInfoTags: string[] // 车辆前台标签
  saleStatus: number // 销售状态
}

export interface OccupyRecord {
  id: number // 占用记录 ID
  autoSchedule: 0 | 1 // 是否可以自动调度
  startTime: number // 占用开始时间
  endTime: number // 占用结束时间
  endIntervalTime: number // 真实库存占用结束时间
  sourceType: OccupySource // 锁定来源类型
  sourceId: number // 锁定来源的单据 ID（如订单ID、调度单ID）
  parentSourceId: number // 若为子订单，此为父订单的 ID
  thirdSourceId: number // 订单来自爬虫时，来源单据ID（不是订单ID）
  thirdParentSourceId: number // 订单来自爬虫时，若为子订单，此为父订单的单据 ID（不是订单ID）
  orderDetail: OccupyOrder //  若来源是订单，此为其详情（非订单的时候里面所有字段都是 null）
  busyDesc: string // 若是临时停手记录，此为备注
  canRelease: boolean // 对于订单，是否允许执行“释放间隔”
  pickUpTime: number
  authFlg: boolean
}

export enum OccupySource {
  非订单占用 = 0, // 爬虫同步过来的没有关联订单的单据
  订单 = 1,
  车辆调度 = 2,
  子订单 = 3,
  维修单 = 4,
  保养单 = 5,
  年检单 = 6,
  临时停售 = 7,
  全局停售 = 999,
}

export interface OccupyOrder {
  status: number // 订单状态 TODO: 待生成 enum
  channelId: number // 渠道ID
  channelName: string // 渠道名称
  userName: string // 订单下单人名称
  userMobile: string // 订单下单人电话
  createTime: number // 下单时间
  thirdOutOrderNo: string // 对于同步订单，这个是在对方平台里的订单号
  orderId: number // 对于同步订单，这个是在我们平台的订单号
  parentOrderId: number // 对于同步的续租订单，这个是在我们平台的订单号（此字段尚未上线 23.07.27）
  canUpdatePlan: boolean
}

export interface OccupyShunting {
  status: ShuntingStatus // 调拨状态
  inStoreName: string // 调入门店
  outStoreName: string // 调出门店
  remark: string // 备注
}

export async function queryOccupy(query: StockQuery) {
  const data = {
    ...query,
    vehicleModelId: query.vehicleModelId === 0 ? null : query.vehicleModelId,
  }
  return API<StockOccupy>('/stock/v1/stockOccupy', { data })
}

/**
 * ============================
 * 库存汇总
 * ============================
 */

// 指定日期范围内，库存汇总查询结果
export interface StockSummary {
  overCount: number // 冲突区间数量
  usableList: StockDaySummary[] // 选定范围内每一天的汇总
}

// 单日库存汇总信息
export interface StockDaySummary {
  rowDate: number // 日期时间戳
  rowWeek: string // 星期几
  dateList: StockHourSummary[] // 24小时数据
}

// 某个小时的库存情况
export interface StockHourSummary {
  usableCount: number // 车辆可用数量
  usableAllCount: number // 车辆总数量
  overFlg: 0 | 1 // 冲突标志 1:有冲突 0:无冲突
}

export async function querySummary(query: StockQuery) {
  return API<StockSummary>('/stock/v1/stockSummary', { data: query })
}

/**
 * 释放库存
 */
export async function releaseStock(id: number) {
  return API('/stock/v1/release?id=' + id)
}
