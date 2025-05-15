import moment from 'moment'

moment.locale('zh', {
  weekdays: '日一二三四五六'.split('').map(v => `星期${v}`),
  weekdaysShort: '日一二三四五六'.split('').map(v => `周${v}`),
  weekdaysMin: '日一二三四五六'.split(''),
})
