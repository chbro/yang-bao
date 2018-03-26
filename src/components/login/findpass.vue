<template>
    <div class="login-main">
        <div class="head_title">
            <router-link to="/login"><img src="../../assets/imgs/index/logo-input.png" alt="logo"></router-link>
            <h3>东俊（有机）养殖生产管理追溯系统管理平台</h3>
        </div>

        <div class="box">
            <p>找回密码</p>

            <el-form :model="form" ref="form" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input type="text" v-model="form.username" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item prop="bywhich">
                    <el-select v-model="form.bywhich" auto-complete="off" placeholder="找回方式">
                        <el-option label="验证问题" value="0"></el-option>
                        <el-option label="邮箱验证" value="1"></el-option>
                        <el-option label="短信验证" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <template v-if="canModify">
                    <el-form-item prop="newpass">
                        <el-input type="text" v-model="form.newpass" auto-complete="off" placeholder="输入新密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="newpass_repeat">
                        <el-input type="text" v-model="form.newpass_repeat" auto-complete="off" placeholder="确认新密码"></el-input>
                    </el-form-item>
                </template>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { FindPass } from '@/util/getdata'
import { validateName } from '@/util/jskit'

export default {
    data () {
        var validatePass = (rule, value, callback) => {
            let passReg = /^[a-zA-Z0-9_]{6,12}$/
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (!passReg.test(value)) {
                callback(new Error('密码必须是6-20位字符数字和下划线'))
            } else if (this.form.newpass_repeat !== '') {
                this.$refs.form.validateField('newpass_repeat')
            }
            callback()
        }
        var validatePass2 = (rule, value, callback) => {
            let passReg = /^[a-zA-Z0-9_]{6,12}$/
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (!passReg.test(value)) {
                callback(new Error('密码必须是6-20位字符数字和下划线'))
            } else if (value !== this.form.newpass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }

        return {
            form: {
                username: null,
                bywhich: null,
                newpass: null,
                newpass_repeat: null
            },
            rules: {
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                newpass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                newpass_repeat: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            canModify: true
        }
    },

    methods: {
        submitForm (form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    let data = {
                        pkUserid: this.form.username
                    }
                    FindPass(data).then(res => {
                        if (res.meta.code === 0) {
                            this.$message.success('密码重置成功')
                            this.$router.push('/login')
                        } else {
                            this.$message.error(res.meta.errorMsg || '验证失败')
                        }
                    }, _ => {
                        this.$message.error('验证失败')
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/login-common'

</style>
