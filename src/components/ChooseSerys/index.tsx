import React, { useState, useMemo, useEffect } from 'react'
import { Select } from 'antd'
import type { Sery } from '@/lib/data-source'
import { useSerys } from '@/lib/data-source'
import { keywordCompare, useRefValue, type ExtSelectProps, formatExtSelectProps, type FormattedExtSelectProps } from '@/lib/lang'
import { AddSery } from './AddSery'
import './index.less'


/**
 * 选择车系
 */
interface BaseProps {
  brandId?: number,       // 前置条件：选择品牌。未选择品牌的情况下此组件为禁用状态
  addable?: boolean,      // 是否显示”新增“操作
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
}
type Props = ExtSelectProps<number, Sery, BaseProps>
export function ChooseSerys(rawProps: Props): JSX.Element {
  const props = formatExtSelectProps<number, Sery, BaseProps>(rawProps, (instance: Sery) => instance.id)
  const { brandId, value, onChange } = props

  // brandId 变化时，重置此字段的值
  const valueRef = useRefValue(value)
  const onChangRef = useRefValue(onChange)
  useEffect(() => {
    if (valueRef.current !== undefined) onChangRef.current(undefined, undefined)
  }, [brandId, valueRef, onChangRef])

  return brandId === undefined
    ? <Select disabled placeholder="暂无数据" className="app-choose-serys" />
    : <EnabledChooseSery {...props} brandId={brandId} />
}


function EnabledChooseSery(props: Omit<FormattedExtSelectProps<number, Sery, BaseProps>, 'brandId'> & { brandId: number }) {
  const { brandId, addable = false, placeholder = '请选择', allowClear = true, disabled = false, value, onChange } = props

  // const optionForAdd = useMemo(() => (
    // addable
    //   ? <a className="app-choose-serys-add" onClick={() => setAdding(true)}>新增车系&gt;</a>
    //   : null
  // ), [addable])
  const [adding, setAdding] = useState(false)
  function finishAdd() {
    setAdding(false)
    refresh()
  }

  const brandIds = useMemo(() => [brandId], [brandId])
  const [keyword, setKeyword] = useState('')
  const { serys, loading, refresh } = useSerys({ brandIds })
  const options = useMemo(() => {
    if (!Array.isArray(serys) || serys.length === 0) return [{ label: '暂无数据', value: 0, instance: null as unknown as Sery }]
    const allOptions = serys.map(sery => ({ label: `${sery.id}-${sery.seryName}`, value: sery.id, instance: sery }))
    const filtered = keyword ? allOptions.filter(opt => keywordCompare(keyword, opt.label)) : allOptions
    return [
      ...filtered,
      // ...optionForAdd ? [{ label: optionForAdd, instance: null as unknown as Sery }] : []
    ]
  }, [ keyword, serys])

  return <>
    <Select
      className="app-choose-serys"
      showSearch searchValue={keyword} onSearch={setKeyword} loading={loading}
      options={options} filterOption={false}
      value={value} onChange={onChange}
      placeholder={placeholder} allowClear={allowClear} disabled={disabled}
    />
    {addable
      ? <AddSery adding={adding} brandId={brandId} initialKeyword={keyword} onFinish={finishAdd} />
      : null}
  </>
}
