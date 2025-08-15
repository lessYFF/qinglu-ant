# 🚀 构建说明

## 📋 概述

本项目已经成功配置了完整的构建流程，支持生产环境构建和本地测试。

## 🔧 构建命令

### 1. 生产环境构建
```bash
npm run build
```
- 生成优化后的生产文件
- 输出目录：`dist/`
- 包含：HTML、CSS、JavaScript文件

### 2. 开发环境构建
```bash
npm run build:dev
```
- 生成开发版本文件
- 包含源码映射，便于调试

### 3. 构建并启动本地服务器
```bash
npm run build:serve
```
- 先执行构建，然后启动本地服务器
- 访问地址：`http://localhost:8080`

### 4. 仅启动本地服务器（需要先构建）
```bash
npm run serve
```
- 启动本地服务器，服务 `dist/` 目录下的文件
- 访问地址：`http://localhost:8080`

## 📁 构建输出

构建完成后，`dist/` 目录包含：

```
dist/
├── index.html                    # 主页面
├── bundle.[hash].js             # 主JavaScript文件
├── main.[hash].css              # 主CSS文件
└── bundle.[hash].js.LICENSE.txt # 许可证文件
```

## 🌐 本地测试

### 方法1：使用内置脚本（推荐）
```bash
npm run build:serve
```

### 方法2：使用Python
```bash
cd dist
python3 -m http.server 8080
```

### 方法3：使用其他工具
- **Node.js**: `npx serve dist`
- **PHP**: `php -S localhost:8080 -t dist`
- **Live Server**: VS Code扩展

## ⚠️ 注意事项

1. **文件大小**: 生产构建文件较大（JS: ~2MB, CSS: ~1.3MB），这是正常的
2. **路由支持**: 内置服务器支持SPA路由，所有路由都会返回index.html
3. **端口冲突**: 如果8080端口被占用，可以修改 `serve-build.js` 中的PORT变量

## 🔍 故障排除

### 构建失败
- 检查Node.js版本（推荐v16+）
- 确保所有依赖已安装：`npm install`
- 检查webpack配置：`webpack.config.js`

### 本地访问异常
- 确保构建成功：`npm run build`
- 检查dist目录是否存在文件
- 确认端口8080未被占用

### 样式问题
- 确保CSS文件正确加载
- 检查浏览器控制台是否有404错误

## 📚 相关文档

- [Webpack配置](./webpack.config.js)
- [项目README](./README.md)
- [组件使用文档](./.cursor/rules/使用文档.md)

## 🆘 获取帮助

如果遇到问题，请：
1. 检查控制台错误信息
2. 确认构建是否成功
3. 查看网络请求是否正常
4. 联系开发团队
