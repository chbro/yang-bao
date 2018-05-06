<template>
    <div class="admin-form">
        <p class="card-title">修改密码</p>
        <basic-info :items="items" :models.sync="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { updatePassword } from '@/util/getdata'
import { jumpToLogin, isReqSuccessful } from '@/util/jskit'
import md5 from 'md5'

export default {
    components: {
        BasicInfo
    },

    data () {
        return {
            items: [
                {label: '原密码', type: 'password', model: 'oldpass', block: 1},
                {label: '新密码', type: 'password', model: 'newpass'},
                {label: '确认新密码', type: 'password', model: 'repeat'}
            ],
            models: {
                oldpass: '',
                newpass: '',
                repeat: ''
            }
        }
    },

    methods: {
        submit () {
            let { oldpass, newpass, repeat } = this.models
            if (Object.keys(this.models).some(v => this.models[v].length < 6)) {
                this.$message.warning('密码长度不小于6')
                return
            }
            if (newpass === oldpass) {
                this.$message.warning('新密码与原密码不能一样')
                return
            }
            if (newpass !== repeat) {
                this.$message.warning('新密码与确认密码不一致')
                return
            }

            let data = {
                oldPassword: md5(oldpass),
                newPassword: md5(newpass)
            }
            updatePassword(this.$store.state.user.id, data).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('修改成功，请重新登录')
                    jumpToLogin(this.$router)
                }
            }).catch(() => {
                this.$message.error('修改失败')
            })
        }
    }
}
</script>
