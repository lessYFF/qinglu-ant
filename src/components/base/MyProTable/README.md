# MyProTable 高级表格组件

MyProTable 是基于 Ant Design ProTable 的二次封装，提供了更丰富的功能和更好的用户体验。

## 功能特性

- 📊 集成搜索、排序、筛选功能
- 📱 响应式设计，支持移动端
- 🔄 支持数据刷新和自动刷新
- 📤 内置导出功能
- 🎯 支持行选择和批量操作
- 🎨 高度可定制的列配置
- 📦 支持工具栏自定义
- ⚡ 支持虚拟滚动

## 基本用法

```jsx
import { MyProTable } from "@/components/base";

const BasicExample = () => {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: true,
      search: true,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      sorter: true,
      search: false,
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department",
      valueType: "select",
      valueEnum: {
        tech: "技术部",
        market: "市场部",
        sales: "销售部",
      },
    },
    {
      title: "操作",
      valueType: "option",
      render: (_, record) => [<a key="edit">编辑</a>, <a key="delete">删除</a>],
    },
  ];

  const fetchData = async (params) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(params),
    });
    const result = await response.json();

    return {
      data: result.list,
      total: result.total,
      success: true,
    };
  };

  return (
    <MyProTable
      columns={columns}
      request={fetchData}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};
```

## 搜索表单定制

```jsx
import { MyProTable } from "@/components/base";

const SearchExample = () => {
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      search: true,
      fieldProps: {
        placeholder: "请输入用户名",
      },
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      valueType: "dateRange",
      search: true,
      hideInTable: true, // 仅在搜索中显示
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: {
        0: { text: "禁用", status: "Error" },
        1: { text: "启用", status: "Success" },
      },
      search: true,
    },
  ];

  return (
    <MyProTable
      columns={columns}
      request={fetchData}
      search={{
        labelWidth: 120,
        collapsed: false,
        collapseRender: (collapsed) => (collapsed ? "展开" : "收起"),
        searchText: "搜索",
        resetText: "重置",
      }}
    />
  );
};
```

## 工具栏自定义

```jsx
import { MyProTable } from "@/components/base";
import { Button, Dropdown, Menu } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";

const ToolbarExample = () => {
  const menu = (
    <Menu>
      <Menu.Item key="export">导出数据</Menu.Item>
      <Menu.Item key="import">导入数据</Menu.Item>
    </Menu>
  );

  return (
    <MyProTable
      columns={columns}
      request={fetchData}
      toolBarRender={() => [
        <Button key="add" type="primary" icon={<PlusOutlined />}>
          新建
        </Button>,
        <Dropdown key="more" overlay={menu}>
          <Button>
            更多操作 <DownOutlined />
          </Button>
        </Dropdown>,
      ]}
      tableAlertRender={({ selectedRowKeys }) =>
        selectedRowKeys.length > 0 && (
          <div>
            已选择 {selectedRowKeys.length} 项
            <Button type="link" onClick={handleBatchDelete}>
              批量删除
            </Button>
          </div>
        )
      }
    />
  );
};
```

## 行选择和批量操作

```jsx
import { MyProTable } from "@/components/base";

const SelectionExample = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleBatchOperation = (type) => {
    console.log(`批量${type}`, selectedRows);
  };

  return (
    <MyProTable
      columns={columns}
      request={fetchData}
      rowSelection={{
        selectedRowKeys: selectedRows.map((row) => row.id),
        onChange: (_, rows) => setSelectedRows(rows),
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
          {
            key: "odd",
            text: "选择奇数行",
            onSelect: (changableRowKeys) => {
              const keys = changableRowKeys.filter(
                (_, index) => index % 2 === 0
              );
              setSelectedRows(keys);
            },
          },
        ],
      }}
      tableAlertOptionRender={({ selectedRowKeys }) => (
        <div>
          <Button size="small" onClick={() => handleBatchOperation("删除")}>
            批量删除
          </Button>
          <Button size="small" onClick={() => handleBatchOperation("导出")}>
            批量导出
          </Button>
        </div>
      )}
    />
  );
};
```

## API 参数

