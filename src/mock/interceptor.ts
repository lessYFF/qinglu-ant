/**
 * Mock 数据拦截器
 * 拦截所有 API 请求并返回对应的 mock 数据
 */

import { 
  mockAccountResponses,
  mockBillResponses,
  mockChannelResponses,
  mockOrderResponses,
  mockPriceResponses,
  mockStockResponses,
  mockStoreResponses,
  mockServicePolicyResponses,
  mockVehicleResponses,
  mockVehicleModelResponses,
  mockDelay,
  createMockResponse
} from './index';

// 合并所有mock响应
const allMockResponses: Record<string, any> = {
  ...mockAccountResponses,
  ...mockBillResponses,
  ...mockChannelResponses,
  ...mockOrderResponses,
  ...mockPriceResponses,
  ...mockStockResponses,
  ...mockStoreResponses,
  ...mockServicePolicyResponses,
  ...mockVehicleResponses,
  ...mockVehicleModelResponses,
};

// Mock环境标识
let mockEnabled = false;

/**
 * 启用Mock模式
 */
export function enableMock() {
  mockEnabled = true;
  console.log('🎯 Mock模式已启用');
}

/**
 * 禁用Mock模式
 */
export function disableMock() {
  mockEnabled = false;
  console.log('🔌 Mock模式已禁用');
}

/**
 * 检查是否为Mock模式
 */
export function isMockEnabled() {
  return mockEnabled;
}

/**
 * 根据路径匹配Mock数据
 */
function findMockData(fullPath: string): any {
  // 首先尝试精确匹配（包含查询参数）
  if (allMockResponses[fullPath]) {
    return allMockResponses[fullPath];
  }
  
  // 分离路径和查询参数
  const [path, queryString] = fullPath.split('?');
  
  // 精确匹配路径
  if (allMockResponses[path]) {
    const baseData = allMockResponses[path];
    
    // 如果有查询参数，尝试过滤数据
    if (queryString && Array.isArray(baseData)) {
      const params = new URLSearchParams(queryString);
      let filteredData = baseData;
      
      // 根据brandId过滤车系
      if (params.has('brandId') && path.includes('/vehicle/sery/')) {
        const brandId = parseInt(params.get('brandId')!);
        filteredData = baseData.filter((item: any) => item.brandId === brandId);
      }
      
      // 根据seryId过滤子车系
      if (params.has('seryId') && path.includes('/vehicle/sub_sery/')) {
        const seryId = parseInt(params.get('seryId')!);
        filteredData = baseData.filter((item: any) => item.seryId === seryId);
      }
      
      // 根据storeId过滤门店相关数据
      if (params.has('storeId')) {
        const storeId = parseInt(params.get('storeId')!);
        filteredData = baseData.filter((item: any) => 
          item.storeId === storeId || item.merchantId === 2001
        );
      }
      
      return filteredData;
    }
    
    return baseData;
  }
  
  // 模糊匹配（处理带参数的完整路径）
  for (const mockPath in allMockResponses) {
    if (fullPath.includes(mockPath) || mockPath.includes(path)) {
      return allMockResponses[mockPath];
    }
  }
  
  // 默认返回成功响应
  return { success: true, message: '操作成功', data: [] };
}

/**
 * 原始fetch函数备份
 */
const originalFetch = window.fetch;

/**
 * Mock fetch函数
 */
async function mockFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (!mockEnabled) {
    return originalFetch(input, init);
  }
  
  const url = typeof input === 'string' ? input : input.toString();
  const fullApiPath = url.replace(/^.*?\/api/, ''); // 提取完整API路径（包含查询参数）
  const path = fullApiPath.split('?')[0]; // 提取API路径（不含查询参数）
  
  console.log(`🔄 Mock API调用: ${init?.method || 'GET'} ${fullApiPath}`);
  
  // 模拟网络延迟
  await mockDelay(100 + Math.random() * 200);
  
  // 查找对应的mock数据（传入完整路径以支持查询参数）
  const mockData = findMockData(fullApiPath);
  
  // 构造响应对象
  const responseData = createMockResponse(mockData);
  
  const response = new Response(JSON.stringify(responseData), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  console.log(`✅ Mock API响应:`, responseData);
  
  return response;
}

/**
 * 安装Mock拦截器
 */
export function installMockInterceptor() {
  if (window.fetch !== mockFetch) {
    window.fetch = mockFetch;
    console.log('📡 Mock拦截器已安装');
  }
}

/**
 * 卸载Mock拦截器
 */
export function uninstallMockInterceptor() {
  if (window.fetch === mockFetch) {
    window.fetch = originalFetch;
    console.log('📡 Mock拦截器已卸载');
  }
}

/**
 * 检查是否为开发环境
 */
function isDevelopment(): boolean {
  try {
    // 检查多种可能的开发环境标识
    return (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.port === '3000' ||
      window.location.href.includes('localhost') ||
      window.location.href.includes('127.0.0.1')
    );
  } catch {
    return true; // 默认假设是开发环境
  }
}

/**
 * 自动初始化Mock环境
 */
export function initMockEnvironment() {
  // 在开发环境下自动启用Mock
  if (isDevelopment()) {
    enableMock();
    installMockInterceptor();
  }
}

// 添加更多mock数据路径的支持
const additionalMockData = {
  // 品牌相关
  '/vehicle/brand/v1/page': {
    count: 3,
    list: [
      { id: 1, brandName: "大众", englishName: "Volkswagen", initials: "DZ" },
      { id: 2, brandName: "本田", englishName: "Honda", initials: "BD" },
      { id: 3, brandName: "丰田", englishName: "Toyota", initials: "FT" }
    ]
  },
  
  // 车系相关
  '/vehicle/sery/v1/page': {
    count: 2,
    list: [
      { id: 3001, seryName: "朗逸", brandId: 1, brandName: "大众" },
      { id: 3002, seryName: "雅阁", brandId: 2, brandName: "本田" }
    ]
  },
  
  // 门店相关
  '/store/v1/page': {
    count: 4,
    list: [
      { storeId: 1001, storeName: "北京朝阳门店", cityName: "北京" },
      { storeId: 1002, storeName: "北京西站门店", cityName: "北京" },
      { storeId: 1003, storeName: "北京机场门店", cityName: "北京" },
      { storeId: 1004, storeName: "上海虹桥门店", cityName: "上海" }
    ]
  },
  
  // 渠道相关
  '/channel/v1/page': {
    count: 5,
    list: [
      { channelId: 1001, channelName: "携程" },
      { channelId: 1002, channelName: "飞猪" },
      { channelId: 1003, channelName: "哈啰出行" },
      { channelId: 1004, channelName: "美团" },
      { channelId: 1005, channelName: "滴滴出行" }
    ]
  },
  
  // 牌照类型
  '/license/type/v1/list': [
    { id: 1, name: "京牌", region: "北京", letter: "A" },
    { id: 2, name: "沪牌", region: "上海", letter: "A" },
    { id: 3, name: "粤牌", region: "广东", letter: "A" }
  ]
};

// 将额外的mock数据合并到总数据中
Object.assign(allMockResponses, additionalMockData); 