/**
 * 字符串工具函数
 */

/**
 * 执行关键词匹配
 * 成功返回 true；失败返回 false
 */
const kwCache: { [kw: string]: RegExp } = {}      // 避免大量重复构建正则表达式影响性能
export function keywordCompare(keyword: string, target: string) {
  if (!keyword) return true
  const regStr = keyword.split('').map(escapeRegExp).join('.*')
  if (!(keyword in kwCache)) kwCache[keyword] = new RegExp(regStr, 'i')
  return kwCache[keyword]!.test(target)
}
function escapeRegExp(str: string) {
  // From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}


/**
 * 重复一段字符串 N 次
 */
export function repeat(str: string, times: number) {
  let result = ''
  for (let i = 0; i < times; i++) result += str
  return result
}



/**
 * 将数字字符串化，并在左侧填充 0 直到达到 length 参数指定的长度
 * 若数字本身达到或超过此长度，则不填充
 */
export function zfill(num: number, length=2) {
  const numStr = String(num)
  return repeat('0', Math.max(0, length - numStr.length)) + numStr
}
