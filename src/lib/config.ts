import { parseQuery } from './lang'

/**
 * 开发和生产环境的环境配置
 */
const common = {
  // 高德地图
  // amapKey: '1860e1d26e0bcbd857ddde65fc0f8db5', // Web 端开发者 key
  amapKey: '72f5a9a9959809508943fbabe9c177d6', // Web 端开发者 key
  
  amapPlugins: [
    'AMap.Geocoder',
    'AMap.MouseTool',
    'AMap.GeometryUtil',
    'AMap.AutoComplete',
    'AMap.PolygonEditor',
    'AMap.Geolocation',
  ],

  // 阿里云行为验证
  verifyTest: false, // 是否开启测试模式
  verifyAppKey: 'FFFF0N0000000000B2DA',

  // 小程序环境默认测试版
  mpEnv: 'trial',

  // 开发环境统一 CDN 配置
  CDNHost: 'https://qinglu-file-dev.oss-cn-shanghai.aliyuncs.com',
  privateCDNHost: 'https://qinglu-file-private-dev.oss-cn-shanghai.aliyuncs.com',
}

const appEnvs = {
  // 日常项目
  dev: {
    APIPrefix: '//sa.qinglusaas-dev.com/dev/api',
  },
  // ultra分支环境
  ultra: {
    APIPrefix: '//sa.qinglusaas-dev.com/ultra/api',
  },
  // bugfix分支环境
  bugfix: {
    APIPrefix: '//sa.qinglusaas-dev.com/bugfix/api',
  },
  // beyond分支环境
  beyond: {
    APIPrefix: '//sa.qinglusaas-dev.com/beyond/api',
  },
  // stable分支环境
  stable: {
    APIPrefix: '//sa.qinglusaas-dev.com/api',
  },
  // 正式环境
  prod: {
    mpEnv: 'release',
    APIPrefix: 'https://s.qinglusaas.com/api',
    CDNHost: 'https://img.qinglusaas.com',
    privateCDNHost: 'https://qinglu-file-private.oss-cn-shanghai.aliyuncs.com',
  },
}
const appEnv =
  (process.env.appEnv ?? '') in appEnvs ? (process.env.appEnv as keyof typeof appEnvs) : 'dev'

const config = {    
  ...common,
  ...appEnvs[appEnv]
}

export default config
