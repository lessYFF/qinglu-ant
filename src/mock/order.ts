/**
 * 订单管理相关 Mock 数据
 */

// 订单状态枚举
export const OrderStatusEnum = {
  0: '未提交',
  1: '已提交', 
  2: '确认中',
  3: '已确认',
  4: '已排车',
  5: '已取车',
  6: '已还车',
  7: '取消中',
  8: '已取消'
};

// 订单列表 Mock 数据
export const mockOrderList = {
  count: 15,
  list: [
    {
      id: 20001,
      orderNo: "O202312150001",
      channelId: 1001,
      channelName: "携程",
      storeId: 1001,
      storeName: "北京朝阳门店",
      vehicleId: 30001,
      license: "京A12345",
      vehicleModelId: 2001,
      vehicleModelName: "大众朗逸 2023款",
      customerName: "张客户",
      customerMobile: "13800138000",
      customerIdCard: "110101199001011234",
      status: 5, // 已取车
      statusText: "已取车",
      pickupTime: 1702617600000,
      returnTime: 1702879200000,
      actualPickupTime: 1702620000000,
      actualReturnTime: null,
      totalAmount: 25000,
      paidAmount: 25000,
      unpaidAmount: 0,
      createTime: 1702617600000,
      remark: "客户要求提前取车"
    },
    {
      id: 20002,
      orderNo: "O202312140001", 
      channelId: 1002,
      channelName: "飞猪",
      storeId: 1002,
      storeName: "北京西站门店",
      vehicleId: 30002,
      license: "京B67890",
      vehicleModelId: 2002,
      vehicleModelName: "本田雅阁 2023款",
      customerName: "李客户",
      customerMobile: "13900139000",
      customerIdCard: "110101199002021234",
      status: 3, // 已确认
      statusText: "已确认",
      pickupTime: 1702531200000,
      returnTime: 1702876800000,
      actualPickupTime: null,
      actualReturnTime: null,
      totalAmount: 35000,
      paidAmount: 35000,
      unpaidAmount: 0,
      createTime: 1702531200000,
      remark: ""
    }
  ]
};

// 服务项目 Mock 数据
export const mockServiceList = {
  addedList: [
    {
      id: 1,
      name: "儿童座椅",
      required: 0,
      amount: 2000 // 20元/天
    },
    {
      id: 2,  
      name: "GPS导航",
      required: 0,
      amount: 1000
    },
    {
      id: 3,
      name: "行车记录仪",
      required: 0,
      amount: 500
    }
  ],
  insuranceList: [
    {
      id: 1,
      name: "基础保险",
      required: 1,
      amount: 3000
    },
    {
      id: 2,
      name: "全险无忧",
      required: 0,
      amount: 8000
    }
  ]
};

// 算价结果 Mock 数据
export const mockCalculateList = [
  {
    vehicleId: 30001,
    vehicleModelName: "大众朗逸",
    vehicleTag: "经济型",
    vehicleNo: "京A12345",
    totalAmount: 25000,
    addedList: [
      { id: 1, name: "儿童座椅", required: 0, amount: 2000 }
    ],
    insuranceList: [
      { id: 1, name: "基础保险", required: 1, amount: 3000 }
    ],
    serviceItemAmountDTOS: [
      { id: 1, name: "基础租金", required: 1, amount: 20000 }
    ],
    hasStock: true,
    stockVehicleBusyVOList: []
  },
  {
    vehicleId: 30002,
    vehicleModelName: "本田雅阁",
    vehicleTag: "舒适型",
    vehicleNo: "京B67890", 
    totalAmount: 35000,
    addedList: [],
    insuranceList: [
      { id: 2, name: "全险无忧", required: 0, amount: 8000 }
    ],
    serviceItemAmountDTOS: [
      { id: 1, name: "基础租金", required: 1, amount: 27000 }
    ],
    hasStock: true,
    stockVehicleBusyVOList: []
  }
];

// 订单详情 Mock 数据
export const mockOrderDetail = {
  id: 20001,
  orderNo: "O202312150001",
  channelId: 1001,
  channelName: "携程",
  thirdOrderNo: "CTRIP202312150001",
  merchantId: 2001,
  storeId: 1001,
  storeName: "北京朝阳门店",
  vehicleId: 30001,
  license: "京A12345",
  vehicleModelId: 2001,
  vehicleModelName: "大众朗逸 2023款 1.5L 自动风尚版",
  customerInfo: {
    name: "张客户",
    mobile: "13800138000",
    idCard: "110101199001011234",
    driveLicense: "110101199001011234",
    creditCard: "6222021234567890"
  },
  orderTime: {
    pickupTime: 1702617600000,
    returnTime: 1702879200000,
    actualPickupTime: 1702620000000,
    actualReturnTime: null,
    rentDays: 3
  },
  pricing: {
    totalAmount: 25000,
    rentAmount: 20000,
    insuranceAmount: 3000,
    serviceAmount: 2000,
    depositAmount: 50000,
    paidAmount: 25000,
    unpaidAmount: 0
  },
  status: 5,
  statusText: "已取车",
  createTime: 1702617600000,
  remark: "客户要求提前取车",
  services: [
    { id: 1, name: "儿童座椅", amount: 2000, selected: true },
    { id: 1, name: "基础保险", amount: 3000, selected: true }
  ]
};

// 司机列表 Mock 数据  
export const mockDriverList = [
  {
    id: 5001,
    name: "司机张三",
    mobile: "13800001001",
    storeId: 1001,
    status: 1, // 可用
    vehicleCount: 2,
    todayOrderCount: 3
  },
  {
    id: 5002,
    name: "司机李四", 
    mobile: "13800001002",
    storeId: 1001,
    status: 1,
    vehicleCount: 1,
    todayOrderCount: 2
  }
];

// API 响应格式
export const mockOrderResponses = {
  '/order/v1/list': mockOrderList,
  '/order/v1/detail': mockOrderDetail,
  '/vehicle/model/v1/service/list/': mockServiceList,
  '/order/v1/price/new_calculate': mockCalculateList,
  '/pick_diver/list': mockDriverList,
  '/order/v1/base/emun/list': OrderStatusEnum
}; 