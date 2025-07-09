/**
 * Mock 数据统一导出文件
 */

// 导入已创建的模块mock数据
export * from './account'
export * from './bill'
export * from './channel'
export * from './order'
export * from './price'
export * from './stock'
export * from './store'
export * from './store-service-policy'
export * from './vehicle'
export * from './vehicle-model'

// 统一的API响应处理函数
export const createMockResponse = (data: any) => ({
  success: true,
  data,
  error: null,
  timestamp: Date.now()
});

// 创建错误响应
export const createErrorResponse = (message: string, code = 500) => ({
  success: false,
  data: null,
  error: { message, code },
  timestamp: Date.now()
});

// 模拟延迟响应
export const mockDelay = (ms: number = 200) => 
  new Promise(resolve => setTimeout(resolve, ms));

// 分页数据格式化
export const formatPageData = (list: any[], pageIndex = 1, pageSize = 10) => ({
  count: list.length,
  list: list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
  pageIndex,
  pageSize,
  totalPages: Math.ceil(list.length / pageSize)
});

// 随机生成ID
export const generateId = () => Math.floor(Math.random() * 100000) + 10000;

// 随机生成订单号
export const generateOrderNo = () => `O${Date.now()}${Math.floor(Math.random() * 1000)}`;

// 随机生成车牌号
export const generateLicense = () => {
  const areas = ['京', '沪', '粤', '苏', '浙'];
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  const area = areas[Math.floor(Math.random() * areas.length)];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const num1 = numbers[Math.floor(Math.random() * numbers.length)];
  const num2 = numbers[Math.floor(Math.random() * numbers.length)];
  const num3 = numbers[Math.floor(Math.random() * numbers.length)];
  const num4 = numbers[Math.floor(Math.random() * numbers.length)];
  const num5 = numbers[Math.floor(Math.random() * numbers.length)];
  
  return `${area}${letter}${num1}${num2}${num3}${num4}${num5}`;
};

console.log('🎯 Mock 数据已加载完成！包含以下模块：');
console.log('📊 Account (账户管理)');
console.log('🔐 Auth (认证登录) - 使用现有文件');
console.log('💰 Bill (账单管理)');
console.log('🔗 Channel (渠道管理)');
console.log('📋 Order (订单管理)');
console.log('💲 Price (价格管理)');
console.log('📦 Stock (库存管理)');
console.log('🏪 Store (门店管理)');
console.log('📝 Store Service Policy (门店服务政策)');
console.log('🚗 Vehicle (车辆管理)');
console.log('🚙 Vehicle Model (车型管理)'); 