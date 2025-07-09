# MultipleSelect 多选选择器

MultipleSelect 是一个功能增强的多选选择器组件，支持批量选择、自定义渲染和高级筛选功能。

## 功能特性

- ✅ 支持多选和单选模式
- 🔍 内置搜索筛选功能
- 📦 支持批量操作（全选、反选、清空）
- 🎨 高度可定制的选项渲染
- 🏷️ 支持选项分组
- 📱 响应式设计
- ⚡ 支持虚拟滚动（大数据量）

## 基本用法

```jsx
import { MultipleSelect } from "@/components/base";

const BasicExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = [
    { label: "选项1", value: "option1" },
    { label: "选项2", value: "option2" },
    { label: "选项3", value: "option3" },
    { label: "选项4", value: "option4" },
  ];

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      placeholder="请选择选项"
    />
  );
};
```

## 带搜索功能

```jsx
import { MultipleSelect } from "@/components/base";

const SearchableExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
  ];

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      showSearch
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      placeholder="搜索并选择水果"
    />
  );
};
```

## 批量操作

```jsx
import { MultipleSelect } from "@/components/base";

const BatchExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = Array.from({ length: 20 }, (_, i) => ({
    label: `选项 ${i + 1}`,
    value: `option${i + 1}`,
  }));

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      showSelectAll
      showClear
      showInvert
      placeholder="支持批量操作的选择器"
    />
  );
};
```

## 选项分组

```jsx
import { MultipleSelect } from "@/components/base";

const GroupExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = [
    {
      label: "水果",
      options: [
        { label: "苹果", value: "apple" },
        { label: "香蕉", value: "banana" },
      ],
    },
    {
      label: "蔬菜",
      options: [
        { label: "胡萝卜", value: "carrot" },
        { label: "西兰花", value: "broccoli" },
      ],
    },
  ];

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      placeholder="分组选择器"
    />
  );
};
```

## 自定义选项渲染

```jsx
import { MultipleSelect } from "@/components/base";
import { Avatar, Tag } from "antd";

const CustomRenderExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = [
    {
      label: "张三",
      value: "zhangsan",
      avatar: "https://joeschmoe.io/api/v1/male/1",
      department: "技术部",
    },
    {
      label: "李四",
      value: "lisi",
      avatar: "https://joeschmoe.io/api/v1/female/1",
      department: "市场部",
    },
  ];

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      optionRender={(option) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar src={option.avatar} size="small" />
          <span>{option.label}</span>
          <Tag size="small">{option.department}</Tag>
        </div>
      )}
      placeholder="自定义选项渲染"
    />
  );
};
```

## API 参数

| 参数          | 说明             | 类型                                         | 默认值       |
| ------------- | ---------------- | -------------------------------------------- | ------------ |
| value         | 选中的值         | `string[] \| number[]`                       | `[]`         |
| onChange      | 选择变化回调     | `(values: any[]) => void`                    | -            |
| options       | 选项数据         | `Option[] \| GroupOption[]`                  | **必填**     |
| placeholder   | 占位符           | `string`                                     | -            |
| disabled      | 是否禁用         | `boolean`                                    | `false`      |
| showSearch    | 是否支持搜索     | `boolean`                                    | `false`      |
| filterOption  | 自定义筛选逻辑   | `(input: string, option: Option) => boolean` | -            |
| showSelectAll | 是否显示全选按钮 | `boolean`                                    | `false`      |
| showClear     | 是否显示清空按钮 | `boolean`                                    | `false`      |
| showInvert    | 是否显示反选按钮 | `boolean`                                    | `false`      |
| maxTagCount   | 最大标签显示数量 | `number`                                     | -            |
| mode          | 选择模式         | `'multiple' \| 'single'`                     | `'multiple'` |
| size          | 尺寸             | `'large' \| 'middle' \| 'small'`             | `'middle'`   |
| optionRender  | 自定义选项渲染   | `(option: Option) => ReactNode`              | -            |
| loading       | 加载状态         | `boolean`                                    | `false`      |
| virtual       | 是否启用虚拟滚动 | `boolean`                                    | `false`      |

## Option 数据结构

```typescript
interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any; // 支持自定义属性
}

interface GroupOption {
  label: string;
  options: Option[];
}
```

## 高级功能

### 异步加载数据

```jsx
import { MultipleSelect } from "@/components/base";

const AsyncExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword) => {
    if (!keyword) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${keyword}`);
      const data = await response.json();
      setOptions(
        data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      showSearch
      loading={loading}
      onSearch={handleSearch}
      placeholder="输入关键词搜索"
    />
  );
};
```

### 自定义标签渲染

```jsx
import { MultipleSelect } from "@/components/base";
import { Tag } from "antd";

const CustomTagExample = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <MultipleSelect
      value={selectedValues}
      onChange={setSelectedValues}
      options={options}
      tagRender={tagRender}
      placeholder="自定义标签样式"
    />
  );
};
```

### 表单集成

```jsx
import { Form } from "antd";
import { MultipleSelect } from "@/components/base";

const FormExample = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="selectedOptions"
        label="选择选项"
        rules={[
          { required: true, message: "请至少选择一个选项" },
          { type: "array", min: 1, message: "至少选择一个选项" },
        ]}
      >
        <MultipleSelect
          options={options}
          placeholder="请选择"
          showSelectAll
          showClear
        />
      </Form.Item>
    </Form>
  );
};
```

## 样式定制

```less
.multipleSelect {
  .ant-select-selector {
    border-radius: 6px;
  }

  .ant-select-selection-item {
    background: #f0f8ff;
    border-color: #1890ff;
  }

  &.ant-select-focused {
    .ant-select-selector {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
}
```

## 注意事项

1. 大数据量时建议启用虚拟滚动(`virtual=true`)以提升性能
2. 自定义选项渲染时注意保持一致的高度，避免滚动异常
3. 异步搜索时建议添加防抖处理，避免频繁请求
4. 分组选项和普通选项不能混用
5. 使用自定义属性时要确保不与内置属性冲突

## 依赖

- React
- antd (Select)
- @/lib/lang (工具函数)
- CSS Modules
