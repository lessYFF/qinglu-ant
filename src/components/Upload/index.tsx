/**
 * 文件上传组件
 */
import React, { useMemo, useRef, useState, useCallback } from 'react'
import c from 'classnames'
import { message, Image } from 'antd'
import { Modal } from '@/components'
import { LoadingOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { truthy, useRefValue } from '@/lib/lang'
import { API } from '@/lib/API'
import config from '@/lib/config'
import './index.less'

type UploadType = 'image' | 'video' | 'file'

export const defaultMimeType: Record<UploadType, string> = {
  image: '.jpg,.jpeg,.png',
  video: '.mp4,.mov,.wmv,.avi,.3gp',
  file: '*',
}

export enum OcrType {
  身份证正面 = 1,
  身份证反面 = 2,
  驾驶证 = 3,
  行驶证正页 = 4,
  行驶证副页 = 5,
}

interface BaseProps {
  className?: string
  isPrivate?: boolean // 上传的是否是“隐私”内容
  type?: UploadType // 上传资源类型，默认为 Image
  mimeType?: string // 允许上传的文件类型，若不指定，会根据 type 填充默认值
  size?: number // 指定文件大小限制（单位 M）
  ocrType?: OcrType // 若指定，上传后会触发 OCR 识别
  onOcr?: (data: unknown) => void // 获得 OCR 识别结果后会调用此回调
  renderAdd: () => React.ReactNode // 渲染“上传”内容
  renderItem: (url: string) => React.ReactNode // 渲染“预览”内容
}
export interface UploadSingleProps extends BaseProps {
  multiple?: null
  value?: string // 当前已上传的文件 URL
  onChange?: (value: string | undefined) => void // 上传/删除文件时触发回调
}
export interface UploadMultiProps extends BaseProps {
  multiple: number // 若指定，则允许上传多少个文件，数值为允许的上限
  value?: string[] // 已上传的文件列表
  onChange?: (value: string[]) => void
}
export type UploadProps = UploadSingleProps | UploadMultiProps

export function Upload(props: UploadProps) {
  const {
    className,
    isPrivate = false,
    type = 'image',
    mimeType: rawMimeType,
    size,
    multiple = null,
    value: rawValue,
    onChange: rawOnChange,
    ocrType,
    onOcr,
    renderAdd,
    renderItem,
  } = props
  const mimeType = rawMimeType ?? defaultMimeType[type]

  const value = useMemo(
    () =>
      multiple !== null
        ? (rawValue as string[] | undefined) ?? []
        : truthy(rawValue)
        ? [rawValue as string]
        : [],
    [multiple, rawValue]
  )

  const onChange = useCallback(
    function (value: string[]) {
      if (!rawOnChange) return
      if (multiple !== null) rawOnChange(value as string & string[])
      else rawOnChange((value.length ? value[0] : undefined) as string & string[])
    },
    [multiple, rawOnChange]
  )

  const addable = value.length < (multiple ?? 1)
  const [adding, setAdding] = useState(false)
  const ocrRef = useRefValue(ocrType && onOcr ? { ocrType, onOcr } : null)
  // TODO: 支持处理多个文件
  const handleFile = useCallback(
    async (file: File) => {
      if (size !== undefined) {
        const fileSize = file.size
        if (fileSize > size * 1024 * 1024) {
          void message.error(`文件不能大于${size}M`)
          return
        }
      }

      setAdding(true)
      const url = await upload(file, isPrivate)
      setAdding(false)
      if (url === null) return
      onChange([...value, url])

      if (!ocrRef.current) return
      const { ocrType, onOcr } = ocrRef.current
      const ocrRes = await API('/upload/v1/ocr', {
        data: { type: ocrType, url },
        json: false,
      })
      if (ocrRes.success) onOcr(ocrRes.data)
      else void message.error('图片识别失败')
    },
    [size, value, onChange, isPrivate]
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const inputOnChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null
      e.target.value = ''
      if (file) return handleFile(file)
    },
    [handleFile]
  )

  function handleDragOver(e: React.DragEvent) {
    // TODO: 维护一个“拖拽文件到此”的状态？
    if (addable) e.preventDefault()
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const files = parseFiles(e.dataTransfer)
    if (files.length) void handleFile(files[0]!)
  }
  function parseFiles(dataTransfer: DataTransfer) {
    return [...dataTransfer.items]
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null)
  }

  function onRemove(index: number) {
    const updated = [...value]
    updated.splice(index, 1)
    onChange(updated)
  }

  return (
    <div className={c('app-upload-wrapper', className)}>
      {value.map((url, index) => {
        return (
          <div key={`${index}-${url}`} className="app-upload-item">
            {renderItem(url)}
            <ItemActions
              type={type}
              multiple={multiple !== null}
              url={url}
              onTriggerUplaod={() => {}}
              onRemove={() => onRemove(index)}
            />
          </div>
        )
      })}

      {addable ? (
        <div
          className="app-upload-add"
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {adding ? (
            <div className="app-upload-adding">
              <LoadingOutlined />
              <span>上传中...</span>
            </div>
          ) : null}
          {renderAdd()}
          <input
            type="file"
            multiple={multiple !== null}
            accept={mimeType || undefined}
            ref={inputRef}
            onChange={inputOnChange}
          />
        </div>
      ) : null}
    </div>
  )
}

