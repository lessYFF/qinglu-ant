/**
 * 门店服务政策相关 Mock 数据
 */

// 服务政策列表
export const mockServicePolicies = {
  count: 3,
  list: [
    {
      id: 8001,
      policyName: "标准服务政策",
      storeNum: 4,
      storeInfos: []
    },
    {
      id: 8002,
      policyName: "机场门店政策",
      storeNum: 1,
      storeInfos: []
    },
    {
      id: 8003,
      policyName: "高端车型政策",
      storeNum: 2,
      storeInfos: []
    }
  ]
};

// 简单政策选项
export const mockSimpleServicePolicies = [
  { id: 8001, policyName: "标准服务政策" },
  { id: 8002, policyName: "机场门店政策" },
  { id: 8003, policyName: "高端车型政策" }
];

// 政策详情
export const mockServicePolicyDetail = {
  id: 8001,
  policyName: "标准服务政策",
  rentTimePolicy: {
    advancePickupStatus: 1,
    minAdvancePickupPeriod: 2,
    holidayAdvancePickupStatus: 1,
    holidayMinAdvancePickupPeriod: 24,
    advanceReturnStatus: 1,
    minAdvanceReturnPeriod: 2,
    holidayAdvanceReturnStatus: 1,
    holidayMinAdvanceReturnPeriod: 24,
    minAdvanceRerentPeriod: 2,
    holidayMinAdvanceRerentPeriod: 24,
    forceRerentCountType: 1,
    forceRerentFeeTypes: [1, 2],
    penaltyAmountPercent: 20
  },
  certificatPolicy: {
    minDriveLicenseValidPeriod: 12,
    driveLicenseYearLimit: 1,
    minLicenseYear: 1,
    driverAgeLimit: 1,
    minDriverAge: 18,
    maxDriverAge: 70,
    creditCardLimit: 1,
    depositTypes: [1, 2],
    minCreditCardValidPeriod: 3
  },
  chargePolicy: {
    fuelFeeType: 1,
    fuelFeeAmount: 100,
    chargeFeeType: 1,
    chargeFeeAmount: 50
  },
  prohibitedArea: {
    prohibitOutAreaIdList: [],
    prohibitIntoAreaIdList: [],
    remark: ""
  },
  roadRescue: {
    rescueAmount: 20000,
    extraRescueAmount: 10000
  },
  violationHandle: {
    maxNoticeClientPeriod: 72,
    maxClientHandlePeriod: 168,
    maxMerchantAuditPeriod: 24,
    drivingPermitUnitPrice: 5000,
    unitPenalty: 10000,
    unitPointPenalty: 20000,
    unitPenaltyWhenDeductPoints: 30000,
    penaltyForAllPoints: 100000,
    unitPenaltyWhenDeductAllPoints: 50000
  }
};

// API 响应
export const mockServicePolicyResponses = {
  '/service_policy/v1/list': mockServicePolicies,
  '/service_policy/v1/select_options': mockSimpleServicePolicies,
  '/service_policy/v1/detail': mockServicePolicyDetail
}; 