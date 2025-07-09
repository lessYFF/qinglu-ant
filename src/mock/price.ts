/**
 * 价格管理相关 Mock 数据
 */

// 价格列表 Mock 数据
export const mockPriceList = {
  count: 8,
  list: [
    {
      id: 1,
      vehicleModelName: "大众朗逸 2023款",
      vehicleModelId: 2001,
      storeName: "北京朝阳门店",
      storeId: 1001,
      status: 1, // 售卖中
      statusStr: "售卖中",
      illegalDeposit: 200000, // 2000元违章押金
      rentDeposit: 300000, // 3000元租车押金
      creditUndepositList: [
        { id: 1001, channelName: "携程" },
        { id: 1002, channelName: "飞猪" }
      ],
      mileage: 300, // 300公里/天限制
      mileageLimit: 1, // 有里程限制
      mileageRent: 100, // 1元/公里超出费用
      tagList: [
        { id: 1, tagName: "经济型" },
        { id: 2, tagName: "自动挡" }
      ],
      vehicleCount: 5,
      channelPriceList: [
        {
          channelId: 1001,
          channelName: "携程",
          calendarList: [
            {
              id: 1,
              rentName: "平日价格",
              latestBookingTime: 2, // 2小时前预订
              leastRentalTime: 1, // 最短1天
              calendarType: 0, // 基础价格
              startDate: 0,
              endDate: 0,
              price: 15000, // 150元/天
              priceWeekend: 18000, // 180元/天
              latestBookingUnit: 1
            }
          ]
        },
        {
          channelId: 1002,
          channelName: "飞猪",
          calendarList: [
            {
              id: 2,
              rentName: "平日价格",
              latestBookingTime: 2,
              leastRentalTime: 1,
              calendarType: 0,
              startDate: 0,
              endDate: 0,
              price: 15500,
              priceWeekend: 18500,
              latestBookingUnit: 1
            }
          ]
        }
      ],
      insuranceServicePriceList: [
        {
          insuranceServiceSettingId: 1,
          insuranceServiceSettingName: "基础保险",
          onHighestPrice: 0,
          highestPrice: null,
          price: 3000,
          baseSetting: {
            damageInsurance: 1,
            damageInsuranceAmount: 150000,
            depreciation: 0,
            depreciationFee: 0,
            repairFeeRatio: 20,
            tire: 1,
            glass: 1,
            thirdPartyInsurance: 1000000,
            outageFee: 0,
            required: 1
          },
          status: 1,
          insuranceServicePriceChannelVoList: [
            {
              id: 1,
              rentBaseId: 1,
              vehicleModelId: 2001,
              storeId: 1001,
              insuranceServicePriceId: 1,
              insuranceServiceSettingId: 1,
              channel: 1001,
              channelName: "携程",
              price: 3000,
              status: 1
            }
          ]
        }
      ],
      addedServiceList: [
        {
          addedServiceSettingId: 1,
          addedServiceSettingName: "儿童座椅",
          onCharge: 1,
          price: 2000,
          baseSetting: {
            required: 0
          },
          status: 1,
          addedServiceChannelVoList: [
            {
              id: 1,
              rentBaseId: 1,
              addedServiceId: 1,
              vehicleModelId: 2001,
              storeId: 1001,
              addedServiceSettingId: 1,
              channel: 1001,
              channelName: "携程",
              price: 2000,
              status: 1
            }
          ]
        }
      ],
      ctripStandardFee: false
    }
  ]
};

// 附加服务列表 Mock 数据
export const mockAddedServiceList = {
  count: 5,
  list: [
    {
      id: 1,
      limitPerOrder: 2,
      name: "儿童座椅",
      status: 1,
      required: 0,
      preset: 1,
      storeId: 1001
    },
    {
      id: 2,
      limitPerOrder: 1,
      name: "GPS导航",
      status: 1,
      required: 0,
      preset: 1,
      storeId: 1001
    },
    {
      id: 3,
      limitPerOrder: 1,
      name: "行车记录仪",
      status: 1,
      required: 0,
      preset: 0,
      storeId: 1001
    }
  ]
};

// 保险服务列表 Mock 数据
export const mockInsuranceServiceList = [
  {
    id: 1,
    name: "基础保险",
    damageInsurance: 1,
    damageInsuranceAmount: 150000,
    depreciation: 0,
    depreciationFee: 0,
    repairFeeRatio: 20,
    tire: 1,
    glass: 1,
    thirdPartyInsurance: 1000000,
    outageFee: 0,
    required: 1,
    status: 1,
    preset: 1
  },
  {
    id: 2,
    name: "全险无忧",
    damageInsurance: 0,
    damageInsuranceAmount: 0,
    depreciation: 0,
    depreciationFee: 0,
    repairFeeRatio: 0,
    tire: 1,
    glass: 1,
    thirdPartyInsurance: 2000000,
    outageFee: 0,
    required: 0,
    status: 1,
    preset: 1
  }
];

// 日历价格 Mock 数据
export const mockCalendarList = [
  {
    calendarType: 0,
    id: 1,
    rentName: "平日价格",
    price: null,
    priceWeekend: null,
    startDate: 0,
    endDate: 0,
    basePricePeriod: "0000011", // 周六周日为周末
    latestBookingTime: 2,
    leastRentalTime: 1,
    channelId: null,
    holidayId: 1
  },
  {
    calendarType: 1,
    id: 2,
    rentName: "春节假期",
    price: 30000,
    priceWeekend: 30000,
    startDate: 1706832000000, // 2024春节
    endDate: 1707436800000,
    basePricePeriod: "1111111",
    latestBookingTime: 24,
    leastRentalTime: 2,
    channelId: null,
    holidayId: 2
  }
];

// API 响应格式
export const mockPriceResponses = {
  '/price/v1/list': mockPriceList,
  '/price/v1/addedService/list': mockAddedServiceList,
  '/price/v1/insuranceService/list': mockInsuranceServiceList,
  '/price/v1/calendar/list': mockCalendarList,
  '/price/v1/standardFee/find': { ctripStandardFee: false }
}; 