import React from 'react'
import { API } from '@/lib/API'
import { Modal } from 'antd'
import { logout } from '@/lib/auth'

// 通过此 context 在整个 App 中提供、获取当前登录用户的信息
export const UserContext = React.createContext<UserInfoWithMerchant>({} as UserInfoWithMerchant)

export interface UserInfo {
  id: number
  name: string // 昵称
  loginName: string // 登录名
  mobile: string | null
  email: string
  status: 0 | 1 // 0 禁用 1 启用
  childAccount: number
  parentId: number // -1 代表是平台管理员
  isAdmin: 0 | 1
  merchantId: number | null // 平台管理员：当前进入的商家ID；若非管理员，则为当前账号所属商家
  merchantName: string | null // 平台管理员：当前进入的商家名称
  roleId: number
  roleName: string
  storeIds: number[]
  menuAutos: string[]
  isBinded: boolean // 是否已绑定微信
  eventType: string // 特殊事件
  storeRuleList: { // 所属门店
    id: number
    name: string
  }[]
}

export interface UserInfoWithMerchant extends UserInfo {
  merchantAvailable: boolean
}

// 获取当前登录用户信息
export async function getUserInfo(token?: string, allowUnauthorized?: boolean) {
  const res = await API<UserInfo>('/login/v1/userInfo', { token, allowUnauthorized })
  if (res.success) {
    localStorage.setItem("userInfo",JSON.stringify(res.data))
    if (res.data.eventType === 'AUTH_REFRESH') {
      void Modal.warning({
        title: '权限更新，即将刷新页面',
        onOk: () => logout(),
      })
      setTimeout(() => logout(), 1000)
    }
  }
  return res
}

// 获取用户列表
export async function getUsers() {
  return API<{ count: number; list: UserInfo[] }>('/user/v1/page', {
    data: { pageIndex: 1, pageSize: 10000 },
  })
}

// 获取用户详情
export async function getUserDetail(id: number) {
  return API<UserInfo>('/user/v1/detail', { data: { id }, method: 'GET' })
}

// 确认商家是否可用
export async function confirmMerchantAvailable() {
  return API<boolean>('/merchant_account/v1/merchant_available')
}

// =======================
// 管理员商家选择
// =======================

export interface Merchant {
  id: number
  name: string
}

export function useMerchants(token?: string) {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    setLoading(true)
    void API<{ list: Merchant[]; count: number }>('/merchant/info/v1/page', {
      data: { pageSize: 10000 },
      token,
    }).then(res => {
      setLoading(false)
      if (res.success) {
        setMerchants(res.data.list)
      } else {
        setError(res.error.message)
      }
    })
  }, [token])

  useEffect(() => load(), [load])

  return { merchants, loading, loadError: error, reload: load }
}

export async function chooseMerchant(id: number, token?: string) {
  return API('/login/v1/switch/merchant', {
    data: { merchantId: id },
    token,
    json: false,
    method: 'GET',
  })
}

export async function leaveMerchant() {
  return API('/login/v1/out/merchant', { method: 'GET' })
}

// =======================
// 用户权限
// =======================

export interface Role {
  id: number
  isAdmin: 0 | 1 // 是否是管理员
  name: string // 权限名称
  merchantId: number // 所属商家，为 0 代表是预设角色
}

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async function () {
    setLoading(true)
    const res = await API<{ count: number; list: Role[] }>('/role/page', {
      data: { pageSize: 10000 },
    })
    const roles = res.success ? res.data.list : []
    setRoles(roles)
    setLoading(false)
    return roles
  }, [])

  useEffect(() => void load(), [load])

  return {
    roles,
    loading,
    load,
  }
}

export async function addRole(name: string) {
  return API('/role/v1/save', { data: { name } })
}

export async function editRole(id: number, name: string) {
  return API('/role/v1/edit', { data: { id, name } })
}

export async function removeRole(id: number) {
  return API('/role/remove', { data: { id }, json: false })
}

export interface RoleDetail {
  id: number
  isAdmin: 0 | 1
  name: string
  menuIds: number[]
  merchantId: number
}

export async function getRoleDetail(id: number) {
  return API<RoleDetail>('/role/v1/detail', { data: { id }, json: false, method: 'GET' })
}

export async function saveRoleAuth(roleId: number, menuIds: number[]) {
  return API('/role/auth', { data: [{ roleId, menuIds }] })
}

export enum MenuType {
  Menu = 1, // 菜单
  Module = 2, // 模块
  Button = 3, // 按钮
}
export interface BaseMenuNode {
  id: number
  name: string
  parentId: number
  roleValue: string
  sort: number
}
export interface MenuNode extends BaseMenuNode {
  type: MenuType.Menu
  childNodes: ModuleNode[]
}
export interface ModuleNode extends BaseMenuNode {
  type: MenuType.Module
  childNodes: ButtonNode[]
}
export interface ButtonNode extends BaseMenuNode {
  type: MenuType.Button
  childNodes: []
}
export type GeneralNode = MenuNode | ModuleNode | ButtonNode
export type MenuTree = MenuNode[]

export function useMenuTree() {
  const [tree, setTree] = useState<MenuTree>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async function () {
    setLoading(true)
    const res = await API<MenuNode[]>('/menu/v1/tree')
    const tree = res.success ? res.data : []
    setTree(tree)
    setLoading(false)
  }, [])

  useEffect(() => void load(), [load])

  return {
    tree,
    loading,
  }
}

// =======================
// 消息通知设置
// =======================

interface DataItem {
  id: number
  name: string
}

export interface PushSettingData {
  baseChannelList: DataItem[] // 可选啊渠道列表
  baseRoleList: DataItem[] // 可选角色列表（"0:全部"这个角色是特殊的）
  baseTypeList: DataItem[] // 可选通知类型列表
  typeList: PushSetting[] // 已设置通知配置列表
}

export interface PushSetting {
  id: number // record id
  pushValue: number // 通知类型 id
  roleList: {
    id: number // record id
    pushValue: number // 通知岗位 id
  }[]
  channelList: {
    id: number // record id
    pushValue: number // 通知渠道 id
  }[]
}

export interface EditPushSetting {
  id: number
  pushValue: number // 通知类型
  roleList: number[] // 通知岗位
  channelList: number[] // 通知渠道
}

export async function getPushSetting() {
  return API<PushSettingData>('/merchant/push/v1/getSetting')
}

export async function savePushSetting(data: unknown) {
  return API('/merchant/push/v1/saveSetting', { data })
}
