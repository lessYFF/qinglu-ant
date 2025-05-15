/**
 * 门店相关数据
 */
import { useState, useCallback, useEffect } from 'react'
import { API } from '@/lib/API'
import { zfill } from '@/lib/lang'

/**
 * ==============================
 * 通用枚举值定义
 * ==============================
 */
export enum StoreType {
  实体门店 = 0,
  服务网点 = 1,
}

export enum StorePositionType {
  市区门店 = 1,
  机场店 = 2,
  火车站店 = 3,
}

export enum StoreStatus {
  已关闭 = 0,
  营业中 = 1,
}

export enum StoreDecorate {
  精装修 = 1,
  标准装修 = 2,
  普通装修 = 3,
  低档装修 = 4,
  无门面无装修 = 5,
}

/**
 * ==============================
 * 取送车指引
 * ==============================
 */
export enum GuideType {
  取车 = 1,
  还车 = 2,
}

export interface Guide {
  id: number
  storeId: number
  guideType: 0 | 1 | 4 | 5
  guideDesc: string // 指引描述
  picVoList: GuidePicture[]
}

export interface GuidePicture {
  id: number
  guidePic: string
}

export interface PickupGuide extends Omit<Guide, 'guideType'> {
  guideType: GuideType.取车
}

export interface ReturnGuide extends Omit<Guide, 'guideType'> {
  guideType: GuideType.还车
}

/**
 * ==============================
 * 营业时间
 * ==============================
 */
export interface BusinessTime {
  businessPeriod: string // 营业周期。7 位 0/1 字符串，按顺序代表星期一～日
  businessFrom: number // 开始营业时间 830 => 08:30
  businessTo: number // 停止营业时间（开始到结束为 0 ~ 2359 代表24小时营业）
  nightService: 0 | 1 // 是否开启"夜间收费营业时间"
  nightList: NightTimeItem[]
  periodTimeVoList: PeriodTimeItem[]
}

export interface NightTimeItem {
  // storeId: number,
  // businessPeriod: string,  // 营业周期
  businessFrom: number // 开始时间 830 => 08:30
  businessTo: number // 停止时间
  fee: number // 收费金额（分）
  feeType: NightFeeType // 收费类型
}

export interface PeriodTimeItem {
  fromTime: number // 开始时间 830 => 08:30
  toTime: number // 停止时间
  fee: number // 收费金额（分）
  feeType: NightFeeType // 收费类型
}

export enum NightFeeType {
  每次 = 1,
}

/**
 * ==============================
 * 门店联系人
 * ==============================
 */
export interface StoreContact {
  id: number
  storeId: number
  contactType: StoreContactType // 联系人类型
  linkName: string // 联系人姓名
  countryCode: string // 手机国家区号（如 +86）
  mobile: string // 手机号
  telArea: string // 电话区号（如 0573）
  tel: string // 电话号码
  telExt: string // 分机号
  email: string // 邮件
  mobileTypeList: any
  ortherDisabled: boolean
  currencyDisabled: boolean
}

export enum StoreContactType {
  常用联系人 = 0,
  备用联系人 = 1,
}

/**
 * ==============================
 * 门店简单信息
 * ==============================
 */
export interface SimpleStore {
  cityCode: number // 城市编码
  cityName: string // 城市名称
  deleted: 1 | 0 // 1 代表门店已删除
  storeId: number // 门店ID
  storeName: string // 门店名称
  storeNameUnion: string // 门店集合名称（id-name）
}

/**
 * 返回当前用户有权限查看的门店列表
 */
