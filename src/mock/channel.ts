/**
 * 渠道管理相关 Mock 数据
 */

// 渠道状态枚举
export const ChannelStatusEnum = {
  3: '已授权',
  2: '关闭授权', 
  '-1': '未授权',
  0: '授权中',
  1: '授权失败'
};

// 对接类型枚举
export const ConnTypeEnum = {
  1: 'API对接',
  2: 'SAAS对接',
  3: 'GDS对接'
};

// 渠道列表 Mock 数据
export const mockChannelList = [
  {
    arreared: 0,
    arrearsTime: null,
    channelId: 1001,
    channelName: "携程",
    channelRegPhone: "13800138001",
    channelRegUser: "携程运营",
    channelVendorCode: "CTRIP001",
    connType: 1, // API对接
    id: 1,
    status: 3 // 已授权
  },
  {
    arreared: 0,
    arrearsTime: null,
    channelId: 1002,
    channelName: "飞猪",
    channelRegPhone: "13800138002",
    channelRegUser: "飞猪运营",
    channelVendorCode: "FLIGGY001",
    connType: 1,
    id: 2,
    status: 3
  },
  {
    arreared: 1,
    arrearsTime: 1702617600000,
    channelId: 1003,
    channelName: "哈啰出行",
    channelRegPhone: "13800138003",
    channelRegUser: "哈啰运营",
    channelVendorCode: "HELLOBIKE001",
    connType: 3, // GDS对接
    id: 3,
    status: 2 // 关闭授权
  },
  {
    arreared: 0,
    arrearsTime: null,
    channelId: 1004,
    channelName: "美团",
    channelRegPhone: "13800138004",
    channelRegUser: "美团运营",
    channelVendorCode: "MEITUAN001",
    connType: 1,
    id: 4,
    status: 0 // 授权中
  },
  {
    arreared: 0,
    arrearsTime: null,
    channelId: 1005,
    channelName: "滴滴出行",
    channelRegPhone: "13800138005",
    channelRegUser: "滴滴运营",
    channelVendorCode: "DIDI001",
    connType: 2, // SAAS对接
    id: 5,
    status: 1 // 授权失败
  }
];

// 渠道业务列表 Mock 数据
export const mockChannelBusiList = [
  {
    channelId: 1001,
    channelName: "携程"
  },
  {
    channelId: 1002,
    channelName: "飞猪"
  },
  {
    channelId: 1003,
    channelName: "哈啰出行"
  },
  {
    channelId: 1004,
    channelName: "美团"
  },
  {
    channelId: 1005,
    channelName: "滴滴出行"
  },
  {
    channelId: 0,
    channelName: "线下渠道"
  }
];

// 哈啰门店列表 Mock 数据
export const mockHelloStoreList = [
  {
    id: "hello_store_001",
    name: "哈啰北京朝阳店",
    address: "北京市朝阳区建国路88号",
    longitude: 116.457,
    latitude: 39.912,
    status: 1,
    businessHours: "24小时营业"
  },
  {
    id: "hello_store_002", 
    name: "哈啰北京西站店",
    address: "北京市丰台区莲花池东路120号",
    longitude: 116.321,
    latitude: 39.894,
    status: 1,
    businessHours: "06:00-24:00"
  },
  {
    id: "hello_store_003",
    name: "哈啰北京机场店",
    address: "北京市顺义区首都机场T3航站楼",
    longitude: 116.584,
    latitude: 40.048,
    status: 1,
    businessHours: "24小时营业"
  }
];

// 哈啰车型列表 Mock 数据
export const mockHelloCarList = [
  {
    id: "hello_car_001",
    name: "经济型-大众朗逸",
    brand: "大众",
    model: "朗逸",
    category: "经济型",
    seatCount: 5,
    gearbox: "自动",
    fuelType: "汽油",
    dailyPrice: 15000, // 150元/天
    status: 1,
    storeIds: ["hello_store_001", "hello_store_002"]
  },
  {
    id: "hello_car_002",
    name: "舒适型-本田雅阁",
    brand: "本田", 
    model: "雅阁",
    category: "舒适型",
    seatCount: 5,
    gearbox: "自动",
    fuelType: "汽油",
    dailyPrice: 25000, // 250元/天
    status: 1,
    storeIds: ["hello_store_001", "hello_store_003"]
  },
  {
    id: "hello_car_003",
    name: "豪华型-奔驰E级",
    brand: "奔驰",
    model: "E级",
    category: "豪华型", 
    seatCount: 5,
    gearbox: "自动",
    fuelType: "汽油",
    dailyPrice: 50000, // 500元/天
    status: 1,
    storeIds: ["hello_store_002", "hello_store_003"]
  }
];

