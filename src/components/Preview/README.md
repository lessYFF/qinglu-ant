# Preview 预览组件

Preview 是一个用于预览图片和视频的组件，支持点击查看大图和播放视频功能。

## 功能特点

- 支持图片预览，点击可查看大图
- 支持视频预览，点击可在弹窗中播放
- 可自定义预览区域的宽高
- 自动适应不同类型的媒体内容

## 参数说明

| 参数    | 说明                 | 类型      | 默认值 |
| ------- | -------------------- | --------- | ------ |
| src     | 图片或视频的 URL     | `string`  | -      |
| width   | 预览区域宽度（像素） | `number`  | -      |
| height  | 预览区域高度（像素） | `number`  | -      |
| isVideo | 是否为视频           | `boolean` | false  |

## 基本用法

### 图片预览

```tsx
import { Preview } from "@/components";

export default () => (
  <>
    <h4>图片预览</h4>
    <Preview src="https://example.com/image.jpg" width={200} height={150} />
  </>
);
```

### 视频预览

```tsx
import { Preview } from "@/components";

export default () => (
  <>
    <h4>视频预览</h4>
    <Preview
      src="https://example.com/video.mp4"
      width={320}
      height={240}
      isVideo={true}
    />
  </>
);
```

### 在列表中使用

```tsx
import { Preview } from "@/components";
import { List } from "antd";

export default () => {
  const mediaList = [
    { id: 1, type: "image", url: "https://example.com/image1.jpg" },
    { id: 2, type: "video", url: "https://example.com/video1.mp4" },
    { id: 3, type: "image", url: "https://example.com/image2.jpg" },
  ];

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={mediaList}
      renderItem={(item) => (
        <List.Item>
          <Preview
            src={item.url}
            width={160}
            height={120}
            isVideo={item.type === "video"}
          />
        </List.Item>
      )}
    />
  );
};
```

## 注意事项

1. 组件内部使用了 Ant Design 的 Modal 组件，确保您的项目中已安装 antd
2. 对于视频，点击后会在弹窗中以 500x500 的尺寸播放
3. 支持的视频格式取决于浏览器的支持情况，常见的有 MP4、WebM 等
4. 预览区域的宽高是必填项，请确保提供合适的值

## 依赖

- React
- antd (Modal, Image)
