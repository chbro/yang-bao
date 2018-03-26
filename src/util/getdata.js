import fetch from './fetch'

/**
 * 登录注册，找回密码
 */
export const Login = data => fetch('/login', data, 'POST')

export const Register = data => fetch('/userAdd', data, 'POST')

export const FindPass = data => fetch('/findpass', data, 'POST')

/**
 * 添加，展示留言
 */
export const postMessage = data => fetch('/messages', data, 'POST')

export const getMessage = (size, page) => fetch(`/messages/?size=${size}&page=${page}`)

/**
 * 系谱档案查询，展示
 */
export const queryXipu = data => fetch('/allfunction/gf/findshow', data, 'POST')

export const getXipuDetail = id => fetch('/messages')

/**
 * 权限CURD
 */
export const getPermission = _ => fetch('/permit')
