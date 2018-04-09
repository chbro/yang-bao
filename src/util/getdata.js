import fetch from './fetch'

/**
 * 登录注册，找回密码
 */
export const Login = data => fetch('/login', data, 'POST')

export const Register = data => fetch('/register', data, 'POST')

export const FindPass = data => fetch('/ensurequestion', data, 'POST')

export const GetQuestions = data => fetch('/question?name=' + data)

/**
 * 添加，展示留言
 */
export const postMessage = data => fetch('/messages', data, 'POST')

export const getMessage = (size, page) => fetch(`/messages/?size=${size}&page=${page}`)

/**
 * 系谱档案查询，展示
 */
export const queryXipu = data => fetch('/gf/findshow', data, 'POST')

export const getXipuDetail = id => fetch('/gf/findshowbyid?id=' + id)

/**
 * 权限CURD
 */
export const getPermission = _ => fetch('/user/')

/**
 * 获取直播或者推流地址
 */
export const getVideoUrl = (id, type) => fetch(`/liveBroadcast/geturl?userid=${id}&usertype=${type}`)
