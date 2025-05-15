import { API } from '@/lib/API'

interface DetailQuery {
  pageIndex: number,
  pageSize: number,
  merchantId: number | string,
}

/**
 * 获取商家配置列表
 */
export const getSettingList = async (params: DetailQuery) => {
  return API<unknown>('/merchant/setting/v1/listPage', {
    data: params
  })
}

/**
 * 新增修改商家配置
 */
export const saveSetting = async (params: any) => {
  return API<unknown>('/merchant/setting/v1/save', {
    data: params
  })
}

/**
 * 查询商家配置
 */
export const querySetting = async (id: string) => {
  return API<unknown>('/merchant/setting/v1/findById', { data: { id }, method: 'GET' })
}

/**
 * 删除商家配置
 */
export const removeSetting = async (id: string) => {
  return API<unknown>('/merchant/setting/v1/remove', { data: { id }, json: false, method: 'GET' })
}