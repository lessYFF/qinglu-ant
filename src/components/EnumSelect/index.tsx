import React, { useMemo } from 'react'
import { Select } from 'antd'
import c from 'classnames'
import { getEnumEntries } from '@/lib/lang'
import './index.less'


type SelectProps = Parameters<typeof Select<number>>[0]

/**
 * 对 enum { text = number } 格式的数据进行选择
 */

interface Props extends SelectProps {
  source: Record<string, string | number>,
  extra?: { label: string, value: number }[],
}

export function EnumSelect(props: Props) {
  const { source, extra, className, ...rest } = props

  const enumOptions = useMemo(() => (
    getEnumEntries(source).map(([title, value]) => ({ label: title, value }))
  ), [source])

  const options = extra
    ? [...extra, ...enumOptions]
    : enumOptions

  return <Select
    options={options}
    className={c('app-enum-select', className)}
    {...rest} />
}
