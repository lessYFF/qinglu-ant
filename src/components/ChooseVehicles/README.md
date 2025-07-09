# ChooseVehicles 车辆选择器

ChooseVehicles 是一个专用于选择车辆的组件，支持按条件筛选和快速查找车辆。

## 功能特性

- 🚗 支持多种车辆筛选条件
- 🔍 内置搜索功能，支持车牌号查找
- 📋 支持单选和多选模式
- 🏪 支持按门店筛选车辆
- 🔄 支持车辆状态筛选
- 📱 响应式设计

## 基本用法

```jsx
import { ChooseVehicles } from "@/components";

const BasicExample = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  return (
    <ChooseVehicles
      value={selectedVehicles}
      onChange={setSelectedVehicles}
      placeholder="请选择车辆"
    />
  );
};
```

## 按门店筛选

```jsx
import { ChooseVehicles } from "@/components";

const StoreFilterExample = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  return (
    <ChooseVehicles
      value={selectedVehicles}
      onChange={setSelectedVehicles}
      storeId={123}
      placeholder="选择指定门店的车辆"
    />
  );
};
```

## API 参数

| 参数        | 说明          | 类型                 | 默认值         |
| ----------- | ------------- | -------------------- | -------------- |
| value       | 选中的车辆 ID | `number[] \| number` | -              |
| onChange    | 选择变化回调  | `(value) => void`    | -              |
| multiple    | 是否多选      | `boolean`            | `false`        |
| storeId     | 门店 ID 筛选  | `number`             | -              |
| status      | 车辆状态筛选  | `VehicleStatus`      | -              |
| placeholder | 占位符        | `string`             | `'请选择车辆'` |
| disabled    | 是否禁用      | `boolean`            | `false`        |

## 依赖

- React
- antd
- @/lib/data-source/vehicle