// 青路门店列表 Mock 数据
export const mockQingluStoreList = [
  {
    storeId: 1001,
    storeName: "北京朝阳门店",
    cityName: "北京",
    address: "北京市朝阳区建国路SOHO现代城",
    deleted: 0
  },
  {
    storeId: 1002,
    storeName: "北京西站门店", 
    cityName: "北京",
    address: "北京市丰台区莲花池东路",
    deleted: 0
  },
  {
    storeId: 1003,
    storeName: "北京机场门店",
    cityName: "北京", 
    address: "北京市顺义区首都机场",
    deleted: 0
  },
  {
    storeId: 1004,
    storeName: "上海虹桥门店",
    cityName: "上海",
    address: "上海市闵行区虹桥枢纽",
    deleted: 0
  }
];

// 青路车型列表 Mock 数据
export const mockQingluCarList = [
  {
    id: 2001,
    vehicleUnionName: "大众朗逸 2023款 1.5L 自动风尚版",
    vehicleBrandName: "大众",
    vehicleSeryName: "朗逸",
    vehicleSubSeryName: "朗逸2023款",
    licenseType: "京牌",
    vehicleModelGroup: "经济型",
    fuelForm: "汽油"
  },
  {
    id: 2002,
    vehicleUnionName: "本田雅阁 2023款 1.5T CVT豪华版",
    vehicleBrandName: "本田",
    vehicleSeryName: "雅阁",
    vehicleSubSeryName: "雅阁2023款",
    licenseType: "京牌",
    vehicleModelGroup: "舒适型",
    fuelForm: "汽油"
  },
  {
    id: 2003,
    vehicleUnionName: "特斯拉Model 3 2023款 标准续航版",
    vehicleBrandName: "特斯拉",
    vehicleSeryName: "Model 3",
    vehicleSubSeryName: "Model 3 2023款",
    licenseType: "京牌",
    vehicleModelGroup: "新能源",
    fuelForm: "纯电动"
  }
];

// 哈啰授权状态 Mock 数据
export const mockHelloAuthStatus = {
  applyId: "auth_apply_001",
  status: 1, // 0-申请中, 1-成功, 2-失败
  statusText: "授权成功",
  progress: 100,
  message: "门店和车型信息同步完成",
  createTime: 1702617600000,
  updateTime: 1702618800000
};

// 验证码响应 Mock 数据
export const mockRegCodeResponse = {
  success: true,
  message: "验证码发送成功",
  expireTime: 300 // 5分钟过期
};

// API 响应格式统一处理
export const mockChannelResponses = {
  '/apiConn/v1/listChannel': mockChannelList,
  '/apiConn/v1/listChannelBusi': mockChannelBusiList,
  '/store/v1/third/list/gds/get': mockHelloStoreList,
  '/vehicle/model/v1/third/list/gds/get': mockHelloCarList,
  '/store/v1/storeListByAuth': mockQingluStoreList,
  '/vehicle/model/v1/list/vehicle_model/select': mockQingluCarList,
  '/channel/v1/third/apply/record': mockHelloAuthStatus,
  '/apiConn/v1/code': mockRegCodeResponse,
  '/apiConn/v1/save': { success: true, message: "申请提交成功" },
  '/apiConn/v1/updatePwd': { success: true, message: "密码修改成功" },
  '/apiConn/v1/updStatus': { success: true, message: "状态更新成功" },
  '/apiConn/v1/unbind': { success: true, message: "解绑成功" },
  '/channel/v1/third/gds/accredit/apply': { success: true, message: "授权信息暂存成功" },
  '/channel/v1/third/gds/match/add': { success: true, message: "授权关联信息提交成功" }
}; 