# ChooseLicenseTypesByName 牌照类型名称选择器

ChooseLicenseTypesByName 是一个用于按名称选择牌照类型的下拉选择器组件，基于 Ant Design 的 Select 组件封装，支持搜索过滤、新增牌照类型和多选功能。与 ChooseLicenseTypes 的主要区别是，此组件以牌照类型名称作为值，而不是 ID。

## 功能特点

- 支持搜索过滤功能
- 支持新增牌照类型（可选）
- 支持单选和多选模式
- 自动加载牌照类型数据
- 以名称（licenseTypeName）而非 ID 作为选择值

## 参数说明

| 参数           | 说明                                                       | 类型                                                                          | 默认值   |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| value          | 当前选中的牌照类型名称，单选时为 string，多选时为 string[] | `string \| string[]`                                                          | -        |
| onChange       | 选择牌照类型时的回调函数                                   | `(value: string \| string[], instance: LicenseType \| LicenseType[]) => void` | -        |
| addable        | 是否显示"新增"功能                                         | `boolean`                                                                     | false    |
| multiple       | 是否为多选模式                                             | `boolean`                                                                     | false    |
| placeholder    | 占位提示文本                                               | `string`                                                                      | '请选择' |
| allowClear     | 是否可清除选项                                             | `boolean`                                                                     | true     |
| disabled       | 是否禁用                                                   | `boolean`                                                                     | false    |
| setVehicleName | 设置 options 列表的回调函数                                | `Function`                                                                    | -        |

## 基本用法

```tsx
import { ChooseLicenseTypesByName } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeName, setLicenseTypeName] = useState<string>();

  return (
    <>
      <h4>选择牌照类型</h4>
      <ChooseLicenseTypesByName
        value={licenseTypeName}
        onChange={(value) => setLicenseTypeName(value as string)}
      />

      <div style={{ marginTop: 16 }}>
        当前选择的牌照类型名称: {licenseTypeName ?? "未选择"}
      </div>
    </>
  );
};
```

## 多选模式

```tsx
import { ChooseLicenseTypesByName } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeNames, setLicenseTypeNames] = useState<string[]>([]);

  return (
    <>
      <h4>选择多个牌照类型</h4>
      <ChooseLicenseTypesByName
        multiple
        value={licenseTypeNames}
        onChange={(value) => setLicenseTypeNames(value as string[])}
      />

      <div style={{ marginTop: 16 }}>
        已选择的牌照类型名称:{" "}
        {licenseTypeNames.length ? licenseTypeNames.join(", ") : "未选择"}
      </div>
    </>
  );
};
```

## 带新增功能的牌照类型选择器

```tsx
import { ChooseLicenseTypesByName } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeName, setLicenseTypeName] = useState<string>();

  return (
    <ChooseLicenseTypesByName
      value={licenseTypeName}
      onChange={(value) => setLicenseTypeName(value as string)}
      addable={true}
    />
  );
};
```

## 获取选项列表

```tsx
import { ChooseLicenseTypesByName } from "@/components";
import { useState } from "react";

export default () => {
  const [licenseTypeName, setLicenseTypeName] = useState<string>();
  const [options, setOptions] = useState([]);

  return (
    <>
      <ChooseLicenseTypesByName
        value={licenseTypeName}
        onChange={(value) => setLicenseTypeName(value as string)}
        setVehicleName={setOptions}
      />

      <div style={{ marginTop: 16 }}>可用选项数量: {options.length}</div>
    </>
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseLicenseTypesByName } from "@/components";

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="licenseTypeName"
        label="牌照类型"
        rules={[{ required: true, message: "请选择牌照类型" }]}
      >
        <ChooseLicenseTypesByName placeholder="请选择牌照类型" />
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 组件内部使用`useLicenseTypes`钩子获取牌照类型数据，需要确保应用中已配置相关数据源
2. 与 ChooseLicenseTypes 不同，此组件以牌照类型名称作为值，而不是 ID
3. 可以通过`setVehicleName`回调获取完整的选项列表
4. 缺少 React useEffect 的导入

## 依赖

- React
- antd
- @/lib/data-source (useLicenseTypes, LicenseType 类型)
- @/lib/lang (keywordCompare 等工具函数)
