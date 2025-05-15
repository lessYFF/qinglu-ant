/**
 * 车型
 */
import { useMemo, useState, useEffect, useCallback } from 'react'
import throttle from 'lodash/throttle'
import { API } from '@/lib/API'
import { useResource, useRefValue } from '@/lib/lang'
import { getChannelList as rawGetChannelsWithStatus, type ChannelWithStatus } from './channel'

// 能源类型
export const fuelForms = [
  '增程式',
  '油电混合',
  '氢燃料',
  '汽油电驱',
  '汽油+天然气',
  '汽油+CNG',
  '汽油+90V轻混系统',
  '汽油+48V轻混系统',
  '汽油+24V轻混系统',
  '汽油',
  '纯电动',
  '柴油+48V轻混系统',
  '柴油',
  '插电式混合动力',
  '其他',
]

// 厢式
export const carriages = [
  '掀背式',
  '软顶敞篷车',
  'MPV',
  '两厢跨界车',
  '货车',
  '旅行车',
  '硬顶跑车',
  '客车',
  '硬顶敞篷车',
  '两厢车',
  'SUV跨界车',
  '三厢车',
  '旅行跨界车',
  'SUV',
  '皮卡',
  '三厢跨界车',
  '其他',
]

// 变速箱
export const gearboxs = ['自动', '手动']

/**
 * ===========================
 * 网络平台数据
 * ===========================
 */
export interface Channel {
  id: number
  channelName: string
}

export async function getChannels() {
  const res = await API<Channel[]>('/channel/v1/list')
  return res.success
    ? res.data.filter(v => v.id !== 0) // 0 是线下渠道，目前不将其应用到展示和编辑里
    : []
}

export function useChannels() {
  return useResource(getChannels, [])
}

/**
 * 获取渠道列表
 * @param includeOffLine 线下
 * @param includeSub 子渠道
 * @param includeSync 爬虫同步
 */
export const getChannelsBusi = (data: {
  includeOffLine: 1 | 0
  includeSub: 1 | 0
  includeSync: 1 | 0
}) => {
  return API<ChannelBusi[]>('/apiConn/v1/listChannelBusi', {
    data,
  })
}

export interface ChannelBusi {
  channelId: number
  channelName: string
}

export function useChannelsBusi(
  rawOptions?: Partial<{
    includeOffLine: 0 | 1
    includeSub: 0 | 1
    includeSync: 0 | 1
  }>
) {
  const options = {
    includeOffLine: 0 as 0,
    includeSub: 0 as 0,
    includeSync: 0 as 0,
    ...(rawOptions ?? {}),
  }
  const getter = () => getChannelsBusi(options).then(res => (res.success ? res.data : []))
  return useResource(getter, [])
}

async function getChannelsWithStatus() {
  const res = await rawGetChannelsWithStatus()
  return res.success
    ? res.data.reduce(
        (obj, c) => ({ ...obj, [c.channelId]: c }),
        {} as Record<string, ChannelWithStatus>
      )
    : {}
}
export function useChannelsStatus() {
  return useResource(getChannelsWithStatus, {})
}

/**
 * ===========================
 * 牌照类型
 * ===========================
 */

export interface LicenseType {
  id: number // 牌照类型ID
  licenseTypeName: string // 牌照类型名称
  merchantId: number // 商家ID
  storeId: number // 创建时的门店ID（目前没用上）
  preset: 0 | 1 // 是否是预设的
}

export function useLicenseTypes() {
  const [types, setTypes] = useState<LicenseType[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<{ count: number; list: LicenseType[] }>('/license_type/v1/list_all').then(res => {
      setLoading(false)
      if (res.success) {
        setTypes(res.data.list)
      }
    })
  }, [])

  useEffect(() => load(), [load])

  return { licenseTypes: types, loading, refresh: load }
}

function sortLicenseType(typeA: LicenseType, typeB: LicenseType) {
  const name2code = (name: string) =>
    (name.length < 2 ? name + ' ' : name.slice(0, 2))
      .toUpperCase()
      .split('')
      .map(v => (v === '牌' ? -1 : v.charCodeAt(0))) as [number, number]
  const [a, b] = [name2code(typeA.licenseTypeName), name2code(typeB.licenseTypeName)]
  return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]
}

export async function addLicenseType(areaId: number, initialId: number) {
  return API('/license_type/v1/save', {
    data: {
      licensePlateAreaId: areaId,
      licensePlateInitialsId: initialId,
    },
  })
}

