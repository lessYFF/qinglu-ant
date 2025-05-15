# NamesSelect 多名称选择器

NamesSelect 是一个基于 Ant Design Select 组件的封装，用于方便地从一系列名称中进行选择。组件会自动将传入的名称列表转换为 Select 组件需要的选项格式。

## 功能特点

- 简化了选项配置，可以直接传入字符串数组
- 支持传入标准的 Select 选项对象（{label, value}）
- 继承了 Ant Design Select 组件的所有属性和功能
- 自定义样式类，方便进行样式覆盖

## 参数说明

| 参数   | 说明                           | 类型                                             | 默认值 |
| ------ | ------------------------------ | ------------------------------------------------ | ------ |
| source | 选项源数据                     | `(string \| { label: string, value: string })[]` | -      |
| ...    | 其他 Select 组件支持的所有属性 | 见 Ant Design Select 组件文档                    | -      |

## 基本用法

```tsx
import { NamesSelect } from "@/components";

// 使用字符串数组
const names = ["张三", "李四", "王五"];

// 使用对象数组
const options = [
  { label: "张三", value: "zhangsan" },
  { label: "李四", value: "lisi" },
  { label: "王五", value: "wangwu" },
];

export default () => (
  <>
    <h4>字符串数组</h4>
    <NamesSelect source={names} placeholder="请选择姓名" />

    <h4>对象数组</h4>
    <NamesSelect source={options} placeholder="请选择姓名" />

    <h4>支持多选</h4>
    <NamesSelect source={names} mode="multiple" placeholder="请选择多个姓名" />
  </>
);
```

## 注意事项

1. 当使用字符串数组作为 source 时，选项的 label 和 value 都会被设置为相同的字符串
2. 当需要不同的展示文本和选择值时，请使用对象数组形式 `{label, value}`
3. 组件支持 Ant Design Select 的所有属性，如`mode`、`allowClear`、`showSearch`等

## 依赖

- React
- antd
- classnames
