import React from 'react'
import { Select } from 'antd'
import c from 'classnames'
import './index.less'


type SelectProps = Parameters<typeof Select<string>>[0]

/**
 * 对传入一系列名字以供选择
 */

interface Props extends SelectProps {
  source: (string | { label: string, value: string })[],
}

export function NamesSelect(props: Props) {
  const { source, className, ...rest } = props
  const options = source.map(name => (typeof name === 'string' ? { label: name, value: name } : name))

  return <Select
    options={options}
    className={c('app-names-select', className)}
    {...rest} />
}
