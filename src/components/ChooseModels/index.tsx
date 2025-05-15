import React, { useState, useMemo } from 'react'
import { Select } from 'antd'
import { type ExtSelectProps, formatExtSelectProps, keywordCompare } from '@/lib/lang'
import { useSearchSimpleModels, type SimpleModel } from '@/lib/data-source'
import './index.less'

/**
 * 选择车型
 */
interface BaseProps {
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  storeIdList?:number
}
export function ChooseModels(props: ExtSelectProps<number, SimpleModel, BaseProps>): JSX.Element {
  const {
    multiple,
    placeholder = 'ID/名称',
    allowClear = true,
    disabled = false,
    value,
    onChange,
  } = formatExtSelectProps<number, SimpleModel, BaseProps>(props, (model: SimpleModel) => model.id)
  const [keyword, setKeyword] = useState('')
  const { models, loading } = useSearchSimpleModels(props.storeIdList)
  const options = useMemo(() => {
    return models
      ?.map(model => ({ label: model.vehicleUnionName, value: model.id, instance: model }))
      .filter(item => (keyword ? keywordCompare(keyword, item.label) : true))
  }, [keyword, models])

  return (
    <Select
      showSearch
      searchValue={keyword}
      onSearch={setKeyword}
      loading={loading}
      options={options}
      style={{width:400}}
      filterOption={false} // 已自行实现搜索
      mode={multiple ? 'multiple' : undefined}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
    />
  )
}
