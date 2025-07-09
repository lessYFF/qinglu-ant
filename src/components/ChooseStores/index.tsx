import React, { useState, useMemo, useCallback } from 'react'
import { Select } from 'antd'
import { type ExtSelectProps, formatExtSelectProps, usePrev, keywordCompare } from '@/lib/lang'
import { useSimpleStores, type SimpleStore } from '@/lib/data-source'
import './index.less'

/**
 * 选择门店
 */
interface BaseProps {
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  byMerchant?: boolean
  chooseFirst?: boolean // 若为 true，自动选中第一个店铺
}
export function ChooseStores(props: ExtSelectProps<number, SimpleStore, BaseProps>): JSX.Element {
  const {
    multiple,
    placeholder = 'ID/名称',
    allowClear = false,
    disabled = false,
    byMerchant,
    chooseFirst = false,
    value,
    onChange,
  } = formatExtSelectProps<number, SimpleStore, BaseProps>(
    props,
    (store: SimpleStore) => store.storeId
  )

  const [keyword, setKeyword] = useState('')
  const { stores, loading } = useSimpleStores(byMerchant)
  const options = useMemo(() => {
    return (Array.isArray(stores) ? stores : []).map(store => ({ label: store.storeNameUnion, value: store.storeId, instance: store }))
      .filter(item => (keyword ? keywordCompare(keyword, item.label) : true))
  }, [keyword, stores])

  const prevStores = usePrev(stores)
  if (
    chooseFirst &&
    prevStores &&
    !prevStores.length &&
    stores.length &&
    !multiple &&
    value === undefined
  ) {
    const localStorageStoreId = Number(localStorage.getItem('StoreId'))
    const storeIndex = (Array.isArray(stores) ? stores : []).map(item => item.storeId)
      .indexOf(localStorageStoreId ? localStorageStoreId : 0)

    const store = stores[storeIndex==-1?0:storeIndex]!
    setTimeout(() => {
      onChange(store.storeId, { instance: store })
    }, 100)
  }
  
  const onSelect = (value: any) => {
    localStorage.setItem('StoreId', value)
  }
  return (
    <Select
      className="app-choose-stores"
      showSearch
      searchValue={keyword}
      onSearch={setKeyword}
      loading={loading}
      options={options}
      filterOption={false} // 已自行实现搜索
      mode={multiple ? 'multiple' : undefined}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
    />
  )
}
