import React, { useMemo } from 'react'
import { Select } from 'antd'
import codes from './codes'
import './index.less'


/**
 * 选择手机的国际区号
 */
export function ChooseMobilePrefix(props: {
  value?: string,
  onChange?: (value: string) => void,
}) {
  const { value: rawValue, onChange: rawOnChange } = props

  const options = useMemo(() => {
    // code 会重复（例如美国、安圭拉都是 +1），因此不能直接作为 value
    return codes.map(v => ({ label: `${v.country} ${v.code}`, value: `${v.country} ${v.code}`, code: v.code }))
  }, [])

  const value = options.find(o => o.code === rawValue)?.code
  function onChange(value: string) {
    rawOnChange?.(value.split(' ')[1]!)
  }

  // 目前锁定 +86
  return <Select disabled className="app-choose-mobile-prefix"
    options={options} dropdownMatchSelectWidth={false}
    value={value} onChange={onChange}
  />
}
