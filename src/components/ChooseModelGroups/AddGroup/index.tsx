import React from 'react'
import { Form, Input, Button, message, Popconfirm } from 'antd'
import { useModelGroups, type ModelGroup, removeModelGroup, addModelGroup } from '@/lib/data-source'
import { Table, EditModal } from '@/components'
import './index.module.less'


export function AddGroup(props: {
  adding: boolean,
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { adding, initialKeyword, onFinish } = props

  return <EditModal open={adding} title="新增车型分组" onCancel={onFinish}>
    { adding ? <ModalContent initialKeyword={initialKeyword} onFinish={onFinish} /> : null }
  </EditModal>
}


function ModalContent(props: {
  initialKeyword?: string,
  onFinish: () => void,
}) {
  const { initialKeyword, onFinish } = props

  const [form] = Form.useForm()
  const { groups, loading, refresh } = useModelGroups()

  async function add(values: { name: string }) {
    const res = await addModelGroup(values.name)
    if (res.success) {
      void message.success('新增车型分组成功')
      form.setFieldValue('name', '')
    } else {
      void message.error(res.error.message)
    }
    refresh()
  }

  async function remove(id: number) {
    const res = await removeModelGroup(id)
    if (res.success) void message.success('车型分组已删除')
    else void message.error(res.error.message)
    refresh()
  }
  function renderRemove(group: ModelGroup) {
    return <Popconfirm title="确定删除分组吗？" onConfirm={async () => remove(group.id)}>
      <a>删除</a>
    </Popconfirm>
  }

  return <>
    <main>
      <Form styleName="form" form={form} layout="inline" initialValues={{ name: initialKeyword }} onFinish={add}>
        <Form.Item label="车型分组" name="name" rules={[{ required: true }]}>
          <Input maxLength={20} placeholder="请输入" autoFocus />
        </Form.Item>
        <Button type="primary" htmlType="submit">添加</Button>
      </Form>

      <Table
        dataSource={groups}
        loading={loading}
        pagination={false}
        scroll={{ y: 300 }}
        rowKey="id"
        columns={[
          { title: '车型分组', render: (group: ModelGroup) => `${group.id}-${group.name}` },
          { title: '操作', width: 120, render: renderRemove },
        ]}
      />
    </main>
    <footer>
      <Button onClick={onFinish}>完成</Button>
    </footer>
  </>
}
