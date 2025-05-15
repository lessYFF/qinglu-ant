# Loading 组件

Loading 组件提供了加载状态的展示方案，包括基础加载器和 Suspense 兼容的加载器。

## 组件列表

### Loading

基础加载组件，显示一个居中的加载图标和提示文字。

```tsx
<Loading tip="正在加载数据..." />
```

**属性：**

- `className`: 自定义 CSS 类名
- `tip`: 加载提示文字，默认为"加载中..."

### Suspense

用于 React.Suspense 的加载组件，支持自定义加载状态和错误处理。

```tsx
<Suspense fallback={<Loading />}>
  <MyComponent />
</Suspense>
```

或者直接使用：

```tsx
<Loading.Suspense>
  <MyComponent />
</Loading.Suspense>
```

**属性：**

- 支持 React.Suspense 的所有属性
- `fallback`: 加载状态显示的组件，默认为基础 Loading 组件

## 样式

组件使用 `app-loading` 和 `app-spin` 类名，可以通过这些类名进行样式自定义。
