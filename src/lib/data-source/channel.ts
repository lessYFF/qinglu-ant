import { API } from '@/lib/API'

/**
 * 商家&渠道绑定表列表
 */
export interface ChannelWithStatus {
  arreared: number
  arrearsTime: number | null
  channelId: number
  channelName: string
  channelRegPhone: string
  channelRegUser: string
  channelVendorCode: string
  connType: number // 1: api对接 2: saas 对接 3: gds对接
  id: number
  status: number // 3: 已授权 2: 关闭授权 -1：未授权 0：授权中 1：授权失败
}
export const getChannelList = () => {
  return API<ChannelWithStatus[]>('/apiConn/v1/listChannel', {
    data: {},
    json: false,
  })
}

/**
 * 商家&渠道绑定表数据申请
 * @param data
 */
export const saveChannelApply = (data: any) => {
  return API<any>('/apiConn/v1/save', {
    data: { ...data },
  })
}
/**
 * 修改密码
 * @param data
 */
export const updatePassword = (data: any) => {
  return API<any>('/apiConn/v1/updatePwd', {
    data: { ...data },
  })
}

/**
 * 修改渠道状态
 * @param id
 * @param status
 */
export const updateChannelStatus = (id: any, status: any) => {
  return API<any>('/apiConn/v1/updStatus', {
    data: { id, status },
    json: false,
  })
}
/**
 * 获取渠道列表
 * @param includeOffLine 线下
 * @param includeSub 子渠道
 * @param includeSync 爬虫同步
 */
export const getChannelBusiList = (
  includeOffLine: 1 | 0,
  includeSub: 1 | 0,
  includeSync: 1 | 0,
  worryFreeRent: 1 | 0,
) => {
  return API<any>('/apiConn/v1/listChannelBusi', {
    data: { includeOffLine, includeSub, includeSync, worryFreeRent },
  })
}

/**
 * 获取验证码
 * @param channelRegPhone
 */
export const getRegCode = (channelRegPhone: any) => {
  return API<any>('/apiConn/v1/code', {
    data: { channelRegPhone },
    json: false,
  })
}

export const closeUnbind = (data: any) => {
  return API<any>('/apiConn/v1/unbind', {
    query: data,
  })
}


/**
 * 获取哈啰门店列表
 * @param {string} channelId - 渠道id
 */
export const getHelloStoreList = (channelId: string) => {
  return API<any>('/store/v1/third/list/gds/get', {
    query: {channelId},
  })
}

/**
 * 获取哈啰车型列表
 * @param {string} channelId - 渠道id
 */
export const getHelloCarList = (channelId: string, storeIdList: string[]) => {
  return API<any>('/vehicle/model/v1/third/list/gds/get', {
    data: {channelId, storeIdList},
  })
}

/**
 * 获取擎路门店列表
 */
export const getQingluStoreList = (searchkey: string) => {
  return API<any>('/store/v1/storeListByAuth', {
    query: { searchkey }
  })
}

/**
 * 获取擎路车型列表
 */
export const getQingluCarList = () => {
  return API<any>('/vehicle/model/v1/list/vehicle_model/select')
}

/**
 * 暂存哈啰申请授权信息
 */
export const storageHelloAuthInfo = (params = {}) => {
  return API<any>('/channel/v1/third/gds/accredit/apply', {
    data: params,
  })
}

/**
 * 提交哈啰授权关联门店、车型信息
 */
export const postHelloAuthInfo = (params = {}) => {
  return API<any>('/channel/v1/third/gds/match/add', {
    data: params,
  })
}

/**
 * 轮询哈啰授权信息同步进度
 */
export const getHelloAuthStatus = (params = {}) => {
  return API<any>('/channel/v1/third/apply/record', {
    query: params,
  })
}
