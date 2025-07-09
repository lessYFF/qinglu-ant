# MySearchForm 搜索表单组件

MySearchForm 是一个封装了常用搜索逻辑的表单组件，提供了统一的搜索表单布局和交互模式。

## 功能特性

- 🔍 集成常用搜索功能
- 🎯 支持多种表单控件
- 📱 响应式布局
- ⚡ 快速搜索和重置
- 🎨 可定制的表单布局
- 🔄 支持搜索条件回显

## 基本用法

```jsx
import { MySearchForm } from "@/components/base";

const BasicExample = () => {
  const handleSearch = (values) => {
    console.log("搜索条件:", values);
  };

  const handleReset = () => {
    console.log("重置搜索条件");
  };

  return (
    <MySearchForm
      onSearch={handleSearch}
      onReset={handleReset}
      fields={[
        {
          name: "keyword",
          label: "关键词",
          type: "input",
          placeholder: "请输入搜索关键词",
        },
        {
          name: "status",
          label: "状态",
          type: "select",
          options: [
            { label: "全部", value: "" },
            { label: "启用", value: 1 },
            { label: "禁用", value: 0 },
          ],
        },
      ]}
    />
  );
};
```

## 复杂搜索表单

```jsx
import { MySearchForm } from "@/components/base";

const AdvancedExample = () => {
  const handleSearch = (values) => {
    console.log("搜索条件:", values);
  };

  return (
    <MySearchForm
      onSearch={handleSearch}
      layout="inline"
      span={6}
      fields={[
        {
          name: "name",
          label: "姓名",
          type: "input",
          placeholder: "请输入姓名",
        },
        {
          name: "department",
          label: "部门",
          type: "select",
          placeholder: "请选择部门",
          options: [
            { label: "技术部", value: "tech" },
            { label: "市场部", value: "market" },
            { label: "销售部", value: "sales" },
          ],
        },
        {
          name: "createTime",
          label: "创建时间",
          type: "rangePicker",
          placeholder: ["开始日期", "结束日期"],
        },
        {
          name: "amount",
          label: "金额范围",
          type: "inputNumber",
          placeholder: "请输入金额",
        },
      ]}
    />
  );
};
```

## 自定义字段类型

```jsx
import { MySearchForm } from "@/components/base";
import { TreeSelect } from "antd";

const CustomFieldExample = () => {
  const treeData = [
    {
      title: "总公司",
      value: "company",
      children: [
        { title: "技术部", value: "tech" },
        { title: "市场部", value: "market" },
      ],
    },
  ];

  return (
    <MySearchForm
      onSearch={handleSearch}
      fields={[
        {
          name: "keyword",
          label: "关键词",
          type: "input",
        },
        {
          name: "organization",
          label: "组织架构",
          type: "custom",
          render: (field) => (
            <TreeSelect
              {...field}
              treeData={treeData}
              placeholder="请选择组织"
              allowClear
            />
          ),
        },
      ]}
    />
  );
};
```

## API 参数

| 参数          | 说明             | 类型                                     | 默认值         |
| ------------- | ---------------- | ---------------------------------------- | -------------- |
| fields        | 搜索字段配置     | `SearchField[]`                          | **必填**       |
| onSearch      | 搜索回调         | `(values: any) => void`                  | **必填**       |
| onReset       | 重置回调         | `() => void`                             | -              |
| layout        | 表单布局         | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| span          | 栅格占位格数     | `number`                                 | `8`            |
| labelCol      | label 标签布局   | `object`                                 | `{ span: 6 }`  |
| wrapperCol    | 输入控件布局     | `object`                                 | `{ span: 18 }` |
| initialValues | 初始值           | `object`                                 | -              |
| loading       | 搜索加载状态     | `boolean`                                | `false`        |
| showReset     | 是否显示重置按钮 | `boolean`                                | `true`         |
| submitText    | 搜索按钮文本     | `string`                                 | `'搜索'`       |
| resetText     | 重置按钮文本     | `string`                                 | `'重置'`       |

## SearchField 配置

| 参数        | 说明                      | 类型                                                                                | 默认值        |
| ----------- | ------------------------- | ----------------------------------------------------------------------------------- | ------------- |
| name        | 字段名                    | `string`                                                                            | **必填**      |
| label       | 标签名                    | `string`                                                                            | **必填**      |
| type        | 字段类型                  | `'input' \| 'select' \| 'datePicker' \| 'rangePicker' \| 'inputNumber' \| 'custom'` | **必填**      |
| placeholder | 占位符                    | `string \| string[]`                                                                | -             |
| options     | 选项数据（select 类型）   | `Array<{label: string, value: any}>`                                                | -             |
| rules       | 验证规则                  | `Rule[]`                                                                            | -             |
| span        | 栅格占位                  | `number`                                                                            | 继承表单 span |
| render      | 自定义渲染（custom 类型） | `(field: any) => ReactNode`                                                         | -             |

## 高级功能

### 条件联动

```jsx
import { MySearchForm } from "@/components/base";

const DependentExample = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);

  const handleProvinceChange = (province) => {
    // 根据省份获取城市列表
    fetchCities(province).then(setCities);
    form.setFieldsValue({ city: undefined });
  };

  return (
    <MySearchForm
      form={form}
      fields={[
        {
          name: "province",
          label: "省份",
          type: "select",
          options: provinces,
          onChange: handleProvinceChange,
        },
        {
          name: "city",
          label: "城市",
          type: "select",
          options: cities,
          dependencies: ["province"],
        },
      ]}
      onSearch={handleSearch}
    />
  );
};
```

### 搜索条件回显

```jsx
import { MySearchForm } from "@/components/base";

const PresetExample = () => {
  const initialSearchValues = {
    keyword: "预设关键词",
    status: 1,
    createTime: [dayjs().subtract(7, "day"), dayjs()],
  };

  return (
    <MySearchForm
      initialValues={initialSearchValues}
      fields={searchFields}
      onSearch={handleSearch}
    />
  );
};
```

### 折叠搜索表单

```jsx
import { MySearchForm } from "@/components/base";
import { useState } from "react";

const CollapsibleExample = () => {
  const [collapsed, setCollapsed] = useState(true);

  const allFields = [
    { name: "keyword", label: "关键词", type: "input" },
    { name: "status", label: "状态", type: "select", options: statusOptions },
    { name: "department", label: "部门", type: "select", options: deptOptions },
    { name: "createTime", label: "创建时间", type: "rangePicker" },
  ];

  const visibleFields = collapsed ? allFields.slice(0, 2) : allFields;

  return (
    <div>
      <MySearchForm
        fields={visibleFields}
        onSearch={handleSearch}
        extra={
          <Button type="link" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "展开" : "收起"}
          </Button>
        }
      />
    </div>
  );
};
```

## 样式定制

```less
.searchForm {
  .ant-form-item {
    margin-bottom: 16px;
  }

  .searchActions {
    text-align: right;
    margin-top: 16px;

    .ant-btn {
      margin-left: 8px;
    }
  }
}
```

## 注意事项

1. `fields`配置数组决定了搜索表单的字段和布局
2. 搜索和重置操作会自动处理表单的提交和清空
3. 使用`custom`类型时需要通过`render`函数自定义组件
4. 支持 Ant Design Form 的所有验证规则
5. 初始值会在组件挂载和重置时应用

## 依赖

- React
- antd (Form, Input, Select, DatePicker, Button 等)
- dayjs (日期处理)
- @/lib/lang (工具函数)
