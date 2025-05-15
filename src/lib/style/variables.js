/* eslint-env node */
// 传给 less-loader 的变量内容
// 1. 此文件会无条件覆盖各 less 文件内定义的变量值
// 2. 此文件内的变量，各 less 文件可直接使用，无需再自行定义。


// 覆盖 ant design 的样式变量（node_modules/antd/lib/style/themes/default.less）
const antDesign = {
  // 'red-base': '#FF4868',
  // 'green-base': '#17D26A',
  // 'gold-base': '#FFA515',
  // 'normal-color': '#EBEFF6',
  // 'font-family': "'SF Pro SC','HanHei SC','SF Pro Text','Myriad Set Pro','SF Pro Icons','Apple Legacy Chevron','PingFang SC','Helvetica Neue','Helvetica','Arial', sans-serif",
  // 'text-color': '#2B3959',
  // 'text-color-secondary': '#7E889D',
  // 'heading-color': '#2B3959',
  // 'border-color-base': '#DDDFE3',
  // 'border-color-split': '#EDEEF0',
  // 'disabled-color': 'rgba(#2B3959, 0.45)',
  // 'disabled-bg': '#F7F9FB',
  // 'input-placeholder-color': 'rgba(#2B3959, 0.4)',

  // // Buttons
  // 'btn-default-ghost-color': 'rgba(#FFF, 0.6)',
  // 'btn-default-ghost-border': 'rgba(#FFF, 0.3)',

  'font-size-base': '12px',

  // Layout
  'layout-sider-background': '#201f2e',

  // Menu
  'menu-dark-bg': '#201f2e',
  'menu-dark-inline-submenu-bg': '#201f2e',
  'menu-dark-item-active-bg': '#494954',
  // 'menu-dark-item-hover-bg': '',
}

// 定义 App 用到的常用变量
const app = {
  // text: '#2B3959',
  // textSec: '#7E889D',
  // title: '#1B2740',
  // link: '#1890FF',
  // green: '#17D26A',
  // red: '#FF4868',
  // error: '#FF4868',
  // grey: '#EBEFF6',
  // gold: '#FFA515',
  // warn: '#FFA515',
  // line: '#DDDFE3',
  // lightLine: '#EDEEF0',

  // zIndexOverlay: '1000',
}



module.exports = {
  ...antDesign,
  ...app,
}
