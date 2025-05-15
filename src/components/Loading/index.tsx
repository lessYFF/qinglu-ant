import React from 'react'
import { Spin } from 'antd'
import c from 'classnames'
import './index.less'


export { default as Suspense } from './Suspense'


export function Loading(props: {
  className?: string,
  tip?: React.ReactNode,
}) {
  return <div className={c('app-loading', props.className)}>
    <Spin className="app-spin" tip={props.tip ?? '加载中...'} />
  </div>
}
