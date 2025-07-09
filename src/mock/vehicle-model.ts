/**
 * 车型管理相关 Mock 数据
 */

// 品牌列表
export const mockBrands = [
  { id: 1, brandName: "大众", englishName: "Volkswagen", initials: "DZ", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 2, brandName: "本田", englishName: "Honda", initials: "BD", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 3, brandName: "丰田", englishName: "Toyota", initials: "FT", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 4, brandName: "奔驰", englishName: "Mercedes-Benz", initials: "BC", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 5, brandName: "宝马", englishName: "BMW", initials: "BM", merchantId: 2001, storeId: 1001, preset: 1 }
];

// 车系列表 - 符合Sery接口定义
export const mockSerys = [
  { id: 3001, seryName: "朗逸", brandId: 1, brandName: "大众", vehicleClassId: 1, vehicleClassName: "紧凑型车", storeId: 1001, merchantId: 2001 },
  { id: 3002, seryName: "雅阁", brandId: 2, brandName: "本田", vehicleClassId: 2, vehicleClassName: "中型车", storeId: 1001, merchantId: 2001 },
  { id: 3003, seryName: "帕萨特", brandId: 1, brandName: "大众", vehicleClassId: 2, vehicleClassName: "中型车", storeId: 1001, merchantId: 2001 },
  { id: 3004, seryName: "凯美瑞", brandId: 3, brandName: "丰田", vehicleClassId: 2, vehicleClassName: "中型车", storeId: 1001, merchantId: 2001 },
  { id: 3005, seryName: "C级", brandId: 4, brandName: "奔驰", vehicleClassId: 3, vehicleClassName: "中大型车", storeId: 1001, merchantId: 2001 },
  { id: 3006, seryName: "3系", brandId: 5, brandName: "宝马", vehicleClassId: 2, vehicleClassName: "中型车", storeId: 1001, merchantId: 2001 }
];

// 子车系列表 - 符合SubSery接口定义  
export const mockSubSerys = [
  { id: 4001, name: "朗逸2023款 1.5L自动舒适版", seryId: 3001, brandId: 1 },
  { id: 4002, name: "朗逸2023款 1.4T自动豪华版", seryId: 3001, brandId: 1 },
  { id: 4003, name: "雅阁2023款 2.0L自动舒适版", seryId: 3002, brandId: 2 },
  { id: 4004, name: "雅阁2023款 1.5T自动豪华版", seryId: 3002, brandId: 2 },
  { id: 4005, name: "帕萨特2023款 2.0T自动豪华版", seryId: 3003, brandId: 1 },
  { id: 4006, name: "凯美瑞2023款 2.0L自动舒适版", seryId: 3004, brandId: 3 },
  { id: 4007, name: "C级2023款 C200L", seryId: 3005, brandId: 4 },
  { id: 4008, name: "3系2023款 325Li", seryId: 3006, brandId: 5 }
];

// 牌照类型列表 - 符合LicenseType接口定义
export const mockLicenseTypes = [
  { id: 1, licenseTypeName: "京牌", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 2, licenseTypeName: "沪牌", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 3, licenseTypeName: "粤牌", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 4, licenseTypeName: "浙牌", merchantId: 2001, storeId: 1001, preset: 1 },
  { id: 5, licenseTypeName: "苏牌", merchantId: 2001, storeId: 1001, preset: 1 }
];

// 车型分组
export const mockModelGroups = [
  { id: 5001, name: "经济型" },
  { id: 5002, name: "舒适型" },
  { id: 5003, name: "豪华型" },
  { id: 5004, name: "商务型" },
  { id: 5005, name: "运动型" }
];

// 车型列表
export const mockVehicleModels = {
  count: 5,
  list: [
    {
      id: 2001,
      vehicleModelImgUrl: "/images/model-1.jpg",
      vehicleBrandId: 1,
      vehicleBrandName: "大众",
      vehicleSeryId: 3001,
      vehicleSeryName: "朗逸",
      vehicleSubSeryId: 4001,
      vehicleSubSeryName: "朗逸2023款",
      vehicleYearStyle: "2023款",
      vehicleModelGroupName: "经济型",
      licenseType: "京牌",
      carriage: "三厢车",
      displacement: "1.5L",
      gearbox: "自动",
      doors: "4门",
      seatNum: 5,
      fuelForm: "汽油",
      tagList: [{ id: 1, tagName: "经济型" }],
      channelBindList: [],
      initials: "DZ",
      storeId: 1001,
      merchantId: 2001,
      status: "1"
    }
  ]
};

// API 响应
export const mockVehicleModelResponses = {
  '/vehicle/brand/v1/list': mockBrands,
  '/vehicle/sery/v1/list': mockSerys,
  '/vehicle/sub_sery/v1/list': mockSubSerys,
  '/license_type/v1/list_all': { count: mockLicenseTypes.length, list: mockLicenseTypes },
  '/vehicle/model_group/v1/list': mockModelGroups,
  '/vehicle/model/v1/list': mockVehicleModels,
  
  // 支持带参数的查询
  '/vehicle/sery/v1/list?brandId=1': mockSerys.filter(s => s.brandId === 1),
  '/vehicle/sery/v1/list?brandId=2': mockSerys.filter(s => s.brandId === 2),
  '/vehicle/sery/v1/list?brandId=3': mockSerys.filter(s => s.brandId === 3),
  '/vehicle/sery/v1/list?brandId=4': mockSerys.filter(s => s.brandId === 4),
  '/vehicle/sery/v1/list?brandId=5': mockSerys.filter(s => s.brandId === 5),
  
  '/vehicle/sub_sery/v1/list?seryId=3001': mockSubSerys.filter(ss => ss.seryId === 3001),
  '/vehicle/sub_sery/v1/list?seryId=3002': mockSubSerys.filter(ss => ss.seryId === 3002),
  '/vehicle/sub_sery/v1/list?seryId=3003': mockSubSerys.filter(ss => ss.seryId === 3003),
  '/vehicle/sub_sery/v1/list?seryId=3004': mockSubSerys.filter(ss => ss.seryId === 3004),
  '/vehicle/sub_sery/v1/list?seryId=3005': mockSubSerys.filter(ss => ss.seryId === 3005),
  '/vehicle/sub_sery/v1/list?seryId=3006': mockSubSerys.filter(ss => ss.seryId === 3006)
}; 