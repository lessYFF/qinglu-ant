# MyUpload 上传组件

MyUpload 是一个功能丰富的文件上传组件，支持图片、视频等多种文件类型的上传，并提供了丰富的自定义选项。

## 功能特性

- 📁 支持多种文件类型上传（图片、视频、文档等）
- 🖼️ 支持文件预览功能
- 🎯 支持拖拽上传
- 🔢 支持单文件和多文件上传
- 🎨 高度可定制的 UI 渲染
- 📱 支持移动端优化
- 🚫 支持文件大小和类型限制

## 基本用法

```jsx
import { MyUpload } from "@/components/base";

const BasicExample = () => {
  const [fileUrl, setFileUrl] = useState();

  return (
    <MyUpload
      value={fileUrl}
      onChange={setFileUrl}
      renderAdd={() => <div>点击上传文件</div>}
      renderItem={(url) => (
        <img src={url} alt="uploaded" style={{ width: 100, height: 100 }} />
      )}
    />
  );
};
```

## 图片上传示例

```jsx
import { MyUpload } from "@/components/base";
import { PlusOutlined } from "@ant-design/icons";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState();

  return (
    <MyUpload
      type="image"
      value={imageUrl}
      onChange={setImageUrl}
      accept="image/*"
      maxSize={5 * 1024 * 1024} // 5MB
      renderAdd={() => (
        <div
          style={{
            width: 100,
            height: 100,
            border: "1px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlusOutlined />
        </div>
      )}
      renderItem={(url) => (
        <img
          src={url}
          alt="uploaded"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      )}
    />
  );
};
```

## 多文件上传

```jsx
import { MyUpload } from "@/components/base";

const MultipleUpload = () => {
  const [fileUrls, setFileUrls] = useState([]);

  return (
    <MyUpload
      multiple
      value={fileUrls}
      onChange={setFileUrls}
      maxCount={5}
      renderAdd={() => <div>添加文件（最多5个）</div>}
      renderItem={(url, index) => (
        <div key={index} style={{ marginBottom: 8 }}>
          <img
            src={url}
            alt={`file-${index}`}
            style={{ width: 80, height: 80 }}
          />
        </div>
      )}
    />
  );
};
```

## 视频上传示例

```jsx
import { MyUpload } from "@/components/base";

const VideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState();

  return (
    <MyUpload
      type="video"
      value={videoUrl}
      onChange={setVideoUrl}
      accept="video/*"
      maxSize={50 * 1024 * 1024} // 50MB
      renderAdd={() => <div>点击上传视频</div>}
      renderItem={(url) => (
        <video src={url} controls style={{ width: 200, height: 150 }} />
      )}
    />
  );
};
```

## API 参数

| 参数         | 说明                     | 类型                                          | 默认值    |
| ------------ | ------------------------ | --------------------------------------------- | --------- |
| value        | 当前文件 URL 或 URL 数组 | `string \| string[]`                          | -         |
| onChange     | 文件变化回调             | `(value: string \| string[]) => void`         | -         |
| type         | 文件类型                 | `'image' \| 'video' \| 'file'`                | `'image'` |
| accept       | 允许的文件类型           | `string`                                      | -         |
| multiple     | 是否支持多文件上传       | `boolean`                                     | `false`   |
| maxCount     | 最大文件数量             | `number`                                      | -         |
| maxSize      | 单个文件最大大小（字节） | `number`                                      | -         |
| disabled     | 是否禁用                 | `boolean`                                     | `false`   |
| renderAdd    | 自定义上传按钮渲染       | `() => ReactNode`                             | **必填**  |
| renderItem   | 自定义文件项渲染         | `(url: string, index?: number) => ReactNode`  | **必填**  |
| onError      | 错误回调                 | `(error: Error) => void`                      | -         |
| beforeUpload | 上传前的回调             | `(file: File) => boolean \| Promise<boolean>` | -         |

## 高级功能

### 自定义上传逻辑

```jsx
const CustomUpload = () => {
  const handleBeforeUpload = (file) => {
    // 自定义验证逻辑
    if (file.size > 1024 * 1024) {
      message.error("文件大小不能超过1MB");
      return false;
    }
    return true;
  };

  const handleError = (error) => {
    console.error("上传失败:", error);
    message.error("上传失败，请重试");
  };

  return (
    <MyUpload
      beforeUpload={handleBeforeUpload}
      onError={handleError}
      renderAdd={() => <div>上传文件</div>}
      renderItem={(url) => <img src={url} alt="preview" />}
    />
  );
};
```

### 拖拽上传

```jsx
const DragUpload = () => {
  return (
    <MyUpload
      renderAdd={() => (
        <div
          style={{
            border: "2px dashed #ccc",
            borderRadius: 8,
            padding: 40,
            textAlign: "center",
          }}
        >
          <p>拖拽文件到此处或点击上传</p>
        </div>
      )}
      renderItem={(url) => <img src={url} alt="preview" />}
    />
  );
};
```

## 样式定制

```less
// 自定义样式
.uploadContainer {
  .uploadArea {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    transition: border-color 0.3s;

    &:hover {
      border-color: #1890ff;
    }
  }

  .uploadItem {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
```

## 注意事项

1. `renderAdd`和`renderItem`是必填参数，用于自定义 UI 渲染
2. 组件内部会自动处理文件上传和 URL 生成
3. 支持的文件类型取决于`accept`参数和后端配置
4. 大文件上传建议设置合理的`maxSize`限制
5. 多文件上传时，`value`和`onChange`处理的是数组格式

## 依赖

- React
- antd
- @/lib/API (文件上传接口)
- @/lib/config (配置信息)
