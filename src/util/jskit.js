/*
 * 一些js工具方法
 * zym 2018-03-20 15:30:41
 */

import Vue from 'vue'
import { tokenStr } from './fetch'
import { validateTelephone } from './validate'

let app = new Vue()
export const jumpToLogin = r => {
    window.localStorage.removeItem(tokenStr)
    if (r) {
        r.push('/login')
    } else {
        // 无法跳转锚点
        window.location.href = window.location.origin + '/#/login'
    }
}

export const checkPassStrength = val => {
    let modes = 0
    if (val.length < 6) return 0
    if (/\d/.test(val)) modes++ // 数字
    if (/[a-zA-Z]/.test(val)) modes++ // 字母
    if (/\W/.test(val)) modes++ // 特殊字符
    if (val.length > 12) return 3
    return modes
}

export const validateName = (rule, value, callback) => {
    let userReg = /^[a-zA-Z0-9]{4,12}$/
    if (!userReg.test(value)) {
        callback(new Error('用户名由字母a-z或数字组成，长度为4-12位'))
    } else {
        callback()
    }
}

export const validateEmail = (rule, value, callback) => {
    let mailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (!mailReg.test(value)) {
        callback(new Error('请输入正确的email'))
    } else {
        callback()
    }
}

export const validatePhone = (rule, value, callback) => {
    if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
    } else {
        callback()
    }
}

export const keepLastIndex = obj => {
    let range
    if (window.getSelection) {
        obj.focus()
        range = window.getSelection()
        range.selectAllChildren(obj)
        range.collapseToEnd()
    } else if (document.selection) {
        range = document.selection.createRange()
        range.moveToElementText(obj)
        range.collapse(false)
        range.select()
    }
}

export const checkSubmit = info => {
    let name = info.operator_name
    if (!name) {
        app.$message.warning('请完善提交人信息')
        return false
    }
    return true
}

export const checkForm = (form, checkFull) => {
    let trade = form.tradeMarkEartag || form.earTag

    let checkTrade = (data) => {
        return data.every(val => {
            if (val.model !== undefined && !/^[G|M]\d{5}$/.test(val.model)) {
                app.$message.warning(val.name + '必须是G或M加上5位数字')
                return false
            } else {
                return true
            }
        })
    }

    let res = checkTrade([{
        model: trade,
        name: '商标耳牌'
    }, {
        model: form.eartagOfFather,
        name: '父号'
    }, {
        model: form.eartagOfMother,
        name: '母号'
    }, {
        model: form.eartagOfFathersFather,
        name: '父父号'
    }, {
        model: form.eartagOfFathersMother,
        name: '父母号'
    }, {
        model: form.eartagOfMothersFather,
        name: '母父号'
    }, {
        model: form.eartagOfMothersMother,
        name: '母母号'
    }, {
        model: form.ramSheepTrademark,
        name: '母羊商标耳牌'
    }, {
        model: form.eweSheepTrademark,
        name: '种公商标耳牌'
    }])

    if (!res) return res

    let immuneEartag = form.immuneEartag

    if (immuneEartag !== undefined && !/^\d{15}$/.test(immuneEartag)) {
        app.$message.warning('免疫耳牌必须是15位数字')
        return false
    }

    let weight = form.birthWeight
    if (weight && !/^\d+\.?\d{0,}$/.test(weight)) {
        app.$message.warning('初登体重只能输入数字')
        return false
    }

    let phone = form.familyPhone || form.officialPhone || form.userTelephone
    let val = validateTelephone(phone)
    if (phone && val !== true) {
        app.$message.warning(val)
        return false
    }
    if (checkFull && Object.keys(form).some(v => (form[v] === null || form[v] === '') && v !== 'remark' && v !== 'nativeEartag')) {
        app.$message.warning('请完善表单信息')
        return false
    }

    return true
}

export const getImmuneTypes = (q, cb) => {
    let immunes = [
        {value: '小反兽疫和疫苗'},
        {value: '亚洲1-0型口蹄疫二价'},
        {value: '灭活苗'},
        {value: '羊梭菌三联四防灭活苗'},
        {value: '山羊传染性胸膜肺炎灭活苗'},
        {value: '山羊痘弱毒疫苗'},
        {value: '口疮弱毒细胞冻干苗'},
        {value: '羔羊痢疾氢氢化铝菌苗'}
    ]
    cb(immunes)
}

export const getInfectWays = (q, cb) => {
    let infectWays = [
        {value: '颈部皮下注射'},
        {value: '肌肉注射'},
        {value: '皮下或肌肉注射'},
        {value: '皮下注射'},
        {value: '大腿内侧或尾根皮肉注射'},
        {value: '口腔粘膜注射'},
        {value: '在后腿内侧皮下注射'}
    ]
    cb(infectWays)
}

export const getDoses = (q, cb) => {
    let doses = [
        {value: '1ML'},
        {value: '4月龄-2岁1ML'},
        {value: '2岁以上2ML'},
        {value: '6月龄以下3ML'},
        {value: '6月龄以上5ML'},
        {value: '0.5ML'},
        {value: '0.2ML'},
        {value: '20-30天2ML'},
        {value: '10-20天3ML'}
    ]
    cb(doses)
}

export const getPeriods = (q, cb) => {
    let periods = [
        {value: '5个月'},
        {value: '6个月'},
        {value: '12个月'},
        {value: '18个月'}
    ]
    cb(periods)
}

export const isReqSuccessful = (res) => {
    if (res === void 0) {
        return
    }
    if (!(res && res.meta)) {
        app.$message.error('请求失败')
        return false
    }

    if (res.meta.code === 0) {
        return true
    } else {
        app.$message.error(res.meta.errorMsg || '请求失败')
    }
}

export const resetFile = dom => {
    if (({}).toString.call(dom) !== '[object HTMLInputElement]') {
        throw new Error('清空文件值时必须传入DOM节点')
    }

    dom.value = ''
    dom.type = 'text'
    dom.type = 'file'
}

let jump = (msg, name) => {
    app.$message.success(msg)
    // here app.$router is undefined

    let id = window.location.hash.substr(8).split('/')[0]
    setTimeout(() => {
        window.location.assign(window.location.origin + '/#/admin/' + id + '/' + name + '/list')
    }, 600)
}
export const postJump = routename => {
    jump('录入成功', routename)
}
export const patchJump = routename => {
    jump('修改成功', routename)
}

export const addressToArray = place => {
    let arr = []
    let index = 0
    if (place.indexOf('省') !== -1) {
        index = place.indexOf('省') + 1
    } else if (place.indexOf('自治区')) {
        index = place.indexOf('自治区') + 3
    } else {
        // 直辖市
        index = 3
    }
    arr[0] = place.substr(0, index)
    if (place.indexOf('市') !== -1) {
        arr[1] = place.substring(index, place.indexOf('市') + 1)
    }
    if (place.indexOf('县') !== -1 || place.indexOf('区') !== -1) {
        arr[2] = place.substr(place.indexOf('市') + 1)
    }
    // console.log(arr)
    return arr
}
