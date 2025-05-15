/**
 * 支持多选、用实例对象做 value 的 Select 组件的 Props
 * {
 *   multiple?: boolean,    默认为 false，设为 true 则 value 为数组
 *   instance?: boolean,    默认为 false，设为 true 则 value 为实例对象而不是 id
 * }
 */
export type ExtSelectProps<IdT, InstT, Ext> =
  | (SingleProps<IdT> & { instance?: false } & Ext)
  | (MultipleProps<IdT> & { instance?: false } & Ext)
  | (SingleProps<InstT> & { instance: true } & Ext)
  | (MultipleProps<InstT> & { instance: true } & Ext)

interface SingleProps<ValueT> {
  multiple?: false
  value?: ValueT
  onChange?: (value: ValueT | undefined) => void
}

interface MultipleProps<ValueT> {
  multiple: true
  value?: ValueT[]
  onChange?: (value: ValueT[]) => void
}

/**
 * 与 ExtSelectProps 适配的 value 和 onChange 格式化函数
 * 要求：要以此格式生成 option：{ value: IdT, label: any, instance: InstT }
 */
export function formatExtSelectProps<IdT, InstT, ExtProps>(
  props: ExtSelectProps<IdT, InstT, ExtProps>,
  getId: (instance: InstT) => IdT
) {
  const {
    multiple = false,
    instance = false,
    value: inputValue,
    onChange: inputOnChange,
    ...rest
  } = props

  function formatValue() {
    if (instance) {
      const raw = inputValue as InstT | InstT[]
      return Array.isArray(raw) ? raw.map(getId) : raw !== undefined ? getId(raw) : undefined
    } else {
      return inputValue as IdT | IdT[]
    }
  }
  const value = formatValue()

  function onChange(
    value: IdT | IdT[] | undefined,
    options: { instance: InstT } | { instance: InstT }[] | undefined
  ) {
    const formattedValue = instance
      ? Array.isArray(options)
        ? options.map(v => v.instance)
        : options?.instance
      : value
    inputOnChange?.(formattedValue as IdT & InstT & IdT[] & InstT[])
  }

  return {
    multiple,
    instance,
    value,
    onChange,
    ...rest,
  }
}

export type FormattedExtSelectProps<IdT, InstT, ExtProps> = ReturnType<
  typeof formatExtSelectProps<IdT, InstT, ExtProps>
>
