import React, { useState } from 'react'
import { Select } from 'antd'
import { type ExtSelectProps, formatExtSelectProps, keywordCompare } from '@/lib/lang'
import { useSearchSimpleModelsFromStore, type SimpleModelFromStore } from '@/lib/data-source'
import './index.less'

/**
 * 选择车型
 */
interface BaseProps {
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
  storeId: number,
  withAll?: boolean,  // 若为 true，增加一个 id 为 0 的特殊选项，代表“全部车型”（instance 开启时无效）
}
export function ChooseModelsByStoreForStock(props: ExtSelectProps<number, SimpleModelFromStore, BaseProps>): JSX.Element {
  const {
    multiple, placeholder = 'ID/名称', allowClear = true, disabled = false, storeId, instance, withAll,
    value, onChange
  } = formatExtSelectProps<number, SimpleModelFromStore, BaseProps>(props, (model: SimpleModelFromStore) => model.id)

  const [keyword, setKeyword] = useState('')
  const { models, loading } = useSearchSimpleModelsFromStore(storeId)
  const options = [
    ...instance || withAll !== true ? [] : [{ label: '全部车型', value: 0, instance: {} as SimpleModelFromStore }],
    ...models?.map(model => ({ label: model.vehicleUnionName, value: model.id, instance: model }))
      ?.filter(v => keyword ? keywordCompare(keyword, v.label) : true)
  ]
  // TODO: 待重新梳理
  if (value !== undefined) {
    if (!Array.isArray(value) && !options.find(item => item.value === value)) {
      setTimeout(() => onChange(undefined, { instance: undefined as unknown as SimpleModelFromStore }))
    }
  }
  let ids = []
  options.forEach(item=>{
    ids.push(item.value)
  })
  const onChangeVehicle = (val:number[]) =>{
    if(val.indexOf(0) === -1) {
      if(val.length == ids.length-1) {
        onChange(ids,{ instance: undefined as unknown as SimpleModelFromStore })
      } else{
        onChange(val,{ instance: undefined as unknown as SimpleModelFromStore })
      }
    }else{
      if(val[0] == 0) {
        if(val.length == 1) {
          onChange(ids,{ instance: undefined as unknown as SimpleModelFromStore })
        } else{
          onChange(val.filter(item=> item!==0),{ instance: undefined as unknown as SimpleModelFromStore })
        }
      } else{
        onChange(ids,{ instance: undefined as unknown as SimpleModelFromStore })
      }
    }
  }
  const onDeselect = (val) =>{
    if(val == 0) {
      onChange([],{ instance: undefined as unknown as SimpleModelFromStore })
    }
  }
  return <Select
    maxTagCount='responsive'
    onDeselect={onDeselect}
    className="app-choose-models"
    showSearch searchValue={keyword} onSearch={setKeyword} loading={loading}
    options={options} filterOption={false}    // 已自行实现搜索
    mode={multiple ? 'multiple' : undefined} value={value} onChange={onChangeVehicle}
    placeholder={placeholder} allowClear={allowClear} disabled={disabled}
  />
}
