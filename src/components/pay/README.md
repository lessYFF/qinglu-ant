# Pay 支付组件

Pay 是一个集成支付宝扫码支付功能的组件，提供完整的支付流程界面，包括二维码显示、支付状态查询和结果展示。

## 功能特点

- 生成支付宝支付二维码
- 自动轮询查询支付状态
- 支付成功/失败/取消等状态展示
- 支持刷新二维码
- 支持取消支付并确认提示
- 自动处理支付流程生命周期

## 参数说明

| 参数        | 说明               | 类型               | 默认值     |
| ----------- | ------------------ | ------------------ | ---------- |
| isShow      | 是否显示支付模态框 | `boolean`          | -          |
| type        | 支付类型           | `typeEmum`         | -          |
| orderId     | 订单 ID            | `number \| string` | -          |
| payParams   | 支付参数           | `object`           | -          |
| okText      | 确认按钮文本       | `string`           | '支付完成' |
| cancelText  | 取消按钮文本       | `string`           | '取消支付' |
| onPayFinsh  | 支付完成回调       | `() => void`       | -          |
| onPayCancel | 取消支付回调       | `() => void`       | -          |

### typeEmum 类型

```ts
enum typeEmum {
  // 根据实际业务定义的支付类型枚举
  DEPOSIT = "DEPOSIT",
  ORDER = "ORDER",
  // 其他类型...
}
```

## 基本用法

```tsx
import { useState } from "react";
import { Button } from "antd";
import Pay from "@/components/pay";

export default () => {
  const [showPay, setShowPay] = useState(false);
  const [orderId] = useState("123456789");

  // 处理支付完成
  const handlePayFinish = () => {
    console.log("支付完成");
    setShowPay(false);
    // 执行支付完成后的业务逻辑
  };

  // 处理取消支付
  const handlePayCancel = () => {
    console.log("取消支付");
    setShowPay(false);
    // 执行取消支付后的业务逻辑
  };

  return (
    <>
      <Button type="primary" onClick={() => setShowPay(true)}>
        立即支付
      </Button>

      <Pay
        isShow={showPay}
        type="ORDER"
        orderId={orderId}
        payParams={
          {
            // 支付参数
          }
        }
        onPayFinsh={handlePayFinish}
        onPayCancel={handlePayCancel}
      />
    </>
  );
};
```

## 带自定义文本的支付组件

```tsx
import { useState } from "react";
import Pay from "@/components/pay";

export default () => {
  const [showPay, setShowPay] = useState(true);

  return (
    <Pay
      isShow={showPay}
      type="DEPOSIT"
      orderId="DEP12345"
      okText="确认已支付"
      cancelText="放弃支付"
      onPayFinsh={() => setShowPay(false)}
      onPayCancel={() => setShowPay(false)}
    />
  );
};
```

## 支付流程

1. 组件显示时，自动获取支付二维码
2. 用户使用支付宝扫描二维码进行支付
3. 组件自动轮询查询支付状态（每 3 秒一次）
4. 支付成功、失败或取消后，显示对应状态
5. 支付成功后，用户可点击"支付完成"按钮关闭模态框
6. 支付未完成时，用户可点击"取消支付"按钮取消订单

## 注意事项

1. 该组件仅支持支付宝扫码支付方式
2. 取消支付会自动取消订单，并请求后端接口
3. 支付状态查询会在组件卸载时自动停止
4. 二维码超时可点击刷新按钮重新获取

## 依赖

- React
- antd
- qrcode.react
- lodash
- @/lib/data-source/bill
