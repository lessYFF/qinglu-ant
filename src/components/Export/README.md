# Export 数据导出组件

Export 是一个简化数据导出操作的组件，它封装了导出文件的通用逻辑，使开发者能够轻松实现文件导出功能。

## 功能特点

- 简化文件导出操作，自动处理下载逻辑
- 支持自定义文件名
- 支持自定义按钮文本
- 支持多种按钮尺寸和类型
- 自动处理导出状态和错误提示

## 参数说明

| 参数     | 说明                                                   | 类型                             | 默认值      |
| -------- | ------------------------------------------------------ | -------------------------------- | ----------- |
| execute  | 执行导出的函数，返回一个 Promise，resolve 为 Blob 数据 | `() => Response<Blob>`           | -           |
| filename | 导出文件名                                             | `string \| (() => string)`       | '导出.xlsx' |
| text     | 按钮文本                                               | `React.ReactNode`                | '导出'      |
| size     | 按钮尺寸                                               | `'small' \| 'middle' \| 'large'` | 'middle'    |
| type     | 按钮类型                                               | `'link' \| undefined`            | undefined   |

## 基本用法

```tsx
import { Export } from "@/components";
import { exportData } from "@/services/api";

// 基本用法
export default () => <Export execute={exportData} />;

// 自定义文件名和按钮样式
export default () => (
  <Export
    execute={exportData}
    filename="用户数据.xlsx"
    text="导出用户数据"
    size="small"
    type="link"
  />
);

// 动态生成文件名
export default () => {
  const generateFilename = () => {
    const date = new Date().toLocaleDateString().replace(/\//g, "-");
    return `用户数据-${date}.xlsx`;
  };

  return (
    <Export
      execute={exportData}
      filename={generateFilename}
      text="导出用户数据"
    />
  );
};
```

## 注意事项

1. `execute`函数需要返回一个带有`success`、`data`和`error`属性的 Response 对象
2. 如果导出失败，组件会自动显示错误消息
3. 支持的文件类型由`execute`函数返回的 Blob 决定，常见的有 xlsx、csv、pdf 等

## 依赖

- React
- antd
