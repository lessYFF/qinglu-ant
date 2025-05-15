# EnumSelect 组件

EnumSelect 组件用于对枚举（enum）类型的数据进行选择，简化了将枚举类型转换为下拉选项的过程。

## 基本用法

```tsx
// 枚举定义
enum Status {
  Active = 1,
  Inactive = 0,
  Pending = 2,
}

// 使用组件
<EnumSelect source={Status} value={statusValue} onChange={setStatusValue} />;
```

## 添加额外选项

```tsx
<EnumSelect
  source={Status}
  extra={[{ label: "全部", value: -1 }]}
  value={statusValue}
  onChange={setStatusValue}
/>
```

## 属性

- `source`: 枚举对象，格式为 Record<string, string | number>
- `extra`: 额外的选项，格式为 { label: string, value: number }[]
- 支持所有 antd Select 组件的属性

## 工作原理

EnumSelect 组件使用 `getEnumEntries` 函数将枚举对象转换为选项数组，每个选项包含：

- `label`: 枚举的键名（作为显示文本）
- `value`: 枚举的键值（作为选择值）

如果提供了 `extra` 属性，这些额外选项会被添加到枚举选项之前。
