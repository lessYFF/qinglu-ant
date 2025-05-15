# Modal 组件

Modal 组件是对 Ant Design Modal 组件的二次封装，预设了常用的配置和样式。

## 组件列表

### Modal

基础对话框组件。

```tsx
<Modal title="示例弹窗" visible={true} onCancel={() => setVisible(false)}>
  <p>这是一个弹窗内容</p>
</Modal>
```

**属性：**

- 支持所有 antd Modal 组件的属性
- `bare`: 是否应用裸模式，默认为 false。若为 true，会应用 `.app-bare-modal` 类并关闭 footer
- `children`: 弹窗内容

**最佳实践：**

- width 设置成内容最适宜显示的宽度即可，不用怕设的太大显示不下，antd 预置了 max-width 进行兜底。

### EditModal

编辑型表单对话框，特点是：

- 点击 mask 不会关闭对话框（避免误关闭导致编辑内容丢失）
- 应用 bare 模式（因为一般需要自定义 footer）
- 编辑型表单因为不能快速关闭，应在 footer 里提供"取消"按钮

```tsx
<EditModal title="编辑信息" visible={true} onCancel={() => setVisible(false)}>
  <Form>{/* 表单内容 */}</Form>
  <div className="footer">
    <Button onClick={() => setVisible(false)}>取消</Button>
    <Button type="primary" onClick={handleSubmit}>
      提交
    </Button>
  </div>
</EditModal>
```

**属性：**

- 支持所有 Modal 组件的属性
