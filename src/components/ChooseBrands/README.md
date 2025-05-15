# ChooseBrands 组件

ChooseBrands 组件用于选择车型品牌，支持搜索、过滤和添加新品牌。

## 导入

```tsx
import { ChooseBrands } from "@/components";
```

## 基本用法

```tsx
<ChooseBrands value={brandId} onChange={setBrandId} />
```

## 多选模式

```tsx
<ChooseBrands multiple value={brandIds} onChange={setBrandIds} />
```

## 支持添加新品牌

```tsx
<ChooseBrands addable value={brandId} onChange={setBrandId} />
```

## 属性

### 基础属性

- `value`: 选中的品牌 ID（单选）或 ID 数组（多选）
- `onChange`: 值变更回调函数 `(value: number | number[]) => void`
- `multiple`: 是否启用多选模式，默认为 false
- `format`: 自定义格式化函数，转换 Brand 对象为选中值

### 附加属性

- `addable`: 是否显示"添加"操作，默认为 false
- `placeholder`: 输入框占位文本，默认为 "ID/名称"
- `allowClear`: 是否允许清除，默认为 true
- `disabled`: 是否禁用，默认为 false

## 搜索功能

组件支持按以下字段进行搜索：

- 品牌 ID
- 品牌首字母 (initials)
- 品牌名称 (brandName)
- 英文名称 (englishName)
