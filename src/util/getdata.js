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
 * 系谱档案
 */
export const queryGenea = data => fetch('/gf/findshow', data, 'POST')

export const getGeneaDetail = id => fetch('/gf/findshowbyid?id=' + id)

export const postGeneaRec = data => fetch('/gf/saveshow', data, 'POST')

/**
 * 权限CURD
 */
export const getPermission = _ => fetch('/user/')

/**
 * 获取直播或者推流地址
 */
export const getVideoUrl = (id, type) => fetch(`/liveBroadcast/geturl?userid=${id}&usertype=${type}`)

/**
 * 专家匹配, 邀请专家
 */
export const getExpert = agentid => fetch('/getExpert/' + agentid)

/**
 * 文件下载
 */
export const downloadFile = path => fetch('/downloadFile' + path)

/**
 * 客户评价
 */
export const evaluateChat = data => fetch('/evaluation', data, 'POST')

/**
 * 获取聊天记录概述
 */
export const getTalkRecords = _ => fetch('/getTalkRecord')

/**
 * 获取聊天记录详情
 */
export const getTalkRecordDetail = id => fetch('/getTalkRecord/' + id)
