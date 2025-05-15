import { API } from '@/lib/API';
import { DataType, requestPublicitysListType } from '@/views/publicity/publicitys';
import { actualCreatePublicitysType } from '@/views/publicity/publicitys/create';

export interface MarketListType {
  list: DataType,
  count: number
}
export function getMarketList(data:any) {
  return API<MarketListType>('/market/v1/getMarketList', {
    data: {
      channelId: data.channel,
      marketName: data.name,
      marketCode: data.code,
      status: data.statusType,
      pageSize:data.pageSize,
      pageIndex:data.pageIndex
    }, json: true
  })
}
export function createMarket(data: actualCreatePublicitysType) {
  return API<any>('/market/v1/setMarket', { data, json: true })
}
export function delMarket(id: number) {
  return API<any>('/market/v1/delMarket', {
    data: {
      id
    }, json: true
  })
}
export function editMarket(data: actualCreatePublicitysType) {
  return API<any>('/market/v1/updMarket', { data, json: true })
}
export function getMarket(id:number){
  return API<any>('/market/v1/getMarket',{
    data:{
      id
    },
    json:true
  })
}
export function getVehiceList(storeId:number|string){
  return API<any>('/vehicle/info/v1/list',{
    data:{
      pageSize:500,
      storeId
    },
    json:true
  })
}
export function getVehicelAndStore(idList:Array<number>,storeIdList:Array<number>){
  return API<any>('/vehicle/info/v1/select',{
    data:{
      idList,
      storeIdList
    },
    json:true
  })
}


