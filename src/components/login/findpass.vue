<template>
    <div class="login-main find-pass">
        <div class="head_title">
            <router-link to="/login"><img src="../../assets/imgs/index/logo-input.png" alt="logo"></router-link>
            <h3>东俊（有机）养殖生产管理追溯系统管理平台</h3>
        </div>

        <div class="box">
            <p>找回密码</p>

            <el-form :model="form" ref="form" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input :autofocus="true" type="text" v-model="form.username" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item prop="bywhich">
                    <el-select @change="getQues" v-model="form.bywhich" auto-complete="off" placeholder="找回方式">
                        <el-option label="请选择" value="0"></el-option>
                        <el-option label="验证问题" value="1"></el-option>
                        <el-option label="短信验证" value="2"></el-option>
                        <!-- <el-option label="邮箱验证" value="3"></el-option> -->
                    </el-select>
                </el-form-item>

                <template v-if="questions">
                    <el-form-item :label="val" v-for="(val, key, idx) in questions" :key="idx">
                        <el-input v-model="form['answer_' + (idx+1)]"></el-input>
                    </el-form-item>
                </template>

                <template v-if="canModify">
                    <el-form-item prop="newpass">
                        <el-input type="password" v-model="form.newpass" auto-complete="off" placeholder="输入新密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="newpass_repeat">
                        <el-input type="password" v-model="form.newpass_repeat" auto-complete="off" placeholder="确认新密码"></el-input>
                    </el-form-item>
                </template>

                <el-form-item>
                    <el-button :disabled="disableBtn" type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { FindPass, GetQuestions } from '@/util/getdata'
import { validateName, isReqSuccessful } from '@/util/jskit'
import { validatePassword } from '@/util/validate'
import md5 from 'md5'

export default {
    data () {
        var validatePass = (rule, value, callback) => {
            let val = validatePassword(value)
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (val !== true) {
                callback(new Error(val))
            } else if (this.form.newpass_repeat !== '') {
                this.$refs.form.validateField('newpass_repeat')
            }
            callback()
        }
        var validatePass2 = (rule, value, callback) => {
            let val = validatePassword(value)
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (val !== true) {
                callback(new Error(val))
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
                newpass_repeat: null,
                answer_1: null,
                answer_2: null,
                answer_3: null
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
            canModify: false,
            questions: null,
            disableBtn: false
        }
    },

    methods: {
        getQues () {
            let name = this.form.username

            if (!name) {
                this.$message.warning('请输入用户名')
                return
            }
            if (this.form.bywhich === '1') {
                GetQuestions(name).then(res => {
                    if (isReqSuccessful(res)) {
                        this.questions = res.data
                        this.canModify = true
                    }
                }).catch(_ => {
                    this.$message.error('获取问题失败')
                })
            }
        },

        submitForm (form) {
            if (!this.canModify) {
                return
            }

            this.$refs[form].validate(valid => {
                if (valid) {
                    let form = this.form
                    let data = {
                        pkUserid: form.username,
                        userPwd: md5(form.newpass),
                        question_1: this.questions.question_1,
                        question_2: this.questions.question_2,
                        question_3: this.questions.question_3,
                        answer_1: this.form.answer_1,
                        answer_2: this.form.answer_2,
                        answer_3: this.form.answer_3
                    }

                    this.disableBtn = true
                    FindPass(data).then(res => {
                        if (isReqSuccessful(res)) {
                            this.$message.success('密码重置成功')
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 800)
                        }
                        this.disableBtn = false
                    }, _ => {
                        this.disableBtn = false
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
@import '~@/assets/css/login-common'

.find-pass
    .el-form-item__label
        float none
</style>
