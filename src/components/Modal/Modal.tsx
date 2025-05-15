/**
 * 对 Ant Design Modal 组件的二次封装
 * 预设了常用的配置 / 样式
 *
 * 最佳实践：
 * 1. width 设置成内容最适宜显示的宽度即可，不用怕设的太大显示不下，antd 预置了 max-width 进行兜底。
 */
import React from 'react'
import c from 'classnames'
import type { ModalProps as AntdModalProps } from 'antd'
import { Modal as AntdModal } from 'antd'


interface Props extends AntdModalProps {
  // 默认为 false，若传入 true：
  // - 会应用 ".app-bare-modal" class（详见 @/lib/style/common.less）
  // - 会关闭 footer
  bare?: boolean,
  children: React.ReactNode,
}


export function Modal(props: Props) {
  const { bare = false, className = '', ...restProps } = props

  const bareProps = bare
    ? { className: c('app-bare-modal', className), footer: null }
    : { className }

  const antdModalProps = {
    // Modal 原本预设的值，在这列出以避免歧义
    closable: true,
    maskClosable: true,

      // 根据应用需求定制的默认值
    destroyOnClose: true,

    ...restProps,
    ...bareProps
  }

  return <AntdModal {...antdModalProps} />
}


/**
 * 编辑型表单
 * - 点击 mask 不会关闭对话框（避免误关闭导致编辑内容丢失）
 * - 应用 bare（因为一般需要自定义 footer）
 * - 编辑型表单因为不能快速关闭，应在 footer 里提供“取消”按钮
 */
export function EditModal(props: Props) {
  return <Modal maskClosable={false} bare={true} {...props} />
}
