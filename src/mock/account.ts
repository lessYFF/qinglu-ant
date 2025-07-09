/**
 * 账户管理相关 Mock 数据
 */

// 用户信息 Mock 数据
export const mockUserInfo = {
  id: 1001,
  name: "张三",
  loginName: "zhangsan",
  mobile: "13800138000",
  email: "zhangsan@qinglu.com",
  status: 1,
  childAccount: 0,
  parentId: -1,
  isAdmin: 1,
  merchantId: 2001,
  merchantName: "青路汽车租赁",
  roleId: 3001,
  roleName: "系统管理员",
  storeIds: [1001, 1002, 1003],
  menuAutos: ["order", "vehicle", "store", "price", "bill"],
  isBinded: true,
  eventType: "",
  storeRuleList: [
    { id: 1001, name: "北京朝阳门店" },
    { id: 1002, name: "北京西站门店" },
    { id: 1003, name: "北京机场门店" }
  ]
};

export const mockUserInfoWithMerchant = {
  ...mockUserInfo,
  merchantAvailable: true
};

// 用户列表 Mock 数据
export const mockUsersList = {
  count: 5,
  list: [
    mockUserInfo,
    {
      id: 1002,
      name: "李四",
      loginName: "lisi",
      mobile: "13900139000",
      email: "lisi@qinglu.com",
      status: 1,
      childAccount: 0,
      parentId: 1001,
      isAdmin: 0,
      merchantId: 2001,
      merchantName: "青路汽车租赁",
      roleId: 3002,
      roleName: "门店经理",
      storeIds: [1001],
      menuAutos: ["order", "vehicle"],
      isBinded: false,
      eventType: "",
      storeRuleList: [
        { id: 1001, name: "北京朝阳门店" }
      ]
    },
    {
      id: 1003,
      name: "王五",
      loginName: "wangwu",
      mobile: "13700137000",
      email: "wangwu@qinglu.com",
      status: 1,
      childAccount: 0,
      parentId: 1001,
      isAdmin: 0,
      merchantId: 2001,
      merchantName: "青路汽车租赁",
      roleId: 3003,
      roleName: "客服专员",
      storeIds: [1002, 1003],
      menuAutos: ["order"],
      isBinded: true,
      eventType: "",
      storeRuleList: [
        { id: 1002, name: "北京西站门店" },
        { id: 1003, name: "北京机场门店" }
      ]
    }
  ]
};

// 商家列表 Mock 数据
export const mockMerchantsList = {
  count: 3,
  list: [
    { id: 2001, name: "青路汽车租赁" },
    { id: 2002, name: "悦享出行" },
    { id: 2003, name: "蓝天租车" }
  ]
};

// 角色列表 Mock 数据
export const mockRolesList = {
  count: 4,
  list: [
    {
      id: 3001,
      isAdmin: 1,
      name: "系统管理员",
      merchantId: 2001
    },
    {
      id: 3002,
      isAdmin: 0,
      name: "门店经理",
      merchantId: 2001
    },
    {
      id: 3003,
      isAdmin: 0,
      name: "客服专员",
      merchantId: 2001
    },
    {
      id: 3004,
      isAdmin: 0,
      name: "财务专员",
      merchantId: 2001
    }
  ]
};

// 角色详情 Mock 数据
export const mockRoleDetail = {
  id: 3002,
  isAdmin: 0,
  name: "门店经理",
  menuIds: [1, 2, 3, 5, 8, 10],
  merchantId: 2001
};

// 菜单树 Mock 数据
export const mockMenuTree = [
  {
    id: 1,
    name: "订单管理",
    parentId: 0,
    roleValue: "order",
    sort: 1,
    type: 1,
    childNodes: [
      {
        id: 2,
        name: "订单列表",
        parentId: 1,
        roleValue: "order_list",
        sort: 1,
        type: 2,
        childNodes: [
          {
            id: 3,
            name: "新增订单",
            parentId: 2,
            roleValue: "order_add",
            sort: 1,
            type: 3,
            childNodes: []
          },
          {
            id: 4,
            name: "编辑订单",
            parentId: 2,
            roleValue: "order_edit",
            sort: 2,
            type: 3,
            childNodes: []
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "车辆管理",
    parentId: 0,
    roleValue: "vehicle",
    sort: 2,
    type: 1,
    childNodes: [
      {
        id: 6,
        name: "车辆列表",
        parentId: 5,
        roleValue: "vehicle_list",
        sort: 1,
        type: 2,
        childNodes: [
          {
            id: 7,
            name: "新增车辆",
            parentId: 6,
            roleValue: "vehicle_add",
            sort: 1,
            type: 3,
            childNodes: []
          },
          {
            id: 8,
            name: "编辑车辆",
            parentId: 6,
            roleValue: "vehicle_edit",
            sort: 2,
            type: 3,
            childNodes: []
          }
        ]
      }
    ]
  }
];

// 推送设置 Mock 数据
export const mockPushSettingData = {
  baseChannelList: [
    { id: 1, name: "微信" },
    { id: 2, name: "短信" },
    { id: 3, name: "邮件" }
  ],
  baseRoleList: [
    { id: 0, name: "全部" },
    { id: 3001, name: "系统管理员" },
    { id: 3002, name: "门店经理" },
    { id: 3003, name: "客服专员" }
  ],
  baseTypeList: [
    { id: 1, name: "订单通知" },
    { id: 2, name: "车辆提醒" },
    { id: 3, name: "账单提醒" }
  ],
  typeList: [
    {
      id: 1,
      pushValue: 1,
      roleList: [
        { id: 1, pushValue: 3001 },
        { id: 2, pushValue: 3002 }
      ],
      channelList: [
        { id: 1, pushValue: 1 },
        { id: 2, pushValue: 2 }
      ]
    }
  ]
};

// API 响应格式统一处理
export const mockAccountResponses = {
  '/login/v1/userInfo': mockUserInfoWithMerchant,
  '/user/v1/page': mockUsersList,
  '/user/v1/detail': mockUserInfo,
  '/merchant_account/v1/merchant_available': true,
  '/merchant/info/v1/page': mockMerchantsList,
  '/role/page': mockRolesList,
  '/role/v1/detail': mockRoleDetail,
  '/role/v1/menu_tree': mockMenuTree,
  '/role/v1/push_setting': mockPushSettingData
}; 