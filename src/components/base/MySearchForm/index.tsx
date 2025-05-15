import React, { useState } from 'react'
import { Button, Form, Space } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import styles from './styles.module.less'

export interface SearchFormProps {
  collapsed?: boolean,
  showCollapsed?: boolean,
  defaultOpen?: boolean,
  children?: React.ReactNode,
  onSubmit?: () => void,
  onReset?: () => void,
}

export const MySearchForm = (props: unknown) => {
  const {
    children,
    collapsed = true,
    defaultOpen = false,
    onReset,
    onSubmit,
    showCollapsed = false,
    form
  } = props
  const [open, setOpen] = useState(defaultOpen)

  const handleSubmit = () => {
    onSubmit?.()
  }

  return (
    <div className={styles.searchForm}>
      <div
        className={styles.formContent}
        style={open && collapsed ? { height: 'auto', overflow: 'auto' } : { overflow: 'hidden' }}
      >
        <div className={styles.formBox}>
          <Form layout="inline" form={form}>
            {open && collapsed ? children : children[0] || children}
          </Form>
          {showCollapsed && (
            <div className={styles.collapsed}>
              <a onClick={() => setOpen(!open)}>
                {open ? (
                  <>
                    收起 <UpOutlined />
                  </>
                ) : (
                  <>
                    高级查询 <DownOutlined />
                  </>
                )}
              </a>
            </div>
          )}
        </div>
        <div>
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              查询
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
