import React from 'react'
import { Select } from 'antd'
import { useChannels } from '@/lib/data-source'
import './index.module.less'

export function ChooseChannel(props: {
  value?: number | null
  onChange?: (value: number | null) => void
}) {
  const { value, onChange } = props as Required<typeof props>

  const { data: channels } = useChannels()
  const options = channels
    .filter(channel => channel.id !== 21 && channel.id !== 22 && channel.id !== 23)
    .map(channel => ({ label: channel.channelName, value: channel.id }))

  return (
    <Select
      styleName="choose-channel"
      options={options}
      value={value}
      onChange={onChange}
      placeholder="请选择"
      allowClear
    />
  )
}
