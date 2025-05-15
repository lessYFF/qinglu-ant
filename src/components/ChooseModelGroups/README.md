# ChooseModelGroups 车型分组选择器

ChooseModelGroups 是一个用于选择车型分组的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持搜索过滤、新增分组和多选功能。

## 导入

```tsx
import { ChooseModelGroups } from "@/components";
```

## 功能特点

- 支持搜索过滤功能
- 支持新增车型分组（可选）
- 支持单选和多选模式
- 自动加载车型分组数据

## 参数说明

| 参数        | 说明                                                  | 类型                                                                        | 默认值   |
| ----------- | ----------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| value       | 当前选中的分组 ID，单选时为 number，多选时为 number[] | `number \| number[]`                                                        | -        |
| onChange    | 选择分组时的回调函数                                  | `(value: number \| number[], instance: ModelGroup \| ModelGroup[]) => void` | -        |
| addable     | 是否显示"新增"功能                                    | `boolean`                                                                   | false    |
| multiple    | 是否为多选模式                                        | `boolean`                                                                   | false    |
| placeholder | 占位提示文本                                          | `string`                                                                    | '请选择' |
| allowClear  | 是否可清除选项                                        | `boolean`                                                                   | true     |
| disabled    | 是否禁用                                              | `boolean`                                                                   | false    |

## 基本用法

```tsx
import { ChooseModelGroups } from "@/components";
import { useState } from "react";

export default () => {
  const [groupId, setGroupId] = useState<number>();

  return (
    <>
      <h4>选择车型分组</h4>
      <ChooseModelGroups
        value={groupId}
        onChange={(value) => setGroupId(value as number)}
      />

      <div style={{ marginTop: 16 }}>
        当前选择的分组ID: {groupId ?? "未选择"}
      </div>
    </>
  );
};
```

## 多选模式

```tsx
import { ChooseModelGroups } from "@/components";
import { useState } from "react";

export default () => {
  const [groupIds, setGroupIds] = useState<number[]>([]);

  return (
    <>
      <h4>选择多个车型分组</h4>
      <ChooseModelGroups
        multiple
        value={groupIds}
        onChange={(value) => setGroupIds(value as number[])}
      />

      <div style={{ marginTop: 16 }}>
        已选择的分组IDs: {groupIds.length ? groupIds.join(", ") : "未选择"}
      </div>
    </>
  );
};
```

## 带新增功能的分组选择器

```tsx
import { ChooseModelGroups } from "@/components";
import { useState } from "react";

export default () => {
  const [groupId, setGroupId] = useState<number>();

  return (
    <ChooseModelGroups
      value={groupId}
      onChange={(value) => setGroupId(value as number)}
      addable={true}
    />
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseModelGroups } from "@/components";

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="groupId"
        label="车型分组"
        rules={[{ required: true, message: "请选择车型分组" }]}
      >
        <ChooseModelGroups placeholder="请选择车型分组" />
      </Form.Item>

      <Form.Item name="groupIds" label="多个车型分组">
        <ChooseModelGroups multiple placeholder="请选择多个车型分组" />
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 组件内部使用`useModelGroups`钩子获取车型分组数据，需要确保应用中已配置相关数据源
2. 新增分组功能需要设置`addable=true`才会显示
3. 在多选模式下，`value`和`onChange`的值类型为数组

## 依赖

- React
- antd
- @/lib/data-source (useModelGroups, ModelGroup 类型)
- @/lib/lang (工具函数)
