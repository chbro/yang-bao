<template>
    <div class="user-table">
        <el-button @click="addUser">添加用户</el-button>

        <el-table
            v-loading="load"
            ref="table"
            tooltip-effect="light"
            class="admin-table"
            :data="tableData">
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="th.width || 150">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="deleteUser(scope.$index)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

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
                        <el-radio :disabled="isAgentEmpty" :label="1">代理单位</el-radio>
                        <el-radio :disabled="isFactoryEmpty" :label="0">羊场单位</el-radio>
                        <el-radio :label="2" v-if="isAdmin">系统管理员</el-radio>
                        <el-radio :label="3">本单位用户</el-radio>
                    </el-radio-group><br/>
                    <el-select v-if="form.flag === 1" size="small" v-model="form.factoryId" filterable placeholder="选择代理单位">
                        <el-option
                            v-for="(item, i) in agentOptions"
                            :key="i + 'factory'"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                     </el-select>
                     <el-select v-if="form.flag === 0" size="small" v-model="form.factoryId" filterable placeholder="选择羊场单位">
                        <el-option
                            v-for="(item, i) in factoryOptions"
                            :key="i + 'farm'"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                     </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancle()">取消</el-button>
                <el-button size="small" type="primary" @click="confirm()">确定</el-button>
            </div>
        </el-dialog>

        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="fetchData"
            :current-page.sync="page">
        </el-pagination>

    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getUserById, getUsers, deleteUser, postUser, getFactories, getAgentUnit, getFactoryUnit, getFactoryUsers } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import { validatePassword, validateTelephone, validateUsername } from '@/util/validate'
import md5 from 'md5'

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
            headers: [
                {label: '单位', prop: 'factoryName'},
                {label: '用户名', prop: 'pkUserid'},
                {label: '用户姓名', prop: 'userRealname'},
                {label: '角色名', prop: 'roleName'},
                {label: '角色编号', prop: 'userRole'},
                {label: '手机号', prop: 'userTelephone'},
                {label: '办公电话', prop: 'officialPhone'},
                {label: 'qq', prop: 'qq'},
                {label: '微信', prop: 'msn'}
            ],
            // 代理单位
            agentOptions: [],
            // 羊场单位
            factoryOptions: [],
            isAgentEmpty: false,
            isFactoryEmpty: false,

            tableData: [],
            load: false,
            page: 1,
            total: 1,

            isAdmin: false
        }
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                // 系统管理员暂时为 userRole: 3
                this.isAdmin = res.data.userRole === 3
            }
        }).then(this.fetchData)
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
        }, _ => {
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
        }, _ => {
            this.$message.error('获取羊场单位失败')
        })
    },


    methods: {
        cancle () {
            this.form = {}
            this.dialogVisible = false
        },

        async fetchData () {
            this.load = true
            let res = await getFactoryUsers(this.user.userFactory, {page: this.page - 1})
            this.tableData = res.data.List
            this.total = res.data.size
            this.load = false
        },

        deleteUser (index) {
            this.$confirm('将永久删除此用户, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[index].id
                deleteUser(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.fetchData()
                        this.$message.success('删除成功!')
                    }
                })
            }).catch(() => {
                return false
            })
        },

        // 添加用户
        addUser () {
            this.dialogVisible = true
        },
        // 提交
        confirm () {
            // 设置 factoryName
            let { flag } = this.form
            if(flag === 2) {
                this.form.factoryName = '系统管理员'
            } else if(flag === 1) {
                let len = this.agentOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.agentOptions[i].value) {
                        this.form.factoryName = this.agentOptions[i].label
                        break
                    }
                }
            } else if (flag === 0) {
                let len = this.factoryOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.factoryOptions[i].value) {
                        this.form.factoryName = this.factoryOptions[i].label
                        break
                    }
                }
            } else if (flag === 3) {
                this.form.factoryId = this.user.userFactory
                this.form.factoryName = this.user.factoryName
            }

            let warn = this.$message.warning
            let { username, realname, telephone, password, factoryId } = this.form
            let valUs = validateUsername(username)
            if (!username) {
                warn('请输入用户名')
                return
            }
            if (valUs !== true) {
                warn(valUs)
                return
            }
            if (!realname) {
                warn('请输入用户姓名')
                return
            }
            let valPh = validateTelephone(telephone)
            if (telephone && valPh !== true) {
                warn(valPh)
                return
            }
            let valPas = validatePassword(password)
            if (valPas !== true) {
                warn(valPas)
                return
            }
            if (factoryId === null) {
                warn('请选择单位')
                return   
            }

            this.form.password = md5(this.form.password)
            postUser(this.form).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    // 添加成功后 用户名 用户姓名 手机号置空
                    this.form = {}
                    this.fetchData()
                }
                this.dialogVisible = false
            }, _ => {
                this.dialogVisible = false
                // 添加成功后置空密码
                this.form.password = ''
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
