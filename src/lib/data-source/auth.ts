import { API } from '@/lib/API'
import config from '@/lib/config'

export async function loginByName(name: string, password: string) {
  return API<{ token: string }>('/login/v1/login', {
    data: { userName: name, password, source: 'pc' },
  })
}

export async function loginByMobile(mobile: string, code: string) {
  return API<{ token: string }>('/login/v1/login', { data: { mobile, code, source: 'pc' } })
}

export async function getQRCode(sceneId: string) {
  return API<{ qrImage: string; scene: string }>('/login/v1/miniQrcode', {
    data: {
      page: 'pages/login-from-web/index',
      scene: `id=${sceneId}`,
      check_path: false,
      env_version: config.mpEnv,
    },
  })
}

export async function confirmScanStatus(sceneId: string) {
  return API<null | { token: string }>('/login/v1/wxLongCheck', {
    query: { scene: `id=${sceneId}` },
  })
}

export async function sendLoginSMS(mobile: string) {
  return API('/login/v1/loginCode', {
    data: { mobile },
  })
}

export async function sendRegisterSMS(mobile: string) {
  return API('/login/v1/regCode', {
    data: { mobile },
  })
}

export async function sendRegisterEmail(mail: string) {
  return API('/login/v1/regCode', {
    data: { mail },
  })
}

export async function registerByMobile(data: { mobile: string; password: string; code: string }) {
  return API('/login/v1/register', {
    data: {
      ...data,
      countryCode: '+86',
    },
  })
}

export async function registerByEmail(data: { mail: string; password: string; code: string }) {
  return API('/login/v1/register', { data })
}

export async function sendResetSMS(mobile: string) {
  return API('/login/v1/forgotCode', {
    data: { mobile },
  })
}

export async function sendResetEmail(mail: string) {
  return API('/login/v1/forgotCode', {
    data: { mail },
  })
}

export async function resetByMobile(mobile: string, code: string, password: string) {
  return API('/login/v1/forgotUpdate', {
    data: { mobile, code, password },
  })
}

export async function resetByEmail(mail: string, code: string, password: string) {
  return API('/login/v1/forgotUpdate', {
    data: { mail, code, password },
  })
}
