import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Spin, Button, Space, Modal } from 'antd'
import { Loading3QuartersOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import {
  getAliPayQrcode,
  getAliPayStatus,
  cancelPayOrder,
  type typeEmum,
  type AliPayResult,
  type AliPayQrcodeQuery,
  type AliPayStatusQuery,
} from '@/lib/data-source/bill'
import { pick } from 'lodash'
import Style from './index.module.less'

// 支付状态映射
const STATUS_MAP = {
  success: { message: '订单支付完成' },
  invalid: { message: '二维码超时' },
  error: { message: '订单支付异常' },
  cancel: { message: '订单支付取消' },
  over: { message: '订单交易关闭' },
}
export default function Pay({
  type,
  orderId,
  isShow,
  payParams,
  okText = '支付完成',
  cancelText = '取消支付',
  onPayFinsh,
  onPayCancel,
}: {
  isShow: boolean
  type: typeEmum
  orderId: number | string
  payParams?: object
  okText?: string
  cancelText?: string
  onPayFinsh: () => void
  onPayCancel: () => void
}) {
  const [loading, setLoading] = useState(false) // 是否加载中
  const [payInfo, setPayInfo] = useState<AliPayResult>() // 收款码信息
  const [payStatus, setPayStatus] = useState('') // 付款状态

  // 获取支付二维码
  const getPayQrcode = async (params: AliPayQrcodeQuery) => {
    try {
      setLoading(true)
      const res = await getAliPayQrcode(
        params.payFeeItemsVo || {},
        pick(params, ['orderId', 'type'])
      )

      if (res?.success) {
        setPayInfo(res?.data)
        loopPayResult(res?.data)
      } else {
        setPayStatus('error')
      }
      setLoading(false)
    } catch (msg) {
      setLoading(false)
      setPayStatus('error')
      console.log('getPayQrcode err', msg)
    }
  }

  // 获取支付状态
  const getPayStatus = async (params: AliPayStatusQuery) => {
    try {
      const { data } = await getAliPayStatus(params)
      // 待支付
      if (+data.status === 0) return

      if (+data.status === 2) {
        setPayStatus('success')
      } else if (+data.status === 7) {
        setPayStatus('error')
      } else if (+data.status === 9) {
        setPayStatus('over')
      }
    } catch (msg) {
      setPayStatus('error')
      console.log('getPayStatus err', msg)
    }
  }

  // 轮询支付结果
  let loopPayResult = params => {
    if (payStatus) return

    getPayStatus({ orderId, payNo: params?.payNo as string })
    const timer = setTimeout(() => {
      loopPayResult(params)
      clearTimeout(timer)
    }, 3000)
  }

  // 刷新二维码
  const refresh = () => {
    setPayInfo(null)
    setPayStatus('')
    getPayQrcode({ orderId, type, payFeeItemsVo: payParams })
  }

   // 取消支付
  const handleCancelPay = () => {
    Modal.confirm({
      content: '取消支付将自动取消订单，您真的要取消吗？',
      onOk: async () => {
        try {
          onPayCancel()
          await cancelPayOrder({ orderId, payNo: payInfo?.payNo })
        } catch (err) {
          console.log('handleCancelPay error', err)
        }
      },
      onCancel: () => {
        console.log('handleCancelPay cancel')
      },
    })
  }

  useEffect(() => {
    if (isShow) {
      setPayStatus('')
      getPayQrcode({ orderId, type, payFeeItemsVo: payParams })
    }

    return () => {
      loopPayResult = () => {} 
    }
  }, [isShow])

  return (
    <Modal
      title="向用户收款"
      okText={okText}
      cancelText={cancelText}
      closable={false}
      maskClosable={false}
      open={isShow}
      okButtonProps={{ disabled: payStatus !== 'success' }}
      cancelButtonProps={{ disabled: payStatus === 'success' }}
      onOk={onPayFinsh}
      onCancel={handleCancelPay}
    >
      <div className={Style.aliPay}>
        <div style={{ margin: '10px 0' }}>仅支持支付宝扫码</div>
        <div className={Style.aliPayWrap}>
          {/*支付二维码*/}
          {payInfo && <QRCodeSVG value={payInfo.payUrl} level="H" width="100%" height="100%" />}

          {/*加载loading*/}
          {loading && (
            <div className={Style.loading}>
              <Spin tip="Loading..."/>
            </div>
          )}

          {/*支付结果*/}
          {payStatus && (
            <div className={Style.mask}>
              <div className={Style.status}>
                <Space>
                  {payStatus === 'success' ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="red" />
                  )}
                  <span style={{ margin: '0 6px' }}>{STATUS_MAP[payStatus]?.message}</span>
                </Space>
                {payStatus === 'invalid' && (
                  <Button
                    icon={<Loading3QuartersOutlined />}
                    style={{ color: '#1677ff' }}
                    type="text"
                    size="small"
                    onClick={refresh}
                  >
                    刷新
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        {payInfo && (
          <div style={{ margin: '10px 0' }}>
            总费用合计: <b style={{ color: 'orange' }}>￥{(payInfo.payAmount / 100).toFixed(2)}</b>
          </div>
        )}
      </div>
    </Modal>
  )
}
