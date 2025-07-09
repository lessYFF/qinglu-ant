# AddBrand 品牌管理组件

AddBrand 是一个用于添加和管理车辆品牌的模态框组件，集成了品牌的增加、删除和列表展示功能。

## 功能特点

- 📝 添加新品牌
- 🗑️ 删除已有品牌
- 📋 实时品牌列表展示
- 🔍 支持初始关键词自动填充
- ✅ 表单验证和错误提示

## 参数说明

| 参数           | 说明                   | 类型         | 默认值 |
| -------------- | ---------------------- | ------------ | ------ |
| adding         | 是否显示添加品牌模态框 | `boolean`    | -      |
| initialKeyword | 初始填充的品牌名称     | `string`     | -      |
| onFinish       | 完成操作后的回调函数   | `() => void` | -      |

## 基本用法

```tsx
import { AddBrand } from "@/components/ChooseBrands/AddBrand";
import { useState } from "react";

export default () => {
  const [showAddBrand, setShowAddBrand] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAddBrand(true)}>添加品牌</Button>

      <AddBrand adding={showAddBrand} onFinish={() => setShowAddBrand(false)} />
    </>
  );
};
```

## 预填充品牌名

```tsx
import { AddBrand } from "@/components/ChooseBrands/AddBrand";
import { useState } from "react";

export default () => {
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleAddBrand = (brandName: string) => {
    setKeyword(brandName);
    setShowAddBrand(true);
  };

  return (
    <>
      <Button onClick={() => handleAddBrand("奔驰")}>添加奔驰品牌</Button>

      <AddBrand
        adding={showAddBrand}
        initialKeyword={keyword}
        onFinish={() => {
          setShowAddBrand(false);
          setKeyword("");
        }}
      />
    </>
  );
};
```

## 组件特性

### 表单功能

- **输入限制**: 品牌名最大长度 20 字符
- **必填验证**: 品牌名为必填项
- **自动聚焦**: 模态框打开时自动聚焦输入框
- **清空表单**: 添加成功后自动清空输入框

### 列表管理

- **实时更新**: 添加/删除操作后自动刷新列表
- **滚动展示**: 固定高度 300px，超出自动滚动
- **确认删除**: 删除操作需要二次确认
- **ID 显示**: 显示格式为 "ID-品牌名称"

## 依赖说明

- **数据源**: 使用 `useBrands`、`addBrand`、`removeBrand` 钩子
- **组件**: 依赖 `Table`、`EditModal` 基础组件
- **样式**: 使用 CSS Modules (`index.module.less`)

## 注意事项

1. 该组件为内部管理组件，通常不直接导出使用
2. 模态框使用 `EditModal` 组件，点击遮罩层不会关闭
3. 删除操作会立即生效，请谨慎操作
4. 组件内部已处理加载状态和错误提示
