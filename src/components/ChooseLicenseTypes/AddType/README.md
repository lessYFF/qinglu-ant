# AddType 牌照类型管理组件

AddType 是一个用于添加和管理车辆牌照类型的模态框组件，支持按地区和首字母组合创建牌照类型。

## 功能特点

- 📝 添加新牌照类型（地区+首字母组合）
- 🗑️ 删除已有牌照类型
- 📋 实时牌照类型列表展示
- 🌍 地区选择器
- 🔤 首字母选择器
- ✅ 表单验证和错误提示

## 参数说明

| 参数     | 说明                       | 类型         | 默认值 |
| -------- | -------------------------- | ------------ | ------ |
| adding   | 是否显示添加牌照类型模态框 | `boolean`    | -      |
| onFinish | 完成操作后的回调函数       | `() => void` | -      |

## 基本用法

```tsx
import { AddType } from "@/components/ChooseLicenseTypes/AddType";
import { useState } from "react";

export default () => {
  const [showAddType, setShowAddType] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAddType(true)}>添加牌照类型</Button>

      <AddType adding={showAddType} onFinish={() => setShowAddType(false)} />
    </>
  );
};
```

## 牌照类型创建流程

```tsx
import { AddType } from "@/components/ChooseLicenseTypes/AddType";
import { useState } from "react";

export default () => {
  const [showAddType, setShowAddType] = useState(false);

  const handleAddComplete = () => {
    console.log("牌照类型添加完成");
    setShowAddType(false);
    // 可以在这里刷新父组件数据
  };

  return (
    <>
      <Button type="primary" onClick={() => setShowAddType(true)}>
        管理牌照类型
      </Button>

      <AddType adding={showAddType} onFinish={handleAddComplete} />
    </>
  );
};
```

## 组件特性

### 牌照类型选择器

- **地区选择**: 首先选择省份/地区
- **首字母选择**: 根据选择的地区显示可用首字母
- **级联关系**: 地区变更时自动清空首字母选择
- **禁用状态**: 未选择地区时首字母选择器禁用

### 表单功能

- **必填验证**: 地区和首字母都为必填项
- **重置表单**: 添加成功后自动重置选择器
- **实时验证**: 表单提交前进行完整性验证

### 列表管理

- **实时更新**: 添加/删除操作后自动刷新列表
- **滚动展示**: 固定高度 300px，超出自动滚动
- **确认删除**: 删除操作需要二次确认
- **ID 显示**: 显示格式为 "ID-牌照类型名称"

## 数据结构

### EditType 类型

```typescript
type EditType = {
  areaId: number; // 地区ID
  initialId: number; // 首字母ID
};
```

### LicenseTypeInput 组件

内部使用的复合选择器组件，包含：

- 地区下拉选择器
- 首字母下拉选择器
- 级联逻辑处理

## 依赖说明

- **数据源**: 使用 `useLicenseTypes`、`addLicenseType`、`removeLicenseType` 钩子
- **地区数据**: 使用 `useLicensePlatAreas` 获取地区列表
- **首字母数据**: 使用 `useLicensePlateInitial` 获取首字母列表
- **组件**: 依赖 `Table`、`EditModal` 基础组件
- **样式**: 使用 CSS Modules (`index.module.less`)

## 注意事项

1. 该组件为内部管理组件，通常不直接导出使用
2. 模态框使用 `EditModal` 组件，点击遮罩层不会关闭
3. 删除操作会立即生效，请谨慎操作
4. 牌照类型由地区和首字母唯一确定，不允许重复
5. 组件内部已处理加载状态和错误提示
