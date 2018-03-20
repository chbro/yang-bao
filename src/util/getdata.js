import fetch from './fetch'

/**
 * 登录注册，找回密码
 */
export const Login = data => fetch('/loginresult', data, 'POST')

export const Register = data => fetch('/userAdd', data, 'POST')

export const FindPass = data => fetch('/findpass', data, 'POST')
