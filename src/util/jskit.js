/*
 * 一些js工具方法
 * zym 2018-03-20 15:30:41
 */

export const jumpToLogin = () => {
    localStorage.removeItem('sheep-token')
    window.location.replace(window.location.host + '/#/login')
}
