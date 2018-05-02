<template>
    <div class="user-table">
        <el-button @click="dialogVisible = true">添加用户</el-button>

        <admin-table
            :getData="getUsers"
            :deleteData="deleteUser"
            :headers.sync="headers">
        </admin-table>

        <el-dialog title="添加用户" :visible.sync="dialogVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth">
                    <el-select size="small" v-model="factory" filterable placeholder="选择单位">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                     </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addUser()">确 定</el-button>
              </div>
        </el-dialog>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getUsers, deleteUser, postUser, getFactories } from '@/util/getdata'
import { checkForm, isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            form: {
                name: null,
                phone: null,
                password: null
            },
            factory: null,
            formLabelWidth: '120px',
            dialogVisible: false,
            getUsers,
            deleteUser,
            headers: [
                {label: '用户名', prop: ''},
                {label: '用户角色', prop: ''},
                {label: '单位', prop: ''},
                {label: '手机号', prop: ''},
                {label: '办公电话', prop: ''},
                {label: 'qq', prop: ''},
                {label: '微信', prop: ''}
            ],
            options: [
                {label: '11', value: 1},
                {label: '11', value: 2}
            ]
        }
    },

    mounted () {
        getFactories(1).then(res => {
            if (isReqSuccessful(res)) {
                this.options = res.data
            }
        }).catch(_ => {
            this.$message.error('请求失败')
        })
    },

    methods: {
        addUser () {
            if (!checkForm(this.form)) {
                return
            }
            if (this.form.password.length < 6) {
                this.$message.warning('密码长度不能小于6')
                return
            }
            if (this.factory) {
                this.form.factory = this.factorys
            }
            console.log(this.form)
            postUser(this.form).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.error('添加成功')
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
            width 50%
        .el-select
            .el-input
                width 100%
</style>
