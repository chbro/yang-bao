<template>
    <div class="login-main">
        <div class="head_title">
            <router-link to="/login"><img src="../../assets/imgs/index/logo-input.png" alt="logo"></router-link>
            <h3>东俊（有机）养殖生产管理追溯系统管理平台</h3>
        </div>

        <div class="box reg-box">
            <p>会员注册</p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="pkUserid">
                    <el-input :minlength="4" :maxlength="20" type="test" v-model="ruleForm.pkUserid" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>账户名是您以后登录所用的账号，可以由字母a-z或数字组成</p>
                </el-form-item>
                <el-form-item label="email" prop="userEmail">
                    <el-input type="test" v-model="ruleForm.userEmail" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>您将使用此邮箱登录，请输入正确的常用邮箱</p>
                </el-form-item>
                <el-form-item label="密码" prop="userPwd">
                    <el-input :minlength="6" :maxlength="20" type="password" v-model="ruleForm.userPwd" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>6-20位字符</p>
                </el-form-item>
                <el-form-item label="密码强度" class="pass-level">
                    <template v-show="strength">
                        <el-tag type="warning" v-if="strength === 1 || strength === 0">弱</el-tag>
                        <el-tag type="info" v-else-if="strength === 2">中</el-tag>
                        <el-tag type="success" v-else-if="strength === 3">强</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input :minlength="6" :maxlength="20" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    <p class="note"><span>*</span>请再次输入密码</p>
                </el-form-item>
                <el-form-item label="MSN" prop="msn">
                    <el-input type="test" v-model="ruleForm.msn" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input type="test" v-model="ruleForm.qq" auto-complete="off"></el-input>
                </el-form-item>
<!--                 <el-form-item label="办公电话" prop="officephone">
                    <el-input type="test" v-model="ruleForm.officephone" auto-complete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="家庭电话" prop="familyPhone">
                    <el-input type="test" v-model="ruleForm.familyphone" auto-complete="off"></el-input>
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
import { checkPassStrength, validateName, validateEmail, validatePhone } from '@/util/jskit'
import md5 from 'md5'

export default {
    data () {
        var validatePass = (rule, value, callback) => {
            let passReg = /^[a-zA-Z0-9_]{6,12}$/
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (!passReg.test(value)) {
                callback(new Error('密码必须是6-20位字符数字和下划线'))
            } else if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass')
            }
            callback()
        }
        var validatePass2 = (rule, value, callback) => {
            let passReg = /^[a-zA-Z0-9_]{6,12}$/
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (!passReg.test(value)) {
                callback(new Error('密码必须是6-20位字符数字和下划线'))
            } else if (value !== this.ruleForm.userPwd) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }

        return {
            ruleForm: {
                pkUserid: '',
                userEmail: '',
                userPwd: '',
                checkPass: '',
                msn: '',
                qq: '',
                familyPhone: '',
                userTelephone: '',
                question_1: '',
                question_2: '',
                question_3: '',
                answer_1: '',
                answer_2: '',
                answer_3: ''
            },
            rules: {
                userPwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                pkUserid: [
                    { validator: validateName, trigger: 'blur' }
                ],
                userEmail: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                userTelephone: [
                    { validator: validatePhone, trigger: 'blur' }
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
        'ruleForm.userPwd' (newV) {
            this.strength = checkPassStrength(newV)
        }
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {}
                    let form = this.ruleForm

                    for (let v in form) {
                        if (form[v] !== undefined && form[v] !== '') {
                            data[v] = form[v]
                        }
                    }
                    data.userPwd = md5(form.userPwd)

                    this.disableReg = true
                    Register(data).then(res => {
                        if (res.meta.code === 0) {
                            this.$message.success('注册成功')
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 1000)
                        } else {
                            this.$message.error(res.meta.errorMsg || '注册失败')
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
