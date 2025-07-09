import React, { useState, useMemo, useEffect } from 'react'
import { Select } from 'antd'
import { useSubSerys, type SubSery } from '@/lib/data-source'
import { keywordCompare, useRefValue, type ExtSelectProps, formatExtSelectProps, type FormattedExtSelectProps } from '@/lib/lang'
import { AddSubSery } from './AddSubSery'
import './index.less'


/**
 * 选择子车系（界面上叫“车型”，注意不要和总体统称的”车型“弄混）
 */
interface BaseProps {
  brandId?: number,       // 前置条件：选择品牌。未选择品牌的情况下此组件为禁用状态
  seryId?: number,        // 前置条件：选择车系。未选择车系的情况下此组件为禁用状态
  addable?: boolean,      // 是否显示”新增“操作
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
}
type Props = ExtSelectProps<number, SubSery, BaseProps>
export function ChooseSubSerys(rawProps: Props): JSX.Element {
  const props = formatExtSelectProps<number, SubSery, BaseProps>(rawProps, (instance: SubSery) => instance.id)
  const { brandId, seryId, value, onChange } = props

  // seryId 变化时，重置此字段的值
  const valueRef = useRefValue(value)
  const onChangRef = useRefValue(onChange)
  useEffect(() => {
    if (valueRef.current !== undefined) onChangRef.current(undefined, undefined)
  }, [seryId, valueRef, onChangRef])

  return brandId === undefined || seryId === undefined
    ? <Select disabled placeholder="暂无数据" className="app-choose-sub-serys" />
    : <EnabledChooseSubSery {...props} brandId={brandId} seryId={seryId} />
}



function EnabledChooseSubSery(
  props: Omit<FormattedExtSelectProps<number, SubSery, BaseProps>, 'brandId' | 'seryId'>
  & { brandId: number, seryId: number }
) {
  const { brandId, seryId, addable = false, placeholder = '请选择', allowClear = true, disabled = false, value, onChange } = props

  // const optionForAdd = useMemo(() => (
  //   addable
  //     ? <a className="app-choose-sub-serys-add" onClick={() => setAdding(true)}>新增车型&gt;</a>
  //     : null
  // ), [addable])
  const [adding, setAdding] = useState(false)
  function finishAdd() {
    setAdding(false)
    refresh()
  }

  const [keyword, setKeyword] = useState('')
  const { subSerys, loading, refresh } = useSubSerys(seryId)
  const options = useMemo(() => {
    if (!Array.isArray(subSerys) || subSerys.length === 0) return [{ label: '暂无数据', value: 0, instance: null as unknown as SubSery }]
    const allOptions = subSerys.map(subSery => ({ label: `${subSery.id}-${subSery.name}`, value: subSery.id, instance: subSery }))
    const filtered = keyword ? allOptions.filter(opt => keywordCompare(keyword, opt.label)) : allOptions
    return [
      ...filtered,
      // ...optionForAdd ? [{ label: optionForAdd, instance: null as unknown as SubSery }] : []
    ]
  }, [ keyword, subSerys])

  return <>
    <Select
      className="app-choose-sub-serys"
      showSearch searchValue={keyword} onSearch={setKeyword} loading={loading}
      options={options} filterOption={false}
      value={value} onChange={onChange}
      placeholder={placeholder} allowClear={allowClear} disabled={disabled}
    />
    {addable
      ? <AddSubSery adding={adding} brandId={brandId} seryId={seryId} initialKeyword={keyword} onFinish={finishAdd} />
      : null}
  </>
}
