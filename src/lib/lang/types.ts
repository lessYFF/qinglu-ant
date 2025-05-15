/**
 * 对类型系统的辅助、补充
 */


/**
 * 将一个变量在 TypeScript 里持续性地标记为指定类型
 *
 * TypeScript 的 `value as Type` 语法只能临时标记一个变量的类型。
 * 可有时经过一些检查、判断，一个变量可能已永久判定为指定类型了。
 * 此时可通过此方法来让 TypeScript 始终将其识别为那个类型。
 *
 * 使用方法：
 * function someFunction(value: unknown) {
 *   if (!checking...) return null
 *   if (!asType<SomeType>(value)) return null
 *
 *   value // 现在 TypeScript 就会一直认为它是 SomeType 了
 * }
 */
export function asType<T>(value: unknown): value is T {
  return true
}


/**
 * 解决 TypeScript 中，数组字面量 [1, 'a'] 无法自动识别为 tuple 的问题
 *
 * 使用方法：
 * const t = tuple(1, 'a')    // 类型会识别为 [1, 'a'] 而不是 (number | string)[]
 *
 * 待官方提供语言层面的支持
 * https://github.com/microsoft/TypeScript/issues/27179
 * https://github.com/microsoft/TypeScript/issues/16656
 */
export function tuple<T extends unknown[]>(...elements: T) {
  return elements
}


/**
 * 所有“可能失败”的操作都可使用此类型作为返回值
 */
export interface Success<T=void> {
  success: true,
  data: T,
}
export interface Failed<ET=string> {
  success: false,
  error: ET,
}
export type MaySuccess<T=void, ET=string> = Success<T> | Failed<ET>

function success(): Success
function success<T>(data: T): Success<T>
function success<T=void>(data?: T) {
  return { success: true, data }
}
export { success }

export function failed<ET>(error: ET): Failed<ET> {
  return { success: false, error }
}

/**
 * 若传入值为 success，格式化其 data；否则原样返回错误
 * 支持传入会返回 MaySuccess 的 Promise
 */
function formatSuccess<T, ET, FT>(item: MaySuccess<T, ET>, formatter: (data: T) => FT): MaySuccess<FT, ET>
function formatSuccess<T, ET, FT>(item: Promise<MaySuccess<T, ET>>, formatter: (data: T) => FT): Promise<MaySuccess<FT, ET>>
function formatSuccess<T, ET, FT>(item: MaySuccess<T, ET> | Promise<MaySuccess<T, ET>>, formatter: (data: T) => FT) {
  if ('then' in item) return item.then(finalItem => formatSuccess(finalItem, formatter))
  return item.success
    ? { ...item, data: formatter(item.data) }
    : item
}
export { formatSuccess }


/**
 * 确认变量是否有值
 * 注意：空字符串和数字 0 也会判定为没有值
 */
function truthy(value: string | number | boolean | null | undefined): value is string | number | true
function truthy<T>(value: T | string | number | boolean | null | undefined): value is T | string | number | true
function truthy<T>(value: T | string | number | boolean | null | undefined) {
  return value !== null && value !== undefined && value !== '' && value !== 0 && value !== false
}
export { truthy }


/**
 * 将一个对象中的指定 key 设为必须的
 */
export type RequiredFields<T, K extends keyof T> = Omit<T, K> & Pick<Required<T>, K>

/**
 * 将一个对象中的指定 key 设为非必须的
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 替换部分字段的定义
 */
export type ReplaceFields<T, F extends { [key in keyof Partial<T>]: unknown }> = Omit<T, keyof F> & F


/**
 * 把 enum { text = number } 解析成 [text, number][]
 */
export function getEnumEntries(obj: Record<string, string | number>) {
  return Object.entries(obj).filter(([, value]) => typeof value === 'number') as [string, number][]
}
