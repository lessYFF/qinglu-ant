import React, { useState } from 'react'
import { Form, Button, message, Popconfirm, Select } from 'antd'
import { useLicenseTypes, type LicenseType, removeLicenseType, addLicenseType, useLicensePlatAreas, useLicensePlateInitial } from '@/lib/data-source'
import { Table, EditModal } from '@/components'
import './index.module.less'


export function AddType(props: {
  adding: boolean,
  onFinish: () => void,
}) {
  const { adding, onFinish } = props

  return <EditModal open={adding} title="新增牌照类型" onCancel={onFinish}>
    { adding ? <ModalContent onFinish={onFinish} /> : null }
  </EditModal>
}


function ModalContent(props: {
  onFinish: () => void,
}) {
  const { onFinish } = props

  const [form] = Form.useForm()
  const { licenseTypes, loading, refresh } = useLicenseTypes()

  async function add(values: { type: EditType }) {
    const res = await addLicenseType(values.type.areaId, values.type.initialId)
    if (res.success) {
      void message.success('新增牌照类型成功')
      form.resetFields(['type'])
    } else {
      void message.error(res.error.message)
    }
    refresh()
  }

  async function remove(id: number) {
    const res = await removeLicenseType(id)
    if (res.success) void message.success('牌照类型已删除')
    else void message.error(res.error.message)
    refresh()
  }
  function renderRemove(type: LicenseType) {
    return <Popconfirm title="确定删除类型吗？" onConfirm={async () => remove(type.id)}>
      <a>删除</a>
    </Popconfirm>
  }

  return <>
    <main>
      <Form styleName="form" form={form} layout="inline" onFinish={add}>
        <Form.Item label="牌照类型" name="type" rules={[{ required: true, message: '请选择牌照类型' }]}>
          <LicenseTypeInput />
        </Form.Item>
        <Button type="primary" htmlType="submit">添加</Button>
      </Form>

      <Table
        dataSource={licenseTypes}
        loading={loading}
        pagination={false}
        scroll={{ y: 300 }}
        rowKey="id"
        columns={[
          { title: '牌照类型', render: (type: LicenseType) => `${type.id}-${type.licenseTypeName}` },
          { title: '操作', width: 120, render: renderRemove },
        ]}
      />
    </main>
    <footer>
      <Button onClick={onFinish}>完成</Button>
    </footer>
  </>
}


type EditType = { areaId: number, initialId: number }
function LicenseTypeInput(props: {
  value?: EditType | null,
  onChange?: (value: EditType | null) => void,
}) {
  const { value, onChange } = props

  const [areaId, rawSetAreaId] = useState<number | null>(value?.areaId ?? null)
  const areas = useLicensePlatAreas()
  const areaOptions = areas.map(area => ({ label: area.areaName, value: area.id }))
  function setAreaId(id: number) {
    rawSetAreaId(id)
    rawSetInitialId(null)
    if (value !== undefined) onChange!(null)
  }

  const [initialId, rawSetInitialId] = useState<number | null>(value?.initialId ?? null)
  const initials = useLicensePlateInitial(areaId)
  const initialOptions = initials.map(initial => ({ label: initial.initials, value: initial.id }))
  function setInitialId(id: number) {
    if (areaId === null) return
    rawSetInitialId(id)
    onChange!({ areaId, initialId: id })
  }

  return <div styleName="type-input">
    <Select options={areaOptions} value={areaId} onChange={setAreaId} />
    <Select options={initialOptions} value={initialId} onChange={setInitialId} disabled={areaId === null} />
  </div>
}
