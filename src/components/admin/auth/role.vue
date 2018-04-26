<template>
    <div>
        <el-button @click="addUser = true">添加角色</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="rolename"
                label="角色名"
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
            <el-input v-model="rolename" placeholder="请输入角色名"></el-input>
            <div class="rules" v-for="(item, i) in items" :key="i">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                    <span v-text="item.text"></span>
                </el-checkbox>
                <el-checkbox-group v-model="rules" @change="handleRules">
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
            <span>rules:{{ rules }}</span>
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [{
                rolename: 'aaa'
            }],
            addUser: false,
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
            checkAll: false,
            rules: [],
            value: '',
            isIndeterminate: true,
            method: {
                // handleCheckAllChange(val) {
                //     // this.rules = val ? rules : [];
                //     this.isIndeterminate = false;
                // },
                // handleChange (value) {
                //     console.log(value)
                // }
            }
        }
    }
}
</script>

<style lang="stylus">
.rules
    margin 10px
    .el-input input
        width 30%
</style>
