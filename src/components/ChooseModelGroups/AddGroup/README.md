# AddGroup 车型分组管理组件

AddGroup 是一个用于添加和管理车型分组的模态框组件，集成了车型分组的增加、删除和列表展示功能。

## 功能特点

- 📝 添加新车型分组
- 🗑️ 删除已有车型分组
- 📋 实时车型分组列表展示
- 🔍 支持初始关键词自动填充
- ✅ 表单验证和错误提示

## 参数说明

| 参数           | 说明                       | 类型         | 默认值 |
| -------------- | -------------------------- | ------------ | ------ |
| adding         | 是否显示添加车型分组模态框 | `boolean`    | -      |
| initialKeyword | 初始填充的分组名称         | `string`     | -      |
| onFinish       | 完成操作后的回调函数       | `() => void` | -      |

## 基本用法

```tsx
import { AddGroup } from "@/components/ChooseModelGroups/AddGroup";
import { useState } from "react";

export default () => {
  const [showAddGroup, setShowAddGroup] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAddGroup(true)}>添加车型分组</Button>

      <AddGroup adding={showAddGroup} onFinish={() => setShowAddGroup(false)} />
    </>
  );
};
```

## 预填充分组名

```tsx
import { AddGroup } from "@/components/ChooseModelGroups/AddGroup";
import { useState } from "react";

export default () => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleAddGroup = (groupName: string) => {
    setKeyword(groupName);
    setShowAddGroup(true);
  };

  return (
    <>
      <Button onClick={() => handleAddGroup("SUV车型")}>添加SUV分组</Button>

      <AddGroup
        adding={showAddGroup}
        initialKeyword={keyword}
        onFinish={() => {
          setShowAddGroup(false);
          setKeyword("");
        }}
      />
    </>
  );
};
```

## 与父组件集成

```tsx
import { ChooseModelGroups } from "@/components";
import { AddGroup } from "@/components/ChooseModelGroups/AddGroup";
import { useState } from "react";

export default () => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleAddComplete = () => {
    console.log("车型分组添加完成");
    setShowAddGroup(false);
    // 父组件可以在这里刷新数据
  };

  return (
    <>
      <ChooseModelGroups
        value={selectedGroup}
        onChange={setSelectedGroup}
        addable={true}
        onAdd={() => setShowAddGroup(true)}
      />

      <AddGroup adding={showAddGroup} onFinish={handleAddComplete} />
    </>
  );
};
```

## 组件特性

### 表单功能

- **输入限制**: 分组名最大长度 20 字符
- **必填验证**: 分组名为必填项
- **自动聚焦**: 模态框打开时自动聚焦输入框
- **清空表单**: 添加成功后自动清空输入框
- **初始值**: 支持通过 `initialKeyword` 预填充分组名

### 列表管理

- **实时更新**: 添加/删除操作后自动刷新列表
- **滚动展示**: 固定高度 300px，超出自动滚动
- **确认删除**: 删除操作需要二次确认
- **ID 显示**: 显示格式为 "ID-分组名称"

### 交互反馈

- **成功提示**: 添加成功显示"新增车型分组成功"
- **删除提示**: 删除成功显示"车型分组已删除"
- **错误处理**: 自动显示 API 返回的错误信息

## 数据管理

### 使用的数据钩子

- `useModelGroups()`: 获取车型分组列表、加载状态和刷新函数
- `addModelGroup(name)`: 添加新的车型分组
- `removeModelGroup(id)`: 删除指定的车型分组

### 数据结构

```typescript
interface ModelGroup {
  id: number;
  name: string;
  // 其他相关属性...
}
```

## 依赖说明

- **数据源**: 使用 `useModelGroups`、`addModelGroup`、`removeModelGroup` 钩子
- **组件**: 依赖 `Table`、`EditModal` 基础组件
- **样式**: 使用 CSS Modules (`index.module.less`)
- **UI 组件**: 使用 Ant Design 的 `Form`、`Input`、`Button`、`Popconfirm`

## 注意事项

1. 该组件为内部管理组件，通常不直接导出使用
2. 模态框使用 `EditModal` 组件，点击遮罩层不会关闭
3. 删除操作会立即生效，请谨慎操作
4. 分组名称具有唯一性约束，重复名称会被 API 拒绝
5. 组件内部已处理加载状态和错误提示
6. 支持通过 `initialKeyword` 参数预设分组名称，便于快速添加
