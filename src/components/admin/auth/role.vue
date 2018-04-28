<template>
    <div class="auth-role">
        <el-button @click="addUser = true">添加角色</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="rolename"
                label="角色名"
                width="240">
            </el-table-column>
            <el-table-column
                prop="rolename"
                label="角色编号"
                width="240">
            </el-table-column>
            <el-table-column
                prop="rolename"
                label="角色说明"
                width="240">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="addUser = true">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="addUser"
            :model="rules"
            width="50%"
            center>
            <el-input v-model="rolename" size="small">
                <template slot="prepend">角色名:</template>
            </el-input>
            <el-input v-model="rolenote" size="small">
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
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-dialog>

        <h3>员工角色</h3>
        <div class="employee">
            员工
            <el-select size="small" v-model="user" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            角色
            <el-select size="small" v-model="userrole" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-button size="small" type="primary" @click="submit()">提交/更新</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: null,
            userrole: null,
            options: [],

            rolename: '',
            rolenote: '',
            tableData: [
                {rolename: 'aaa'}
            ],
            addUser: false,
            checkAll: [],
            items: [
                {text: '免疫实施档案', supervise: 1},
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
            ],
            rules: [],
            value: '',
            isIndeterminate: true
        }
    },

    methods: {
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
            console.log(this.rules)
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
</style>
