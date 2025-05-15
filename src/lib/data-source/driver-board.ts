import { API } from '@/lib/API'

export interface DriverBoardQuery {
  storeId?: number, // 门店Id
}


/**
 * 获取司机看板数据
 */
export const getDriverDashboard = async (params: DriverBoardQuery) => {
  return API<unknown>('/pick_diver/dashboard/v1', {
    data: params
  })
}

/**
 * 获取司机待排任务
 */
export const getUnArrangedDashboard = async (params: DriverBoardQuery) => {
  return API<unknown>('/pick_diver/dashboard/un_arrange/v1', {
    data: params
  })
}

/**
 * 查询司机任务类型
 */
export const getDriverTaskTypes = async (params: any) => {
  return API<unknown>('/pick_diver/task_types/v1', {
    data: params
  })
}

/**
 * 保存司机任务类型
 */
export const saveDriverTaskType = async (params: any) => {
  return API<unknown>('/pick_diver/save/v1', {
    data: params
  })
}

/**
 * 删除司机任务类型
 */
export const deleteDriverTaskType = async (params: any) => {
  return API<unknown>(`/pick_diver/delete/v1?id=${params.id}`, {
    data: params
  })
}

/**
 * 排司机任务
 */
export const arrangeDriverTask = async (params: any) => {
  return API<unknown>('/pick_diver/dashboard/arrange/v1', {
    data: params
  })
}

/**
 * 取消司机任务
 */
export const cancelDriverTask = async (params: any) => {
  return API<unknown>(`/pick_diver/v1/cancel?id=${params.id}`)
}

/**
 * 更新地址展示方式
 */
export const updateDisplayAddrType = async (params: any) => {
  return API<unknown>(`/pick_diver/dashboard/upd_display_addr_type?id=${params.id}&displayType=${params.displayType}`, {
    data: params
  })
}

/**
 * 更新任务
 */
export const updateTask = async (params: any) => {
  return API<unknown>('/pick_diver/upd_task/v1', {
    data: params
  })
}

/**
 * 获取商家全局地址展示配置
 */
export const getMerchantDisplayAddrType = async (params: any) => {
  return API<unknown>('/pick_diver/dashboard/merchant_display_addr_type/v1/get', {
    data: params
  })
}

/**
 * 设置商家全局地址展示配置
 */
export const updateMerchantDisplayAddrType = async (params: any) => {
  return API<unknown>(`/pick_diver/dashboard/merchant_display_addr_type/v1/upd?displayType=${params.displayType}`, {
    data: params
  })
}

/**
 * 设置商家单个任务展示配置
 */
export const updateOrderDisplayAddrType = async (params: any) => {
  const { orderId, displayType } = params
  return API<unknown>(`/pick_diver/dashboard/order_display_addr_type/v1/upd?orderId=${orderId}&displayType=${displayType}`, {
    data: params
  })
}

/**
 * 门店司机列表
 */
export const getStoreDriver = async (params: any) => {
  return API<unknown>('/user/v2/driver/box', {
    data: params
  })
}
