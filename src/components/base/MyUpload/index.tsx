import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Image, message, Space, Upload } from 'antd'
import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './styles.module.less'
import config from '@/lib/config'
import { token } from '@/lib/API'
import { v4 as uuidv4 } from 'uuid'
import { ocrImage } from '@/lib/data-source/order'
import { type RcFile } from 'antd/es/upload'

const defaultMimeType = {
  image: '.jpg,.jpeg,.png',
  video: 'video/mp4,video/mov,video/wmv,video/avi,video/3gp',
  file: '*'
}

interface MyUploadProps {
  value?: unknown,
  onChange?: (value: unknown) => void,
  maxCount?: number,
  urlKey?: string,
  width?: number,
  height?: number,
  ocrType?: 1 | 2 | 3 | 4 | 5, // 证件类型：1: 身份证正面 2: 身份证反面 3: 驾驶证 4:行驶证正页 5:行驶证副页
  type?: 'image' | 'video' | 'file',
  isPrivate?: boolean,
}

export const MyUpload = (props: MyUploadProps) => {
  const {
    value,
    onChange,
    maxCount = 1,
    urlKey,
    width = 100,
    height,
    ocrType,
    type = 'image',
    isPrivate = false
  } = props

  const action = isPrivate
    ? config.APIPrefix + '/upload/v1/accessPrivate'
    : config.APIPrefix + '/upload/v1/access'

  const lastBeforeUploadFileRef = useRef<RcFile | null>(null)
  const beforeUpload = useCallback(async (file: RcFile) => {
    lastBeforeUploadFileRef.current = file
    // 不上传原始 file 对象，不然对于大文件 access 接口会报错，且此接口并不需要提供文件
    return Promise.resolve({ file })
  }, [])

  const [imageList, setImageList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const getExt = (filename: string) => {
    if (filename.includes('.')) {
      return filename.slice(filename.lastIndexOf('.'))
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (maxCount > 1) {
      setImageList(value ? (value as string[]) : [])
    } else {
      setImageList(value ? [value as string] : [])
    }
  }, [value, maxCount])

  const handleChange = async ({ file }: unknown) => {
    const { status, response } = file || {}
    if (status === 'uploading') {
      setLoading(true)
      return
    }
    if (status === 'error') {
      setLoading(false)
      message.error('文件上传失败，请重新上传')
      return
    }
    if (status === 'done') {
      const realFileObj = lastBeforeUploadFileRef.current
      if (response?.success && realFileObj) {
        const { accessId, policy, signature, dir, host } = response?.data || {}
        const filepath = `${dir}/${uuidv4()}${getExt(file.name)}`

        const visitHost = isPrivate ? config.privateCDNHost : config.CDNHost
        const url = visitHost + '/' + filepath

        // https://help.aliyun.com/document_detail/31926.htm?spm=a2c4g.11186623.0.0.26885458z9YPHU#concept-en4-sjy-5db
        const form = new FormData()
        form.append('key', filepath)
        form.append('policy', policy)
        form.append('OSSAccessKeyId', accessId)
        form.append('signature', signature)
        form.append('file', realFileObj)
        const resp = await window.fetch(host, {
          method: 'POST',
          body: form
        })
        if (resp.status !== 204) {
          void message.error('文件上传失败')
        } else {
          if (ocrType) {
            const ocrRes = await ocrImage(url, ocrType)
            if (ocrRes.success) {
              console.log({ url, ...ocrRes.data })
              onChange?.({ url, ...ocrRes.data })
            }
          } else {
            const val = urlKey ? { [urlKey]: url } : url
            onChange?.(maxCount > 1 ? [...imageList, val] : val)
          }
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }

  const handleDelete = (index: number) => {
    if (maxCount > 1) {
      onChange?.(imageList.filter((item, i) => i !== index))
    } else {
      onChange?.('')
    }
  }
  return (
    <div className={styles.myUpload}>
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: v => {
            if (!v) {
              setVisible(v)
            }
          }
        }}
      >
        <Space wrap>
          {imageList.map((item: unknown, index) => (type === 'image' ? (
            <Image
              key={`image_${index}`}
              width={width}
              height={height || width}
              rootClassName={styles.uploadImage}
              src={urlKey ? item[urlKey] : item}
              preview={{
                mask: (
                  <Space>
                    <EyeOutlined onClick={() => setVisible(true)} />
                    <DeleteOutlined onClick={() => handleDelete(index)} />
                  </Space>
                )
              }}
            />
          ) : type === 'video' ? (
            <video
              key={`video_${index}`}
              controls
              width={200}
              height={100}
              src={urlKey ? item[urlKey] : item}
            />
          ) : null)
          )}
          {
            imageList.length < maxCount ?
              <Upload
                accept={defaultMimeType[type]}
                headers={{ 'x-auth-token': token }}
                showUploadList={false}
                action={action}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                maxCount={maxCount}
              >
                <div className={styles.uploadBox} style={{ width, height: height || width }}>
                  {loading ? (
                    <LoadingOutlined className={styles.uploadIcon} />
                  ) : (
                    <PlusOutlined className={styles.uploadIcon} />
                  )}
                </div>
              </Upload>
              : null
          }
        </Space>
      </Image.PreviewGroup>
    </div>
  )
}
