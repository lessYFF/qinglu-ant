/**
 * 在一个 ref 中记录指定值的最新值
 * 有些值会被 useCallback、useEffect 里的回调函数使用，但并没有必要添加到依赖列表中（不需要在值变化时重新生成回调），此时就可以使用此 hook。
 */
export function useRefValue<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
