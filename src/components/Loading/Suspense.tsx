/**
 * 通用 Suspense 组件，自带了 loading 界面
 *
 * 使用方法：
 * const LazyComponent = React.lazy(async () => import('./SomeComponent'))
 * function MyComponent() {
 *  return <Suspense>
 *    <LazyComponent {...props} />
 *  </Suspense>
 * }
 */
import React, { Suspense as ReactSuspense } from 'react'
import { Loading } from './'


export default function Suspense(props: {
  children: JSX.Element,
}) {
  const { children } = props
  return <ReactSuspense fallback={<Loading />}>{
    children
  }</ReactSuspense>
}
