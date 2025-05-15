# ChooseModels 组件

ChooseModels 组件用于选择车型，支持搜索和过滤功能。

## 导入

```tsx
import { ChooseModels } from "@/components";
```

## 基本用法

```tsx
<ChooseModels value={modelId} onChange={setModelId} />
```

## 多选模式

```tsx
<ChooseModels multiple value={modelIds} onChange={setModelIds} />
```

## 根据门店筛选车型

```tsx
<ChooseModels storeIdList={storeId} value={modelId} onChange={setModelId} />
```

## 属性

### 基础属性

- `value`: 选中的车型 ID（单选）或 ID 数组（多选）
- `onChange`: 值变更回调函数 `(value: number | number[]) => void`
- `multiple`: 是否启用多选模式，默认为 false
- `format`: 自定义格式化函数，转换 SimpleModel 对象为选中值

### 附加属性

- `placeholder`: 输入框占位文本，默认为 "ID/名称"
- `allowClear`: 是否允许清除，默认为 true
- `disabled`: 是否禁用，默认为 false
- `storeIdList`: 门店 ID，用于筛选指定门店的车型

## 搜索功能

组件支持按车型名称（vehicleUnionName）进行搜索与过滤。
