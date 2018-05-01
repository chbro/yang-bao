// 登陆成功后保存用户信息
import md5 from 'md5'

let token = md5('user')
let user = JSON.parse(localStorage.getItem(token))

export const storeUserInfo = data => {
    localStorage.setItem(token, JSON.stringify(data))
}

export const retrieveUid = _ => user.id

export const retrieveAid = _ => user.agentId

export const retrieveRid = _ => user.roleId

export const retrieveFacNum = _ => user.factorNum

export const retrieveFacName = _ => user.departmentName

export const retrieveName = _ => user.username

export const retrieveFlag = _ => user.flag

export const retrieveRank = _ => user.agentRank
