import React, { useState, useMemo } from 'react'
import { Select } from 'antd'
import { type ExtSelectProps, formatExtSelectProps, keywordCompare } from '@/lib/lang'
import { useBrands, type Brand } from '@/lib/data-source'
import { AddBrand } from './AddBrand'
import './index.less'


/**
 * 选择车型品牌
 */
interface BaseProps {
  addable?: boolean,          // 是否显示”添加“操作
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
}
export function ChooseBrands(props: ExtSelectProps<number, Brand, BaseProps>): JSX.Element {
  const {
    addable = false, multiple,
    placeholder = 'ID/名称', allowClear = true, disabled = false,
    value, onChange
  } = formatExtSelectProps<number, Brand, BaseProps>(props, (brand: Brand) => brand.id)

  // const optionForAdd = useMemo(() => (addable
  //   ? <a className="app-choose-brands-add" onClick={() => setAdding(true)}>新增品牌&gt;</a>
  //   : null), [addable])
  const [adding, setAdding] = useState(false)
  function finishAdd() {
    setAdding(false)
    refresh()
  }

  const [keyword, setKeyword] = useState('')
  const { brands, loading, refresh } = useBrands()
  const options = useMemo(() => {
    return  [
      ...(Array.isArray(brands) ? brands : []).map(brand => ({
        label: `${brand.id}-${brand.brandName}`,
        value: brand.id,
        instance: brand,
      })),
      // ...optionForAdd ? [{ label: optionForAdd, instance: null as unknown as Brand }] : []
    ]
  }, [brands])

  const filteredOptions = useMemo(() => {
    return options.filter(option => {
      const brand = option.instance as Brand | null
      if (brand === null || !keyword) return true
      return keywordCompare(keyword, brand.id.toString())
        || keywordCompare(keyword, brand.initials)
        || keywordCompare(keyword, brand.brandName)
        || keywordCompare(keyword, brand.englishName)
    })
  }, [options, keyword])

  return <>
    <Select
      className="app-choose-brands"
      showSearch loading={loading}
      searchValue={keyword} onSearch={setKeyword}
      options={filteredOptions} filterOption={false}    // 已自行实现过滤
      mode={multiple ? 'multiple' : undefined} value={value} onChange={onChange}
      placeholder={placeholder} allowClear={allowClear} disabled={disabled}
    />
    {addable
      ? <AddBrand adding={adding} initialKeyword={keyword} onFinish={finishAdd} />
      : null}
  </>
}
