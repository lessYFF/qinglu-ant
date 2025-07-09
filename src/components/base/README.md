# 基础组件 (Base Components)

基础组件库提供了一系列通用的、可复用的基础 UI 组件，这些组件对 Ant Design 进行了二次封装，增加了更多实用功能和统一的设计规范。

## 组件列表

### 表单类组件

- **PriceInput** - 价格输入框组件，支持格式化显示和值转换
- **MySearchForm** - 搜索表单组件，封装了常用的搜索表单逻辑
- **MultipleSelect** - 多选选择器，支持批量选择和自定义渲染

### 数据展示组件

- **MyProTable** - 高级表格组件，基于 ProTable 封装，增加了更多实用功能
- **SectionBox** - 分组容器组件，用于组织页面内容的展示

### 交互组件

- **LinkButton** - 链接按钮组件，提供了统一的链接样式
- **MyUpload** - 上传组件，支持多种文件类型的上传和预览

## 使用方式

```jsx
import {
  PriceInput,
  MySearchForm,
  MultipleSelect,
  MyProTable,
  SectionBox,
  LinkButton,
  MyUpload,
} from "@/components/base";

// 在组件中使用
const MyComponent = () => {
  return (
    <SectionBox title="表单示例">
      <MySearchForm onSearch={handleSearch} />
      <PriceInput placeholder="请输入价格" />
      <MultipleSelect options={options} placeholder="请选择选项" />
    </SectionBox>
  );
};
```

## 设计原则

1. **一致性** - 所有基础组件保持统一的设计风格和交互模式
2. **可复用性** - 组件设计考虑了多种使用场景，提供灵活的配置选项
3. **易用性** - 简化常用操作，提供合理的默认值和预设配置
4. **扩展性** - 支持自定义样式和功能扩展

## 注意事项

- 所有基础组件都依赖 Ant Design，使用前请确保项目已安装 antd
- 组件样式使用 CSS Modules，避免样式冲突
- 部分组件可能依赖项目特定的工具函数，使用时请注意依赖关系

## 更多信息

每个子组件都有详细的文档说明，请查看对应组件目录下的 README.md 文件。