function ItemActions(props: {
  type: UploadType
  multiple: boolean
  url: string
  onTriggerUplaod: () => void
  onRemove: () => void
}) {
  const { type, multiple, url, onTriggerUplaod, onRemove } = props
  const [previewing, setPreviewing] = useState(false)

  if (type === 'image') {
    return (
      <div className="app-upload-actions image">
        {url.endsWith('.pdf') ? (
          // 传图片的地方有时也支持上传 pdf
          <a target="_blank" download href={url}>
            下载
          </a>
        ) : (
          <a onClick={() => setPreviewing(true)}>预览</a>
        )}
        <span>|</span>
        <a onClick={onRemove}>删除</a>
        <Image
          preview={{
            visible: previewing,
            src: url,
            onVisibleChange() {
              setPreviewing(false)
            },
          }}
        />
      </div>
    )
  }

  if (type === 'video') {
    return (
      <div className="app-upload-actions video">
        <a onClick={() => setPreviewing(true)}>预览</a>
        <span>|</span>
        <a onClick={onRemove}>删除</a>

        <Modal
          open={previewing}
          title={null}
          footer={null}
          onCancel={() => setPreviewing(false)}
          width={600}
        >
          {previewing ? (
            <div className="app-upload-video-previewing-wrap">
              <video controls autoPlay src={url} width={500} height={500}></video>
            </div>
          ) : null}
        </Modal>
      </div>
    )
  }

  return null
}

// ==================================

interface UploadData {
  accessId: string
  policy: string
  signature: string
  dir: string // 上传文件要以此为前缀
  host: string // 文件访问域名
  expire: string
  callback: string
}

/**
 * 执行上传，成功返回文件 URL，失败返回 null
 */
async function upload(file: File, isPrivate = false) {
  const apiURL = isPrivate ? '/upload/v1/accessPrivate' : '/upload/v1/access'

  const keyRes = await API<UploadData>(apiURL)
  if (!keyRes.success) {
    void message.error('文件上传失败：' + keyRes.error.message)
    return null
  }

  const { accessId, policy, signature, dir, host } = keyRes.data
  const filepath = `${dir}/${uuidv4()}${getExt(file.name)}`

  const visitHost = isPrivate ? config.privateCDNHost : config.CDNHost
  const url = visitHost + '/' + filepath

  // https://help.aliyun.com/document_detail/31926.htm?spm=a2c4g.11186623.0.0.26885458z9YPHU#concept-en4-sjy-5db
  const form = new FormData()
  form.append('key', filepath)
  form.append('policy', policy)
  form.append('OSSAccessKeyId', accessId)
  form.append('signature', signature)
  form.append('file', file)
  const resp = await window.fetch(host, {
    method: 'POST',
    body: form,
  })
  if (resp.status !== 204) {
    void message.error('文件上传失败')
    return null
  }

  return url
}

function getExt(filename: string) {
  if (filename.includes('.')) {
    return filename.slice(filename.lastIndexOf('.'))
  } else {
    return ''
  }
}

export async function getUploadFileKey(file: File, isPrivate: boolean = false) {
  const apiURL = isPrivate ? '/upload/v1/accessPrivate' : '/upload/v1/access'
  const keyRes = await API<UploadData>(apiURL)
  if (!keyRes.success) {
    void message.error('文件上传失败：' + keyRes.error.message)
    return null
  }

  const { accessId, policy, signature, dir, host } = keyRes.data
  const filepath = `${dir}/${uuidv4()}${getExt(file.name)}`

  const visitHost = isPrivate ? config.privateCDNHost : config.CDNHost
  const url = visitHost + '/' + filepath
  return {
    ...keyRes.data,
    url,
    filepath,
  }
}
export async function uploadFile(file: File, isPrivate: boolean = false) {
  const apiURL = isPrivate ? '/upload/v1/accessPrivate' : '/upload/v1/access'
  const keyRes = await API<UploadData>(apiURL)
  if (!keyRes.success) {
    void message.error('文件上传失败：' + keyRes.error.message)
    return null
  }

  const { accessId, policy, signature, dir, host } = keyRes.data
  const filepath = `${dir}/${uuidv4()}${getExt(file.name)}`

  const visitHost = isPrivate ? config.privateCDNHost : config.CDNHost
  const url = visitHost + '/' + filepath

  // https://help.aliyun.com/document_detail/31926.htm?spm=a2c4g.11186623.0.0.26885458z9YPHU#concept-en4-sjy-5db
  const form = new FormData()
  form.append('key', filepath)
  form.append('policy', policy)
  form.append('OSSAccessKeyId', accessId)
  form.append('signature', signature)
  form.append('file', file)
  const resp = await window.fetch(host, {
    method: 'POST',
    body: form,
  })
  if (resp.status !== 204) {
    void message.error('文件上传失败')
    return null
  }

  return url
}
