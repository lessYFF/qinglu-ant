import React, { useState } from 'react'
import { Image, Modal } from 'antd'
import './index.module.less'

export function Preview(props: { src: string; width: number; height: number; isVideo?: boolean }) {
  const { src, width, height, isVideo = false } = props
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <div className="app-preview-wrap" style={{ width: `${width}px`, height: `${height}px` }}>
        {isVideo ? <video src={src} onClick={() => setShowVideo(true)} /> : <Image src={src} />}
      </div>

      <Modal
        open={showVideo}
        title={null}
        footer={null}
        onCancel={() => setShowVideo(false)}
        width={600}
      >
        {showVideo ? (
          <div className="video-wrap">
            <video controls autoPlay src={src} width={500} height={500}></video>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
