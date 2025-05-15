import React from 'react'
import { Form, Button } from 'antd'
import type { FormProps } from 'antd/lib/form/Form'
import type { Store as FormStore } from 'rc-field-form/lib/interface'
import './index.less'
import { Roles } from '../Roles'

/**
 * 搜索表单
 *
 * <Search initialValues={xxx} onSearch={xxx}>
 *   <Form.Item><Input /></Form.Item>
 *   <Form.Item><Input /></Form.Item>
 *
 *   // 想要统一展示的字段可用 .app-search-group 的元素包裹
 *   // layout=inline 时，它们会统一换行
 *   // layout=horizontal 时，它们会显示在一行里
 *   <div className="app-search-group">
 *     <Form.Item><Input /></Form.Item>
 *     <Form.Item><Input /></Form.Item>
 *   </div>
 * </Search>
 */
export function Search<Values extends FormStore>(
  props: Omit<FormProps<Values>, 'onFinish' | 'initialValues' | 'children'> & {
    initialValues?: Partial<Values>
    onSearch: (values?: Values) => void // values 为空代表是 reset
    onChange?: (values: Partial<Values>) => void
    handleLation?:() => void
    disabledSearch?: boolean
    resetAble?: boolean
    violation?: boolean //控制违章按钮
    children: React.ReactNode
  },
) {
  const {
    layout = 'inline',
    initialValues,
    onSearch,
    onChange,
    resetAble = true,
    violation,
    handleLation,
    children,
    disabledSearch,
    ...extra
  } = props

  const [form] = Form.useForm()
  function reset() {
    form.resetFields()
    onSearch()
    localStorage.removeItem("stores")
    localStorage.removeItem("StoreId")
  }

  return (
    <Form
      form={form}
      className="app-search"
      layout={layout}
      onFinish={onSearch}
      onValuesChange={onChange}
      initialValues={initialValues}
      {...extra}
    >
      {children}
      <div className="app-search-actions">
        <Roles allowed="car:violation">
          {violation&&  <Button type="primary" onClick={handleLation} disabled={disabledSearch}>违章查询</Button>}
        </Roles>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        {resetAble ? <Button onClick={reset}>重置</Button> : null}
      </div>
    </Form>
  )
}