export async function removeLicenseType(id: number) {
  return API('/license_type/v1/delete', {
    data: { id },
    json: false,
  })
}

/**
 * 返回所有牌照区域
 */
export interface LicensePlatArea {
  id: number
  areaName: string
}
export function useLicensePlatAreas() {
  const [areas, setAreas] = useState<LicensePlatArea[]>([])
  useEffect(() => {
    void API<LicensePlatArea[]>('/license_plate_area/v1/list_all').then(res => {
      if (res.success) setAreas(res.data)
    })
  }, [])
  return areas
}

/**
 * 返回指定牌照区域下可用的首字母
 */
export interface LicensePlateInitial {
  id: number
  initials: string
}
export function useLicensePlateInitial(areaId: number | null) {
  const [initials, setInitials] = useState<LicensePlateInitial[]>([])
  useEffect(() => {
    setInitials([])
    if (areaId !== null) {
      void API<LicensePlateInitial[]>('/license_plate_initials/v1/list_all', {
        data: { areaId },
      }).then(res => {
        if (res.success) setInitials(res.data)
      })
    }
  }, [areaId])
  return initials
}

/**
 * ===========================
 * 品牌
 * ===========================
 */
export interface Brand {
  id: number // 品牌ID
  brandName: string // 品牌名称
  englishName: string // 英文名
  initials: string // 名称首字母缩写
  merchantId: number // 商家ID
  storeId: number // 创建时的门店ID（目前没用上）
  preset: 0 | 1 // 是否是预设的
}

/**
 * 返回品牌列表
 * 调用 refresh 可手动重新搜索
 */
export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(() => {
    setLoading(true)
    void API<Brand[]>('/vehicle/brand/v1/list_brand/select').then(res => {
      setLoading(false)
      if (res.success) {
        setBrands(res.data)
      }
    })
  }, [])
  useEffect(() => void search(), [])

  const refresh = useCallback(() => search(), [])

  return { brands, loading, refresh }
}

/**
 * 新增品牌
 */
export async function addBrand(name: string) {
  return API('/vehicle/brand/v1/save', {
    data: {
      brandName: name,
    },
  })
}

/**
 * 删除品牌
 */
export async function removeBrand(id: number) {
  return API('/vehicle/brand/v1/delete', {
    data: { id },
    json: false,
  })
}

/**
 * ===========================
 * 车系
 * ===========================
 */
export interface Sery {
  id: number
  seryName: string
  brandId: number
  brandName: string
  vehicleClassId: number | null
  vehicleClassName: number | null
  storeId: number
  merchantId: number
}

/**
 * 取得指定品牌的车系列表
 */
export function useSerys(conditions?: { brandIds?: number[]; keyword?: string }) {
  const [serys, setSerys] = useState<Sery[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<Sery[]>('/vehicle/sery/v1/search_all', {
      data: {
        vehicleBrandIdIdList: conditions?.brandIds,
        seryName: conditions?.keyword,
      },
    }).then(res => {
      setLoading(false)
      if (res.success) {
        setSerys(res.data)
      }
    })
  }, [conditions?.brandIds, conditions?.keyword])

  useEffect(() => load(), [load])

  return { serys, loading, refresh: load }
}

/**
 * 新增车系
 */
export async function addSery(brandId: number, name: string) {
  return API('/vehicle/sery/v1/save', {
    data: {
      brandId,
      seryName: name,
    },
  })
}

/**
 * 删除车系
 */
export async function removeSery(id: number) {
  return API('/vehicle/sery/v1/delete', {
    data: { id },
    json: false,
  })
}

/**
 * ===========================
 * 子车系（界面上也叫“车型”，不要和统称的“车型”搞混）
 * ===========================
 */
export interface SubSery {
  id: number
  name: string
}

/**
 * 取得指定车系的子车系列表
 */
export function useSubSerys(seryId: number) {
  const [subSerys, setSubSerys] = useState<SubSery[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<SubSery[]>('/vehicle/sub_sery/v1/list_all', { data: { seryId }, json: false }).then(
      res => {
        setLoading(false)
        if (res.success) {
          setSubSerys(res.data)
        }
      }
    )
  }, [seryId])

  useEffect(() => load(), [load])

  return { subSerys, loading, refresh: load }
}

/**
 * 新增子车系
 */
export async function addSubSery(seryId: number, name: string) {
  return API('/vehicle/sub_sery/v1/save', {
    data: {
      vehicleSeryId: seryId,
      name,
    },
  })
}

/**
 * 删除子车系
 */
