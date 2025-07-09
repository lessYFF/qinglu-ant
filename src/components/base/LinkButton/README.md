# LinkButton 链接按钮组件

LinkButton 是一个统一的链接按钮组件，提供了一致的链接样式和交互行为。

## 功能特性

- 🔗 支持内部路由和外部链接
- 🎨 统一的链接样式设计
- 🚫 支持禁用状态
- ⚡ 支持点击事件处理
- 🎯 支持多种尺寸
- 📱 响应式设计
- 🔄 支持加载状态

## 基本用法

```jsx
import { LinkButton } from "@/components/base";

const BasicExample = () => {
  return (
    <div>
      <LinkButton href="/dashboard">去仪表盘</LinkButton>

      <LinkButton href="https://www.example.com" target="_blank">
        外部链接
      </LinkButton>

      <LinkButton onClick={() => console.log("点击事件")}>点击按钮</LinkButton>
    </div>
  );
};
```

## 不同类型

```jsx
import { LinkButton } from "@/components/base";

const TypeExample = () => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <LinkButton type="primary" href="/home">
        主要链接
      </LinkButton>

      <LinkButton type="default" href="/about">
        默认链接
      </LinkButton>

      <LinkButton type="text" href="/contact">
        文本链接
      </LinkButton>

      <LinkButton type="link" href="/help">
        链接样式
      </LinkButton>
    </div>
  );
};
```

## 不同尺寸

```jsx
import { LinkButton } from "@/components/base";

const SizeExample = () => {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <LinkButton size="small" href="/small">
        小尺寸
      </LinkButton>

      <LinkButton size="middle" href="/middle">
        中等尺寸
      </LinkButton>

      <LinkButton size="large" href="/large">
        大尺寸
      </LinkButton>
    </div>
  );
};
```

## 状态控制

```jsx
import { LinkButton } from "@/components/base";
import { useState } from "react";

const StateExample = () => {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("异步操作完成");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <LinkButton disabled href="/disabled">
        禁用状态
      </LinkButton>

      <LinkButton loading={loading} onClick={handleAsyncAction}>
        {loading ? "处理中..." : "异步操作"}
      </LinkButton>

      <LinkButton danger onClick={() => console.log("危险操作")}>
        危险操作
      </LinkButton>
    </div>
  );
};
```

## 带图标

```jsx
import { LinkButton } from "@/components/base";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

const IconExample = () => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <LinkButton icon={<HomeOutlined />} href="/home">
        首页
      </LinkButton>

      <LinkButton icon={<UserOutlined />} href="/profile">
        个人中心
      </LinkButton>

      <LinkButton icon={<SettingOutlined />} href="/settings">
        设置
      </LinkButton>
    </div>
  );
};
```

## API 参数

| 参数      | 说明           | 类型                                         | 默认值     |
| --------- | -------------- | -------------------------------------------- | ---------- |
| children  | 按钮内容       | `ReactNode`                                  | -          |
| href      | 链接地址       | `string`                                     | -          |
| target    | 链接打开方式   | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'`  |
| onClick   | 点击事件       | `(event: MouseEvent) => void`                | -          |
| type      | 按钮类型       | `'default' \| 'primary' \| 'text' \| 'link'` | `'link'`   |
| size      | 按钮尺寸       | `'small' \| 'middle' \| 'large'`             | `'middle'` |
| disabled  | 是否禁用       | `boolean`                                    | `false`    |
| loading   | 加载状态       | `boolean`                                    | `false`    |
| danger    | 危险按钮       | `boolean`                                    | `false`    |
| icon      | 按钮图标       | `ReactNode`                                  | -          |
| className | 自定义样式类名 | `string`                                     | -          |
| style     | 自定义样式     | `CSSProperties`                              | -          |

## 高级用法

### 条件渲染

```jsx
import { LinkButton } from "@/components/base";

const ConditionalExample = ({ user, hasPermission }) => {
  return (
    <div>
      {hasPermission && (
        <LinkButton href="/admin" type="primary">
          管理面板
        </LinkButton>
      )}

      {user ? (
        <LinkButton href="/profile">{user.name}的个人主页</LinkButton>
      ) : (
        <LinkButton href="/login">登录</LinkButton>
      )}
    </div>
  );
};
```

### 路由集成

```jsx
import { LinkButton } from "@/components/base";
import { useHistory } from "react-router-dom";

const RouterExample = () => {
  const history = useHistory();

  const handleNavigation = (path) => {
    // 可以在这里添加导航前的逻辑
    history.push(path);
  };

  return (
    <div>
      <LinkButton onClick={() => handleNavigation("/dashboard")}>
        仪表盘
      </LinkButton>

      <LinkButton onClick={() => handleNavigation("/orders")}>
        订单管理
      </LinkButton>
    </div>
  );
};
```

### 确认操作

```jsx
import { LinkButton } from "@/components/base";
import { Modal } from "antd";

const ConfirmExample = () => {
  const handleDelete = () => {
    Modal.confirm({
      title: "确认删除",
      content: "删除后不可恢复，确定要删除吗？",
      onOk: () => {
        console.log("执行删除操作");
      },
    });
  };

  return (
    <LinkButton danger onClick={handleDelete}>
      删除
    </LinkButton>
  );
};
```

### 权限控制

```jsx
import { LinkButton } from "@/components/base";
import { usePermission } from "@/hooks/usePermission";

const PermissionExample = () => {
  const hasEditPermission = usePermission("user:edit");
  const hasDeletePermission = usePermission("user:delete");

  return (
    <div>
      {hasEditPermission && <LinkButton href="/edit">编辑</LinkButton>}

      {hasDeletePermission && (
        <LinkButton danger onClick={handleDelete}>
          删除
        </LinkButton>
      )}

      <LinkButton
        disabled={!hasEditPermission}
        href="/edit"
        title={!hasEditPermission ? "没有编辑权限" : ""}
      >
        编辑（受权限控制）
      </LinkButton>
    </div>
  );
};
```

## 样式定制

```less
.linkButton {
  &.primary {
    color: #1890ff;

    &:hover {
      color: #40a9ff;
    }
  }

  &.danger {
    color: #ff4d4f;

    &:hover {
      color: #ff7875;
    }
  }

  &.disabled {
    color: #d9d9d9;
    cursor: not-allowed;

    &:hover {
      color: #d9d9d9;
    }
  }

  &.loading {
    cursor: default;
  }
}
```

## 与 antd Button 的区别

| 特性       | LinkButton      | antd Button     |
| ---------- | --------------- | --------------- |
| 主要用途   | 导航和链接      | 表单提交和操作  |
| 默认样式   | 链接样式        | 按钮样式        |
| href 支持  | ✅ 原生支持     | ❌ 需要额外处理 |
| 路由集成   | ✅ 简化集成     | ❌ 需要手动处理 |
| 样式一致性 | ✅ 统一链接风格 | ✅ 统一按钮风格 |

## 注意事项

1. 当同时提供`href`和`onClick`时，优先执行`onClick`
2. 外部链接建议设置`target="_blank"`以在新窗口打开
3. 禁用状态下点击事件不会触发
4. 加载状态下会阻止重复点击
5. 危险操作建议配合确认弹窗使用

## 依赖

- React
- antd (Button)
- @ant-design/icons
- CSS Modules
