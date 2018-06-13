<template>
    <div class="user-info admin-form">
        <p class="card-title">个人中心</p>
        <basic-info :disable-all="disableInput" :items="items" :models="models"></basic-info>

        <div class="card">
            <p class="card-title">用户备注信息:</p>
            <el-input :disabled="disableInput" type="textarea" v-model="models.userRemark"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary" @click="disableInput = !disableInput">编辑/取消</el-button>
            <el-button :disabled="disableBtn" type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { getAdminUser, updateUser } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        if (Object.keys(this.user).length) {
            this.models = this.user
        }
    },

    data () {
        let getQ = (q, cb) => {
            let data = [
                {value: '您的出生日期是？'},
                {value: '您父亲的名字？'},
                {value: '您母亲的名字？'},
                {value: '您的小学教师的姓名是？'},
                {value: '您毕业的学校是？'}
            ]
            cb(data)
        }
        return {
            disableBtn: false,
            disableInput: true,
            items: [
                // {label: '用户密码', model: 'region'},
                // {label: '照片信息', model: 'region'},
                // {label: '用户角色', model: 'region'},
                // {label: '是否具有扩展权限', model: 'region'},
                // {label: '代理/羊场', model: 'region'},
                // {label: '代理名称', model: 'name'},
                {label: '用户名', model: 'pkUserid', disabled: true},
                {label: '员工编号', model: 'userNum', disabled: true},
                {label: '真实姓名', model: 'userRealname'},
                {label: '家庭住址', model: 'userLocation'},
                {label: '个人手机', model: 'userTelephone', mr: 1},
                {label: '用户所在单位', model: 'factoryName'},
                {label: '邮箱', model: 'userEmail'},
                {label: '微信', model: 'msn', mr: 1},
                {label: 'qq', model: 'qq'},
                {label: '办公电话', model: 'officialPhone'},
                {label: '家庭电话', model: 'familyPhone', mr: 1},
                {label: '找回密码问题1', type: 'select', fetchSuggestions: getQ, model: 'question_1'},
                {label: '找回密码问题2', type: 'select', fetchSuggestions: getQ, model: 'question_2'},
                {label: '找回密码问题3', type: 'select', fetchSuggestions: getQ, model: 'question_3', mr: 1},
                {label: '找回密码答案1', model: 'answer_1'},
                {label: '找回密码答案2', model: 'answer_2'},
                {label: '找回密码答案3', model: 'answer_3', mr: 1}
            ],
            models: {
                pkUserid: null,
                userNum: null,
                userRealname: null,
                userLocation: null,
                userTelephone: null,
                factoryName: null,
                userEmail: null,
                msn: null,
                qq: null,
                officialPhone: null,
                familyPhone: null,
                question_1: null,
                question_2: null,
                question_3: null,
                answer_1: null,
                answer_2: null,
                answer_3: null,
                userRemark: null
            }
        }
    },

    mounted () {
        this.id = this.$route.params.id
        getAdminUser(this.id).then(res => {
            if (isReqSuccessful(res)) {
                this.models = res.data.model
            }
        })
    },

    methods: {
        submit () {
            let phoneRe = /^1[34578]\d{9}$/
            let mailRe = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            let qqRe = /^[1-9]\d{4,9}$/
            let { userTelephone, userEmail, QQ } = this.models
            let warn = this.$message.warning
            if (!userTelephone) {
                warn('请输入个人手机')
                return
            }
            if (!phoneRe.test(userTelephone)) {
                warn('个人手机格式不正确')
                return
            }
            if (!userEmail) {
                warn('请输入邮箱')
                return
            }
            if (!mailRe.test(userEmail)) {
                warn('邮箱格式不正确')
                return
            }
            if (QQ && !qqRe.test(QQ)) {
                warn('qq格式不正确')
                return
            }

            this.disableBtn = true 
            this.id = this.$route.params.id    
                
            updateUser(this.id, this.models).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('修改成功')
                }
                this.disableBtn = false
                this.disableInput = true
            }, _ => {
                this.$message.error('修改失败')
                this.disableBtn = false
            })
        }
    }
}
</script>

<style lang="stylus">
.user-info
    .form-summary
        color red
    .el-form
        .el-input
            width 20%
            min-width 180px
</style>
