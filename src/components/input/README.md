# Input 组件

Input 组件提供了一系列与输入相关的增强组件，用于满足不同场景下的输入需求。

## 组件列表

### AlphaInput

只能输入数字和字母的文本框，并且会自动将字母大写。

```tsx
<AlphaInput placeholder="请输入内容" />
```

**属性：**

- 支持所有 antd Input 组件的属性
- `value`: 文本框的值
- `onChange`: 值变化时的回调函数 `(value: string) => void`

### MinuteDatePicker

精确到"分钟"的日期时间选择器。

```tsx
<MinuteDatePicker />
```

**属性：**

- 支持所有 antd DatePicker 组件的属性

### MinuteRangePicker

精确到"分钟"的日期时间范围选择器。

```tsx
<MinuteRangePicker />
```

**属性：**

- 支持所有 antd DatePicker.RangePicker 组件的属性

### CardCheckbox

卡片形式的 Checkbox，options 为数组或 Enum。

```tsx
<CardCheckbox
  options={[
    { label: "选项1", value: "option1" },
    { label: "选项2", value: "option2" },
  ]}
  value={["option1"]}
  onChange={(value) => console.log(value)}
/>
```

**属性：**

- `options`: 选项数组，或者枚举对象
- `value`: 选中的值数组
- `onChange`: 值变化时的回调函数 `(value: T[]) => void`
- `className`: 自定义 CSS 类名

### MoneyInput

金额输入框，自动处理单位转换（元/分）。

```tsx
<MoneyInput value={10000} onChange={(value) => console.log(value)} />
```

**属性：**

- 支持所有 antd InputNumber 组件的属性
- `value`: 金额，以"分"为单位
- `onChange`: 值变化时的回调函数 `(value: number | null) => void`，返回值以"分"为单位
