/**
 * 对 Ant Design Table 组件的二次封装
 * 预设了常用的配置 / 样式
 */
import React from 'react'
import { Table as AntdTable, type TableProps } from 'antd'


export function Table<T extends object>(props: TableProps<T>) {
  props = {
    // 根据应用需求定制的默认值
    tableLayout: 'fixed',
    size: 'middle',

    ...props
  }
  return <AntdTable<T> {...props} />
}

Table.Column = AntdTable.Column