export function useSimpleStores(byMerchant = false) {
  const [data, setData] = useState<SimpleStore[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(() => {
    setLoading(true)
    const request = byMerchant
      ? API<SimpleStore[]>('/store/v1/storeListByMerchant')
      : API<SimpleStore[]>('/store/v1/storeListByAuth')
    void request.then(res => {
      setLoading(false)
      if (res.success) {
        localStorage.setItem('firstStore', JSON.stringify(res.data[0]))
        setData(res.data)
      }
    })
  }, [byMerchant])

  useEffect(() => search(), [search])

  return { stores: data, loading, refresh: search }
}

export function useSimpleStoresByAuth() {
  return useSimpleStores()
}

/**
 * 查询门店列表
 */
export interface StoresQuery {
  storeIdList?: number[]
}
export async function getStores(query: StoresQuery) {
  const res = await API<{ count: number; list: RawStoreDetail[] }>('/store/v1/list', {
    data: query,
  })
  return res.success
    ? {
        ...res,
        data: {
          ...res.data,
          list: res.data.list.map(formatRawStoreDetail),
        },
      }
    : res
}

/**
 * ==============================
 * 门店详情
 * ==============================
 */
export interface StoreEntityMeta {
  sortNo: null | number // 排序
  deleted: 0 | 1 // 是否已删除
  lastVer: number // 版本号
  createTime: number // 创建时间
  createUserId: number | null // 创建人
  opTime: number // 修改时间
  opUserId: number // 修改人
}

export interface StoreLngLat {
  longitude: number
  latitude: number
}

// 基于燃油类型对车型进行归类
export interface ModelsByFuel {
  fuelForm: string
  modelList: ModelByFuel[]
}
export interface ModelByFuel {
  id: number
  vehicleUnionName: string
  vehicleBrandName: string
  vehicleSerId: number | null
  vehicleSeryName: string
  vehicleSubSeryId: number
  vehicleSubSeryName: string
  licenseType: string
  vehicleModelGroup: string
  vehicleModelGroupId: number
  modelSimpleName: string
  fuelForm: string
}

// 某些车型特定的订单间隔时间记录
export interface ModelsOrderInterval {
  id: number
  storeId: number
  channelId: number
  orderInterval: number
  orderIntervalList: ModelOrderInterval[]
}
export interface ModelOrderInterval {
  id: number
  storeId: number
  channelId: number
  orderIntervalId: number
  fuelForm: string
  brandName: string
  vehicleModelId: number
}

// 休息时间
export interface RestTime {
  id: number
  startDate: number // 开始日期（时间戳，毫秒）
  endDate: number // 结束日期（时间戳，毫秒）
  startTime: number // 开始时间（例如 11:00 => 1100, 03:10 => 310）
  endTime: number // 结束时间
}

// 零散小时
export interface HourlyChargeRule {
  id: number
  chargeItem: HourlyChargeItem
  scene: HourlyChargeScene
  chargeValue: string
}
export enum HourlyChargeItem {
  零散小时 = 1, // 零散小时的 chargeValue 为 7 个百分比合并成的字符串；其他的 chargeValue 是 '0' 不收费和 '1' 收费
  优享 = 2,
  尊享 = 3,
  儿童座椅 = 4,
}
export enum HourlyChargeScene {
  超过一天 = 1,
  不满一天 = 2,
}
export interface GuidePickup {
  index: number
  text: string
  imgs: string[]
}
export interface businessTimeV2List {
  businessFrom: string
  businessPeriod: string
  businessTo: string
  nightList: nightList[]
}
export interface nightList {
  businessFrom: string
  businessTo: string
  feeType: number
  fee: string
}
export interface ContactItem {
  id?: number
  contactType: StoreContactType
  linkName?: string
  countryCode?: string
  mobile?: string
  telArea?: string
  tel?: string
  telExt?: string
  email?: string
  ortherDisabled: boolean
  currencyDisabled: boolean
}
export interface CtripRuleItem {
  id?: number
  scene: HourlyChargeScene
  startHour?: number
  endHour?: number
  chargeValue: number
}
export interface InitStoreData {
  ctripStandardFee: boolean
  hourlyList?: any[]
  hourlyChargeList?: any[]
}
export interface HourlyListItem {
  scene: number
  startHour: number
  endHour: number
  chargeValue: number
}
export interface StoreDetail {
  id: number // 分渠道店铺实例 ID
  storeId: number // 店铺总体 ID
  storeName: string // 名称
  storeSize: number // 门店大小（平米）
  storeDecorate: StoreDecorate // 门店装修（）
  address: string // 门店地址
  storePosType: StorePositionType // 位置类型
  storeType: StoreType // 门店类型
  storeStatus: StoreStatus // 门店状态
  longLat: StoreLngLat // 坐标
  orderIntervalUnit: number
  countryCode: number // 国家代码
  provinceCode: number // 省份代码
  provinceName: string | null // 省份名称
  cityCode: number // 城市代码
  cityName: string | null // 城市名称
  areaCode: number | null // 最小一级区划的代码

  isTest: 0 | 1 // 是否测试门店
  merchantId: number // 商家ID
  minAdvanceBookingUnit: number
  maxAdvanceBookingUnit: number
  minAdvanceBookingTime: number // 最小提前预定时间（小时）
  maxAdvanceBookingTime: number // 最大提前预定时间（月）
  minRentTerm: number // 最短租期，整数代表"天"，小数代表"小时，例如：1.23 是 1天23小时
  maxRentTerm: number // 最长租期
  orderInterval: number // 订单间隔时间（小时）（全部车型）
  orderIntervalList: ModelsOrderInterval[]
  freeShuttleEnabled: 0 | 1 // 是否支持免费接送
  freeShuttle: number // 免费接送范围（公里）
  pickupEnabled: 0 | 1 // 是否支持上门送取车服务
  guidePickupList: PickupGuide[]
  guideReturnList: ReturnGuide[]
  businessTimeV2List: BusinessTime[]
  restTimeList: RestTime[]
  contactList: StoreContact[]
  hourlyChargeList: HourlyChargeRule[] | null
  hourlyList: CtripRuleItem[] | null
  productList: number[]
  productList1: number[]
  channelName: string // 此店铺的生效渠道名
  channelId: number // 此店铺生效的渠道 ID

  fuelFormList: ModelsByFuel[]
  selfGuidePickupList: any[]
  selfGuideReturnList: any[]
  selfServiceReturn: boolean
  ctripStandardFee: boolean // 携程标准收费 false 未开启，true 已开启
  dealership?: string // 门店手续费
  storeAttList?: object[] // 门店资质证明
}

interface RawStoreDetail extends Omit<StoreDetail, 'orderIntervalList'> {
  orderIntervalList: (Omit<ModelsOrderInterval, 'orderIntervalList'> & {
    orderIntervalList: Omit<ModelOrderInterval, 'brandName'>[]
  })[]
}
export function formatRawStoreDetail(rawDetail: RawStoreDetail): StoreDetail {
  return {
    ...rawDetail,
    orderIntervalList: rawDetail.orderIntervalList.map(rawParent => {
      return {
        ...rawParent,
        orderIntervalList: rawParent.orderIntervalList.map(item => {
          return {
            ...item,
            brandName:
              rawDetail.fuelFormList
                .find(v => v.fuelForm === item.fuelForm)
                ?.modelList.find(v => v.id === item.vehicleModelId)?.vehicleBrandName ?? '',
          }
        }),
      }
    }),
  }
}

export async function getStoreDetail(id: number) {
  const res = await API<RawStoreDetail>('/store/v1/find', {
    data: { id },
    json: false,
  })
  return res.success ? { ...res, data: formatRawStoreDetail(res.data) } : res
}
export async function initStore() {
  const res = await API<InitStoreData>('/store/v1/init', {
    data: {},
  })

  if (res.success) {
    return {
      success: true,
      data: res.data as InitStoreData,
    }
  } else {
    return {
      success: false,
      error: res.error,
    }
  }
}

/**
 * ==============================
 * 上门取送车服务（电子围栏）
 * ==============================
 */
export interface PickupPoint {
  latitude: number
  longitude: number
}
export interface ServiceRestTime {
  startDate: number // 休息开始日期
  endDate: number // 休息结束日期
  startTime: number // 休息开始时间
  endTime: number // 休息结束时间
}

export interface PickupConfig {
  id: number
  storeId: number // 所属店铺
  name: string // 服务圈名称
  color: string // 显示颜色
  feeType: 0 | 1 // 收费类型（0 免费，1 收费）
  fee: number // 送车上门费
  longLatList: PickupPoint[] // 路径点
  enabled: 0 | 1
  businessFrom: number | null // 开始营业时间，为 null 或 0 代表未设置
  businessTo: number | null // 结束营业时间，为 null 或 0 代表未设置
  serviceRestTimeVo: ServiceRestTime | Record<string, never> // 服务休息周期和时间，可以是空对象
}

export function usePickupConfigs(storeId: number) {
  const [configs, setConfigs] = useState<PickupConfig[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<PickupConfig[]>('/store/pickup/v1/list', { data: { storeId }, json: false }).then(
      res => {
        setLoading(false)
        if (res.success) {
          setConfigs(res.data)
        }
      }
    )
  }, [storeId])

  useEffect(() => load(), [load])

  return { configs, loading, refresh: load }
}

