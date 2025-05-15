import React, { useMemo } from 'react'
import { Form, Input, Button, message, Popconfirm } from 'antd'
import { useSerys, type Sery, useBrands, removeSery, addSery } from '@/lib/data-source'
import { Table, EditModal } from '@/components'
import './AddSery.module.less'


export function AddSery(props: {
  adding: boolean,
  brandId: number,
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { adding, brandId, initialKeyword, onFinish } = props

  return <EditModal open={adding} title="新增车系" onCancel={onFinish} width="650px">
    { adding ? <ModalContent brandId={brandId} initialKeyword={initialKeyword} onFinish={onFinish} /> : null }
  </EditModal>
}


function ModalContent(props: {
  brandId: number,
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { brandId, initialKeyword, onFinish } = props

  const [form] = Form.useForm()
  const brandIds = useMemo(() => [brandId], [brandId])
  const { serys, loading, refresh } = useSerys({ brandIds })

  const { brands } = useBrands()
  const brandName = brands.find(item => item.id === brandId)?.brandName ?? brandId

  async function add(values: { name: string }) {
    const res = await addSery(brandId, values.name)
    if (res.success) {
      void message.success('新增车系成功')
      form.setFieldValue('name', '')
    } else {
      void message.error(res.error.message)
    }
    refresh()
  }

  async function remove(id: number) {
    const res = await removeSery(id)
    if (res.success) void message.success('车系已删除')
    else void message.error(res.error.message)
    refresh()
  }
  function renderRemove(sery: Sery) {
    return <Popconfirm title="确定删除车系吗？" onConfirm={async () => remove(sery.id)}>
      <a>删除</a>
    </Popconfirm>
  }

  return <>
    <main>
      <Form styleName="form" form={form} layout="inline" initialValues={{ name: initialKeyword }} onFinish={add}>
        <Form.Item label="品牌" required>
          <Input disabled value={brandName} />
        </Form.Item>
        <Form.Item label="车系" name="name" rules={[{ required: true }]}>
          <Input maxLength={20} placeholder="请输入" autoFocus />
        </Form.Item>
        <Button type="primary" htmlType="submit">添加</Button>
      </Form>

      <Table
        dataSource={serys}
        loading={loading}
        pagination={false}
        scroll={{ y: 300 }}
        rowKey="id"
        columns={[
          { title: '品牌', render: () => brandName },
          { title: '车系', render: (sery: Sery) => `${sery.id}-${sery.seryName}` },
          { title: '操作', width: 120, render: renderRemove },
        ]}
      />
    </main>
    <footer>
      <Button onClick={onFinish}>完成</Button>
    </footer>
  </>
}
