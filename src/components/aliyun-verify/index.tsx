// 详见：https://help.aliyun.com/document_detail/193144.html?spm=a2c4g.11186623.0.0.3d1658ddBLQBJU
import React, { useState, useEffect, useMemo, useRef } from 'react'
import config from '@/lib/config'
import { message, Button } from 'antd'
import { randomNumber } from '@/lib/lang'
import { Modal } from '../Modal/Modal'
import './index.module.less'

export interface VerifyResult {
  sessionId: string
  sig: string
  token: string
}

export function AliyunVerifyModal(props: {
  open: boolean
  onSuccess: (result: VerifyResult) => void
  onCancel: () => void
}) {
  const { open, onSuccess, onCancel } = props

  useEffect(() => {
    void loadScript()
  }, [])

  return (
    <Modal open={open} title="安全验证" footer={null} onCancel={onCancel} width={400}>
      {open ? <Content onSuccess={onSuccess} /> : null}
    </Modal>
  )
}

function Content(props: { onSuccess: (result: VerifyResult) => void }) {
  const { onSuccess } = props

  const elementId = useMemo(
    () => 'aliyun-verify-' + Math.round(Math.random() * 100000000).toString(),
    []
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined
    void loadScript().then(() => {
      /* eslint-disable */
      window.AWSC.use('ic', function (state, module) {
        // test 模式一下，每次调用返回随机结果
        const test = config.verifyTest
          ? module[
              ['TEST_PASS', 'TEST_BLOCK', 'TEST_NC_PASS', 'TEST_NC_BLOCK'][randomNumber(0, 3)]!
            ]
          : false
        const instance = module.init({
          test,
          appkey: config.verifyAppKey,
          scene: 'nvc_register',
          renderTo: elementId,
          success(data: VerifyResult) {
            console.log('阿里云验证通过', data)
            timeoutId = setTimeout(() => onSuccess(data), 500)
          },
          fail(failCode: string) {
            console.info('阿里云验证失败', failCode)
          },
          error(errorCode: string) {
            message.warn(`验证码加载异常${errorCode ? '：' + errorCode : ''}`)
          },
        })
      })
      /* eslint-enable */
    })
    return () => clearTimeout(timeoutId)
  }, [elementId, onSuccess])

  return (
    <div className="verify-container">
      <div id={elementId} className="verify-element"></div>
    </div>
  )
}

export function VerifyTrigger(
  props: {
    countdownText?: (countdown: number) => string
    onVerified: (result: VerifyResult) => Promise<boolean> // 返回 false 则不开始倒计时
  } & Parameters<typeof Button>[0]
) {
  const { countdownText = val => `${val}S`, onVerified, disabled, children, ...buttonProps } = props

  const [verifying, setVerifying] = useState(false)
  const [countdown, setCountdown] = useState(0)

  function handleResult(result: VerifyResult) {
    setVerifying(false)
    void onVerified(result).then(success => {
      if (success) setCountdown(60)
    })
  }

  const countdownRef = useRef(countdown)
  countdownRef.current = countdown
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdownRef.current > 0) setCountdown(countdownRef.current - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <Button
        {...buttonProps}
        disabled={countdown > 0 || disabled}
        onClick={() => setVerifying(true)}
      >
        {countdown ? countdownText(countdown) : children}
      </Button>
      <AliyunVerifyModal
        open={verifying}
        onCancel={() => setVerifying(false)}
        onSuccess={handleResult}
      />
    </>
  )
}

let scriptLoading: null | Promise<void> = null

async function loadScript() {
  if (!scriptLoading) {
    scriptLoading = new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://g.alicdn.com/AWSC/AWSC/awsc.js'
      script.addEventListener('load', () => resolve())
      document.body.appendChild(script)

      const style = document.createElement('style')
      style.innerHTML = `
        .sm-btn-wrapper > * {
          box-sizing: content-box;
        }
      `
      document.body.appendChild(style)
    })
  }
  return scriptLoading
}