export async function getPickupConfigs(storeId: number) {
  return API<PickupConfig[]>('/store/pickup/v1/list', { data: { storeId }, json: false })
}

export async function getPickupConfig(id: number) {
  return API<PickupConfig>('/store/pickup/v1/find', { data: { id }, json: false })
}

export async function enablePickupConfig(id: number, enable: boolean) {
  return API<PickupConfig>('/store/pickup/v1/enable', {
    data: { id, enableFlg: enable ? 1 : 0 },
    json: false,
  })
}

export async function removePickupConfig(id: number) {
  return API<PickupConfig>('/store/pickup/v1/delete', { data: { id }, json: false })
}

/**
 * ==============================
 * 取消规则
 * ==============================
 */

export enum CancelRuleType {
  平日 = 1,
  自定义 = 2,
}

export interface CancelRule {
  id: number
  ruleType: CancelRuleType
  costRule: 1
  costRulePer: number
  endDate: number
  startDate: number
  freeCancel: 0 | 1
  ruleName: string
  ruleTimeList: CancelRuleTime[]
  status: 0 | 1
  timeoutPer: number
}

export interface CancelRuleTime {
  id: number
  cancelRuleId: number
  timeType: CancelRuleTimeType
  beforeHour: number
  beforeHourPer: number
}

