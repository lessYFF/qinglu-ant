# Roles 组件

Roles 组件用于基于用户权限控制内容的显示，是权限系统的重要组成部分。

## 基本用法

```tsx
<Roles allowed="user.edit">
  <Button>编辑用户</Button>
</Roles>
```

## 多权限控制

允许指定多个权限，用户具有其中任一权限即可查看内容：

```tsx
<Roles allowed={["user.edit", "user.delete"]}>
  <Button>管理用户</Button>
</Roles>
```

## 管理员权限

使用 `admin` 属性指定只有管理员才能查看的内容：

```tsx
<Roles admin>
  <Button>管理员功能</Button>
</Roles>
```

## 属性

- `allowed`: 允许访问的权限代码，可以是字符串或字符串数组
- `admin`: 是否要求管理员权限，默认为 false。若为 true，不再检查 allowed 参数
- `children`: 子元素，只在用户有权限时渲染

## 权限判断规则

- 如果 `admin` 为 true，则只有当用户 `isAdmin === 1` 或 `parentId === -1` (平台管理员) 时才显示内容
- 否则，检查用户的 `menuAutos` 是否包含 `allowed` 中的任一权限代码
