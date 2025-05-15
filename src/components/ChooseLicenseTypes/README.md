# ChooseLicenseTypes 牌照类型选择器

ChooseLicenseTypes 是一个用于选择牌照类型的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持搜索过滤、新增牌照类型和多选功能。

## 功能特点

- 支持搜索过滤功能
- 支持新增牌照类型（可选）
- 支持单选和多选模式
- 自动加载牌照类型数据

## 参数说明

| 参数        | 说明                                                      | 类型                                                                          | 默认值   |
| ----------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| value       | 当前选中的牌照类型 ID，单选时为 number，多选时为 number[] | `number \| number[]`                                                          | -        |
| onChange    | 选择牌照类型时的回调函数                                  | `(value: number \| number[], instance: LicenseType \| LicenseType[]) => void` | -        |
| addable     | 是否显示"新增"功能                                        | `boolean`                                                                     | false    |
| multiple    | 是否为多选模式                                            | `boolean`                                                                     | false    |
| placeholder | 占位提示文本                                              | `string`                                                                      | '请选择' |
| allowClear  | 是否可清除选项                                            | `boolean`                                                                     | true     |
| disabled    | 是否禁用                                                  | `boolean`                                                                     | false    |

## 基本用法

```tsx
import { ChooseLicenseTypes } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeId, setLicenseTypeId] = useState<number>();

  return (
    <>
      <h4>选择牌照类型</h4>
      <ChooseLicenseTypes
        value={licenseTypeId}
        onChange={(value) => setLicenseTypeId(value as number)}
      />

      <div style={{ marginTop: 16 }}>
        当前选择的牌照类型ID: {licenseTypeId ?? "未选择"}
      </div>
    </>
  );
};
```

## 多选模式

```tsx
import { ChooseLicenseTypes } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeIds, setLicenseTypeIds] = useState<number[]>([]);

  return (
    <>
      <h4>选择多个牌照类型</h4>
      <ChooseLicenseTypes
        multiple
        value={licenseTypeIds}
        onChange={(value) => setLicenseTypeIds(value as number[])}
      />

      <div style={{ marginTop: 16 }}>
        已选择的牌照类型IDs:{" "}
        {licenseTypeIds.length ? licenseTypeIds.join(", ") : "未选择"}
      </div>
    </>
  );
};
```

## 带新增功能的牌照类型选择器

```tsx
import { ChooseLicenseTypes } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeId, setLicenseTypeId] = useState<number>();

  return (
    <ChooseLicenseTypes
      value={licenseTypeId}
      onChange={(value) => setLicenseTypeId(value as number)}
      addable={true}
    />
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseLicenseTypes } from "@/components";

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="licenseTypeId"
        label="牌照类型"
        rules={[{ required: true, message: "请选择牌照类型" }]}
      >
        <ChooseLicenseTypes placeholder="请选择牌照类型" />
      </Form.Item>

      <Form.Item name="licenseTypeIds" label="多个牌照类型">
        <ChooseLicenseTypes multiple placeholder="请选择多个牌照类型" />
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 组件内部使用`useLicenseTypes`钩子获取牌照类型数据，需要确保应用中已配置相关数据源
2. 新增牌照类型功能需要设置`addable=true`才会显示
3. 在多选模式下，`value`和`onChange`的值类型为数组

## 依赖

- React
- antd
- @/lib/data-source (useLicenseTypes, LicenseType 类型)
- @/lib/lang (keywordCompare 等工具函数)
