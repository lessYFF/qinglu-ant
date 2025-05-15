import { useState, useRef, useEffect, useCallback, type DependencyList } from 'react'
import { tuple } from '.'


/**
 * 返回指定项目在上次渲染时的值。初次渲染时，返回 undefined 或者给定的 initialValue
 * const prevId = usePrev(props.id)
 */
function usePrev<T>(currentValue: T): T | undefined
function usePrev<T, I>(currentValue: T, initialValue: I): T | I
function usePrev<T, I>(currentValue: T | I, initialValue?: T | I) {
  const ref = useRef<T | I>(initialValue as T)
  useEffect(() => {
    ref.current = currentValue
  })
  return ref.current
}
export { usePrev }


/**
 * 判断指定值和上次渲染时相比，是否变化
 * 初次调用也会被视为变化了。
 *
 * const idIsChanged = useIsChanged(props.id)
 */
const CHANGED_INIT = {}
export function useIsChanged<T>(currentValue: T) {
  return currentValue !== usePrev(currentValue, CHANGED_INIT)
}


/**
 * 在一个 ref 中记录指定值的最新值
 * 有些值会被 useCallback、useEffect 里的回调函数使用，但并没有必要添加到依赖列表中（不需要在值变化时重新生成回调），此时就可以使用此 hook。
 */
export function useRefValue<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}


/**
 * 在维护 state 的同时，提供一个与 state 值实时同步的 value ref
 * （这个 ref 的作用与 useRefValue() 提供的相同）
 *
 * 此 hook 并非简单低整合了 useState() 和 useRefValue()
 * 而是保证了 setState() 后，ref.current 会立刻更新，而不用等下一次渲染
 *
 * const [list, setList, listRef] = useStateWithRef([])
 */
export function useStateWithRef<S>(initialState: S | (() => S)) {
  const [state, rawSetState] = useState(initialState)
  const ref = useRef(state)
  const setState = useCallback((value: S | ((prev: S) => S)) => {
    if (typeof value === 'function') {
      rawSetState(prev => {
        const next = (value as (prev: S) => S)(prev)
        ref.current = next
        return next
      })
    } else {
      ref.current = value
      rawSetState(value)
    }
  }, []) as typeof rawSetState
  return tuple(state, setState, ref)
}



/**
 * 存储一个需通过接口加载的资源
 */
export function useResource<T>(
  loadResource: () => Promise<T>,
  initial: T
) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(false)

  const loadResourceRef = useRefValue(loadResource)
  const load = useCallback(async () => {
    setLoading(true)
    const newData = await loadResourceRef.current()
    setData(newData)
    setLoading(false)
  }, [loadResourceRef])

  useEffect(() => void load(), [load])

  return { data, loading, relaod: load }
}



/**
 * useEffect() 不能传 async function 作为回调。
 * 此 hooks 解决了此问题，代价是不支持返回清理函数。
 */
export function useAsyncEffect(callback: () => unknown, deps?: DependencyList) {
  useEffect(() => {
    callback()
  }, deps)    // eslint-disable-line ts-react-hooks/exhaustive-deps
}
