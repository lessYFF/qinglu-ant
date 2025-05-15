# ChooseChannel 渠道选择器

ChooseChannel 是一个用于选择业务渠道的下拉选择器组件，基于 Ant Design 的 Select 组件进行封装，自动获取渠道数据并进行过滤和格式化。

## 功能特点

- 自动获取并加载渠道数据
- 自动过滤特定渠道（ID 为 21、22、23 的渠道）
- 支持清除选择
- 支持自定义样式

## 参数说明

| 参数     | 说明                 | 类型                              | 默认值 |
| -------- | -------------------- | --------------------------------- | ------ |
| value    | 选中的渠道 ID        | `number \| null`                  | -      |
| onChange | 选择渠道时的回调函数 | `(value: number \| null) => void` | -      |

## 基本用法

```tsx
import { ChooseChannel } from "@/components";
import { useState } from "react";

export default () => {
  const [channelId, setChannelId] = useState<number | null>(null);

  return (
    <>
      <h4>选择渠道</h4>
      <ChooseChannel value={channelId} onChange={setChannelId} />

      <div style={{ marginTop: 16 }}>
        当前选择的渠道ID: {channelId ?? "未选择"}
      </div>
    </>
  );
};
```

## 在表单中使用

```tsx
import { Form } from "antd";
import { ChooseChannel } from "@/components";

export default () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("表单值:", values);
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        name="channelId"
        label="渠道"
        rules={[{ required: true, message: "请选择渠道" }]}
      >
        <ChooseChannel />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 组件内部使用`useChannels`钩子获取渠道数据，需要确保应用中已配置相关的数据源
2. 组件内部已过滤掉 ID 为 21、22、23 的渠道，如需更改过滤规则，需要修改组件源码
3. 组件支持受控模式，建议通过`value`和`onChange`属性进行状态管理

## 依赖

- React
- antd
- @/lib/data-source (useChannels)
