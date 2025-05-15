import React, { useState, useMemo } from 'react'
import { Select } from 'antd'
import { useModelGroups, type ModelGroup } from '@/lib/data-source'
import { keywordCompare, type ExtSelectProps, formatExtSelectProps } from '@/lib/lang'
import { AddGroup } from './AddGroup'
import './index.less'


/**
 * 选择车型组
 */
interface BaseProps {
  addable?: boolean,          // 是否显示”添加“操作
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
}
export function ChooseModelGroups(props: ExtSelectProps<number, ModelGroup, BaseProps>): JSX.Element {
  const {
    addable = false, multiple,
    placeholder = '请选择', allowClear = true, disabled = false,
    value, onChange
  } = formatExtSelectProps<number, ModelGroup, BaseProps>(props, (instance: ModelGroup) => instance.id)

  // const optionForAdd = useMemo(() => (
  //   addable
  //     ? <a className="app-choose-model-groups-add" onClick={() => setAdding(true)}>新增车型分组&gt;</a>
  //     : null
  // ), [addable])
  const [adding, setAdding] = useState(false)
  function finishAdd() {
    setAdding(false)
    refresh()
  }

  const [keyword, setKeyword] = useState('')
  const { groups, loading, refresh } = useModelGroups()
  const options = useMemo(() => {
    const allOptions = groups.map(group => ({ label: `${group.id}-${group.name}`, value: group.id, instance: group }))
    const filtered = keyword ? allOptions.filter(opt => keywordCompare(keyword, opt.label)) : allOptions
    return [
      ...filtered,
      // ...optionForAdd ? [{ label: optionForAdd, instance: null as unknown as ModelGroup }] : []
    ]
  }, [ keyword, groups])

  return <>
    <Select
      className="app-choose-model-groups"
      showSearch searchValue={keyword} onSearch={setKeyword} loading={loading}
      options={options} filterOption={false}
      mode={multiple ? 'multiple' : undefined} value={value} onChange={onChange}
      placeholder={placeholder} allowClear={allowClear} disabled={disabled}
    />
    {addable
      ? <AddGroup adding={adding} initialKeyword={keyword} onFinish={finishAdd} />
      : null}
  </>
}
