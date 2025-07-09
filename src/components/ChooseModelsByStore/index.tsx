import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Select } from 'antd'
import throttle from 'lodash/throttle'
import { type ExtSelectProps, formatExtSelectProps } from '@/lib/lang'
import { API } from '@/lib/API'
import './index.less'


interface StoreVehicleModel {
  id: number,
  vehicleModelId: number,
  vehicleModelName: string,
}
function useModels(storeId: number, keyword = '') {
  const [models, setModels] = useState<StoreVehicleModel[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback((keyword: string) => {
    setLoading(true)
    void API<StoreVehicleModel[]>('/store/v1/findSampleModelList', { data: { id: storeId, searchKey: keyword }, json: false }).then(res => {
      setLoading(false)
      if (res.success) {
        setModels(res.data)
      }
    })
  }, [storeId])

  const throttledSearch = useMemo(() => throttle(search, 300), [search])
  useEffect(() => throttledSearch(keyword), [throttledSearch, keyword])

  const refresh = useCallback(() => search(keyword), [search, keyword])

  return { models, loading, refresh }
}


/**
 * 选择门店下的车型
 */
interface BaseProps {
  storeId: number,
  placeholder?: string,
  allowClear?: boolean,
  disabled?: boolean,
}
export function ChooseModelsByStore(props: ExtSelectProps<number, StoreVehicleModel, BaseProps>): JSX.Element {
  const {
    storeId,
    multiple, placeholder = 'ID/名称', allowClear = true, disabled = false,
    value, onChange
  } = formatExtSelectProps<number, StoreVehicleModel, BaseProps>(props, (model: StoreVehicleModel) => model.vehicleModelId)

  const [keyword, setKeyword] = useState('')
  const { models, loading } = useModels(storeId, keyword)
  if (!Array.isArray(models) || models.length === 0) return <Select disabled placeholder={placeholder} />
  const options = (models).map(model => ({ label: model.vehicleModelName, value: model.vehicleModelId, instance: model }))

  return <Select
    className="app-choose-models-by-store"
    showSearch searchValue={keyword} onSearch={setKeyword} loading={loading}
    options={options} filterOption={false}    // 搜索交给后端进行
    mode={multiple ? 'multiple' : undefined} value={value} onChange={onChange}
    placeholder={placeholder} allowClear={allowClear} disabled={disabled}
  />
}
