/*
 * 一些js工具方法
 * zym 2018-03-20 15:30:41
 */

import Vue from 'vue'

let app = new Vue()
export const jumpToLogin = () => {
    localStorage.removeItem('sheep-token')
    window.location.replace(window.location.host + '/#/login')
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
    if (!value) {
        callback(new Error('用户名不能为空'))
        return
    }

    let len = value.length
    if (value === '') {
        callback(new Error('用户名不能为空'))
    } else if (len < 4 || len > 20) {
        callback(new Error('用户名长度必须是4-20'))
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
    let { operator, reviewer, executor } = info
    if (!(operator && reviewer && executor)) {
        app.$message.warning('请完善提交人信息')
        return false
    }
    return true
}

export const checkForm = form => {
    if (Object.keys(form).some(v => form[v] === null || form[v] === '')) {
        app.$message.warning('请完善表单信息')
        return false
    }
    return true
}

export const checkCards = cards => {
    try {
        cards.forEach(v => {
            v.items.forEach(v2 => {
                v2.inputs.forEach(v3 => {
                    if (!(v3.dose && v3.day)) {
                        app.$message.warning('请完善配方和用量信息')
                        throw new Error('break')
                    }
                })
            })
        })
    } catch (e) {
        if (e.message !== 'break') {
            throw e
        }
        return false
    }
    return true
}

export const getConFeed = (q, cb) => {
    let conFeed = [
        {value: '玉米'},
        {value: '豆粕'},
        {value: '麸皮'},
        {value: '食盐'},
        {value: '预混料'}
    ]

    cb(conFeed)
}

export const getDryFeed = (q, cb) => {
    let dryFeed = [
        {value: '干草'},
        {value: '青草'}
    ]

    cb(dryFeed)
}

export const isReqSuccessful = (res) => {
    if (!res.meta) {
        app.$message.error('请求失败')
        return false
    }

    if (res.meta.code === 0) {
        return true
    } else {
        app.$message.error(res.meta.errorMsg || '请求失败')
    }
}
