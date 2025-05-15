import { API } from '@/lib/API'

export const getContactTemplate = async (params: any) => {
  return API<unknown>('/contract_template/v1/options', {
    data: params,
    json: false
  })

}
export const getRentalAgreement = async () => {
  return API<unknown>('/contract_template/v1/get_rental_agreement')

}
export const setRentalAgreement = async (rentalAgreement: string, signatureUrl: string) => {
  return API<unknown>('/contract_template/v1/save_rental_agreement', {
    data: {
      rentalAgreement,
      signatureUrl
    }
  })

}

export const getAgreementStatus = async () => {
  return API<unknown>('/contract_merchant/v1/status')
}
export const setAgreementStatus = async () => {
  return API<unknown>('/contract_merchant/v1/upd_contract_status')
}
export const getRentalFormTemplate = async () => {
  return API<unknown>('/contract_template/v1/get_rental_form_template')
}
export const getValidateFormTemplate = async () => {
  return API<unknown>('/contract_template/v1/get_vehicle_form_template')
}
export const setRentalFormTemplate = async (templateItems: Array<string>, specificItem: string) => {
  return API<unknown>('/contract_template/v1/save_rental_form_template', {
    data: {
      templateItems,
      specificItem
    }
  })
}
export const setVehicleFormTemplate = async (templateItems: Array<string>) => {
  return API<unknown>('/contract_template/v1/save_vehicle_form_template', {
    data: {
      templateItems
    }
  })
}


//////api//