export async function removeSubSery(id: number) {
  return API('/vehicle/sub_sery/v1/delete', {
    data: { id },
    json: false,
  })
}

/**
 * ===========================
 * 车型预置数据（基于子车系ID获取）
 * ===========================
 */
export interface ModelPredefinedWithMedias extends ModelPredefined {
  medias: PredefinedMedias | null
}

export interface ModelPredefined {
  preset: 0 | 1 // 是否有预置数据。为 0 时所有字段允许编辑
  id: number // 子车系ID
  name: string // 子车系名称
  seryId: number // 车系ID
  brandId: number // 品牌ID
  doors: string // 门数（5门）
  passengers: string // 座位数（7座）
  displacement: string // 排量（'2.0T'、'纯电动'）
  transmission: string // 变速箱（实际对应车型数据里的 gearbox）(自动)
  years: string // 年款（2017款）
  carriage: string // 厢式（SUV）
  fuelFormDetail: string // 具体能源类型（'汽油'、'纯电动'）
  driveTypeNum: 0 | 2 | 3 // 驱动类型（2 四驱, 3 两驱, 0 空）
  hasSunroof: 0 | 1 // 是否有天窗
  fastChargeTime: 1 | 0 // 是否支持快充
  gearbox: string // 变速箱具体形式手自一体变速箱(AT)）
  fuelForm: string // 能源类型（'汽油'、'其他'）
  vehicleModelGroupName: string // 车型分组（'经济型'）

  // 以下字段在车型数据中没有对应字段
  vehicleLevel: string // 级别？（中型SUV）
  fuelNum: string // 燃油类型（'92号'、'其他'）
  price: number // 价格（22.48）
  length: number // 长度（4730）
  width: number // 宽度（1890）
  height: number // 高度（1730）
  wheelbase: number // 轴距（2700）
  luggage: number // 后备箱（1）
  aircontition: string // 空调（手动空调）
  screen: string // 屏幕（'中控彩色屏幕,行车电脑显示屏幕'）
}

export function useModelPredefined(
  subSeryId: number | null,
  onLoad?: (data: ModelPredefinedWithMedias) => void
) {
  const [predefined, setPredefined] = useState<ModelPredefinedWithMedias | null>(null)

  useEffect(() => {
    if (subSeryId === null) return void setPredefined(null)

    let cancelled = false
    void API<ModelPredefined>('/vehicle/model/v1/get_sub_sery', {
      data: { id: subSeryId },
      json: false,
    }).then(res => {
      if (cancelled || !res.success) return
      void getPredefinedMediasBySubSery(subSeryId).then(medias => {
        if (cancelled || !res.success) return
        setPredefined({
          ...res.data,
          medias,
        })
      })
    })
    return () => {
      cancelled = true
    }
  }, [subSeryId])

  const onLoadRef = useRefValue(onLoad)
  useEffect(() => {
    if (predefined) onLoadRef.current?.(predefined)
  }, [predefined, onLoadRef])

  return predefined
}

interface PredefinedMedias {
  // 整理后的预定义车型图片
  1?: [{ mediaPath: string }] // 缩略图
  2?: [{ mediaPath: string }] // 整车图
  3?: { mediaPath: string }[] // 细节图
}
interface PredefinedMedia {
  id: number // 记录ID
  subSeryId: number // 子车系ID
  url: string // 图片网址
  ctripUrl: string // 携程下的图片网址
  fileType: 0 | 1 | 2 // 图片类型，0 => 缩略图，1 => 整车图，2 => 细节图（注意：和前端的 type 不一样）
}
async function getPredefinedMediasBySubSery(id: number): Promise<PredefinedMedias | null> {
  const res = await API<PredefinedMedia[]>('/vehicle/model/list_by_subsery/v1', {
    data: { subSeryId: id },
    json: false,
  })
  if (res.success) {
    if (res.data.length === 0) return null

    // 此接口返回的数据是重复的，需要去重
    const type1 = [...new Set(res.data.filter(v => v.fileType === 0).map(v => v.url))]
    const type2 = [...new Set(res.data.filter(v => v.fileType === 1).map(v => v.url))]
    const type3 = [...new Set(res.data.filter(v => v.fileType === 2).map(v => v.url))]
    return {
      1: type1[0] ? [{ mediaPath: type1[0] }] : undefined,
      2: type2[0] ? [{ mediaPath: type2[0] }] : undefined,
      3: type3.length ? type3.slice(0, 20).map(path => ({ mediaPath: path })) : undefined,
    }
  } else {
    return null
  }
}

