/**
 * 表单工具
 */
import moment, { type Moment } from 'moment'
import { type FormInstance } from 'antd'
import { type Rule } from 'rc-field-form/lib/interface'


/**
 * ===================================
 * <Form.Item> rules
 * ===================================
 */
export const required = [{ required: true }]

export function msgRequired(msg: string) {
  return [{ required:true, message: msg }]
}

// 要求日期不能早于今天
export const futureDate = {
  async validator(rule: Rule, date?: Moment) {
    if (!date) return Promise.resolve()
    return new Promise<void>((resolve, reject) => {
      const today = moment().startOf('day')
      if (date.isBefore(today)) reject(new Error('日期不能早于今天'))
      else resolve()
    })
  }
}

// 要求日期不能早于今天+15天
export const futureDatePlus15 = {
  async validator(rule: Rule, date?: Moment) {
    if (!date) return Promise.resolve()
    return new Promise<void>((resolve, reject) => {
      const minDate = moment().startOf('day').add(15, 'days')
      if (date.isBefore(minDate)) reject(new Error('日期不能早于当日+15天'))
      else resolve()
    })
  }
}


export const passwordRules = [
  { min: 8, max: 20 },
  passwordPattern
]

export function passwordPattern() {
  return {
    async validator(_: unknown, value: string) {
      const patterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]
      return (!value || patterns.every(pattern => pattern.exec(value)))
        ? Promise.resolve()
        : Promise.reject(new Error('密码必须同时包含大小写字母、数字和符号'))
    }
  }
}

export function confirmPasswordRule({ getFieldValue }: { getFieldValue: FormInstance['getFieldValue'] }) {
  return {
    async validator(_: unknown, value: string) {
      return (!value || getFieldValue('password') === value)
        ? Promise.resolve()
        : Promise.reject(new Error('两次输入的密码不匹配'))
    }
  }
}


/**
 * ======================================
 * Utils
 * ======================================
 */

// 用于 <DatePicker>，禁用今天以前的日期
export function disablePassDays(current: Moment | undefined) {
  return !!current && current < moment().startOf('day')
}
