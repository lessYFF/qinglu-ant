/**
 * 车辆管理相关 Mock 数据
 */

// 车辆列表 Mock 数据
export const mockVehicleList = {
  count: 12,
  list: [
    {
      includeDel: false,
      id: 30001,
      vehicleImgUrl: "/images/vehicle-1.jpg",
      vehicleModelId: 2001,
      vehicleModelName: "大众朗逸 2023款 1.5L 自动风尚版",
      licenseTypeName: "京牌",
      license: "京A12345",
      frameNum: "LFV3A21K8E3123456",
      vehicleSource: 1, // 自有
      vehicleStatus: 3, // 租赁中
      storeId: 1001,
      storeName: "北京朝阳门店",
      storeNameUnion: "1001-北京朝阳门店",
      belongCityName: "北京",
      purchase: {
        purchaseWay: 0, // 全额购车
        SalesChannel: 1,
        purchaseAmount: 12000000, // 12万元
        leaseTime: 0,
        monthlyRent: 0,
        vehicleSupplier: "4S店直采",
        shareholder: ""
      },
      auditStatus: 1, // 审核通过
      auditFailReason: "",
      etcActivateStatus: "已激活",
      etcIcNo: "ETC001122334455",
      platformSold: 1 // 通用渠道
    },
    {
      includeDel: false,
      id: 30002,
      vehicleImgUrl: "/images/vehicle-2.jpg",
      vehicleModelId: 2002,
      vehicleModelName: "本田雅阁 2023款 1.5T CVT豪华版",
      licenseTypeName: "京牌",
      license: "京B67890",
      frameNum: "1HGBH41JXMN234567",
      vehicleSource: 1,
      vehicleStatus: 2, // 未租赁
      storeId: 1002,
      storeName: "北京西站门店",
      storeNameUnion: "1002-北京西站门店",
      belongCityName: "北京",
      purchase: {
        purchaseWay: 1, // 贷款购车
        SalesChannel: 1,
        purchaseAmount: 18000000, // 18万元
        leaseTime: 36, // 36期
        monthlyRent: 5000000, // 5000元/月
        vehicleSupplier: "银行融资租赁",
        shareholder: ""
      },
      auditStatus: 1,
      auditFailReason: "",
      etcActivateStatus: "未激活",
      etcIcNo: "",
      platformSold: 1
    }
  ]
};

// 车辆详情 Mock 数据
export const mockVehicleDetail = {
  id: 30001,
  vehicleModelName: "大众朗逸 2023款 1.5L 自动风尚版",
  storeId: 1001,
  storeName: "北京朝阳门店",
  vehicleSource: 1,
  vehicleStatus: 3,
  license: "京A12345",
  frameNum: "LFV3A21K8E3123456",
  shareholder: "",
  vehicleColorId: 1001,
  vehicleModelId: 2001,
  merchantId: 2001,
  mileage: 15000, // 1.5万公里
  maintenanceInterval: 10000, // 1万公里保养间隔
  nextMaintenanceMileage: 20000, // 下次保养里程
  maintenanceStartTime: "",
  maintenanceEndTime: "",
  maintenanceAfterMileage: "",
  vehicleImgUrl: "/images/vehicle-1.jpg",
  platformSold: 1,
  vehicleTip: null,
  licenseParam: {
    filePath: "/files/license-1.jpg",
    engineNum: "CFB123456",
    regDate: "2023-01-15",
    usageNature: 2, // 租赁
    owner: "青路汽车租赁有限公司",
    license: "京A12345",
    frameNum: "LFV3A21K8E3123456"
  },
  yearlyInspectionPeriodParam: {
    filePath: "/files/inspection-1.jpg",
    yearlyInspectionPeriod: "2024-12-31"
  },
  bizInsuranceParamList: [
    {
      id: 1,
      filePathList: [
        { id: 1, filePath: "/files/insurance-1.jpg", fileType: 1 }
      ],
      insuranceCompany: "中国人保",
      insuranceNum: "PICC202301150001",
      insuranceIdcard: "91110105MA01234567",
      insuranceStartDate: "2023-01-15",
      insuranceEndDate: "2024-01-14",
      thirdInsuranceType: 4, // 100万
      damageAmount: 120000, // 12万车损起赔
      frameNum: "LFV3A21K8E3123456",
      engineNum: "CFB123456",
      insuranceHolder: "青路汽车租赁有限公司"
    }
  ],
  saliInsuranceParamList: [
    {
      id: 1,
      filePathList: [
        { id: 1, filePath: "/files/compulsory-1.jpg", fileType: 1 }
      ],
      insuranceCompany: "中国人保",
      insuranceNum: "PICC202301150002",
      insuranceIdcard: "91110105MA01234567",
      insuranceStartDate: "2023-01-15",
      insuranceEndDate: "2024-01-14",
      frameNum: "LFV3A21K8E3123456",
      engineNum: "CFB123456",
      insuranceHolder: "青路汽车租赁有限公司"
    }
  ],
  purchase: {
    purchaseWay: 0,
    SalesChannel: 1,
    purchaseAmount: 12000000,
    leaseTime: 0,
    monthlyRent: 0,
    vehicleSupplier: "4S店直采",
    shareholder: ""
  }
};

// 车辆颜色 Mock 数据
export const mockVehicleColors = [
  { id: 1001, colorName: "珍珠白" },
  { id: 1002, colorName: "象牙白" },
  { id: 1003, colorName: "银灰色" },
  { id: 1004, colorName: "深灰色" },
  { id: 1005, colorName: "黑色" },
  { id: 1006, colorName: "红色" },
  { id: 1007, colorName: "蓝色" }
];

// 调车单列表 Mock 数据
export const mockShuntingTickets = {
  count: 3,
  list: [
    {
      id: 7001,
      shuntingStatus: 1, // 调车中
      vehicleInfoId: 30001,
      license: "京A12345",
      vehicleModelName: "大众朗逸",
      transferOutStoreId: 1001,
      transferOutStoreName: "北京朝阳门店",
      transferInStoreId: 1002,
      transferInStoreName: "北京西站门店",
      transferOutTime: 1702617600000,
      transferInTime: -1,
      shunter: "调车员张三",
      remark: "客户需求调车",
      cancelReason: ""
    }
  ]
};

// 维保厂 Mock 数据
export const mockRepairDepots = [
  { id: 6001, depotName: "北京汽修厂" },
  { id: 6002, depotName: "朝阳汽车维修中心" },
  { id: 6003, depotName: "4S店维修部" }
];

// API 响应格式
export const mockVehicleResponses = {
  '/vehicle/info/v1/list': mockVehicleList,
  '/vehicle/info/v1/select': mockVehicleList.list,
  '/vehicle/info/v1/get_by_id': mockVehicleDetail,
  '/vehicle/info/v1/vehicle_tips': [],
  '/vehicle/color/v1/list': mockVehicleColors,
  '/vehicle/shunting/v1/list': mockShuntingTickets,
  '/vehicle/repair_maintenance/repair_depot/list/v1': mockRepairDepots
}; 