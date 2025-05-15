import React from 'react'
import { Button, Space } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
import cs from 'classnames'
import styles from './styles.module.less'

export interface PageSectionProps {
  children?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  mainClassName?: string
  className?: string
}

export interface PageFooterProps {
  extra?: React.ReactNode
  onSubmit?: () => void
  onCancel?: () => void
  children?: React.ReactNode
  justify?: 'start' | 'flex-end' | 'center'
  confirmLoading?: boolean
}

export interface ModuleSectionProps {
  children?: React.ReactNode
  title: React.ReactNode
  titleContent?: React.ReactNode
  tip?: React.ReactNode
  className?: string
  extra?: React.ReactNode
}

export const PageFooter = (props: PageFooterProps) => {
  const { extra, onSubmit, onCancel, children, justify = 'end', confirmLoading } = props
  return (
    <footer className={styles.pageFooter} style={{ justifyContent: justify }}>
      {children ? (
        children
      ) : (
        <>
          <Space>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" loading={confirmLoading} onClick={onSubmit}>
              提交
            </Button>
          </Space>
          {extra}
        </>
      )}
    </footer>
  )
}

export const PageSection = (props: PageSectionProps) => {
  const { children, header, footer, className, mainClassName } = props
  return (
    <div className={cs(styles.pageSection, className)}>
      {header && <header>{header}</header>}
      <main className={cs(styles.main, mainClassName)}>{children}</main>
      {footer}
    </div>
  )
}

export const ModuleSection = (props: ModuleSectionProps) => {
  const { children, title, tip, className, extra, titleContent } = props
  return (
    <div className={cs(styles.moduleSection, className)}>
      <div className={styles.moduleHeader}>
        <div className={styles.leftBorder} />
        <div className={styles.titleBox}>
          <span className={styles.title}>{title}</span>
          {titleContent && <div className={styles.titleContent}>{titleContent}</div>}
        </div>
        {extra && <div>{extra}</div>}
      </div>
      {tip && (
        <div className={styles.moduleTip}>
          <InfoCircleFilled className={styles.tipIcon} />
          <div className={styles.tip}>{tip}</div>
        </div>
      )}
      {children && <div className={styles.moduleContent}>{children}</div>}
    </div>
  )
}
