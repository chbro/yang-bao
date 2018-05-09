<template>
    <div class="auth-role">
        <el-button @click="addUserVisible = true">添加角色</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="typeName"
                label="角色名"
                width="240">
            </el-table-column>
            <el-table-column
                prop="id"
                label="角色编号"
                width="240">
            </el-table-column>
            <el-table-column
                prop="roleDescription"
                label="角色说明"
                width="240">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="preEdit(scope.$index)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="hanldeDeleteRole(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="fetchRoles"
            :current-page.sync="page">
        </el-pagination>

        <el-dialog
            class="role-dialogue"
            :before-close="handleClose"
            :visible.sync="addUserVisible"
            :model="rules"
            width="50%"
            center>
            <el-input v-model="typeName" size="small">
                <template slot="prepend">角色名:</template>
            </el-input>
            <el-input v-model="roleDescription" size="small">
                <template slot="prepend">角色说明:</template>
            </el-input>
            <div class="rules" v-for="(item, i) in items" :key="i">
                <el-checkbox v-model="checkAll[i]" @change="handleCheckAllChange(item, i)">
                    <span v-text="item.text"></span>
                </el-checkbox>
                <el-checkbox-group v-model="rules">
                    <el-checkbox :label="i + '-' + 0">增加</el-checkbox>
                    <el-checkbox :label="i + '-' + 1">删除</el-checkbox>
                    <el-checkbox :label="i + '-' + 2">查询</el-checkbox>
                    <el-checkbox :label="i + '-' + 3">修改</el-checkbox>
                    <template v-if="item.supervise">
                        <el-checkbox :label="i + '-' + 4">监督</el-checkbox>
                        <el-checkbox :label="i + '-' + 5">审核</el-checkbox>
                    </template>
                    <el-checkbox :label="i + '-' + 6" v-if="item.totalScore">查看总评分</el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancle()">取消</el-button>
                <el-button size="small" type="primary" @click="submit()">提交</el-button>
            </div>
        </el-dialog>

        <h3>员工角色</h3>
        <div class="employee">
            员工
            <el-select size="small" v-model="userid" placeholder="请选择">
                <el-option
                    v-for="(item, i) in empOptions"
                    :key="'emo' + i"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            角色
            <el-select size="small" v-model="userrole" placeholder="请选择">
                <el-option
                    v-for="(item, i) in roleOptions"
                    :key="i"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-button size="small" type="primary" @click="updateEmployee()">提交/更新</el-button>
    </div>
</template>

<script>
import { isReqSuccessful } from '@/util/jskit'
import { getUserById, getRoles, getUsers, getRoleDetail, getFactoryUsers, postRole, deleteRole, updateRole, updateUserRole } from '@/util/getdata'

export default {
    watch: {
        userid (newId) {
            this.userrole = this.empOptions.find(v => v.value === newId).role
        }
    },

    data () {
        return {
            page: 1,
            total: 1,

            userid: null,
            userrole: null,
            empOptions: [],
            roleOptions: [],

            typeName: '',
            roleDescription: '',
            rules: [],

            tableData: [],
            addUserVisible: false,
            checkAll: [],
            items: [
                {text: '配种产子档案', supervise: 1},
                {text: '疾病防治档案', supervise: 1},
                {text: '卫生消毒档案', supervise: 1},
                {text: '免疫实施档案', supervise: 1},
                {text: '阶段营养档案', supervise: 1},
                {text: '卫生动物福利档案', supervise: 1},
                {text: '专家评价', totalScore: 1},
                {text: '方案'},
                {text: '代理'},
                {text: '客户'},
                {text: '直播'},
                {text: '社区活动'},
                {text: '信息发布'},
                {text: '系谱档案'},
                {text: '视频'},
                {text: '图片'},
                {text: '用户'},
                {text: '专家'},
                {text: '技术员'},
                {text: '管理员'},
                {text: '拓展模块信息查询'}
            ]
        }
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                this.user.agentRank = res.data.agentRank
            }
        }).then(_ => {        
            getRoles(this.user.agentRank, {size: 100}).then(res => {
                if (isReqSuccessful(res)) {
                    for (let v of res.data.List) {
                        this.roleOptions.push({
                            label: v.typeName,
                            value: v.id
                        })
                    }
                }
            })
        }).then(_ => {        
            getFactoryUsers(this.user.userFactory).then(res => {
                if (isReqSuccessful(res)) {
                    for (let v of res.data.List) {
                        this.empOptions.push({
                            label: v.pkUserid,
                            value: v.id,
                            role: v.userRole
                        })
                    }
                }
            })
        }).then(this.fetchRoles)
    },

    methods: {
        handleClose (done) {
            this.editId = this.typeName = this.roleDescription = null
            this.rules = []
            done()
        },

        cancle () {
            this.editId = this.typeName = this.roleDescription = null
            this.rules = []
            this.addUserVisible = false
        },

        hanldeDeleteRole (idx) {
            this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[idx].id
                deleteRole(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('删除成功')
                        this.fetchRoles()
                    }
                })
            }).catch(() => {
                return false
            })
        },

        updateEmployee () {
            updateUserRole(this.userid, this.userrole).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('修改员工角色成功')
                }
            }, _ => {
                this.$message.success('修改员工角色失败')
            })
        },

        fetchRoles () {
            getRoles(this.user.agentRank, {page: this.page - 1}).then(res => {
                if (isReqSuccessful(res)) {
                    this.tableData = res.data.List
                    this.total = res.data.size
                }
            })
        },

        submit () {
            let { typeName, roleDescription } = this
            if (!typeName) {
                this.$message.warning('请填写角色名')
                return
            }
            if (!roleDescription) {
                this.$message.warning('请填写角色说明')
                return
            }
            if (!this.rules.length) {
                this.$message.warning('请赋予角色权限')
                return
            }

            let data = {
                roleDescription,
                typeName,
                rolePermit: this.rules
            }
            if (!this.editId) {
                postRole(data).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('添加角色成功')
                        this.tableData.unshift({
                            id: res.data.model,
                            typeName,
                            roleDescription,
                            rolePermit: this.rules
                        })
                        if (this.tableData.length > 10) {
                            this.tableData.pop()
                        }
                        this.typeName = this.roleDescription = null
                        this.rules = []
                    }
                    this.addUserVisible = false
                }, _ => {
                    this.$message.success('添加角色失败')
                    this.addUserVisible = false
                })
            } else {
                updateRole(this.editId, data).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('修改角色成功')
                        this.typeName = this.roleDescription = null
                        this.rules = []
                        this.fetchRoles()
                    }
                    this.addUserVisible = false
                }, _ => {
                    this.$message.success('修改角色失败')
                    this.addUserVisible = false
                })
            }
        },

        preEdit (idx) {
            let data = this.tableData[idx]
            let { id, typeName, roleDescription } = data
            this.editId = id
            this.typeName = typeName
            this.roleDescription = roleDescription
            this.rules = data.rolePermit
            this.addUserVisible = true
        },

        handleCheckAllChange (item, idx) {
            let len = 4
            if (item.supervise) {
                len += 2
            }
            if (item.totalScore) {
                len++
            }
            while (--len >= 0) {
                let str = `${idx}-${len}`
                if (!this.rules.includes(str)) {
                    if (this.checkAll[idx]) {
                        this.rules.push(str)
                    }
                } else if (!this.checkAll[idx]) {
                    this.rules.splice(this.rules.indexOf(str), 1)
                }
            }
        }
    }
}
</script>

<style lang="stylus">
.auth-role
    .rules
        margin 10px
        .el-input input
            width 30%

    .employee
        .el-select
            margin-right 30px
            margin-bottom 20px
        &+.el-button
            background-color c=#f78989
            border-color c

    .role-dialogue
        .el-dialog__body
            >.el-input
                margin-bottom 10px
</style>
