// 登陆成功后保存用户信息
import { userStr } from '@/util/fetch'

let user = JSON.parse(localStorage.getItem(userStr))

export const storeUserInfo = data => {
    localStorage.setItem(token, JSON.stringify(data))
}

export const retrieveUid = _ => user.id

export const retrieveAid = _ => user.agentId

export const retrieveRid = _ => user.roleId

export const retrieveFacNum = _ => user.factoryId

export const retrieveFacName = _ => user.departmentName

export const retrieveName = _ => user.username

export const retrieveFlag = _ => user.flag

export const retrieveRank = _ => user.agentRank
