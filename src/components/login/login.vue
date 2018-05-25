<template>
    <div class="login-main">
        <div class="head_title">
            <router-link to="/"><img src="../../assets/imgs/index/logo-input.png" alt="logo"></router-link>
            <div class="login_title">东俊（有机）养殖生产管理追溯系统管理平台</div>
        </div>

        <div class="box">
            <p @click="testWithoutCode = true">登 录</p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input :autofocus="true" :minlength="4" :maxlength="20" type="text" v-model="ruleForm.username" auto-complete="off" placeholder="用户名/Login Name" class="login-input-username"></el-input>
                </el-form-item>

                <el-form-item @keypress.native.enter="submitForm('ruleForm')" prop="pass" class="login-input-password">
                    <el-input :minlength="6" :maxlength="20" type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="密码/Password"></el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <el-input @keypress.native.enter="submitForm('ruleForm')" :minlength="4" :maxlength="4" style="width:30%;min-width:50px;" v-model="ruleForm.code"></el-input>
                    <div class="code" @click="refreshCode" title="点击更换验证码">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <el-checkbox>保存登录/Remember ME</el-checkbox>
                </el-form-item> -->
            </el-form>
        </div>
        <div class="link">
            <router-link to="/register">新用户注册</router-link> | <router-link to="/findpass">找回密码</router-link>
        </div>
    </div>
</template>
<script>
import SIdentify from '@/components/login/identify'
import { Login } from '@/util/getdata'
import { userStr } from '@/util/fetch'
import { validateName, isReqSuccessful } from '@/util/jskit'
import { validatePassword } from '@/util/validate'
import md5 from 'md5'

export default {
    components: {
        SIdentify
    },

    data () {
        let validatePass = (rule, value, callback) => {
            let val = validatePassword(value)
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (val !== true) {
                callback(new Error(val))
            } else {
                callback()
            }
        }
        let validateCode = (rule, value, callback) => {
            if (this.testWithoutCode) {
                callback()
            } else {
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    callback(new Error('验证码不正确'))
                } else {
                    callback()
                }
            }
        }

        return {
            testWithoutCode: false,
            ruleForm: {
                username: '',
                pass: '',
                code: ''
            },
            rules: {
                username: [
                    {validator: validateName, trigger: 'blur'}
                ],
                pass: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                code: [
                    {validator: validateCode, trigger: 'blur'}
                ]
            },
            // identifyCodes: '1234567890abcdefghigklmnopqrstuvwxyz',
            identifyCodes: '1234567890',
            identifyCode: ''
        }
    },

    mounted () {
        this.makeCode(this.identifyCodes, 4)
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = {
                        username: this.ruleForm.username,
                        password: md5(this.ruleForm.pass)
                    }
                    this.loading = true
                    Login(data).then(res => {
                        if (isReqSuccessful(res)) {
                            this.$message.success('登录成功')
                            setTimeout(_ => {
                                this.$router.push('/admin/' + res.data.id)
                            }, 600)
                        }
                    })
                } else {
                    return false
                }
            })
        },

        randomNum (min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },

        refreshCode () {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },

        makeCode (o, l) {
            this.identifyCode = ''
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
            }
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/login-common'

.login-main
    .code
        float right
        margin-right 38%
        cursor pointer
    .link
        padding 15px 0
        text-align center
        color #ffffff
    .link a
        color #ffffff

    .login-input-password,
    .login-input-username
        input
            box-shadow: 0 0 0 400px #fff inset;
</style>