export enum CancelRuleTimeType {
  Free = 1,
  Percent = 2,
  Custom = 3,
}

export function useCancelRules() {
  const [rules, setRules] = useState<CancelRule[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<CancelRule[]>('/cancelRule/v1/list').then(res => {
      setLoading(false)
      if (res.success) {
        setRules(res.data)
      }
    })
  }, [])

  useEffect(() => load(), [load])

  return { rules, loading, refresh: load }
}

export function formatBusinessPeriodStr(businessPeriod: string) {
  if (businessPeriod === '1111111') {
    return '周一-周日'
  } else {
    return businessPeriod
      .split('')
      .map((v, index) => {
        if (v === '1') return '周' + (index + 1).toString()
        return ''
      })
      .filter(v => v)
      .join('、')
  }
}

export function formatBusinessDurationStr(businessFrom: number, businessTo: number) {
  return [businessFrom, businessTo]
    .map(item => {
      const str = zfill(item, 4)
      return `${str.toString().slice(0, -2)}:${str.toString().slice(-2)}`
    })
    .join('至')
}

export interface StoreQuery {}

export function useStoreList(searchForm: unknown) {
  const [store, setStore] = useState<StoreDetail[]>([])
  useEffect(() => {
    void API<{ list: RawStoreDetail[] }>('/store/v1/list', {
      data: searchForm,
    }).then(res => {
      if (res.success) {
        setStore(res.data.list.map(formatRawStoreDetail))
      }
    })
  }, [searchForm])
  return store
}

export const getThirdList = (channelId: string) => {
  return API<any>('/store/v1/third/list/get', {
    data: { channelId },
    method: 'GET',
  })
}

export const addMatchStoreItem = (data: any) => {
  return API<any>('/store/v1/third/match/add', {
    data,
    method: 'POST',
  })
}
export const updateMatchStoreItem = (data: any) => {
  return API<any>('/store/v1/third/match/update', {
    data,
    method: 'POST',
  })
}
export const deleteMatchStoreItem = (data: any) => {
  return API<any>('/store/v1/third/match/delete?id=' + data.id, {
    data,
    method: 'POST',
  })
}

export const getMatchStoreList = (channelId: string) => {
  return API<any>('/store/v1/third/match/list/get', {
    data: { channelId },
    method: 'GET',
  })
}
/////api/
