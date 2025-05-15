import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { type ExtSelectProps, formatExtSelectProps } from '@/lib/lang'
import { getVehicles, type Vehicle } from '@/lib/data-source'
import './index.less'

/**
 * 选择车辆
 */
interface BaseProps {
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  onVehiclesChange?: (vehicles: Vehicle[]) => void
}
export function ChooseVehicles(props: ExtSelectProps<number, Vehicle, BaseProps>): JSX.Element {
  const {
    multiple,
    placeholder = 'ID/名称',
    allowClear = true,
    disabled = false,
    value,
    onChange,
    onVehiclesChange,
  } = formatExtSelectProps<number, Vehicle, BaseProps>(props, (vehicle: Vehicle) => vehicle.id)

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // 因为后端暂不支持输入“部分车牌号”来搜索（只支持输入完整车牌号），因此前端自行实现搜索
    setLoading(true)
    void getVehicles({ pageSize: 10000 }).then(res => {
      setLoading(false)
      if (res.success) {
        setVehicles(res.data.list)
        if (onVehiclesChange) {
          onVehiclesChange(res.data.list || [])
        }
      }
    })
  }, [])

  const options = (Array.isArray(vehicles) ? vehicles : []).map(vehicle => ({
    label: `${vehicle.id}-${vehicle.license}`,
    value: vehicle.id,
    instance: vehicle,
  }))

  return (
    <Select
      className="app-choose-vehicles"
      showSearch
      optionFilterProp="label"
      loading={loading}
      options={options}
      mode={multiple ? 'multiple' : undefined}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
    />
  )
}
