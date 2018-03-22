<template>
    <div class="login-main">
        <div class="head_title" style="text-align: center;">
            <img src="../../assets/imgs/user-logo-2.png" alt="logo" class="logo">
            <!-- <p class="title">东俊（有机）养殖生产管理追溯系统管理平台</p> -->
        </div>

        <div class="box">
            <p>登 录</p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input style="width:90%;min-width:150px;" type="text" v-model="ruleForm.username" auto-complete="off" placeholder="用户名/Login Name"></el-input>
                </el-form-item>

                <el-form-item prop="pass">
                    <el-input style="width:90%;min-width:150px;" type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="密码/Password"></el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <el-input style="width:30%;min-width:50px;" v-model="ruleForm.code"></el-input>
                    <div class="code" @click="refreshCode" title="点击更换验证码">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button style="width:90%;min-width:150px;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>

                <el-form-item>
                    <el-checkbox>保存登录/Remember ME</el-checkbox>
                </el-form-item>
            </el-form>
        </div>
        <div class="link">
            <router-link to="/register">新用户注册</router-link> | <router-link to="/">找回密码</router-link>
        </div>
    </div>
</template>
<script>
import SIdentify from '@/components/login/identify'
import { Login } from '@/util/getdata'

export default {
    components: {
        SIdentify
    },
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }

        var validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }

        var validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'))
            } else if (value !== this.identifyCode) {
                // callback(new Error('验证码不正确'))
                callback()
            } else {
                callback()
            }
        }

        return {
            ruleForm: {
                username: '',
                pass: '',
                code: ''
            },
            rules: {
                username: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            },
            identifyCodes: '1234567890abcdefghigklmnopqrstuvwxyz',
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

                        // pkUserid: this.ruleForm.username,
                        // userPwd: this.ruleForm.pass,
                        pkUserid: '0003',
                        userPwd: '12345ac'
                    }
                    Login(data).then(res => {
                        if (res.meta.code === 0) {
                            console.log('logged in')
                        } else {
                            this.$message.error(res.meta.errorMsg || '登录失败')
                        }
                    }, _ => {
                        this.$message.error('登录失败')
                    })
                } else {
                    console.log('error submit!!')
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
@import '../../assets/css/color'

.login-main
    background-color color-main
    padding-bottom 15px
    .head_title
        padding-top 80px
    .logo
        text-align center
    .box
        width 420px
        min-width 180px
        background-color #ffffff
        margin 0 auto
        margin-top 25px
    .box p
        color color-main
        text-align center
        font-size 1.5em
        padding-top 5%
    .demo-ruleForm
        width 100%
        margin-left 5%
    .code
        float right
        margin-right 38%
        cursor pointer
    .link
        text-align center
        color #ffffff
    .link a
        color #ffffff
</style>
