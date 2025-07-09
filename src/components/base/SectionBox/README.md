# SectionBox 分组容器组件

SectionBox 是一个用于页面内容分组的容器组件，提供了统一的标题样式和内容区域布局。

## 功能特性

- 🏷️ 支持自定义标题和副标题
- 🎨 提供多种样式主题
- 📱 响应式布局支持
- 🔧 支持自定义操作按钮
- 📦 支持内容区域的自定义布局

## 基本用法

```jsx
import { SectionBox } from "@/components/base";

const BasicExample = () => {
  return (
    <SectionBox title="基本信息">
      <p>这里是内容区域</p>
    </SectionBox>
  );
};
```

## 带副标题和操作按钮

```jsx
import { SectionBox } from "@/components/base";
import { Button } from "antd";

const AdvancedExample = () => {
  const extra = <Button type="primary">编辑</Button>;

  return (
    <SectionBox title="用户信息" subtitle="管理用户的基本信息" extra={extra}>
      <div>
        <p>姓名：张三</p>
        <p>邮箱：zhangsan@example.com</p>
      </div>
    </SectionBox>
  );
};
```

## 不同样式主题

```jsx
import { SectionBox } from "@/components/base";

const ThemedExample = () => {
  return (
    <>
      <SectionBox title="默认主题" theme="default">
        <p>默认样式的分组容器</p>
      </SectionBox>

      <SectionBox title="卡片主题" theme="card">
        <p>卡片样式的分组容器</p>
      </SectionBox>

      <SectionBox title="简约主题" theme="simple">
        <p>简约样式的分组容器</p>
      </SectionBox>
    </>
  );
};
```

## API 参数

| 参数      | 说明           | 类型                              | 默认值      |
| --------- | -------------- | --------------------------------- | ----------- |
| title     | 标题文字       | `string \| ReactNode`             | -           |
| subtitle  | 副标题文字     | `string \| ReactNode`             | -           |
| extra     | 右侧操作区域   | `ReactNode`                       | -           |
| theme     | 主题样式       | `'default' \| 'card' \| 'simple'` | `'default'` |
| className | 自定义样式类名 | `string`                          | -           |
| style     | 自定义样式     | `CSSProperties`                   | -           |
| children  | 内容区域       | `ReactNode`                       | -           |

## 样式定制

组件使用 CSS Modules，可以通过覆盖以下样式类来自定义外观：

```less
// 自定义样式示例
.sectionBox {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header {
  background: linear-gradient(90deg, #1890ff, #36cfc9);
  color: white;
}

.content {
  padding: 24px;
}
```

## 注意事项

1. 标题支持字符串和 React 节点，可以传入复杂的标题结构
2. extra 区域通常用于放置操作按钮，建议保持简洁
3. 不同主题下的样式会有所差异，请根据页面整体设计选择合适的主题
4. 内容区域会自动适应容器宽度，支持响应式布局

## 依赖

- React
- antd
- 项目 CSS Modules 配置
