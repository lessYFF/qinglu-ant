/**
 * URL 工具函数
 */


/**
 * 合并路径字符串，去除中间多余的 /
 * join('abc/', '/def', 'xyz')  => 'abc/def/xyz'
 */
export function join(...parts: string[]) {
  parts = parts.filter(node => node.length > 0)
  return parts
    .map((node, index) => {
      if (node.startsWith('/') && index !== 0) node = node.slice(1)                     // 去掉开头的 /（除了第一段）
      if (node.endsWith('/') && index !== parts.length - 1) node = node.slice(0, -1)    // 去掉结尾的 /（除了最后一段）
      return node
    })
    .filter(node => node.length > 0)        // 二次过滤
    .join('/')
}


/**
 * 安全版的 decodeURIComponent()，遇到 '%' 等不合法的字符串也不会抛出 'URI malformed' 异常，而是原样返回字符串
 */
export function safeDecode(string: string) {
  try {
    return decodeURIComponent(string)
  } catch (e: unknown) {
    return string
  }
}


/**
 * 把对象转换成 query string
 * - *不支持*将数组转换成 abc[]=1 的格式
 * - 值为 undefined 的项会被忽略
 * - 值不是 string 的项，会被以 `String(value)` 的方式字符串话（例如 null true 等会变成 'null' 'true'）
 */
export function stringifyQuery(object: Record<string, string | undefined | number | null | boolean>) {
  return Object.entries(object)
    .filter(entry => entry[1] !== undefined)
    .map(([key, value]) => {
      if (typeof value !== 'string') value = String(value)
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')
}


/**
 * 把 query string 解析成对象
 * - 不支持 "abc[]=1" 的数组格式，同一个 key 出现多次，后面的会覆盖前面的
 * - 只应传 query 部分，不要传整个 url（可以用 splitUrl() 先拆分）。
 *   为方便，允许带 ? 开头，因为 location.search 是带的。
 */
export function parseQuery(query: string) {
  if (query.startsWith('?')) query = query.slice(1)
  const object: Record<string, string> = {}
  for (const node of query.split('&').filter(v => v.length)) {
    const splitIndex = node.indexOf('=')
    const [rawKey, rawValue] = splitIndex === -1
      ? [node, '']
      : [node.slice(0, splitIndex), node.slice(splitIndex + 1)]   // 不直接用 node.split('=') 是为了避免 abc=def=xyz 等特殊字符串出现时，第二个 = 后面的内容丢失
    object[safeDecode(rawKey)] = safeDecode(rawValue)
  }
  return object
}


/**
 * 把 url 拆分成 base url, query string, hash 三部分（query string 不带 '?'，hash 不带 '#'）
 */
export function splitUrl(url: string) {
  let hashIndex = url.indexOf('#')
  if (hashIndex === -1) hashIndex = url.length

  let queryIndex = url.slice(0, hashIndex).indexOf('?')
  if (queryIndex === -1) queryIndex = hashIndex

  return {
    base: url.slice(0, queryIndex),
    query: url.slice(queryIndex + 1, hashIndex),
    hash: url.slice(hashIndex + 1),
  }
}


/**
 * 把指定 query 和 hash 合并到 url 上
 *
 * query   object     会附加到 url 的 query string 上，替换同名项
 * hash    string     不用带 # 号；若 url 已有 hash，会用此值代替
 */
export function combineUrl(origUrl: string, query?: Record<string, string> | null, hash?: string | null) {
  query = query ?? {}

  hash = hash ?? ''
  if (hash.startsWith('#')) hash.slice(1)

  // 拆分原 url 的 query、hash
  const { base, query: origQuery, hash: origHash } = splitUrl(origUrl)

  // 拼接新 url
  let newUrl = base
  const newQuery = stringifyQuery({ ...parseQuery(origQuery), ...query })
  const newHash = hash || origHash
  if (newQuery) newUrl += `?${newQuery}`
  if (newHash) newUrl += `#${newHash}`
  return newUrl
}
