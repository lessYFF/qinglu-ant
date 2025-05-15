import React, { useMemo } from 'react'
import { Form, Input, Button, message, Popconfirm } from 'antd'
import { useSerys, useBrands, useSubSerys, type SubSery, removeSubSery, addSubSery } from '@/lib/data-source'
import { Table, EditModal } from '@/components'
import './AddSubSery.module.less'


export function AddSubSery(props: {
  adding: boolean,
  brandId: number,
  seryId: number,
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { adding, brandId, seryId, initialKeyword, onFinish } = props

  return <EditModal open={adding} title="新增车型" onCancel={onFinish} width="650px">
    { adding ? <ModalContent brandId={brandId} seryId={seryId} initialKeyword={initialKeyword} onFinish={onFinish} /> : null }
  </EditModal>
}


function ModalContent(props: {
  brandId: number,
  seryId: number,
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { brandId, seryId, initialKeyword, onFinish } = props

  const [form] = Form.useForm()
  const { subSerys, loading, refresh } = useSubSerys(seryId)

  const { brands } = useBrands()
  const brandName = brands.find(item => item.id === brandId)?.brandName ?? brandId

  const brandIds = useMemo(() => [brandId], [brandId])
  const { serys } = useSerys({ brandIds })
  const seryName = serys.find(item => item.id === seryId)?.seryName ?? seryId

  async function add(values: { name: string }) {
    const res = await addSubSery(seryId, values.name)
    if (res.success) {
      void message.success('新增车型成功')
      form.setFieldValue('name', '')
    } else {
      void message.error(res.error.message)
    }
    refresh()
  }

  async function remove(id: number) {
    const res = await removeSubSery(id)
    if (res.success) void message.success('车型已删除')
    else void message.error(res.error.message)
    refresh()
  }
  function renderRemove(subSery: SubSery) {
    return <Popconfirm title="确定删除车型吗？" onConfirm={async () => remove(subSery.id)}>
      <a>删除</a>
    </Popconfirm>
  }

  return <>
    <main>
      <Form styleName="form" form={form} layout="inline" initialValues={{ name: initialKeyword }} onFinish={add}>
        <div>
          <Form.Item label="品牌" required>
            <Input disabled value={brandName} />
          </Form.Item>
          <Form.Item label="车系" required>
            <Input disabled value={seryName} />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="车型" name="name" rules={[{ required: true }]}>
            <Input maxLength={20} placeholder="请输入" autoFocus />
          </Form.Item>
          <Button type="primary" htmlType="submit">添加</Button>
        </div>
      </Form>

      <Table
        dataSource={subSerys}
        loading={loading}
        pagination={false}
        scroll={{ y: 300 }}
        rowKey="id"
        columns={[
          { title: '品牌', render: () => brandName },
          { title: '车系', render: () => seryName },
          { title: '车型', render: (subSery: SubSery) => `${subSery.id}-${subSery.name}` },
          { title: '操作', width: 120, render: renderRemove },
        ]}
      />
    </main>
    <footer>
      <Button onClick={onFinish}>完成</Button>
    </footer>
  </>
}
