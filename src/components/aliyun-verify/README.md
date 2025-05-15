# AliyunVerify 阿里云验证组件

AliyunVerify 是集成了阿里云验证服务的组件，用于在用户操作时提供安全验证功能，如短信验证码发送前的人机验证。

## 功能特点

- 集成阿里云验证码服务
- 提供模态框形式的验证界面
- 支持触发按钮自动倒计时
- 验证结果自动回调
- 可自定义样式和文案

## 组件说明

AliyunVerify 包含两个主要组件：

1. `AliyunVerifyModal` - 验证码模态框组件
2. `VerifyTrigger` - 验证触发按钮组件（包含倒计时功能）

## 参数说明

### AliyunVerifyModal

| 参数      | 说明               | 类型                             | 默认值 |
| --------- | ------------------ | -------------------------------- | ------ |
| open      | 是否显示验证模态框 | `boolean`                        | -      |
| onSuccess | 验证成功的回调函数 | `(result: VerifyResult) => void` | -      |
| onCancel  | 取消验证的回调函数 | `() => void`                     | -      |

### VerifyTrigger

| 参数           | 说明                                            | 类型                                         | 默认值             |
| -------------- | ----------------------------------------------- | -------------------------------------------- | ------------------ |
| countdownText  | 自定义倒计时文本                                | `(countdown: number) => string`              | `(val) => ${val}S` |
| onVerified     | 验证通过后的回调函数，返回 false 则不开始倒计时 | `(result: VerifyResult) => Promise<boolean>` | -                  |
| ...buttonProps | 其他 Ant Design Button 组件支持的所有属性       | -                                            | -                  |

### VerifyResult 类型

```ts
interface VerifyResult {
  sessionId: string;
  sig: string;
  token: string;
}
```

## 基本用法

### 使用 VerifyTrigger 组件

```tsx
import { VerifyTrigger } from "@/components/aliyun-verify";

export default () => {
  // 验证成功后的处理函数
  const handleVerified = async (result) => {
    console.log("验证结果:", result);

    // 发送验证码逻辑
    try {
      await sendSmsCode(result);
      return true; // 返回true表示验证码发送成功，开始倒计时
    } catch (error) {
      console.error("发送验证码失败", error);
      return false; // 返回false表示验证码发送失败，不开始倒计时
    }
  };

  return (
    <VerifyTrigger
      type="primary"
      onVerified={handleVerified}
      countdownText={(countdown) => `${countdown}秒后重新获取`}
    >
      获取验证码
    </VerifyTrigger>
  );
};
```

### 直接使用 AliyunVerifyModal 组件

```tsx
import { useState } from "react";
import { Button } from "antd";
import { AliyunVerifyModal } from "@/components/aliyun-verify";

export default () => {
  const [visible, setVisible] = useState(false);

  const handleSuccess = (result) => {
    console.log("验证结果:", result);
    setVisible(false);
    // 后续业务逻辑处理
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>点击验证</Button>

      <AliyunVerifyModal
        open={visible}
        onSuccess={handleSuccess}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};
```

## 注意事项

1. 使用前需要确保已配置阿里云验证服务的 AppKey（在 `@/lib/config` 中的 `verifyAppKey`）
2. 组件会自动加载阿里云验证服务所需的脚本
3. 验证通过后，需要将验证结果传递给后端进行验证
4. 在测试环境中，可以通过设置 `config.verifyTest` 来模拟验证结果

## 依赖

- React
- antd
- @/lib/config
- @/lib/lang
- @/components/Modal
