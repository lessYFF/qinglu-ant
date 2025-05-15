import React, { useState, useMemo } from 'react'
import { Input, type InputProps, DatePicker, Tag, type InputNumberProps, InputNumber } from 'antd'
import { getEnumEntries } from '@/lib/lang'
import moment, { type Moment } from 'moment'
import c from 'classnames'
import './input.less'

/**
 * 只能输入数字和字母的文本框
 * 并且会自动将字母大写
 */
export function AlphaInput(
  props: Omit<InputProps, 'value' | 'onChange'> & {
    value?: string
    onChange?: (value: string) => void
  }
) {
  const { value: rawValue, onChange: rawOnChange, ...rest } = props

  // 初始传进来的值若有小写，会立刻转为大写
  const value = rawValue === undefined || rawValue === null ? rawValue : rawValue.toUpperCase()

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '')
    rawOnChange?.(value)
  }

  return <Input {...rest} value={value} onChange={onChange} />
}

/**
 * 精确到“分钟”的日期时间选择器
 */
export function MinuteDatePicker(props: ConstructorParameters<typeof DatePicker>[0]) {
  return (
    <DatePicker
      format="YYYY-MM-DD HH:mm"
      showTime={{ defaultValue: moment().seconds(0), format: 'HH:mm' }}
      {...(props as unknown)}
    />
  )
}

/**
 * 精确到“分钟”的日期时间范围选择器
 */
export function MinuteRangePicker(props: ConstructorParameters<typeof DatePicker.RangePicker>[0]) {
  const { value, disabled: propsDisabled, allowEmpty, ...restProps } = props

  // 已选择开始时间、为选择结束时间的情况下，从 blur 状态直接点击选择”结束时间“，
  // 此时不要应用 antd 的默认逻辑，而是禁止选择“开始时间”之前的时间
  const [opening, setOpening] = useState(false)
  const [choosingEnd, setChoosingEnd] = useState(false)
  function disabledTime(now: Moment | null, type: 'start' | 'end') {
    return {
      disabledHours() {
        const nextChoosingEnd = type === 'end'
        if (choosingEnd !== nextChoosingEnd) {
          setTimeout(() => setChoosingEnd(nextChoosingEnd))
        }
        return []
      },
    }
  }
  const disabled = useMemo(() => {
    if (
      opening &&
      choosingEnd &&
      !propsDisabled &&
      allowEmpty?.[0] === false &&
      allowEmpty?.[1] === true &&
      props.value?.[0] &&
      !props.value?.[1]
    ) {
      return [true, false] as [boolean, boolean]
    }
    return propsDisabled
  }, [opening, choosingEnd, value, propsDisabled, allowEmpty])

  return (
    <DatePicker.RangePicker
      format="YYYY-MM-DD HH:mm"
      showTime={{ defaultValue: [moment().seconds(0), moment().seconds(0)], format: 'HH:mm' }}
      value={value}
      disabled={disabled}
      onChange={props.onChange}
      allowEmpty={allowEmpty}
      onOpenChange={setOpening}
      disabledTime={disabledTime}
      {...(restProps as unknown)}
    />
  )
}

/**
 * 卡片形式的 Checkbox
 * options 为数组或 Enum { string => number }
 */
export function CardCheckbox<T>(props: {
  options: { label: string; value: T }[] | Record<string, string | number>
  value?: T[] | null
  onChange?: (value: T[]) => void
  className?: string
}) {
  const { value, onChange, options: rawOptions, className } = props

  const options = useMemo(() => {
    if (Array.isArray(rawOptions)) return rawOptions
    return getEnumEntries(rawOptions).map(([title, value]) => ({ label: title, value: value as T }))
  }, [rawOptions])

  const valueSet = useMemo(() => new Set(value ?? []), [value])
  function switchValue(value: T) {
    const nextSet = new Set(valueSet)
    if (nextSet.has(value)) nextSet.delete(value)
    else nextSet.add(value)
    onChange?.(Array.from(nextSet))
  }

  return (
    <div className={c('app-card-checkbox', className)}>
      {options.map(({ label, value }, index) => {
        const choosed = valueSet.has(value)
        return (
          <Tag className={choosed ? 'choosed' : ''} key={index} onClick={() => switchValue(value)}>
            {label}
          </Tag>
        )
      })}
    </div>
  )
}

export function MoneyInput(
  props: Omit<InputNumberProps, 'onChange'> & { onChange: (value: number | null) => void }
) {
  const { value: rawValue, onChange: rawOnChange, ...rest } = props

  const value = typeof rawValue === 'number' ? rawValue / 100 : rawValue

  const onChange = (raw: string | number | null) => {
    if (!rawOnChange) return
    const value =
      typeof raw === 'string'
        ? isFinite(parseInt(raw, 10))
          ? parseInt(raw, 10) * 100
          : 0
        : typeof raw === 'number'
        ? raw * 100
        : raw
    rawOnChange(value)
  }

  return <InputNumber value={value} onChange={onChange} {...rest} />
}
