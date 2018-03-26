/*
 * 一些js工具方法
 * zym 2018-03-20 15:30:41
 */

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

export const validateCode = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入验证码'))
    } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        callback(new Error('验证码不正确'))
    } else {
        callback()
    }
}
