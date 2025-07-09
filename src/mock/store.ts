/**
 * 门店管理相关 Mock 数据
 */

// 简单门店列表 Mock 数据
export const mockSimpleStores = [
  {
    cityCode: 110100,
    cityName: "北京",
    deleted: 0,
    storeId: 1001,
    storeName: "北京朝阳门店",
    storeNameUnion: "1001-北京朝阳门店"
  },
  {
    cityCode: 110100,
    cityName: "北京",
    deleted: 0,
    storeId: 1002,
    storeName: "北京西站门店",
    storeNameUnion: "1002-北京西站门店"
  },
  {
    cityCode: 110100,
    cityName: "北京",
    deleted: 0,
    storeId: 1003,
    storeName: "北京机场门店",
    storeNameUnion: "1003-北京机场门店"
  },
  {
    cityCode: 310100,
    cityName: "上海",
    deleted: 0,
    storeId: 1004,
    storeName: "上海虹桥门店",
    storeNameUnion: "1004-上海虹桥门店"
  }
];

// 门店详情 Mock 数据
export const mockStoreDetail = {
  id: 1,
  storeId: 1001,
  storeName: "北京朝阳门店",
  storeSize: 200, // 200平米
  storeDecorate: 2, // 标准装修
  address: "北京市朝阳区建国路SOHO现代城B座",
  storePosType: 1, // 市区门店
  storeType: 0, // 实体门店
  storeStatus: 1, // 营业中
  longLat: {
    longitude: 116.457,
    latitude: 39.912
  },
  orderIntervalUnit: 1,
  countryCode: 86,
  provinceCode: 110000,
  provinceName: "北京市",
  cityCode: 110100,
  cityName: "北京市",
  areaCode: 110105,
  isTest: 0,
  merchantId: 2001,
  minAdvanceBookingUnit: 1,
  maxAdvanceBookingUnit: 3,
  minAdvanceBookingTime: 2, // 最少提前2小时
  maxAdvanceBookingTime: 3, // 最多提前3个月
  minRentTerm: 1, // 最短1天
  maxRentTerm: 30, // 最长30天
  orderInterval: 1, // 1小时间隔
  orderIntervalList: [],
  freeShuttleEnabled: 1,
  freeShuttle: 5, // 5公里免费接送
  pickupEnabled: 1,
  guidePickupList: [
    {
      id: 1,
      storeId: 1001,
      guideType: 1, // 取车指引
      guideDesc: "请到B座1层大厅找到青路租车柜台",
      picVoList: [
        { id: 1, guidePic: "/images/pickup-guide-1.jpg" }
      ]
    }
  ],
  guideReturnList: [
    {
      id: 2,
      storeId: 1001,
      guideType: 2, // 还车指引
      guideDesc: "请将车辆停到指定停车位，钥匙交给工作人员",
      picVoList: [
        { id: 2, guidePic: "/images/return-guide-1.jpg" }
      ]
    }
  ],
  businessTimeV2List: [
    {
      businessPeriod: "1111100", // 周一到周五
      businessFrom: 800, // 8:00
      businessTo: 2200, // 22:00
      nightList: [
        {
          businessFrom: 2200,
          businessTo: 2400,
          fee: 5000, // 50元夜间服务费
          feeType: 1
        }
      ]
    }
  ],
  restTimeList: [
    {
      id: 1,
      startDate: 1704067200000, // 2024年元旦
      endDate: 1704326400000,
      startTime: 0,
      endTime: 2359
    }
  ],
  contactList: [
    {
      id: 1,
      storeId: 1001,
      contactType: 0, // 常用联系人
      linkName: "店长张三",
      countryCode: "+86",
      mobile: "13800001001",
      telArea: "010",
      tel: "12345678",
      telExt: "",
      email: "zhangsan@qinglu.com",
      mobileTypeList: [],
      ortherDisabled: false,
      currencyDisabled: false
    }
  ],
  hourlyChargeList: null,
  hourlyList: null,
  productList: [1001, 1002],
  productList1: [1001, 1002],
  channelName: "携程",
  channelId: 1001,
  fuelFormList: [
    {
      fuelForm: "汽油",
      modelList: [
        {
          id: 2001,
          vehicleUnionName: "大众朗逸 2023款",
          vehicleBrandName: "大众",
          vehicleSerId: 3001,
          vehicleSeryName: "朗逸",
          vehicleSubSeryId: 4001,
          vehicleSubSeryName: "朗逸2023款",
          licenseType: "京牌",
          vehicleModelGroup: "经济型",
          vehicleModelGroupId: 5001,
          modelSimpleName: "朗逸",
          fuelForm: "汽油"
        }
      ]
    }
  ],
  selfGuidePickupList: [],
  selfGuideReturnList: [],
  selfServiceReturn: false,
  ctripStandardFee: false,
  dealership: "5%",
  storeAttList: []
};

// 取送车配置 Mock 数据
export const mockPickupConfigs = [
  {
    id: 1,
    storeId: 1001,
    name: "朝阳区服务圈",
    color: "#1890ff",
    feeType: 0, // 免费
    fee: 0,
    longLatList: [
      { latitude: 39.910, longitude: 116.450 },
      { latitude: 39.915, longitude: 116.460 },
      { latitude: 39.905, longitude: 116.465 },
      { latitude: 39.900, longitude: 116.455 }
    ],
    enabled: 1,
    businessFrom: 800,
    businessTo: 2000,
    serviceRestTimeVo: {}
  },
  {
    id: 2,
    storeId: 1001,
    name: "机场服务圈",
    color: "#52c41a",
    feeType: 1, // 收费
    fee: 10000, // 100元
    longLatList: [
      { latitude: 40.040, longitude: 116.580 },
      { latitude: 40.050, longitude: 116.590 },
      { latitude: 40.035, longitude: 116.595 },
      { latitude: 40.030, longitude: 116.585 }
    ],
    enabled: 1,
    businessFrom: 600,
    businessTo: 2400,
    serviceRestTimeVo: {}
  }
];

// API 响应格式
export const mockStoreResponses = {
  '/store/v1/storeListByAuth': mockSimpleStores,
  '/store/v1/storeListByMerchant': mockSimpleStores,
  '/store/v1/list': { count: 4, list: [mockStoreDetail] },
  '/store/v1/detail': mockStoreDetail,
  '/store/v1/init': { ctripStandardFee: false },
  '/store/pickup/v1/list': mockPickupConfigs,
  '/store/pickup/v1/find': mockPickupConfigs[0]
}; 