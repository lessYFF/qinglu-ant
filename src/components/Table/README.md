# Table 组件

Table 组件是对 Ant Design Table 组件的二次封装，预设了常用的配置和样式。

## 基本用法

```tsx
<Table dataSource={data} columns={columns} />
```

## 特性

- 默认设置 `tableLayout` 为 `fixed`，避免宽度频繁调整
- 默认设置 `size` 为 `middle`，适合绝大多数业务场景
- 支持所有 antd Table 组件的属性和方法

## 示例

### 基础表格

```tsx
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "上海市浦东新区",
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "北京市朝阳区",
  },
];

<Table dataSource={data} columns={columns} />;
```

### 使用 Table.Column

```tsx
<Table dataSource={data}>
  <Table.Column title="姓名" dataIndex="name" key="name" />
  <Table.Column title="年龄" dataIndex="age" key="age" />
  <Table.Column title="住址" dataIndex="address" key="address" />
</Table>
```
