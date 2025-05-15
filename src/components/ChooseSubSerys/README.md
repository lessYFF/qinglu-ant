# ChooseSubSerys 子车系选择器

ChooseSubSerys 是一个用于选择子车系（界面上通常称为"车型"）的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持按品牌和车系筛选，并提供搜索过滤和新增功能。

## 导入

```tsx
import { ChooseSubSerys } from "@/components";
```

## 功能特点

- 支持根据品牌 ID 和车系 ID 筛选可选子车系
- 支持搜索过滤功能
- 支持新增子车系（可选）
- 车系 ID 变化时自动重置选中值
- 自动加载子车系数据

## 参数说明

| 参数        | 说明                                          | 类型                                         | 默认值   |
| ----------- | --------------------------------------------- | -------------------------------------------- | -------- |
| brandId     | 品牌 ID，必填项，未选择品牌时组件处于禁用状态 | `number`                                     | -        |
| seryId      | 车系 ID，必填项，未选择车系时组件处于禁用状态 | `number`                                     | -        |
| value       | 当前选中的子车系 ID                           | `number`                                     | -        |
| onChange    | 选择子车系时的回调函数                        | `(value: number, instance: SubSery) => void` | -        |
| addable     | 是否显示"新增"功能                            | `boolean`                                    | false    |
| placeholder | 占位提示文本                                  | `string`                                     | '请选择' |
| allowClear  | 是否可清除选项                                | `boolean`                                    | true     |
| disabled    | 是否禁用                                      | `boolean`                                    | false    |

## 基本用法

```tsx
import { ChooseSubSerys } from "@/components";
import { useState } from "react";

export default () => {
  const [brandId, setBrandId] = useState<number>();
  const [seryId, setSeryId] = useState<number>();
  const [subSeryId, setSubSeryId] = useState<number>();

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h4>选择品牌和车系</h4>
        <input
          type="number"
          placeholder="输入品牌ID"
          onChange={(e) => setBrandId(Number(e.target.value))}
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="输入车系ID"
          onChange={(e) => setSeryId(Number(e.target.value))}
        />
      </div>

      <h4>选择子车系</h4>
      <ChooseSubSerys
        brandId={brandId}
        seryId={seryId}
        value={subSeryId}
        onChange={(value) => setSubSeryId(value)}
      />

      <div style={{ marginTop: 16 }}>
        当前选择的子车系ID: {subSeryId ?? "未选择"}
      </div>
    </>
  );
};
```

## 带新增功能的子车系选择器

```tsx
import { ChooseSubSerys } from "@/components";
import { useState } from "react";

export default () => {
  const [brandId, setBrandId] = useState<number>(1); // 假设品牌ID为1
  const [seryId, setSeryId] = useState<number>(100); // 假设车系ID为100
  const [subSeryId, setSubSeryId] = useState<number>();

  return (
    <ChooseSubSerys
      brandId={brandId}
      seryId={seryId}
      value={subSeryId}
      onChange={(value) => setSubSeryId(value)}
      addable={true}
    />
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseSubSerys } from "@/components";

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="brandId" label="品牌" rules={[{ required: true }]}>
        {/* 品牌选择器组件 */}
      </Form.Item>

      <Form.Item
        name="seryId"
        label="车系"
        rules={[{ required: true }]}
        dependencies={["brandId"]}
      >
        {/* 车系选择器组件 */}
      </Form.Item>

      <Form.Item
        name="subSeryId"
        label="车型"
        rules={[{ required: true }]}
        dependencies={["brandId", "seryId"]}
      >
        {({ getFieldValue }) => (
          <ChooseSubSerys
            brandId={getFieldValue("brandId")}
            seryId={getFieldValue("seryId")}
            placeholder="请选择车型"
          />
        )}
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 必须同时提供`brandId`和`seryId`参数，否则组件将处于禁用状态
2. 当`seryId`变化时，组件会自动清除已选择的子车系
3. 组件内部使用`useSubSerys`钩子获取子车系数据，需要确保应用中已配置相关数据源
4. 界面上通常将子车系称为"车型"，但在代码中使用 SubSery 来区分与一般意义上的车型（Model）

## 依赖

- React
- antd
- @/lib/data-source (useSubSerys, SubSery 类型)
- @/lib/lang (工具函数)
