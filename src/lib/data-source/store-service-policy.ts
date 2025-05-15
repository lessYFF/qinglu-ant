import { API, type Response } from '@/lib/API'
import type { StoreDetail } from './store'

export interface ServicePolicy {
  id: number
  policyName: string
  storeNum: number // 适用门店数量
  storeInfos: StoreDetail[] // 适用门店列表
}

export interface SimpleServicePolicy {
  id: number
  policyName: string
}

export const forceRerentCountTypes = [
  { value: 1, label: '按首日租金' },
  { value: 2, label: '按订单平均日租金' },
  { value: 3, label: '按租期内总租金' },
]
export const forceRerentFeeTypes = [
  { value: 1, label: '基本服务费' },
  { value: 2, label: '车行手续费' },
  { value: 3, label: '附加服务费' },
]
export const depositTypes = [
  { value: 1, label: '驾驶员国内信用卡' },
  { value: 2, label: '支付宝' },
  { value: 3, label: '微信' },
]

// 详见：https://s2.qinglusaas-dev.com/api/swagger-ui/index.html?urls.primaryName=%E6%89%80%E6%9C%89#/%E9%97%A8%E5%BA%97%E6%9C%8D%E5%8A%A1%E6%94%BF%E7%AD%96%E7%9B%B8%E5%85%B3/saveServicePolicyUsingPOST
export interface ServicePolicyDetail {
  id: number
  policyName: string
  rentTimePolicy: {
    advancePickupStatus: number
    minAdvancePickupPeriod: number

    holidayAdvancePickupStatus: number
    holidayMinAdvancePickupPeriod: number

    advanceReturnStatus: number
    minAdvanceReturnPeriod: number

    holidayAdvanceReturnStatus: number
    holidayMinAdvanceReturnPeriod: number

    minAdvanceRerentPeriod: number
    holidayMinAdvanceRerentPeriod: number

    forceRerentCountType: number
    forceRerentFeeTypes: number[] | null
    penaltyAmountPercent: number
  }
  certificatPolicy: {
    minDriveLicenseValidPeriod: number
    driveLicenseYearLimit: number
    minLicenseYear: number

    driverAgeLimit: number
    minDriverAge: number
    maxDriverAge: number

    creditCardLimit: number
    depositTypes: number[]
    minCreditCardValidPeriod: number
  }
  chargePolicy: {
    fuelFeeType: number
    fuelFeeAmount: number

    chargeFeeType: number
    chargeFeeAmount: number
  }
  prohibitedArea: {
    prohibitOutAreaIdList: number[]
    prohibitIntoAreaIdList: number[]
    remark: string
  }
  roadRescue: {
    rescueAmount: number
    extraRescueAmount: number
  }
  violationHandle: {
    maxNoticeClientPeriod: number
    maxClientHandlePeriod: number
    maxMerchantAuditPeriod: number

    drivingPermitUnitPrice: number

    unitPenalty: number

    unitPointPenalty: number
    unitPenaltyWhenDeductPoints: number

    penaltyForAllPoints: number
    unitPenaltyWhenDeductAllPoints: number
  }
}

interface RawServicePolicyDetail extends Omit<ServicePolicyDetail, 'prohibitedArea'> {
  prohibitedArea: {
    prohibitOutAreaIdList: number[] | null
    prohibitIntoAreaIdList: number[] | null
    remark: string | null
  }
}

export type EditServicePolicy = Omit<ServicePolicyDetail, 'id'> & { id?: number }

export function makeEmptyServicePolicy(): EditServicePolicy {
  return {
    policyName: '',
    rentTimePolicy: {
      advancePickupStatus: 0,
      minAdvancePickupPeriod: 0,

      holidayAdvancePickupStatus: 0,
      holidayMinAdvancePickupPeriod: 0,

      advanceReturnStatus: 0,
      minAdvanceReturnPeriod: 0,

      holidayAdvanceReturnStatus: 0,
      holidayMinAdvanceReturnPeriod: 0,

      minAdvanceRerentPeriod: 0,
      holidayMinAdvanceRerentPeriod: 0,

      forceRerentCountType: 1,
      forceRerentFeeTypes: [],
      penaltyAmountPercent: 0,
    },
    certificatPolicy: {
      minDriveLicenseValidPeriod: 0,
      driveLicenseYearLimit: 0,
      minLicenseYear: 0,

      driverAgeLimit: 0,
      minDriverAge: 18,
      maxDriverAge: 65,

      creditCardLimit: 1,
      depositTypes: [1],
      minCreditCardValidPeriod: 1,
    },
    chargePolicy: {
      fuelFeeType: 0,
      fuelFeeAmount: 1,

      chargeFeeType: 0,
      chargeFeeAmount: 1,
    },
    prohibitedArea: {
      prohibitOutAreaIdList: [],
      prohibitIntoAreaIdList: [],
      remark: '',
    },
    roadRescue: {
      rescueAmount: 0,
      extraRescueAmount: 0,
    },
    violationHandle: {
      maxNoticeClientPeriod: 0,
      maxClientHandlePeriod: 0,
      maxMerchantAuditPeriod: 0,

      drivingPermitUnitPrice: 0,

      unitPenalty: 0,

      unitPointPenalty: 0,
      unitPenaltyWhenDeductPoints: 0,

      penaltyForAllPoints: 0,
      unitPenaltyWhenDeductAllPoints: 0,
    },
  }
}

export function getServicePolicies(page: number = 1, pageSize = 10000) {
  return API<{ list: ServicePolicy[]; count: number }>('/service_policy/v1/list', {
    data: { pageIndex: page, pageSize },
  })
}

export function getServicePoliciesForChoose() {
  return API<SimpleServicePolicy[]>('/service_policy/v1/select_options').then(res => {
    return res.success ? { ...res, data: res.data.reverse() } : res
  })
}

export async function getServicePolicyDetail(id: number): Response<ServicePolicyDetail> {
  const res = await API<RawServicePolicyDetail>('/service_policy/v1/detail?id=' + id)
  return res.success
    ? {
        ...res,
        data: {
          ...res.data,
          prohibitedArea: {
            prohibitOutAreaIdList: res.data.prohibitedArea.prohibitOutAreaIdList ?? [],
            prohibitIntoAreaIdList: res.data.prohibitedArea.prohibitIntoAreaIdList ?? [],
            remark: res.data.prohibitedArea.remark ?? '',
          },
        },
      }
    : res
}

export function saveServicePolicy(data: EditServicePolicy) {
  // 有些字段业务上不是必填的，但后端要求必须传值，因此要填充默认值
  const empty = makeEmptyServicePolicy()
  const padded: EditServicePolicy = {
    ...empty,
    ...data,
  }
  for (const [scope, inner] of Object.entries(empty) as [
    'rentTimePolicy',
    EditServicePolicy['rentTimePolicy']
  ][]) {
    if (inner && typeof inner === 'object') {
      padded[scope] = {
        ...inner,
        ...(padded[scope] as typeof inner),
      }
    }
  }

  return API('/service_policy/v1/save', { data: padded })
}

export function storeChooseServicePlicy(data: {
  storeId: number
  channelId: number
  policyId: number
}) {
  return API('/service_policy/v1/store/save', { data })
}

export function deleteChooseServicePlicy(id: number) {
  return API(`/service_policy/v1/delete?id=${id}`)
}
