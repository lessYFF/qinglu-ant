/**
 * 账单管理相关 Mock 数据
 */

// 账户信息 Mock 数据
export const mockAccountInfo = {
  id: 1001,
  merchantId: 2001,
  totalAmount: 500000, // 5000元，单位分
  invoicableAmount: 300000, // 3000元可开票
  arrearsTime: null,
  serviceCloseTime: null,
  arreared: 0,
  serviceClosed: null,
  invoicableNum: 15
};

// 账单列表 Mock 数据
export const mockBillList = {
  count: 10,
  list: [
    {
      id: 10001,
      billNo: "B202312150001",
      orderId: 20001,
      orderNo: "O202312150001",
      merchantId: 2001,
      storeId: 1001,
      storeName: "北京朝阳门店",
      vehicleId: 30001,
      license: "京A12345",
      vehicleModelName: "大众朗逸",
      customerName: "张客户",
      customerMobile: "13800138000",
      status: 2, // 已支付
      statusText: "已支付",
      totalAmount: 25000, // 250元
      paidAmount: 25000,
      unpaidAmount: 0,
      createTime: 1702617600000, // 2023-12-15
      payTime: 1702620000000,
      rentStartTime: 1702620000000,
      rentEndTime: 1702879200000,
      rentDays: 3,
      items: [
        {
          id: 1,
          name: "基础租金",
          amount: 20000,
          type: "RENT"
        },
        {
          id: 2,
          name: "保险费",
          amount: 3000,
          type: "INSURANCE"
        },
        {
          id: 3,
          name: "服务费",
          amount: 2000,
          type: "SERVICE"
        }
      ]
    },
    {
      id: 10002,
      billNo: "B202312140001",
      orderId: 20002,
      orderNo: "O202312140001",
      merchantId: 2001,
      storeId: 1002,
      storeName: "北京西站门店",
      vehicleId: 30002,
      license: "京B67890",
      vehicleModelName: "本田雅阁",
      customerName: "李客户",
      customerMobile: "13900139000",
      status: 1, // 待支付
      statusText: "待支付",
      totalAmount: 35000, // 350元
      paidAmount: 0,
      unpaidAmount: 35000,
      createTime: 1702531200000,
      payTime: null,
      rentStartTime: 1702531200000,
      rentEndTime: 1702876800000,
      rentDays: 4,
      items: [
        {
          id: 4,
          name: "基础租金",
          amount: 28000,
          type: "RENT"
        },
        {
          id: 5,
          name: "保险费",
          amount: 4000,
          type: "INSURANCE"
        },
        {
          id: 6,
          name: "附加服务费",
          amount: 3000,
          type: "ADDITIONAL"
        }
      ]
    }
  ]
};

// 充值列表 Mock 数据
export const mockRechargeList = {
  count: 8,
  list: [
    {
      id: 40001,
      merchantId: 2001,
      rechargeNo: "R202312150001",
      amount: 100000, // 1000元
      payAmount: 100000,
      status: 2, // 充值成功
      statusText: "充值成功",
      payType: 1, // 微信支付
      payTypeName: "微信支付",
      createTime: 1702617600000,
      payTime: 1702617800000,
      remark: "账户充值",
      operator: "张三",
      payOrderNo: "WX20231215001"
    },
    {
      id: 40002,
      merchantId: 2001,
      rechargeNo: "R202312140001",
      amount: 50000, // 500元
      payAmount: 50000,
      status: 2,
      statusText: "充值成功",
      payType: 2, // 支付宝
      payTypeName: "支付宝",
      createTime: 1702531200000,
      payTime: 1702531500000,
      remark: "账户充值",
      operator: "李四",
      payOrderNo: "ALI20231214001"
    },
    {
      id: 40003,
      merchantId: 2001,
      rechargeNo: "R202312130001",
      amount: 30000,
      payAmount: 30000,
      status: 1, // 充值中
      statusText: "充值中",
      payType: 1,
      payTypeName: "微信支付",
      createTime: 1702444800000,
      payTime: null,
      remark: "账户充值",
      operator: "王五",
      payOrderNo: "WX20231213001"
    }
  ]
};

