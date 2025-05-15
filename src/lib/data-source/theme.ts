/**
 * 商家界面样式
 */
import { API } from "../API"

export interface Theme {
  specialId: 'qinglu' | 'zxz' | null, // 特殊主题的标识
  title: string, // 网页标题
  merchantName: string, // 商家名称
  saasBackground: string, // 登录背景图
  saasLogo: string, // 左侧菜单长 logo
  saasMenuIcon: string, // 左侧菜单短 logo
  saasWebIcon: string, // favicon
  showPrivacy: boolean, // 显示隐私协议
  showQr: boolean, // 开启扫码登录
  showReg: boolean, // 开启注册功能
}

// 默认擎路主题
export const qingluTheme: Theme = {
  specialId: 'qinglu',
  title: '擎路 SaaS',
  merchantName: '擎路',
  saasBackground: process.env.publicPath + 'login-background.png',
  saasLogo: process.env.publicPath + 'icon-full.svg',
  saasMenuIcon: process.env.publicPath + 'icon.svg',
  saasWebIcon: process.env.publicPath + 'favicon.png',
  showPrivacy: true,
  showQr: true,
  showReg: true,
}

// 租小智主题
export const zxzTheme: Theme = {
  specialId: 'zxz',
  title: '租小智',
  merchantName: '租小智',
  saasBackground: process.env.publicPath + 'custom-brand/login-background.jpg',
  saasLogo: process.env.publicPath + 'custom-brand/icon-full.svg',
  saasMenuIcon: process.env.publicPath + 'custom-brand/icon.svg',
  saasWebIcon: process.env.publicPath + 'custom-brand/favicon.png',
  showPrivacy: false,
  showQr: false,
  showReg: false,
}

// -------------------------------

let theme: Theme | null = null
let themePromise: Promise<Theme | null>

if (window.location.host.includes('jianxiao')) {
  theme = zxzTheme
  themePromise = Promise.resolve(zxzTheme)
} else {
  themePromise = API('/merchant/setting/v1/findByQuery', {
    data: {
      domainSaas: location.hostname
    }
  }).then(res => {
    if (res.success) {
      if (res.data) {
        const raw = res.data
        theme = {
          specialId: null,
          title: raw.merchantName,
          ...raw
        }
      } else {
        theme = qingluTheme
      }
    }
    return theme
  })
}

themePromise.then(() => {
  if (!theme) return

  document.title = theme.title ?? ''

  const favicon = document.createElement('link')
  Object.assign(favicon, { rel: 'icon', type: 'image/png', sizes: '16x16 32x32 64x64 96x96 160x160' })
  favicon.href = theme.saasWebIcon
  document.querySelector('head')?.appendChild(favicon)
})

export function useTheme() {
  const [_theme, setTheme] = useState<Theme | null>(theme)
  useEffect(() => {
    if (theme === null) {
      void themePromise.then(setTheme)
    }
  }, [])
  return theme
}
