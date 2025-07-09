# PriceInput 价格输入组件

PriceInput 是一个专用于价格输入的组件，提供了价格格式化、单位转换、数值验证等功能。

## 功能特性

- 💰 支持多种货币格式（元、分、美元等）
- 🔢 自动格式化数字显示
- ⚡ 实时数值验证
- 🎯 支持小数位控制
- 🚫 支持最大最小值限制
- 🔄 支持单位自动转换

## 基本用法

```jsx
import { PriceInput } from "@/components/base";

const BasicExample = () => {
  const [price, setPrice] = useState();

  return (
    <PriceInput value={price} onChange={setPrice} placeholder="请输入价格" />
  );
};
```

## 货币格式化

```jsx
import { PriceInput } from "@/components/base";

const CurrencyExample = () => {
  const [price, setPrice] = useState();

  return (
    <PriceInput
      value={price}
      onChange={setPrice}
      currency="CNY"
      prefix="¥"
      suffix="元"
      placeholder="请输入金额"
    />
  );
};
```

## 精度控制

```jsx
import { PriceInput } from "@/components/base";

const PrecisionExample = () => {
  const [price, setPrice] = useState();

  return (
    <PriceInput
      value={price}
      onChange={setPrice}
      precision={2}
      step={0.01}
      placeholder="保留两位小数"
    />
  );
};
```

## 数值范围限制

```jsx
import { PriceInput } from "@/components/base";

const RangeExample = () => {
  const [price, setPrice] = useState();

  return (
    <PriceInput
      value={price}
      onChange={setPrice}
      min={0}
      max={999999.99}
      placeholder="请输入0-999999.99之间的价格"
    />
  );
};
```

## 单位转换

```jsx
import { PriceInput } from "@/components/base";

const ConversionExample = () => {
  const [priceInCents, setPriceInCents] = useState(); // 以分为单位存储

  return (
    <PriceInput
      value={priceInCents}
      onChange={setPriceInCents}
      unit="cent" // 内部以分为单位
      displayUnit="yuan" // 界面显示为元
      placeholder="输入金额（元）"
    />
  );
};
```

## API 参数

| 参数        | 说明             | 类型                             | 默认值     |
| ----------- | ---------------- | -------------------------------- | ---------- |
| value       | 当前值           | `number \| string`               | -          |
| onChange    | 值变化回调       | `(value: number) => void`        | -          |
| currency    | 货币类型         | `'CNY' \| 'USD' \| 'EUR'`        | `'CNY'`    |
| prefix      | 前缀符号         | `string`                         | -          |
| suffix      | 后缀符号         | `string`                         | -          |
| precision   | 小数位数         | `number`                         | `2`        |
| step        | 步长             | `number`                         | `1`        |
| min         | 最小值           | `number`                         | -          |
| max         | 最大值           | `number`                         | -          |
| unit        | 内部存储单位     | `'yuan' \| 'cent'`               | `'yuan'`   |
| displayUnit | 显示单位         | `'yuan' \| 'cent'`               | `'yuan'`   |
| placeholder | 占位符           | `string`                         | -          |
| disabled    | 是否禁用         | `boolean`                        | `false`    |
| size        | 尺寸             | `'large' \| 'middle' \| 'small'` | `'middle'` |
| formatter   | 自定义格式化函数 | `(value: number) => string`      | -          |
| parser      | 自定义解析函数   | `(value: string) => number`      | -          |

## 高级用法

### 自定义格式化

```jsx
import { PriceInput } from "@/components/base";

const CustomFormatExample = () => {
  const [price, setPrice] = useState();

  const formatPrice = (value) => {
    return value ? `$${value.toFixed(2)}` : "";
  };

  const parsePrice = (value) => {
    return parseFloat(value.replace(/\$\s?|(,*)/g, ""));
  };

  return (
    <PriceInput
      value={price}
      onChange={setPrice}
      formatter={formatPrice}
      parser={parsePrice}
      placeholder="自定义格式化"
    />
  );
};
```

### 响应式尺寸

```jsx
import { PriceInput } from "@/components/base";
import { Row, Col } from "antd";

const ResponsiveExample = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <PriceInput size="small" placeholder="小尺寸" />
      </Col>
      <Col span={8}>
        <PriceInput size="middle" placeholder="中等尺寸" />
      </Col>
      <Col span={8}>
        <PriceInput size="large" placeholder="大尺寸" />
      </Col>
    </Row>
  );
};
```

## 事件处理

```jsx
import { PriceInput } from "@/components/base";
import { message } from "antd";

const EventExample = () => {
  const [price, setPrice] = useState();

  const handleChange = (value) => {
    setPrice(value);
    console.log("价格变化:", value);
  };

  const handleBlur = () => {
    if (price && price < 10) {
      message.warning("价格不能低于10元");
    }
  };

  return (
    <PriceInput
      value={price}
      onChange={handleChange}
      onBlur={handleBlur}
      min={0}
      placeholder="请输入价格"
    />
  );
};
```

## 表单集成

```jsx
import { Form } from "antd";
import { PriceInput } from "@/components/base";

const FormExample = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="price"
        label="商品价格"
        rules={[
          { required: true, message: "请输入商品价格" },
          { type: "number", min: 0, message: "价格不能为负数" },
        ]}
      >
        <PriceInput placeholder="请输入价格" />
      </Form.Item>
    </Form>
  );
};
```

## 注意事项

1. 组件内部会自动处理数值的格式化和解析
2. 使用单位转换时，注意`value`的实际单位
3. `precision`会影响数值的显示和存储精度
4. 建议在表单中使用时配合相应的验证规则
5. 自定义格式化函数时要确保与解析函数对应

## 依赖

- React
- antd (InputNumber)
- 数值处理工具函数
