# ChooseStores 组件

ChooseStores 组件用于选择门店，支持搜索、过滤功能，并可根据用户配置自动选择首个门店。

## 导入

```tsx
import { ChooseStores } from "@/components";
```

## 基本用法

```tsx
<ChooseStores value={storeId} onChange={setStoreId} />
```

## 多选模式

```tsx
<ChooseStores multiple value={storeIds} onChange={setStoreIds} />
```

## 自动选择首个门店

```tsx
<ChooseStores chooseFirst value={storeId} onChange={setStoreId} />
```

## 按商户筛选门店

```tsx
<ChooseStores byMerchant value={storeId} onChange={setStoreId} />
```

## 属性

### 基础属性

- `value`: 选中的门店 ID（单选）或 ID 数组（多选）
- `onChange`: 值变更回调函数 `(value: number | number[]) => void`
- `multiple`: 是否启用多选模式，默认为 false
- `format`: 自定义格式化函数，转换 SimpleStore 对象为选中值

### 附加属性

- `placeholder`: 输入框占位文本，默认为 "ID/名称"
- `allowClear`: 是否允许清除，默认为 false
- `disabled`: 是否禁用，默认为 false
- `byMerchant`: 是否按商户筛选门店
- `chooseFirst`: 是否自动选择第一个门店，默认为 false

## 特殊功能

1. 当 `chooseFirst` 为 true 时，组件会在门店数据加载完成后自动选中第一个门店（前提是当前未选中任何门店）
2. 会优先尝试选择存储在 localStorage 中的上一次选择的门店（StoreId）
3. 当选择门店时，会将当前选择的门店 ID 保存到 localStorage 中

## 搜索功能

组件支持按门店名称（storeNameUnion）进行搜索与过滤。
