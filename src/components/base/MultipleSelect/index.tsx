import React, { useState, useEffect } from 'react'
import { Checkbox, Divider, Select, SelectProps } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import styles from './styles.module.less'

interface MultipleSelectProps extends SelectProps {
  isShowAll?: boolean
}

export const MultipleSelect = (props: MultipleSelectProps) => {
  const { isShowAll = false, style, ...rest } = props
  const labelKey = props?.fieldNames?.label || 'label'
  const valueKey = props?.fieldNames?.value || 'value'
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  useEffect(() => {
    if (props.options) {
      setCheckAll(props.value?.length === props.options?.length)
      setIndeterminate(props.value?.length > 0 && props.value?.length < props.options.length)
    }
  }, [props.value, props.options])

  const handleCheckAll = (e: CheckboxChangeEvent) => {
    const { checked } = e.target
    props?.onChange?.(
      checked ? props?.options?.map((item) => item[valueKey]) || [] : [],
      checked ? props?.options || [] : []
    )
  }

  return (
    // <div className={styles.multipleSelect} style={style}>
      <Select
        mode="multiple"
        className={styles.multipleSelect}
        style={style}
        dropdownMatchSelectWidth
        filterOption={(input, option) =>
          option?.[labelKey]?.toLowerCase().includes(input.toLowerCase())
        }
        dropdownRender={(menu) => (
          <>
            {isShowAll && (
              <>
                <Checkbox
                  className={styles.selectAll}
                  onChange={handleCheckAll}
                  indeterminate={indeterminate}
                  checked={checkAll}
                >
                  全部
                </Checkbox>
                <Divider style={{ margin: '8px 0' }} />
              </>
            )}
            {menu}
          </>
        )}
        {...rest}
      />
    // </div>
  )
}
