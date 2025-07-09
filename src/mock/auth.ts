/**
 * 认证相关Mock数据
 */
/**
 * 创建成功响应
 */
function createSuccessResponse<T>(data: T, message: string = '操作成功') {
  return {
    success: true,
    data,
    message
  };
}

/**
 * 创建错误响应
 */
function createErrorResponse(message: string = '操作失败', code: number = 500) {
  return {
    success: false,
    error: {
      message,
      code
    }
  };
}

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    userName: 'admin',
    password: '123456',
    mobile: '13800138000',
    email: 'admin@example.com',
    token: 'mock_token_admin_12345'
  },
  {
    id: 2,
    userName: 'sjz-admin',
    password: '123',
    mobile: '13800138001',
    email: 'sjz@example.com',
    token: 'mock_token_sjz_67890'
  },
  {
    id: 3,
    userName: 'test-user',
    password: 'test123',
    mobile: '13800138002',
    email: 'test@example.com',
    token: 'mock_token_test_54321'
  },
  {
    id: 4,
    userName: 'demo-user',
    password: 'demo123',
    mobile: '13800138003',
    email: 'demo@example.com',
    token: 'mock_token_demo_98765'
  },
  {
    id: 5,
    userName: 'manager',
    password: 'manager123',
    mobile: '13800138004',
    email: 'manager@example.com',
    token: 'mock_token_manager_11111'
  }
];

// 模拟二维码数据
const mockQRCodes = [
  {
    qrImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    scene: 'login_scene_001'
  },
  {
    qrImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    scene: 'login_scene_002'
  },
  {
    qrImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    scene: 'login_scene_003'
  }
];

/**
 * 用户名密码登录
 */
export function mockLoginByName(name: string, password: string) {
  const user = mockUsers.find(u => u.userName === name && u.password === password);
  
  if (user) {
    return createSuccessResponse({ token: user.token }, '登录成功');
  } else {
    return createErrorResponse('用户名或密码错误', 401);
  }
}

/**
 * 手机号验证码登录
 */
export function mockLoginByMobile(mobile: string, code: string) {
  const user = mockUsers.find(u => u.mobile === mobile);
  
  if (user && code === '1234') { // 模拟验证码1234
    return createSuccessResponse({ token: user.token }, '登录成功');
  } else {
    return createErrorResponse('手机号或验证码错误', 401);
  }
}

/**
 * 获取二维码
 */
export function mockGetQRCode(sceneId: string) {
  const qrData = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
  return createSuccessResponse({
    ...qrData,
    scene: `id=${sceneId}`
  }, '二维码生成成功');
}

/**
 * 确认扫码状态
 */
export function mockConfirmScanStatus(sceneId: string) {
  // 模拟30%的概率已扫码
  const isScanned = Math.random() < 0.3;
  
  if (isScanned) {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    return createSuccessResponse({ token: user.token }, '扫码登录成功');
  } else {
    return createSuccessResponse(null, '等待扫码');
  }
}

/**
 * 发送登录短信
 */
export function mockSendLoginSMS(mobile: string) {
  // 模拟发送成功
  return createSuccessResponse(null, '验证码发送成功');
}

/**
 * 发送注册短信
 */
export function mockSendRegisterSMS(mobile: string) {
  return createSuccessResponse(null, '注册验证码发送成功');
}

/**
 * 发送注册邮件
 */
export function mockSendRegisterEmail(mail: string) {
  return createSuccessResponse(null, '注册验证码发送成功');
}

/**
 * 手机号注册
 */
export function mockRegisterByMobile(data: { mobile: string; password: string; code: string }) {
  if (data.code === '1234') {
    const newUser = {
      id: mockUsers.length + 1,
      userName: `user_${Date.now()}`,
      password: data.password,
      mobile: data.mobile,
      email: '',
      token: `mock_token_${Date.now()}`
    };
    mockUsers.push(newUser);
    return createSuccessResponse({ token: newUser.token }, '注册成功');
  } else {
    return createErrorResponse('验证码错误', 400);
  }
}

/**
 * 邮箱注册
 */
export function mockRegisterByEmail(data: { mail: string; password: string; code: string }) {
  if (data.code === '1234') {
    const newUser = {
      id: mockUsers.length + 1,
      userName: `user_${Date.now()}`,
      password: data.password,
      mobile: '',
      email: data.mail,
      token: `mock_token_${Date.now()}`
    };
    mockUsers.push(newUser);
    return createSuccessResponse({ token: newUser.token }, '注册成功');
  } else {
    return createErrorResponse('验证码错误', 400);
  }
}

/**
 * 发送重置密码短信
 */
export function mockSendResetSMS(mobile: string) {
  return createSuccessResponse(null, '重置密码验证码发送成功');
}

/**
 * 发送重置密码邮件
 */
export function mockSendResetEmail(mail: string) {
  return createSuccessResponse(null, '重置密码验证码发送成功');
}

/**
 * 通过手机号重置密码
 */
export function mockResetByMobile(mobile: string, code: string, password: string) {
  if (code === '1234') {
    const user = mockUsers.find(u => u.mobile === mobile);
    if (user) {
      user.password = password;
      return createSuccessResponse(null, '密码重置成功');
    } else {
      return createErrorResponse('用户不存在', 404);
    }
  } else {
    return createErrorResponse('验证码错误', 400);
  }
}

/**
 * 通过邮箱重置密码
 */
export function mockResetByEmail(mail: string, code: string, password: string) {
  if (code === '1234') {
    const user = mockUsers.find(u => u.email === mail);
    if (user) {
      user.password = password;
      return createSuccessResponse(null, '密码重置成功');
    } else {
      return createErrorResponse('用户不存在', 404);
    }
  } else {
    return createErrorResponse('验证码错误', 400);
  }
} 