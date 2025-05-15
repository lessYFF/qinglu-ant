# ChooseModelsByStore 门店车型选择器

ChooseModelsByStore 是一个用于选择特定门店下可用车型的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持实时搜索和后端过滤。

## 导入

```tsx
import { ChooseModelsByStore } from "@/components";
```

## 功能特点

- 根据门店 ID 筛选可选车型
- 支持实时搜索（关键词搜索由后端处理）
- 支持单选和多选模式
- 节流处理，避免频繁请求

## 参数说明

| 参数        | 说明                                                  | 类型                                                                                      | 默认值    |
| ----------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------- |
| storeId     | 门店 ID，必填项                                       | `number`                                                                                  | -         |
| value       | 当前选中的车型 ID，单选时为 number，多选时为 number[] | `number \| number[]`                                                                      | -         |
| onChange    | 选择车型时的回调函数                                  | `(value: number \| number[], instance: StoreVehicleModel \| StoreVehicleModel[]) => void` | -         |
| multiple    | 是否为多选模式                                        | `boolean`                                                                                 | false     |
| placeholder | 占位提示文本                                          | `string`                                                                                  | 'ID/名称' |
| allowClear  | 是否可清除选项                                        | `boolean`                                                                                 | true      |
| disabled    | 是否禁用                                              | `boolean`                                                                                 | false     |

## 基本用法

```tsx
import { ChooseModelsByStore } from "@/components";
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

      <h4>选择门店内车型</h4>
      {storeId ? (
        <ChooseModelsByStore
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

## 多选模式

```tsx
import { ChooseModelsByStore } from "@/components";
import { useState } from "react";

export default () => {
  const [storeId, setStoreId] = useState<number>(1); // 假设门店ID为1
  const [modelIds, setModelIds] = useState<number[]>([]);

  return (
    <>
      <h4>选择多个车型</h4>
      <ChooseModelsByStore
        storeId={storeId}
        multiple
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
import { ChooseModelsByStore } from "@/components";

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
          <ChooseModelsByStore
            storeId={getFieldValue("storeId")}
            placeholder="请选择车型"
          />
        )}
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 必须提供`storeId`参数才能正常工作
2. 搜索功能由后端实现，前端仅负责传递关键词
3. 组件使用节流（throttle）处理，每 300ms 最多触发一次搜索请求
4. 默认占位符为"ID/名称"，表示可以通过 ID 或名称搜索

## 依赖

- React
- antd
- lodash/throttle
- @/lib/API
- @/lib/lang (工具函数)
