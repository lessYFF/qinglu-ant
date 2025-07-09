import React, { useState, useMemo, useEffect } from 'react'
import { Select } from 'antd'
import { useLicenseTypes, type LicenseType } from '@/lib/data-source'
import { keywordCompare, type ExtSelectProps, formatExtSelectProps } from '@/lib/lang'
import { AddType } from './AddType'
import './index.less'


/**
 * 选择牌照类型
 */
interface BaseProps {
  addable?: boolean,          // 是否显示”添加“操作
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
  setVehicleName?:Function
}
export function ChooseLicenseTypesByName(props: ExtSelectProps<string, LicenseType, BaseProps>) {
  const {
    addable = false, multiple,
    placeholder = '请选择', allowClear = true, disabled = false,
    value, onChange,setVehicleName
  } = formatExtSelectProps<string, LicenseType, BaseProps>(props, (type: LicenseType) => type.licenseTypeName)

  const optionForAdd = useMemo(() => (
    addable
      ? <a className="app-choose-license-types-add" onClick={() => setAdding(true)}>新增牌照类型&gt;</a>
      : null
  ), [addable])
  const [adding, setAdding] = useState(false)
  function finishAdd() {
    setAdding(false)
    refresh()
  }

  const [keyword, setKeyword] = useState('')
  const { licenseTypes, loading, refresh } = useLicenseTypes()
  const options = useMemo(() => {
    const allOptions = licenseTypes.map(type => ({ label: `${type.id}-${type.licenseTypeName}`, value: type.id, instance: type }))
    const filtered = keyword ? allOptions.filter(opt => keywordCompare(keyword, opt.label)) : allOptions

    return [
      ...filtered,
      // ...optionForAdd ? [{ label: optionForAdd, instance: null as unknown as LicenseType }] : []  //新增牌照类型
    ]
  }, [optionForAdd, keyword, licenseTypes])
  useEffect(()=>{
    if(setVehicleName){
      setVehicleName!(options)
    }
  },[options])
  return <>
    <Select
      className="app-choose-license-types"
      showSearch searchValue={keyword} onSearch={setKeyword} loading={loading}
      options={options} filterOption={false}
      mode={multiple ? 'multiple' : undefined} value={value} onChange={onChange}
      placeholder={placeholder} allowClear={allowClear} disabled={disabled}
    />
    {addable
      ? <AddType adding={adding} onFinish={finishAdd} />
      : null}
  </>
}
