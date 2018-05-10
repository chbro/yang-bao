<template>
    <div class="login-main">
        <div class="head_title">
            <router-link to="/"><img src="../../assets/imgs/index/logo-input.png" alt="logo"></router-link>
            <h3>东俊（有机）养殖生产管理追溯系统管理平台</h3>
        </div>

        <div class="box reg-box">
            <p>会员注册</p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input :autofocus="true" :minlength="4" :maxlength="20" type="test" v-model="ruleForm.username" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>账户名是您以后登录所用的账号，由字母a-z或数字组成</p>
                </el-form-item>
                <el-form-item label="email" prop="userEmail">
                    <el-input type="test" v-model="ruleForm.userEmail" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>您将使用此邮箱登录，请输入正确的常用邮箱</p>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input :minlength="6" :maxlength="20" type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>6-20位字符</p>
                </el-form-item>
                <el-form-item label="密码强度" class="pass-level">
                    <template v-show="strength">
                        <el-tag type="danger" v-if="strength === 1 || strength === 0">弱</el-tag>
                        <el-tag type="warning" v-else-if="strength === 2">中</el-tag>
                        <el-tag type="success" v-else-if="strength === 3">强</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input :minlength="6" :maxlength="20" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>请再次输入密码</p>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input type="test" v-model="ruleForm.qq" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="userTelephone">
                    <el-input type="test" v-model="ruleForm.userTelephone" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>手机号必填</p>
                </el-form-item>

                <el-form-item label="密码提示问题1">
                    <el-select class="select-q" v-model="ruleForm.question_1" placeholder="请选择密码提示问题">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="note"><span>*</span>可用于找回密码</p>
                </el-form-item>
                <el-form-item label="密码问题答案" prop="answer_1">
                    <el-input v-model.number="ruleForm.answer_1"></el-input>
                </el-form-item>

                <el-form-item label="密码提示问题2">
                    <el-select class="select-q" v-model="ruleForm.question_2" placeholder="请选择密码提示问题">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="note"><span>*</span>可用于找回密码</p>
                </el-form-item>
                <el-form-item label="密码问题答案" prop="answer_2">
                    <el-input v-model.number="ruleForm.answer_2"></el-input>
                </el-form-item>

                <el-form-item label="密码提示问题3">
                    <el-select class="select-q" v-model="ruleForm.question_3" placeholder="请选择密码提示问题">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="note"><span>*</span>可用于找回密码</p>
                </el-form-item>
                <el-form-item label="密码问题答案" prop="answer_3">
                    <el-input v-model.number="ruleForm.answer_3"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="disableReg" type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { Register } from '@/util/getdata'
import { checkPassStrength, validateName, validateEmail, validatePhone, isReqSuccessful } from '@/util/jskit'
import { validateQQ, validatePassword } from '@/util/validate'
import md5 from 'md5'

export default {
    data () {
        var validatePass = (rule, value, callback) => {
            let val = validatePassword(value)
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (val !== true) {
                callback(new Error(val))
            } else if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass')
            }
            callback()
        }
        var validatePass2 = (rule, value, callback) => {
            let val = validatePassword(value)
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (val !== true) {
                callback(new Error(val))
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        let validateQ = (rule, value, callback) => {
            let val = validateQQ(value)
            if (val !== true) {
                callback(new Error(val))
            } else {
                callback()
            }
        }

        return {
            ruleForm: {
                username: '',
                userEmail: '',
                password: '',
                checkPass: '',
                qq: '',
                userTelephone: '',
                question_1: '',
                question_2: '',
                question_3: '',
                answer_1: '',
                answer_2: '',
                answer_3: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                userEmail: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                userTelephone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                qq: [
                    { validator: validateQ, trigger: 'blur' }
                ]
            },
            options: [
                {value: '您的出生日期是？', label: '您的出生日期是？'},
                {value: '您父亲的名字？', label: '您父亲的名字？'},
                {value: '您母亲的名字？', label: '您母亲的名字？'},
                {value: '您的小学教师的姓名是？', label: '您的小学教师的姓名是？'},
                {value: '您毕业的学校是？', label: '您毕业的学校是？'}
            ],
            strength: 0,
            disableReg: false
        }
    },

    watch: {
        'ruleForm.password' (newV) {
            this.strength = checkPassStrength(newV)
        }
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    /* eslint-disable camelcase */
                    let { question_1, question_2, question_3, answer_1, answer_2, answer_3 } = this.ruleForm
                    if (!(question_1 && question_2 && question_3 && answer_1 && answer_2 && answer_3)) {
                        this.$message.warning('请完善密保问题和答案')
                        return
                    }

                    let data = {}
                    let form = this.ruleForm

                    for (let v in form) {
                        if (form[v] !== undefined && form[v] !== '') {
                            data[v] = form[v]
                        }
                    }
                    data.password = md5(form.password)
                    delete data.checkPass

                    this.disableReg = true
                    Register(data).then(res => {
                        if (isReqSuccessful(res)) {
                            this.$message.success('注册成功')
                            this.$router.push('/login')
                        } else {
                            this.disableReg = false
                        }
                    }, _ => {
                        this.$message.error('注册失败')
                        this.disableReg = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/login-common'

.login-main
    .reg-box
        width 840px !important
        .el-input__inner
            min-width 150px
            padding-right 25px
        .el-button
            width 30% !important
            margin-bottom 50px
        .el-input
            width 32% !important
            p
                display inline
                color #000
                background-color red
        .note
            display: inline-block;
            color: #000;
            font-size: 14px;
            padding-top: 0;
            min-width: 150px;
            width: 54%;
            text-align left
            margin 0
            margin-left 15px
            span
                color red
                margin-right 5px
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .select-q
        .el-input
            width 237px !important

    // password level
    .pass-level
        .el-tag
            padding 0 30px
</style>
