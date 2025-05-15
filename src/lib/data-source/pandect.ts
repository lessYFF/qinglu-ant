import { API } from '@/lib/API'

export const getStoreSampleByCity = async () => {
    return API<any>('/store/v1/storeSampleByCity')
}
export const getReportQuotaList = async (data: any) => {
    return API<any>('/report/v1/getReportQuota', {
        data: {
            pageSize: 1000,
            ...data
        },
        json: true
    })
}
export const getReportDataList = async (data: any) => {
    // const user = JSON.parse(localStorage.getItem("userInfo"))
    // return API<any>((user.merchantId == 31)? '/report/v2/getReportData':"/report/v1/getReportQuota", {
    return API<any>('/report/v2/getReportData', {
        data: {
            pageSize: 1000,
            ...data
        },
        json: true
    })
}
export const downExcel1 = async (data: any) => {
    return API<any>('/report/v1/downExcel', {
        method: 'POST',
        data: {
            ...data
        }
    })
}
export const downExcel = async (data: any) => {
    return API<any>('/report/v2/getReportData/downReportDataExcel', {
        method: 'POST',
        data: {
            ...data
        }
    })
}