/**
 * ===========================
 * 车型组
 * ===========================
 */
export interface ModelGroup {
  id: number // 车型组ID
  name: string // 车型组名称
}

export async function getModelGroups() {
  const res = await API<{ count: number; list: ModelGroup[] }>('/vehicle/model/group/v1/list')
  return res.success ? res.data.list : null
}

export function useModelGroups() {
  const [groups, setGroups] = useState<ModelGroup[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void getModelGroups().then(res => {
      setLoading(false)
      if (res) setGroups(res)
    })
  }, [])

  useEffect(() => load(), [load])

  return { groups, loading, refresh: load }
}

/**
 * 新增车型组
 */
export async function addModelGroup(name: string) {
  return API('/vehicle/model/group/v1/save', {
    data: {
      vehicleModelName: name,
    },
  })
}

/**
 * 删除车型组
 */
export async function removeModelGroup(id: number) {
  return API('/vehicle/model/group/v1/delete', {
    data: { id },
    json: false,
  })
}

/**
 * ===========================
 * 车型标签
 * ===========================
 */
export interface ModelTag {
  id: number
  tagName: string
  preset: number // 1 代表是预设的，不可删除
}

export function useModelTags() {
  const [tags, setTags] = useState<ModelTag[]>([])
  const [loading, setLoading] = useState(false)
  const load = useCallback(() => {
    setLoading(true)
    void API<ModelTag[]>('/vehicle_tag/prop/v1/list', {
      data: { tagType: '1' },
    }).then(res => {
      setLoading(false)
      if (res.success) {
        setTags(res.data)
      }
    })
  }, [])

  useEffect(() => load(), [load])

  return { tags, loading, refresh: load }
}

export async function addModelTag(name: string) {
  return API('/vehicle_tag/prop/v1/save', { data: { tagName: name } })
}

export async function removeModelTag(id: number) {
  return API('/vehicle_tag/prop/v1/delete', { data: { id }, json: false })
}

/**
 * ===========================
 * 车型
 * ===========================
 */
export enum ModelStatus {
  Disabled = 0, // 停售
  Normal = 1, // 售卖中
}
export const modelStatusMap = {
  [ModelStatus.Disabled]: '停售',
  [ModelStatus.Normal]: '售卖中',
}

export interface VehicleModel {
  id: number

  vehicleModelImgUrl: string | null
  vehicleBrandId: number // 品牌ID
  vehicleBrandName: string | null // 品牌名称
  vehicleSeryId: number // 车系ID
  vehicleSeryName: string | null // 车系名称
  vehicleSubSeryId: number // 子系ID
  vehicleSubSeryName: string | null // 子系名称
  vehicleYearStyle: string // 年款
  vehicleModelGroupName: string | null // 车型分组

  licenseType: string // 车牌类型
  carriage: string // 厢式
  displacement: string // 排量
  gearbox: string // 变速箱
  doors: string // 门数
  seatNum: number // 座位数
  fuelForm: string // 燃油类型
  tagList: { id: number; tagName: string }[] | null // 车型标签
  channelBindList: VehicleModelChannelBind[] | null // 网络平台关联信息

  initials: string
  storeId: number
  merchantId: number
  status: string
}

export interface VehicleModelDetail {
  id: number
  brandId: number
  brandName: string
  vehicleSeryId: number
  vehicleSeryName: string
  vehicleSubSeryId: number
  vehicleSubSeryName: string
  vehicleYearStyle: string
  vehicleModelGroup: string
  vehicleModelGroupName: string
  licenseType: string
  carriage: string
  displacement: string
  gearbox: string
  doors: number
  seatNum: number
  fuelForm: string
  tagList:
    | [
        { id: number; vehicleModelId: number; tagName: string } // name|name|name
      ]
    | []
  status: ModelStatus
  carStructure: '' // TODO: 作用不明
  bindList: VehicleModelChannelBind[]
  vehicleMediaList: ModelMedia[]
  driveType: 0 | 2 | 3 // 驱动类型（2 四驱, 3 两驱, 0 空）
  hasSunroof: 0 | 1 // 是否有天窗
  hasSnowTires: 0 | 1 // 是否有雪地胎
  selfServiceReturn: 0 | 1 // 是否支持自助取还
  fastChargeTime: 1 | 0 // 是否支持快充
  presetSubSery: 1 | 0 // 上次保存车型时，属性字段是否由子车系预设数据填充（是则编辑时不能修改属性字段）
}

