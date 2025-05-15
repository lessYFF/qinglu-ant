import React, { useState } from 'react'
import { message, Button } from 'antd'
import { type Response } from '@/lib/API'


export function Export(props: {
  execute(): Response<Blob>,
  filename?: string | (() => string),
  text?: React.ReactNode,
  size?: 'small' | 'middle' | 'large',
  type?: "link"
}) {
  const { execute, filename = '导出.xlsx', text = '导出', size = 'middle',type } = props

  const [exporting, setExporting] = useState(false)

  async function onClick() {
    // setExporting(true)
    const res = await execute()
    console.log('export', res)
    if (!res.success) {
      void message.error('导出失败：' + res.error.message)
      // setExporting(false)
      return
    }

    const url = URL.createObjectURL(res.data)
    // setExporting(false)

    const link = document.createElement('a')
    link.href = url
    link.download = typeof filename === 'string' ? filename : filename()
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    setTimeout(function() {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    })
  }

  return <Button type={type} size={size} loading={exporting} onClick={onClick}>{text}</Button>
}
