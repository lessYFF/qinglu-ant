# Upload 上传组件

Upload 是一个文件上传组件，提供统一的文件上传界面和处理逻辑，支持单文件和多文件上传。

## 功能特点

- 支持图片、视频和普通文件的上传
- 支持单文件和多文件上传模式
- 支持文件类型限制和大小限制
- 支持拖拽上传
- 支持预览和删除已上传文件
- 支持 OCR 识别（适用于身份证、驾驶证、行驶证等）
- 可自定义上传按钮和预览内容的渲染

## 参数说明

### 基础参数

| 参数       | 说明                           | 类型                               | 默认值             |
| ---------- | ------------------------------ | ---------------------------------- | ------------------ |
| className  | 自定义样式类名                 | `string`                           | -                  |
| isPrivate  | 是否为隐私内容（影响上传路径） | `boolean`                          | false              |
| type       | 上传资源类型                   | `'image' \| 'video' \| 'file'`     | 'image'            |
| mimeType   | 允许上传的文件类型             | `string`                           | 根据 type 自动设置 |
| size       | 文件大小限制（单位：MB）       | `number`                           | -                  |
| ocrType    | OCR 识别类型                   | `OcrType`                          | -                  |
| onOcr      | OCR 识别回调                   | `(data: unknown) => void`          | -                  |
| renderAdd  | 自定义上传按钮渲染函数         | `() => React.ReactNode`            | -                  |
| renderItem | 自定义文件预览渲染函数         | `(url: string) => React.ReactNode` | -                  |

### 单文件上传模式

| 参数     | 说明                    | 类型                                   | 默认值 |
| -------- | ----------------------- | -------------------------------------- | ------ |
| value    | 已上传文件的 URL        | `string`                               | -      |
| onChange | 上传/删除文件的回调函数 | `(value: string \| undefined) => void` | -      |

### 多文件上传模式

| 参数     | 说明                    | 类型                        | 默认值 |
| -------- | ----------------------- | --------------------------- | ------ |
| multiple | 允许上传的最大文件数量  | `number`                    | -      |
| value    | 已上传文件的 URL 数组   | `string[]`                  | -      |
| onChange | 上传/删除文件的回调函数 | `(value: string[]) => void` | -      |

## 基本用法

### 单文件上传

```tsx
import { Upload } from "@/components";
import { useState } from "react";

export default () => {
  const [fileUrl, setFileUrl] = useState<string>();

  return (
    <Upload
      value={fileUrl}
      onChange={setFileUrl}
      renderAdd={() => <div>点击上传图片</div>}
      renderItem={(url) => (
        <img src={url} alt="预览" style={{ width: 100, height: 100 }} />
      )}
    />
  );
};
```

### 多文件上传

```tsx
import { Upload } from "@/components";
import { useState } from "react";

export default () => {
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  return (
    <Upload
      multiple={3}
      value={fileUrls}
      onChange={setFileUrls}
      renderAdd={() => <div>点击上传图片（最多3张）</div>}
      renderItem={(url) => (
        <img src={url} alt="预览" style={{ width: 100, height: 100 }} />
      )}
    />
  );
};
```

### 视频上传

```tsx
import { Upload } from "@/components";
import { useState } from "react";

export default () => {
  const [videoUrl, setVideoUrl] = useState<string>();

  return (
    <Upload
      type="video"
      value={videoUrl}
      onChange={setVideoUrl}
      renderAdd={() => <div>点击上传视频</div>}
      renderItem={(url) => (
        <div style={{ width: 100, height: 100 }}>
          <video src={url} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
    />
  );
};
```

## 注意事项

1. `renderAdd`和`renderItem`是必填项，用于自定义上传按钮和预览内容的渲染
2. 组件内部会自动处理文件上传逻辑，不需要手动处理上传过程
3. 如果需要使用 OCR 功能，需要配置`ocrType`和`onOcr`参数

## 依赖

- React
- antd
- uuid
- @/lib/lang
- @/lib/API
- @/lib/config
