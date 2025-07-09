/**
 * 调用接口
 */
import { combineUrl, type MaySuccess, stringifyQuery, truthy } from '@/lib/lang'
import config from '@/lib/config'
import { Modal } from 'antd'
import { logout } from '@/lib/auth'

// ========================
// 配套函数
// ========================

/**
 * 设置请求时附带的 token
 */
let token = ''

export function setToken(_token: string) {
  token = _token
}

/**
 * 设置判定未登录时的回调
 */
let unauthorizedCallback = () => {
  void Modal.warning({
    title: '登录失效，请重新登录',
    onOk: () => logout(),
  })
  setTimeout(() => logout(), 1000)
}

export function onUnauthorized(callback: () => void) {
  unauthorizedCallback = callback
}

// ========================
// API 调用
// ========================

// 接口返回值
type APISuccess<T> = { success: true; errorCode: null; message: null; data: T } // 调用成功的返回值
type APIFailed = { success: false; errorCode: string; message: string; data: null } // 调用失败的返回值（有些情况会返回特定的 errorCode，大部分情况只返回错误信息 message）
type APIResponse<T> = APISuccess<T> | APIFailed

// API() 的返回值（对 APISuccess / APIFailed 格式化后的结果）
// 成功时：{ success: true, data: xxx }
// 失败时：{ success: false, error: { code, message } }
// 注意：每次使用 API() 的返回值时，必须先确定 response.success === true 再去取 data，并在接口出错时妥善处理错误（例如显示一个错误提示的 toast）
export type Response<T> = Promise<MaySuccess<T, { code: string; message: string }>>

// API() 的请求参数，基于 fetch() 的参数
interface APIParams<T = unknown> extends RequestInit {
  query?: Record<string, string>

  // 向后端传递的数据。对于 GET 请求，会合并到 query 中；对于 POST 请求，会作为 POST body
  // 若传递了 params.body，会忽略此值
  data?: T
  // 默认为 true，仅针对 POST 请求，把 data 格式化成 JSON 还是 x-www-form-urlencoded
  json?: boolean

  // 除了通过 setToken() 记录 token，特殊场景下也可以在调用时直接传入 token
  token?: string

  // 业务上是否允许接口报出"未授权"，为 true 时，出现未授权不会触发 unauthorizedCallback
  allowUnauthorized?: boolean
}

async function API<RespData, ReqData = unknown>(
  path: string,
  params?: APIParams<ReqData>
): Response<RespData> {
  const {
    method: rawMethod = 'POST',
    query: rawQuery = {},
    data: reqData,
    json: dataAsJson = true,
    token: inputToken,
    headers: rawHeaders,
    allowUnauthorized = false,
    ...restParams
  } = params ?? {}

  const method = rawMethod.toUpperCase()
  let headers: Record<string, unknown> = { ...rawHeaders }

  let url = config.APIPrefix + path

  // 使用配置中的buildTime，避免直接访问process.env
  const query = { ...rawQuery, buildTime: config.buildTime || '' }
  if (method === 'GET' && truthy(reqData)) Object.assign(query, reqData as Record<string, string>)
  if (method === 'DELETE' && truthy(reqData)) Object.assign(query, reqData as Record<string, string>)
  if (Object.keys(query).length) url = combineUrl(url, query)

  let body = params?.body
  if (method === 'POST' && !truthy(body)) {
    if (dataAsJson) {
      body = JSON.stringify(reqData ?? {})
      headers = { 'Content-Type': 'application/json;charset=utf-8', ...headers }
    } else if (reqData instanceof FormData) {
      body = reqData
      // headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
    } else {
      body = stringifyQuery(reqData as Record<string, string>)
      headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
    }
  }
  if (method === 'PUT' && !truthy(body)) {
    if (dataAsJson) {
      body = JSON.stringify(reqData ?? {})
      headers = { 'Content-Type': 'application/json;charset=utf-8', ...headers }
    } else if (reqData instanceof FormData) {
      body = reqData
      // headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
    } else {
      body = stringifyQuery(reqData as Record<string, string>)
      headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
    }
  }
  if (method === 'PUT' && !truthy(body)) {
    if (dataAsJson) {
      body = JSON.stringify(reqData ?? {})
      headers = { 'Content-Type': 'application/json;charset=utf-8', ...headers }
    } else if (reqData instanceof FormData) {
      body = reqData
      // headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
    } else {
      body = stringifyQuery(reqData as Record<string, string>)
      headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
    }
  }

  const usedToken = inputToken ?? token
  if (usedToken) {
    headers['x-auth-token'] = usedToken
  }

  let resp: APIResponse<RespData>
  try {
    const request = await window.fetch(url, {
      method,
      ...restParams,
      ...(body !== undefined ? { body } : {}),
      headers: Object.entries(headers) as [string, string][],
    })

    if (
      request.headers.has('content-type') &&
      !(request.headers.get('content-type') ?? '').includes('json')
    ) {
      const binary = await request.blob()
      return { success: true, data: binary as unknown as RespData }
    }

    resp = (await request.json()) as APIResponse<RespData>
  } catch (error) {
    return { success: false, error: { code: '', message: '系统错误' } }
  }

  if (resp.success) {
    return { success: true, data: resp.data }
  } else {
    if (resp.errorCode === '-9' && !allowUnauthorized) unauthorizedCallback()
    if (resp.errorCode === '3002') {
      void Modal.warning({
        title: '权限更新，即将刷新页面',
        onOk: () => logout(),
      })
      setTimeout(() => logout(), 1500)
    }
    // 错误码 -2处理用户复杂异常信息场景
    if (resp.errorCode === '-2') {
      return { success: false, error: { code: resp.errorCode, message: ''} }
    }
    return { success: false, error: { code: resp.errorCode, message: resp.message } }
  }
}

export { API, token }
