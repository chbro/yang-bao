import fetch from './fetch'

/**
 * 登录注册，找回密码
 */
export const Login = data => fetch('/login', data, 'POST')

export const Register = data => fetch('/register', data, 'POST')

export const FindPass = data => fetch('/ensurequestion', data, 'POST')

export const GetQuestions = name => fetch('/question?name=' + name)

export const LogOut = id => fetch('/logout/' + id)

/**
 * 添加，展示留言
 */
export const Comment = data => fetch('/messageBoard/insert', data, 'POST')

export const getMessage = (size, page) => fetch(`/messages/?size=${size}&page=${page}`)

/**
 * 系谱档案CURD
 */
export const postGeneaRec = data => fetch('/gf/save', data, 'POST')

export const updateGeneaRec = (id, data) => fetch(`/gf/update/${id}`, data, 'PATCH')

export const getGeneaRec = id => fetch(`/gf/find/${id}`)

export const deleteGeneaRec = id => fetch('/gf/delete/' + id, null, 'DELETE')

// 获取羊的种类
export const getSheepTypes = id => fetch('/gf/types')

// 系谱档案多条件查询
export const queryGenea = data => fetch('/gf/findshow', data, 'POST')

export const getGeneas = data => fetch('/gf/find', data)

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
 * 配种产子实施档案CURD
 */
export const postBreeding = data => fetch('/breeding', data, 'POST')

export const updateBreeding = (id, data) => fetch('/breeding/operator/' + id, data, 'PATCH')

export const getAllBreeding = data => fetch('/breeding', data)

export const getBreeding = (id, data) => fetch('/breeding/' + id, data)

export const deleteBreeding = id => fetch(`/breeding/${id}`, null, 'DELETE')

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

export const updateRelease = (id, data) => fetch('/notice/' + id, data, 'PATCH')

// data带有分页参数
export const getRelease = (id, data = {}) => fetch('/notice/' + id, data)

export const getAllRelease = data => fetch('/notice', data)

export const deleteRelease = (id, data) => fetch('/notice/' + id, data, 'DELETE')

/**
 * 羊场管理
 */
export const postFarm = data => fetch('/factory', data, 'POST')

export const updateFarm = (id, data) => fetch(`/factory/${id}`, data, 'PUT')

export const getAllFarms = (id, data) => fetch('/factory/agent/' + id, data)

export const getFarmById = id => fetch(`/factory/${id}`)

export const getFarmByLocation = loc => fetch(`/factory/location`, {location: loc})

export const deleteFarm = id => fetch('/factory/' + id, null, 'DELETE')

/**
 * 专家审核
 */
export const getAllReviews = data => fetch('/diagnosis', data)

export const doReview = (id, data) => fetch(`/review/${id}`, data, 'PATCH')

/**
 * 阶段营养
 */
export const postStage = data => fetch('/nutrition', data, 'POST')

export const updateStage = (id, data) => fetch('/nutrition/' + id, data, 'PATCH')

export const getAllStages = data => fetch('/nutrition', data)

export const getStage = id => fetch('/nutrition/' + id)

export const deleteStage = id => fetch(`/nutrition/${id}`, null, 'DELETE')

/**
 * 疾病防治
 */
export const postPrevention = data => fetch('/diagnosis', data, 'POST')

export const updatePrevention = (id, data) => fetch('/diagnosis/' + id, data, 'PATCH')

export const getAllPrevention = data => fetch('/diagnosis', data)

export const getPrevention = id => fetch('/diagnosis/' + id)

export const deletePrevention = id => fetch(`/diagnosis/${id}`, null, 'DELETE')

/**
 * 用户管理
 */
export const postUser = data => fetch('/user', data, 'POST')

export const getUser = id => fetch('/user/detail/' + id)

export const getUsers = data => fetch('/user/subordinate/', data)

export const updateUser = (id, data) => fetch('/user/' + id, data, 'PUT')

export const deleteUser = id => fetch('/user/' + id, null, 'DELETE')

export const getFactories = agentid => fetch('/factory/' + agentid)

export const getAgentUnit = () => fetch('/agent/fr')

export const getFactoryUnit = () => fetch('/factory/fr')

// 修改密码
export const updatePassword = (id, data) => fetch('/user/password/' + id, data, 'PATCH')

/**
 * 代理管理
 */
export const postAgent = data => fetch('/agent', data, 'POST')

export const updateAgent = (id, data) => fetch('/agent/' + id, data, 'PUT')

export const getAgents = (id, data) => fetch(`/agent/${id}`, data)

export const getAgent = id => fetch('/agent/find' + id)

export const deleteAgent = id => fetch(`/agent/${id}`, null, 'DELETE')

/**
 * 短信平台
 */
export const postMessage = data => fetch('/psend', data, 'GET')

export const postWarningInfo = data => fetch('/gedit', data, 'GET')
