# ChooseModelsByStoreForStock 库存车型选择器

ChooseModelsByStoreForStock 是一个用于选择特定门店库存车型的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持搜索过滤和"全部车型"选项。

## 功能特点

- 根据门店 ID 筛选可选车型
- 支持搜索过滤
- 支持单选和多选模式
- 可选添加"全部车型"选项
- 自动处理全选/取消全选逻辑

## 参数说明

| 参数        | 说明                                                          | 类型                                                                                            | 默认值    |
| ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------- |
| storeId     | 门店 ID，必填项                                               | `number`                                                                                        | -         |
| value       | J 当前选中的车型 ID，单选时为 number，多选时为 number[]       | `number \| number[]`                                                                            | -         |
| onChange    | 选择车型时的回调函数                                          | `(value: number \| number[], instance: SimpleModelFromStore \| SimpleModelFromStore[]) => void` | -         |
| multiple    | 是否为多选模式                                                | `boolean`                                                                                       | false     |
| withAll     | 是否显示"全部车型"选项（ID 为 0，仅在非 instance 模式下有效） | `boolean`                                                                                       | false     |
| placeholder | 占位提示文本                                                  | `string`                                                                                        | 'ID/名称' |
| allowClear  | 是否可清除选项                                                | `boolean`                                                                                       | true      |
| disabled    | 是否禁用                                                      | `boolean`                                                                                       | false     |

## 基本用法

```tsx
import { ChooseModelsByStoreForStock } from "@/components";
import { useState } from "react";

export default () => {
  const [storeId, setStoreId] = useState<number>();
  const [modelId, setModelId] = useState<number>();

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h4>选择门店</h4>
        <input
          type="number"
          placeholder="输入门店ID"
          onChange={(e) => setStoreId(Number(e.target.value))}
        />
      </div>

      <h4>选择门店库存车型</h4>
      {storeId ? (
        <ChooseModelsByStoreForStock
          storeId={storeId}
          value={modelId}
          onChange={(value) => setModelId(value as number)}
        />
      ) : (
        <div>请先选择门店</div>
      )}

      <div style={{ marginTop: 16 }}>
        当前选择的车型ID: {modelId ?? "未选择"}
      </div>
    </>
  );
};
```

## 带"全部车型"选项的多选模式

```tsx
import { ChooseModelsByStoreForStock } from "@/components";
import { useState } from "react";

export default () => {
  const [storeId, setStoreId] = useState<number>(1); // 假设门店ID为1
  const [modelIds, setModelIds] = useState<number[]>([]);

  return (
    <>
      <h4>选择多个车型（含全部选项）</h4>
      <ChooseModelsByStoreForStock
        storeId={storeId}
        multiple
        withAll
        value={modelIds}
        onChange={(value) => setModelIds(value as number[])}
      />

      <div style={{ marginTop: 16 }}>
        已选择的车型IDs: {modelIds.length ? modelIds.join(", ") : "未选择"}
      </div>
    </>
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseModelsByStoreForStock } from "@/components";

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="storeId" label="门店" rules={[{ required: true }]}>
        {/* 门店选择器组件 */}
      </Form.Item>

      <Form.Item
        name="modelId"
        label="车型"
        rules={[{ required: true }]}
        dependencies={["storeId"]}
      >
        {({ getFieldValue }) => (
          <ChooseModelsByStoreForStock
            storeId={getFieldValue("storeId")}
            placeholder="请选择库存车型"
          />
        )}
      </Form.Item>

      <Form.Item name="modelIds" label="多个车型" dependencies={["storeId"]}>
        {({ getFieldValue }) => (
          <ChooseModelsByStoreForStock
            storeId={getFieldValue("storeId")}
            multiple
            withAll
            placeholder="请选择多个库存车型"
          />
        )}
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 必须提供`storeId`参数才能正常工作
2. 当选择"全部车型"选项（ID 为 0）时，组件会自动选择所有可用车型
3. 在多选模式下，如果选择了除"全部车型"外的所有选项，组件会自动变为选择"全部车型"
4. `withAll`参数只在非 instance 模式下有效

## 依赖

- React
- antd
- @/lib/lang (keywordCompare 等工具函数)
- @/lib/data-source (useSearchSimpleModelsFromStore, SimpleModelFromStore 类型)
