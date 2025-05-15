# Search 搜索组件

Search 是一个通用搜索表单组件，简化搜索表单的创建和处理，提供了统一的布局和样式。

## 功能特点

- 基于 Ant Design 的 Form 组件封装
- 统一的搜索和重置按钮布局
- 支持表单值变化实时回调
- 支持表单重置功能
- 支持权限控制（集成 Roles 组件）
- 灵活的布局方式支持

## 参数说明

| 参数           | 说明                         | 类型                                     | 默认值   |
| -------------- | ---------------------------- | ---------------------------------------- | -------- |
| initialValues  | 表单初始值                   | `Partial<Values>`                        | -        |
| onSearch       | 点击搜索按钮时的回调函数     | `(values?: Values) => void`              | -        |
| onChange       | 表单值变化时的回调函数       | `(values: Partial<Values>) => void`      | -        |
| handleLation   | 违章查询按钮点击回调         | `() => void`                             | -        |
| disabledSearch | 是否禁用搜索按钮             | `boolean`                                | false    |
| resetAble      | 是否显示重置按钮             | `boolean`                                | true     |
| violation      | 是否显示违章查询按钮         | `boolean`                                | false    |
| children       | 表单内容                     | `React.ReactNode`                        | -        |
| layout         | 表单布局方式                 | `'horizontal' \| 'vertical' \| 'inline'` | 'inline' |
| ...others      | 其他 Form 组件支持的所有属性 | -                                        | -        |

## 基本用法

```tsx
import { Search } from "@/components";
import { Form, Input, Select, DatePicker } from "antd";

export default () => {
  // 处理搜索提交
  const handleSearch = (values) => {
    console.log("搜索条件:", values);
  };

  return (
    <Search onSearch={handleSearch} initialValues={{ status: "all" }}>
      <Form.Item name="keyword" label="关键词">
        <Input placeholder="请输入关键词" />
      </Form.Item>

      <Form.Item name="status" label="状态">
        <Select
          options={[
            { label: "全部", value: "all" },
            { label: "进行中", value: "processing" },
            { label: "已完成", value: "done" },
          ]}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <DatePicker />
      </Form.Item>
    </Search>
  );
};
```

## 分组显示

Search 组件支持通过`.app-search-group`类名对表单项进行分组显示。

```tsx
import { Search } from "@/components";
import { Form, Input, DatePicker } from "antd";

export default () => {
  return (
    <Search onSearch={console.log}>
      <Form.Item name="name" label="姓名">
        <Input placeholder="请输入姓名" />
      </Form.Item>

      {/* 时间范围会显示在一行 */}
      <div className="app-search-group">
        <Form.Item name="startDate" label="开始日期">
          <DatePicker />
        </Form.Item>

        <Form.Item name="endDate" label="结束日期">
          <DatePicker />
        </Form.Item>
      </div>
    </Search>
  );
};
```

## 带违章查询的搜索

```tsx
import { Search } from "@/components";
import { Form, Input } from "antd";

export default () => {
  // 处理违章查询
  const handleViolation = () => {
    console.log("查询违章");
  };

  return (
    <Search
      onSearch={console.log}
      violation={true}
      handleLation={handleViolation}
    >
      <Form.Item name="plateNumber" label="车牌号">
        <Input placeholder="请输入车牌号" />
      </Form.Item>
    </Search>
  );
};
```

## 注意事项

1. Search 组件需要包含至少一个 Form.Item 子组件
2. 违章查询按钮只有同时满足以下条件才会显示：
   - violation 属性设置为 true
   - 用户具有"car:violation"权限
3. 重置会清除所有表单项的值，并触发 onSearch 回调（传递空值）

## 依赖

- React
- antd
- @/components/Roles
