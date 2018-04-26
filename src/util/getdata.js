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
export const Comment = data => fetch('/messageBoard/insert', data, 'POST')

export const getMessage = (size, page) => fetch(`/messages/?size=${size}&page=${page}`)

/**
 * 后端管理系谱档案CURD
 */
export const postGeneaRec = data => fetch('/gf/save', data, 'POST')

export const updateGeneaRec = (id, data) => fetch(`/gf/update/${id}`, data, 'PATCH')

export const getGeneaRec = id => fetch(`/gf/show/${id}`)

export const deleteGeneaRec = id => fetch('/gf/delete/' + id, null, 'DELETE')

// 获取羊的种类
export const getSheepTypes = id => fetch('/gf/types')

/**
 * 系谱档案多条件查询
 */
export const queryGenea = data => fetch('/gf/findshow', data, 'POST')

export const getGeneas = data => {
    let { factoryNum, page, size } = data
    return fetch(`/gf/find/${factoryNum}?page=${page}&size=${size}`)
}

/**
 * 权限CURD
 */
export const getPermission = _ => fetch('/user/')

/**
 * 获取直播或者推流地址
 */
export const getVideoUrl = (id, type) => fetch(`/liveBroadcast/getPushUrl?userid=${id}&usertype=${type}`)

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

/**
 * 退出聊天评价专家
 */
export const evalulateExpert = data => fetch('/evaluation', data, 'POST')

/**
 * 配种产子实施档案
 */
export const addBreeding = data => fetch('/breeding/add', data, 'POST')

/**
 * 消毒实施档案RD
 */
export const getDisinfect = data => fetch('/df/findshow', data, 'POST')

export const deleteDisinfect = (id, data) => fetch(`/df/delete/${id}`, data, 'DELETE')

/**
 * 免疫RD
 */
export const getImmune = data => fetch('/ip/findshow', data, 'POST')

export const deleteImmune = (id, data) => fetch(`/ip/delete/${id}`, data, 'DELETE')

/**
 * 驱虫RD
 */
export const getAntiscolic = data => fetch('/rp/findshow', data, 'POST')

export const deleteAntiscolic = (id, data) => fetch(`/rp/delete/${id}`, data, 'DELETE')

/**
 * 发布系统CURD
 */
export const postRelease = data => fetch('/notice', data, 'POST')

export const updateRelease = data => fetch('/notice', data, 'PATCH')

export const getRelease = data => {
    // data带有分页参数
    let id = data.id
    delete data.id
    return fetch('/notice/' + id, data)
}

export const getAllRelease = data => fetch('/notice', data)

export const deleteRelease = (id, data) => fetch('/notice/' + id, data, 'DELETE')
