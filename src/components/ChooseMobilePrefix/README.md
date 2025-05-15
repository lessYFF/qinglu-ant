# ChooseMobilePrefix 手机国际区号选择器

ChooseMobilePrefix 是一个用于选择手机国际区号的下拉选择器组件，基于 Ant Design 的 Select 组件封装。目前该组件被锁定为"+86"（中国大陆区号）。

## 导入

```tsx
import { ChooseMobilePrefix } from "@/components";
```

## 功能特点

- 提供全球各国家/地区的电话区号选择
- 显示国家/地区名称和对应区号
- 当前版本中默认锁定为中国大陆区号(+86)

## 参数说明

| 参数     | 说明                 | 类型                      | 默认值 |
| -------- | -------------------- | ------------------------- | ------ |
| value    | 当前选中的区号       | `string`                  | -      |
| onChange | 选择区号时的回调函数 | `(value: string) => void` | -      |

## 基本用法

```tsx
import { ChooseMobilePrefix } from "@/components";
import { useState } from "react";

export default () => {
  const [prefix, setPrefix] = useState<string>("86");

  return (
    <>
      <h4>选择手机区号</h4>
      <ChooseMobilePrefix value={prefix} onChange={setPrefix} />

      <div style={{ marginTop: 16 }}>当前选择的区号: +{prefix}</div>
    </>
  );
};
```

## 与手机号输入框结合使用

```tsx
import { ChooseMobilePrefix } from "@/components";
import { Input, Space } from "antd";
import { useState } from "react";

export default () => {
  const [prefix, setPrefix] = useState<string>("86");
  const [mobile, setMobile] = useState<string>("");

  return (
    <>
      <h4>输入手机号</h4>
      <Space>
        <ChooseMobilePrefix value={prefix} onChange={setPrefix} />
        <Input
          style={{ width: 200 }}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="请输入手机号"
        />
      </Space>

      <div style={{ marginTop: 16 }}>
        完整手机号: +{prefix} {mobile}
      </div>
    </>
  );
};
```

## 注意事项

1. 当前组件被设置为禁用状态（`disabled={true}`），固定使用"+86"区号
2. 组件内部包含了全球各国家/地区的区号数据，但目前界面上不可选择
3. 如需启用其他区号选择，需要移除组件代码中的`disabled`属性
4. 组件返回的值为纯区号（如"86"），不包含"+"符号

## 依赖

- React
- antd
- 内部 codes.ts 数据文件（包含全球区号信息）
