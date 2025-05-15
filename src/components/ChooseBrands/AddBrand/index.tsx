import React from 'react'
import { Form, Input, Button, message, Popconfirm } from 'antd'
import { useBrands, type Brand, removeBrand, addBrand } from '@/lib/data-source'
import { Table, EditModal } from '@/components'
import './index.module.less'


export function AddBrand(props: {
  adding: boolean,
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { adding, initialKeyword, onFinish } = props

  return <EditModal open={adding} title="新增品牌" onCancel={onFinish}>
    { adding ? <ModalContent initialKeyword={initialKeyword} onFinish={onFinish} /> : null }
  </EditModal>
}


function ModalContent(props: {
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { initialKeyword, onFinish } = props

  const [form] = Form.useForm()
  const { brands, loading, refresh } = useBrands()

  async function add(values: { name: string }) {
    const res = await addBrand(values.name)
    if (res.success) {
      void message.success('添加成功')
      form.setFieldValue('name', '')
    } else {
      void message.error(res.error.message)
    }
    refresh()
  }

  async function remove(id: number) {
    const res = await removeBrand(id)
    if (res.success) void message.success('删除成功')
    else void message.error(res.error.message)
    refresh()
  }
  function renderRemove(brand: Brand) {
    return <Popconfirm title="确定删除品牌吗？" onConfirm={async () => remove(brand.id)}>
      <a>删除</a>
    </Popconfirm>
  }

  return <>
    <main>
      <Form styleName="form" form={form} layout="inline" initialValues={{ name: initialKeyword }} onFinish={add}>
        <Form.Item label="品牌名" name="name" rules={[{ required: true }]}>
          <Input maxLength={20} placeholder="请输入" autoFocus />
        </Form.Item>
        <Button type="primary" htmlType="submit">添加</Button>
      </Form>

      <Table
        dataSource={brands}
        loading={loading}
        pagination={false}
        scroll={{ y: 300 }}
        rowKey="id"
        columns={[
          { title: '品牌', render: (brand: Brand) => `${brand.id}-${brand.brandName}` },
          { title: '操作', width: 120, render: renderRemove },
        ]}
      />
    </main>
    <footer>
      <Button onClick={onFinish}>完成</Button>
    </footer>
  </>
}
