/**
 * 库存管理相关 Mock 数据
 */

// 库存占用情况 Mock 数据
export const mockStockOccupy = {
  storeId: 1001,
  storeName: "北京朝阳门店",
  overList: [], // 冲突车辆
  occupyList: [
    {
      vehicleId: 30001,
      license: "京A12345",
      status: 3, // 租赁中
      vehicleModelId: 2001,
      vehicleModelName: "大众朗逸",
      vehicleSource: 1, // 自有
      vehicleInfoTags: ["经济型", "自动挡"],
      saleStatus: 1,
      detailList: [
        {
          id: 1,
          autoSchedule: 0,
          startTime: 1702617600000,
          endTime: 1702879200000,
          endIntervalTime: 1702882800000, // 加1小时间隔
          sourceType: 1, // 订单
          sourceId: 20001,
          parentSourceId: 0,
          thirdSourceId: 0,
          thirdParentSourceId: 0,
          orderDetail: {
            status: 5,
            channelId: 1001,
            channelName: "携程",
            userName: "张客户",
            userMobile: "13800138000",
            createTime: 1702617600000,
            thirdOutOrderNo: "CTRIP202312150001",
            orderId: 20001,
            parentOrderId: 0,
            canUpdatePlan: false
          },
          busyDesc: "",
          canRelease: true,
          pickUpTime: 1702620000000,
          authFlg: true
        }
      ]
    },
    {
      vehicleId: 30002,
      license: "京B67890",
      status: 2, // 未租赁
      vehicleModelId: 2002,
      vehicleModelName: "本田雅阁",
      vehicleSource: 1,
      vehicleInfoTags: ["舒适型", "自动挡"],
      saleStatus: 1,
      detailList: [
        {
          id: 2,
          autoSchedule: 1,
          startTime: 1702704000000,
          endTime: 1702876800000,
          endIntervalTime: 1702880400000,
          sourceType: 1,
          sourceId: 20002,
          parentSourceId: 0,
          thirdSourceId: 0,
          thirdParentSourceId: 0,
          orderDetail: {
            status: 3,
            channelId: 1002,
            channelName: "飞猪",
            userName: "李客户",
            userMobile: "13900139000",
            createTime: 1702531200000,
            thirdOutOrderNo: "FLY202312140001",
            orderId: 20002,
            parentOrderId: 0,
            canUpdatePlan: true
          },
          busyDesc: "",
          canRelease: false,
          pickUpTime: 0,
          authFlg: true
        }
      ]
    }
  ]
};

// 库存汇总 Mock 数据
export const mockStockSummary = {
  overCount: 0,
  usableList: [
    {
      rowDate: 1702617600000, // 2023-12-15
      rowWeek: "星期五",
      dateList: Array.from({ length: 24 }, (_, hour) => ({
        usableCount: hour >= 8 && hour <= 18 ? 3 : 5, // 白天可用车辆少一些
        usableAllCount: 5,
        overFlg: 0
      }))
    },
    {
      rowDate: 1702704000000, // 2023-12-16
      rowWeek: "星期六",
      dateList: Array.from({ length: 24 }, (_, hour) => ({
        usableCount: hour >= 10 && hour <= 20 ? 2 : 4, // 周末更忙
        usableAllCount: 5,
        overFlg: hour >= 14 && hour <= 16 ? 1 : 0 // 下午有冲突
      }))
    },
    {
      rowDate: 1702790400000, // 2023-12-17
      rowWeek: "星期日",
      dateList: Array.from({ length: 24 }, (_, hour) => ({
        usableCount: hour >= 9 && hour <= 19 ? 2 : 4,
        usableAllCount: 5,
        overFlg: 0
      }))
    }
  ]
};

// 占用来源枚举
export const OccupySourceEnum = {
  0: '非订单占用',
  1: '订单',
  2: '车辆调度',
  3: '子订单',
  4: '维修单',
  5: '保养单',
  6: '年检单',
  7: '临时停售',
  999: '全局停售'
};

// 车辆状态枚举
export const VehicleStatusEnum = {
  1: '待上线',
  2: '未租赁',
  3: '租赁中',
  4: '维修中',
  5: '保养中',
  6: '调车中',
  7: '事故中',
  8: '年检中'
};

// API 响应格式
export const mockStockResponses = {
  '/stock/v1/stockOccupy': mockStockOccupy,
  '/stock/v1/stockSummary': mockStockSummary,
  '/stock/v1/release': { success: true, message: "库存释放成功" }
}; 