| 参数         | 说明         | 类型                                          | 默认值     |
| ------------ | ------------ | --------------------------------------------- | ---------- |
| columns      | 表格列配置   | `ProColumnType[]`                             | **必填**   |
| request      | 数据请求函数 | `(params) => Promise<{data, total, success}>` | -          |
| dataSource   | 静态数据源   | `any[]`                                       | -          |
| rowKey       | 行键         | `string \| (record) => string`                | `'id'`     |
| search       | 搜索配置     | `SearchConfig \| false`                       | `{}`       |
| toolbar      | 工具栏配置   | `ToolbarConfig`                               | `{}`       |
| pagination   | 分页配置     | `PaginationConfig \| false`                   | `{}`       |
| rowSelection | 行选择配置   | `RowSelectionConfig`                          | -          |
| size         | 表格尺寸     | `'large' \| 'middle' \| 'small'`              | `'middle'` |
| loading      | 加载状态     | `boolean`                                     | `false`    |
| scroll       | 滚动设置     | `{x?: number, y?: number}`                    | -          |
| virtual      | 虚拟滚动     | `boolean`                                     | `false`    |

## 列配置 (ProColumnType)

除了 Ant Design Table 的列配置外，还支持以下增强属性：

| 参数          | 说明                 | 类型                                                                 | 默认值   |
| ------------- | -------------------- | -------------------------------------------------------------------- | -------- |
| search        | 是否在搜索表单中显示 | `boolean`                                                            | `false`  |
| hideInTable   | 是否在表格中隐藏     | `boolean`                                                            | `false`  |
| hideInSearch  | 是否在搜索表单中隐藏 | `boolean`                                                            | `false`  |
| valueType     | 值类型               | `'text' \| 'select' \| 'date' \| 'dateRange' \| 'money' \| 'option'` | `'text'` |
| valueEnum     | 枚举值配置           | `{[key]: {text, status}}`                                            | -        |
| fieldProps    | 表单字段属性         | `object`                                                             | -        |
| formItemProps | 表单项属性           | `object`                                                             | -        |

## 高级功能

### 自定义搜索组件

```jsx
import { MyProTable } from "@/components/base";

const CustomSearchExample = () => {
  const columns = [
    {
      title: "价格范围",
      dataIndex: "priceRange",
      hideInTable: true,
      search: true,
      renderFormItem: () => (
        <Input.Group compact>
          <InputNumber
            style={{ width: "40%" }}
            placeholder="最低价"
            name="minPrice"
          />
          <Input
            style={{ width: "20%", textAlign: "center" }}
            placeholder="~"
            disabled
          />
          <InputNumber
            style={{ width: "40%" }}
            placeholder="最高价"
            name="maxPrice"
          />
        </Input.Group>
      ),
    },
  ];

  return <MyProTable columns={columns} request={fetchData} />;
};
```

### 表格状态持久化

```jsx
import { MyProTable } from "@/components/base";

const PersistentExample = () => {
  return (
    <MyProTable
      columns={columns}
      request={fetchData}
      options={{
        setting: true, // 显示列设置
        reload: true, // 显示刷新按钮
        density: true, // 显示密度调整
        fullScreen: true, // 显示全屏按钮
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
      }}
    />
  );
};
```

### 嵌套表格

```jsx
import { MyProTable } from "@/components/base";

const NestedExample = () => {
  const expandedRowRender = (record) => {
    const nestedColumns = [
      { title: "子项目", dataIndex: "subName" },
      { title: "进度", dataIndex: "progress" },
    ];

    return (
      <MyProTable
        columns={nestedColumns}
        dataSource={record.subItems}
        pagination={false}
        search={false}
        toolBarRender={false}
      />
    );
  };

  return (
    <MyProTable
      columns={columns}
      request={fetchData}
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => record.hasSubItems,
      }}
    />
  );
};
```

## 样式定制

```less
.myProTable {
  .ant-pro-table-search {
    padding: 16px;
    background: #fafafa;
  }

  .ant-pro-table-list-toolbar {
    padding: 16px 0;
  }

  .ant-table-tbody > tr:hover > td {
    background: #e6f7ff;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 600;
  }
}
```

## 注意事项

1. `request`函数必须返回指定格式的数据结构
2. 搜索表单的字段名应与表格列的`dataIndex`对应
3. 使用虚拟滚动时需要设置固定的行高
4. 批量操作时注意处理异步操作的状态
5. 自定义搜索组件要确保表单值的正确收集

## 依赖

- React
- @ant-design/pro-table
- antd
- @/lib/lang (工具函数)
- CSS Modules