// 退款记录 Mock 数据
export const mockRefundList = {
  count: 5,
  list: [
    {
      id: 50001,
      merchantId: 2001,
      refundNo: "RF202312150001",
      originalOrderNo: "O202312100001",
      refundAmount: 15000, // 150元
      status: 2, // 退款成功
      statusText: "退款成功",
      refundType: 1, // 订单退款
      refundTypeName: "订单退款",
      reason: "客户取消订单",
      createTime: 1702617600000,
      processTime: 1702618800000,
      operator: "张三",
      remark: "正常退款"
    },
    {
      id: 50002,
      merchantId: 2001,
      refundNo: "RF202312140001",
      originalOrderNo: "O202312090001",
      refundAmount: 8000,
      status: 1, // 处理中
      statusText: "处理中",
      refundType: 2, // 违章退款
      refundTypeName: "违章退款",
      reason: "违章处理完毕",
      createTime: 1702531200000,
      processTime: null,
      operator: "李四",
      remark: "违章押金退还"
    }
  ]
};

// 支付渠道信息 Mock 数据
export const mockPayChannelInfo = [
  {
    id: 1,
    merchantId: 2001,
    paymentChannelId: 1001,
    paymentChannelTypeCode: "WECHAT",
    paymentChannelName: "微信支付",
    paymentChannelTypeIcon: "wechat-icon.png",
    paymentChannelTypeName: "微信",
    paymentChannelTypeSort: "1",
    entityName: "青路汽车租赁有限公司"
  },
  {
    id: 2,
    merchantId: 2001,
    paymentChannelId: 1002,
    paymentChannelTypeCode: "ALIPAY",
    paymentChannelName: "支付宝",
    paymentChannelTypeIcon: "alipay-icon.png",
    paymentChannelTypeName: "支付宝",
    paymentChannelTypeSort: "2",
    entityName: "青路汽车租赁有限公司"
  },
  {
    id: 3,
    merchantId: 2001,
    paymentChannelId: 1003,
    paymentChannelTypeCode: "BANK",
    paymentChannelName: "银行转账",
    paymentChannelTypeIcon: "bank-icon.png",
    paymentChannelTypeName: "银行卡",
    paymentChannelTypeSort: "3",
    entityName: "青路汽车租赁有限公司"
  }
];

// 支付二维码结果 Mock 数据
export const mockAliPayResult = {
  payUrl: "https://qr.alipay.com/bax08861yztjdaokk50a004a",
  payNo: "ALI20231215001",
  payAmount: 25000
};

// 商户设置 Mock 数据
export const mockMerchantSetting = {
  merchantId: 2001,
  enableWechat: true,
  enableAlipay: true,
  enableBank: true,
  autoRefund: true,
  refundDays: 7,
  minRechargeAmount: 1000, // 最小充值金额（分）
  maxRechargeAmount: 1000000 // 最大充值金额（分）
};

// API 响应格式统一处理
export const mockBillResponses = {
  '/merchant_account/v1/get_account': mockAccountInfo,
  '/order/bill/list/v1': mockBillList,
  '/recharge/v1/getRechargeList': mockRechargeList,
  '/recharge/v1/getRefundList': mockRefundList,
  '/recharge/v1/getRefundRechargeList': mockRechargeList,
  '/wechatPay/v1/getWechatPayUrl': mockAliPayResult,
  '/wechatPay/v2/getWechatPayUrl': mockAliPayResult,
  '/aliPay/v1/getAliPayUrl': mockAliPayResult,
  '/aliPay/v2/getAliPayUrl': mockAliPayResult,
  '/aliPay/v1/getAliPayQrcode': mockAliPayResult,
  '/aliPay/v1/getAliPayStatus': { success: true, paid: true },
  '/merchant/setting': mockMerchantSetting,
  '/payment/channel/list': mockPayChannelInfo
}; 