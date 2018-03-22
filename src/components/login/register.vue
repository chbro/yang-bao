<template>
    <div class="reg-main">
        <div class="head_title" style="text-align: center;">
            <img src="../../assets/imgs/user-logo-2.png" alt="logo" class="logo">
        </div>

        <div class="reg-box">
            <p>会员注册</p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input style="display:inline-block;" type="test" v-model="ruleForm.username" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>账户名是您以后登录所用的账号，可以由字母a-z或数字组成</p>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input type="test" v-model="ruleForm.email" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>您将使用此邮箱登录，请输入正确的常用邮箱</p>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>6-20位字符。密码由字母a-z及数字组成</p>
                </el-form-item>
                <el-form-item label="密码强度">
                    <el-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;弱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                    <el-tag type="success">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                    <el-tag type="info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;强&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>请再次输入密码</p>
                </el-form-item>
                <el-form-item label="MSN" prop="MSN">
                    <el-input type="test" v-model="ruleForm.MSN" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="QQ">
                    <el-input type="test" v-model="ruleForm.QQ" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="办公电话" prop="officephone">
                    <el-input type="test" v-model="ruleForm.officephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭电话" prop="familyphone">
                    <el-input type="test" v-model="ruleForm.familyphone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="telephone">
                    <el-input type="test" v-model="ruleForm.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码提示问题">
                    <el-select class="select-q" v-model="value" placeholder="请选择密码提示问题">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="密码问题答案" prop="answer">
                    <el-input v-model.number="ruleForm.answer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { Register } from '@/util/getdata'

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
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        var checkusername = (rule, value, callback) => {
            let len = value.length
            if (value === '') {
                callback(new Error('用户名不能为空'))
            } else if (len < 4 || len > 20) {
                callback(new Error('用户名长度必须是4-20'))
            } else {
                callback()
            }
        }
        var checkemail = (rule, value, callback) => {
            let mailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (value === '') {
                callback(new Error('email不能为空'))
            } else if (!mailReg.test(value)) {
                callback(new Error('请输入正确的email'))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
                username: '',
                email: '',
                MSN: '',
                QQ: '',
                officephone: '',
                familyphone: '',
                telephone: '',
                answer: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                username: [
                    { validator: checkusername, trigger: 'blur' }
                ],
                email: [
                    { validator: checkemail, trigger: 'blur' }
                ]
            },
            options: [
                {value: '选项1', label: '您的出生日期是？'},
                {value: '选项2', label: '您父亲的名字？'},
                {value: '选项3', label: '您母亲的名字？'},
                {value: '选项4', label: '您的小学教师的姓名是？'},
                {value: '选项5', label: '您毕业的学校是？'}
            ],
            value: ''
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        pkUserid: this.ruleForm.username,
                        userPwd: this.ruleForm.pass,
                        userTelephone: this.ruleForm.telephone
                    }
                    Register(data).then(res => {
                        if (res.meta.code === 0) {
                            this.$message.success('注册成功')
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 3000)
                        } else {
                            this.$message.error(res.meta.errorMsg || '注册失败')
                        }
                    }, _ => {
                        this.$message.error('注册失败')
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../../assets/css/color'

.reg-main
    background-color color-main
    height 1500px
    .head_title{
        padding-top 100px
    }
    .logo{
        text-align center
    }
    .reg-box {
        width 840px
        min-width 180px
        background-color #ffffff
        margin 0 auto
        margin-top 25px
    }
    .reg-box p{
        color color-main
        text-align center
        font-size 1.5em
        padding-top 5%
    }
    .demo-ruleForm{
        width 100%
        margin-left 5%
    }
    .reg-box
        .el-input__inner{
            width 32%
            min-width 150px
        }
        .el-input p{
            display inline
            color #000
            background-color red
        }
        .el-button{
            width 30%
            min-width 150px
            margin-bottom 50px
        }
        .el-input{
            width 25%
        }
        .el-input__inner{
            width 100%
        }
    .reg-box p.note{
        display: inline-block;
        color: #000;
        font-size: 14px;
        padding-top: 0;
        min-width: 150px;
        width: 54%;
        text-align left
    }
    .reg-box p.note span{
        color red
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .select-q
        .el-input
            width auto
            input
                width auto
</style>