export interface VehicleModelChannelBind {
  id: number // 记录ID
  channelId: number // 平台ID
  vehicleModelId: number // 车型ID
  bindChannelVehicleId: string // 车型在网络平台上的ID
  bindChannelVehicleName: string // 车型在网络平台上的名称
  bindChannelVehicleSeryId: string // 车型在网络平台上的车系ID
  newBindChannelVehicleId: string // 飞猪新车型在网络平台上的ID
  newBindChannelVehicleName: string // 飞猪新车型在网络平台上的名称
  newBindChannelVehicleSeryId: string // 飞猪新车型在网络平台上的车系ID

  // 携程车型同步状态
  synced: 0 | 1 // 是否同步成功
  syncFailedReason: string // 失败原因，为空代表正在同步
}

export interface ModelMedia {
  id: number
  vehicleModelId: number
  mediaPath: string
  mediaType: number
}

export interface ModelsQuery {
  vehicleBrandIdList?: number[]
  vehicleModelGroup?: string
  licenseType?: string
  channelId?: number
  bindChannelVehicleId?: string

  pageIndex?: number
  pageSize?: number
  desc?: boolean
}

export async function getModels(query?: ModelsQuery) {
  return API<{ count: number; list: VehicleModel[] }>('/vehicle/model/v1/list', { data: query })
}

export async function getModelDetail(id: number) {
  return API<VehicleModelDetail>('/vehicle/model/v1/get_by_id', { data: { id }, json: false })
}

export async function removeModel(id: number) {
  return API('/vehicle/model/v1/delete', { data: { id }, json: false })
}

/**
 * 搜索车型（返回简易信息）
 * - 返回 keyword 对应的品牌
 * - 调用 refresh 可手动重新搜索
 */
export interface SimpleModel {
  id: number
  fuelForm: string
  vehicleUnionName: string
  vehicleBrandName: string
  vehicleSerId: number
  vehicleSeryName: string
  vehicleSubSeryId: number | null
  vehicleSubSeryName: string | null
  licenseType: string
  vehicleModelGroup: string
}
export function useSearchSimpleModels(storeId?:number) {
  const [models, setModels] = useState<SimpleModelFromStore[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback((storeId: number) => {
    if (storeId === 0) return void setModels([])

    setLoading(true)
    const request = API<{ vehicleList: SimpleModelFromStore[] }>(
      '/vehicle/model/v1/queryListByStoreIds',
      { data: { storeIdList:storeId==null?[]:[storeId] } }
    )
    void request.then(res => {
      setLoading(false)
      if (res.success) {
        setModels(res.data.model||[])
      } else {
        setModels([])
      }
    })
  }, [])

  useEffect(() => search(storeId), [search, storeId])

  const refresh = useCallback(() => search(storeId), [storeId])

  return { models, loading, refresh }
}

/**
 * 搜索门店下可用的车型（返回简易信息）
 * - 返回 keyword 对应的品牌
 * - 调用 refresh 可手动重新搜索
 */
export interface SimpleModelFromStore {
  id: number
  vehicleModelId: number
  vehicleUnionName: string
}
export function useSearchSimpleModelsFromStore(storeId: number) {
  const [models, setModels] = useState<SimpleModelFromStore[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback((storeId: number) => {
    if (storeId === 0) return void setModels([])

    setLoading(true)
    const request = API<{ vehicleList: SimpleModelFromStore[] }>(
      '/vehicle/model/v1/queryListByStoreIds',
      { data: { storeIdList:[storeId] } }
    )
    void request.then(res => {
      setLoading(false)
      if (res.success) {
        setModels(res.data.model||[])
      } else {
        setModels([])
      }
    })
  }, [])

  useEffect(() => search(storeId), [search, storeId])

  const refresh = useCallback(() => search(storeId), [storeId])

  return { models, loading, refresh }
}
export function useSearchModelsVehicle() {
  const [models, setModels] = useState<SimpleModelFromStore[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(() => {
    setLoading(true)
    const request = API<{ vehicleList: SimpleModelFromStore[] }>(
      '/vehicle/model/v1/list/vehicle_model/select'
    )
    void request.then(res => {
      setLoading(false)
      if (res.success) {
        setModels(res.data)
      } else {
        setModels([])
      }
    })
  }, [])

  useEffect(() => search(), [search])

  const refresh = useCallback(() => search(), [])

  return { models, loading, refresh }
}
/**
 * 按搜索条件导出车型列表
 */
export async function exportModels(query: ModelsQuery) {
  return API<Blob>('/vehicle/model/v1/downExcel', { data: query })
}
