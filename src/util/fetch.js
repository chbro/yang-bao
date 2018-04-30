/* eslint-disable */

import { jumpToLogin } from './jskit'
import Vue from 'vue'
import md5 from 'md5'

const baseUrl = 'http://180.76.180.95:9010'
// const baseUrl = 'http://218.199.68.33:9010' // 钟睿
// const baseUrl = 'http://192.168.1.108:9010' // 老猪
// const baseUrl = 'http://192.168.1.112:8080' // 农文华
// const baseUrl = 'http://192.168.1.103:9010' // 文嫖
const tokenStr = md5('sheep-token')
const authStr = 'Authorization'
let app = new Vue()

export { baseUrl, tokenStr }

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            // credentials: 'include',
            method: type,
            headers: {
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'force-cache'
        }

        // 带上登录token
        let token = localStorage.getItem(tokenStr)
        if (token) {
            requestConfig.headers[authStr] = token
        }

        if (['POST', 'DELETE', 'PATCH', 'PUT'].includes(type)) {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        
        try {
            const response = await fetch(url, requestConfig);

            // 拦截请求, token失效时跳转到登录页面
            if (response.status === 401) {
                jumpToLogin()
                return
            } else if (String(response.status).charAt(0) !== '2') {
                app.$message.error('请求失败')
                return
            }
            // 登录成功时存入token
            let token = response.headers.get(authStr)
            if (token) {
                window.localStorage.setItem(tokenStr, token)
            }

            const responseJson = await response.json();

            if (response) {
                return responseJson
            }
        } catch (error) {
            app.$message.error(error.message || '请求失败')
            return false
            // throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}
