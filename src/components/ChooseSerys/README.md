# ChooseSerys 车系选择器

ChooseSerys 是一个用于选择车系的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持按品牌筛选、搜索过滤和新增车系功能。

## 导入

```tsx
import { ChooseSerys } from "@/components";
```

## 功能特点

- 根据品牌 ID 筛选可选车系
- 支持搜索过滤功能
- 支持新增车系（可选）
- 品牌 ID 变化时自动重置选中值
- 自动加载车系数据

## 参数说明

| 参数        | 说明                                          | 类型                                      | 默认值   |
| ----------- | --------------------------------------------- | ----------------------------------------- | -------- |
| brandId     | 品牌 ID，必填项，未选择品牌时组件处于禁用状态 | `number`                                  | -        |
| value       | 当前选中的车系 ID                             | `number`                                  | -        |
| onChange    | 选择车系时的回调函数                          | `(value: number, instance: Sery) => void` | -        |
| addable     | 是否显示"新增"功能                            | `boolean`                                 | false    |
| placeholder | 占位提示文本                                  | `string`                                  | '请选择' |
| allowClear  | 是否可清除选项                                | `boolean`                                 | true     |
| disabled    | 是否禁用                                      | `boolean`                                 | false    |

## 基本用法

```tsx
import { ChooseSerys } from "@/components";
import { useState } from "react";

export default () => {
  const [brandId, setBrandId] = useState<number>();
  const [seryId, setSeryId] = useState<number>();

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h4>选择品牌</h4>
        <input
          type="number"
          placeholder="输入品牌ID"
          onChange={(e) => setBrandId(Number(e.target.value))}
        />
      </div>

      <h4>选择车系</h4>
      <ChooseSerys
        brandId={brandId}
        value={seryId}
        onChange={(value) => setSeryId(value)}
      />

      <div style={{ marginTop: 16 }}>
        当前选择的车系ID: {seryId ?? "未选择"}
      </div>
    </>
  );
};
```

## 带新增功能的车系选择器

```tsx
import { ChooseSerys } from "@/components";
import { useState } from "react";

export default () => {
  const [brandId, setBrandId] = useState<number>(1); // 假设品牌ID为1
  const [seryId, setSeryId] = useState<number>();

  return (
    <ChooseSerys
      brandId={brandId}
      value={seryId}
      onChange={(value) => setSeryId(value)}
      addable={true}
    />
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseSerys } from "@/components";

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
        {({ getFieldValue }) => (
          <ChooseSerys
            brandId={getFieldValue("brandId")}
            placeholder="请选择车系"
          />
        )}
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 必须提供`brandId`参数，否则组件将处于禁用状态
2. 当`brandId`变化时，组件会自动清除已选择的车系
3. 组件内部使用`useSerys`钩子获取车系数据，需要确保应用中已配置相关数据源
4. 新增车系功能需要设置`addable=true`才会显示

## 依赖

- React
- antd
- @/lib/data-source (useSerys, Sery 类型)
- @/lib/lang (工具函数)
