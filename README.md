# 擎路组件库 (QingLu Ant)

基于 Ant Design 封装的企业级 React 组件库，包含一系列常用的业务组件和增强组件。

## 特性

- 🚀 二次封装 antd 组件，提供更符合业务需求的默认配置
- 📦 提供丰富的业务组件，如各种选择器、表单控件等
- 🛡 使用 TypeScript 开发，提供完整的类型定义
- 🎨 支持 antd 主题定制
- 📱 支持服务端渲染 (SSR)

## 安装

```bash
npm install qinglu-ant --save
```

## 使用

```jsx
import React from "react";
import { AlphaInput, Table, Modal } from "qinglu-ant";

const App = () => (
  <div>
    <AlphaInput placeholder="请输入字母数字" />
    <Table dataSource={[]} columns={[]} />
    <Modal title="示例" visible={false}>
      内容
    </Modal>
  </div>
);
```

## 本地开发

克隆代码仓库并在本地运行：

```bash
# 克隆仓库
git clone git@codeup.aliyun.com:qinglu/qinglu-ant.git

# 安装依赖
npm install

# 启动开发服务器
npm start
```

访问 http://localhost:3000 查看组件展示页面。

## 构建

```bash
npm run build
```

## 组件列表

组件库包括以下几类组件：

### 基础组件

- Modal - 对话框
- Table - 表格
- Input - 输入控件集合
- Loading - 加载状态

### 业务组件

- Roles - 权限控制
- ChooseBrands - 品牌选择器
- ChooseModels - 车型选择器
- ChooseStores - 门店选择器
- EnumSelect - 枚举选择器
- ...更多业务组件

## 文档

每个组件都有详细的文档，可以在组件目录下的 README.md 中查看。
