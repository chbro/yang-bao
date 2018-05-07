<template>
    <div class="user-table">
        <el-button @click="addUser">添加用户</el-button>

        <admin-table
            :getData="getFactoryUsers"
            :deleteData="deleteUser"
            :headers.sync="headers">
        </admin-table>

        <el-dialog title="添加用户" :visible.sync="dialogVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.realname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.flag">
                        <el-radio :disabled="isAgentEmpty" :label="0">代理单位</el-radio>
                        <el-radio :disabled="isFactoryEmpty" :label="1">羊场单位</el-radio>
                        <!-- TODO: 只有系统管理员 admin 才能添加系统管理员 -->
                        <el-radio :label="2">系统管理员</el-radio>
                    </el-radio-group><br/>
                    <el-select v-if="form.flag === 0" size="small" v-model="form.factoryId" filterable placeholder="选择代理单位">
                        <el-option
                            v-for="item in agentOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                     </el-select>
                     <el-select v-if="form.flag === 1" size="small" v-model="form.factoryId" filterable placeholder="选择羊场单位">
                        <el-option
                            v-for="item in factoryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                     </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="confirm()">确 定</el-button>
              </div>
        </el-dialog>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getUsers, deleteUser, postUser, getFactories, getAgentUnit, getFactoryUnit, getFactoryUsers } from '@/util/getdata'
import { checkForm, isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            form: {
                username: null,
                realname: null,
                telephone: null,
                password: null,
                flag: 0,
                factoryId: null,
                factoryName: '',
            },
            formLabelWidth: '120px',
            dialogVisible: false,
            getFactoryUsers,
            deleteUser,
            headers: [
                {label: '单位', prop: ''},
                {label: '用户名', prop: ''},
                {label: '用户角色', prop: ''},
                {label: '手机号', prop: ''},
                {label: '办公电话', prop: ''},
                {label: 'qq', prop: ''},
                {label: '微信', prop: ''}
            ],
            // 代理单位
            agentOptions: [],
            // 羊场单位
            factoryOptions: [],
            isAgentEmpty: false,
            isFactoryEmpty: false
        }
    },

    methods: {
        // 添加用户
        addUser () {
            this.dialogVisible = true
            // 获取代理单位
            getAgentUnit().then(res => {
                if (isReqSuccessful(res)) {
                    if (res.data.List && !res.data.List.length) {
                        this.isAgentEmpty = true
                        return
                    }
                    res.data.List.forEach((item) => {
                        let option = {
                            value: item.id,
                            label: item.agentName
                        }
                        this.agentOptions.push(option)
                    })
                }
            }).catch(_ => {
                this.$message.error('获取代理单位失败')
            })
            // 获取羊场单位
            getFactoryUnit().then(res => {
                if (isReqSuccessful(res)) {
                    if (res.data.List && !res.data.List.length) {
                        this.isFactoryEmpty = true
                        return
                    }
                    res.data.List.forEach((item) => {
                        let option = {
                            value: item.id,
                            label: item.breedName
                        }
                        this.factoryOptions.push(option)
                    })
                }
            }).catch(_ => {
                this.$message.error('获取羊场单位失败')
            })
        },
        // 提交
        confirm () {
            // 设置 factoryName
            if(this.form.flag === 2) {
                this.form.factoryName = '系统管理员'
            } else if(this.form.flag === 0) {
                let len = this.agentOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.agentOptions[i].value) {
                        this.form.factoryName = this.agentOptions[i].label
                        return
                    }
                }
            } else {
                let len = this.factoryOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.factoryOptions[i].value) {
                        this.form.factoryName = this.factoryOptions[i].label
                        return
                    }
                }
            }
            if (!checkForm(this.form)) {
                return
            }
            // TODO: 验证手机号码，用户名不得为空，用户名不能重复
            // 手机可为空，11为数字，用户名不得为空 4-20为大小写字母数字 用户姓名不能为空 单位不得为空
            if (this.form.password.length < 6) {
                this.$message.warning('密码长度不能小于6')
                return
            }
            postUser(this.form).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    // 添加成功后 用户名 用户姓名 手机号置空
                    this.form.username = ''
                    this.form.realname = ''
                    this.form.telephone = ''
                    this.headers.unshift()
                }
            }).catch(() => {
                this.$message.error('添加用户失败')
            })
        }
    }
}
</script>

<style lang="stylus">
.user-table
    >.el-button
        margin-bottom 15px

    .el-dialog
        .el-input
            width 300px
        .el-select
            .el-input
                width 300px
</style>
