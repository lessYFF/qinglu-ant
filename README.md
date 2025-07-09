# 擎路组件库 (Qinglu Ant Components)

基于 Ant Design 的 React 组件库，专为车辆租赁业务系统设计。

## ✨ 特性

- 🎯 **业务导向**：专为车辆租赁业务场景设计
- 🛠️ **开箱即用**：完整的组件库，无需额外配置
- 📱 **响应式设计**：支持多种屏幕尺寸
- 🎨 **主题定制**：基于 Ant Design 设计语言
- 📖 **完整文档**：每个组件都有详细的使用文档
- 🧪 **Mock 数据支持**：完整的 Mock 数据环境，支持独立开发

## 🚀 快速开始

### 安装

```bash
npm install
```

### 开发

```bash
npm start
```

组件库将在 `http://localhost:3000` 启动，所有组件都有完整的演示和文档。

### Mock 数据模式

项目内置了完整的 Mock 数据环境，在开发模式下自动启用：

- ✅ **自动拦截**：自动拦截所有 API 请求
- ✅ **完整数据**：覆盖所有业务模块的 Mock 数据
- ✅ **实时响应**：模拟真实的网络延迟
- ✅ **控制台日志**：请求和响应的详细日志

#### Mock 数据模块

| 模块     | 说明                   | 文件位置                           |
| -------- | ---------------------- | ---------------------------------- |
| 账户管理 | 用户信息、权限、角色等 | `src/mock/account.ts`              |
| 账单管理 | 账单、充值、支付等     | `src/mock/bill.ts`                 |
| 渠道管理 | 渠道列表、业务配置等   | `src/mock/channel.ts`              |
| 订单管理 | 订单列表、详情、状态等 | `src/mock/order.ts`                |
| 价格管理 | 价格配置、附加服务等   | `src/mock/price.ts`                |
| 库存管理 | 库存状态、占用情况等   | `src/mock/stock.ts`                |
| 门店管理 | 门店信息、配置等       | `src/mock/store.ts`                |
| 车辆管理 | 车辆列表、详情等       | `src/mock/vehicle.ts`              |
| 车型管理 | 品牌、车系、车型等     | `src/mock/vehicle-model.ts`        |
| 服务政策 | 租车规则、政策配置等   | `src/mock/store-service-policy.ts` |

#### 环境控制

```javascript
// 启用Mock模式（默认在开发环境自动启用）
import { enableMock, installMockInterceptor } from "./src/mock/interceptor";
enableMock();
installMockInterceptor();

// 禁用Mock模式
import { disableMock, uninstallMockInterceptor } from "./src/mock/interceptor";
disableMock();
uninstallMockInterceptor();
```

## 📦 组件分类

### 基础组件

- **Input**: 输入控件集合，包含多种增强型输入组件
- **Modal**: 对话框组件，预设了常用的配置与样式
- **Table**: 表格组件，提供了更便捷的数据展示方式
- **Loading**: 加载组件，提供统一的加载状态展示

### 业务组件

#### 选择器类组件

- **ChooseBrands**: 品牌选择器
- **ChooseModels**: 车型选择器
- **ChooseStores**: 门店选择器
- **ChooseSerys**: 车系选择器
- **ChooseSubSerys**: 子车系选择器
- **ChooseModelGroups**: 车型分组选择器
- **ChooseVehicles**: 车辆选择器
- **ChooseChannel**: 渠道选择器
- **ChooseLicenseTypes**: 牌照类型选择器
- **ChooseMobilePrefix**: 手机前缀选择器

#### 功能性组件

- **EnumSelect**: 枚举选择器
- **NamesSelect**: 多名称选择器
- **Search**: 搜索组件
- **Export**: 数据导出组件
- **Upload**: 上传组件
- **Preview**: 预览组件
- **Roles**: 权限控制组件
- **AliyunVerify**: 阿里云验证组件
- **Pay**: 支付组件

## 📖 组件文档

每个组件都有独立的 README 文档，位于 `src/components/[组件名]/README.md`。

## 🔧 开发指南

### 添加新组件

1. 在 `src/components/` 下创建组件目录
2. 实现组件功能
3. 添加 README.md 文档
4. 在 `src/components/index.tsx` 中导出

### 添加 Mock 数据

1. 在 `src/mock/` 下创建或编辑对应模块
2. 在 `src/mock/index.ts` 中导出
3. 在 `src/mock/interceptor.ts` 中配置路径映射

## 🏗️ 项目结构

```
src/
├── components/          # 组件库
│   ├── base/           # 基础组件
│   ├── ChooseBrands/   # 品牌选择器
│   ├── ChooseModels/   # 车型选择器
│   └── ...            # 其他业务组件
├── lib/                # 工具库
│   ├── API.ts         # API调用封装
│   ├── auth.ts        # 认证相关
│   ├── config.ts      # 配置文件
│   ├── data-source/   # 数据源接口
│   └── lang/          # 语言工具
├── mock/               # Mock数据
│   ├── account.ts     # 账户管理Mock
│   ├── bill.ts        # 账单管理Mock
│   ├── interceptor.ts # API拦截器
│   └── index.ts       # 统一导出
└── index.tsx          # 组件演示入口
```

## 🚨 注意事项

- 开发环境下默认启用 Mock 数据模式
- 所有业务组件都已配置 Mock 数据支持
- 控制台会显示 API 请求和响应的详细日志
- 生产环境下需要配置真实的 API 地址

## 📝 更新日志

### v1.0.0

- ✅ 完整的组件库架构
- ✅ 所有组件 README 文档 100%覆盖
- ✅ 完整的 Mock 数据环境
- ✅ API 模块代码清理和优化
- ✅ 业务组件 Mock 数据支持

## 🤝 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

[MIT](LICENSE)
