<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="showDialog = true">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            layout="sizes, prev, pager, next, total, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 20, 30]"
            :total="total">
        </el-pagination>

        <el-dialog title="修改" :visible.sync="showDialog">
            <el-input></el-input>
            <el-button @click="submit()">提交</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { getPermission } from '@/util/getdata'

export default {
    data () {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }],
            showDialog: false,

            page: 1,
            total: 100
        }
    },

    mounted () {
        getPermission().then(res => {
            if (res.meta.code === 0) {
                console.log(res.data)
            } else {
                this.$message.error(res.meta.errorMsg || '查询失败')
            }
        })
    },

    methods: {
        submit () {
            this.showDialog = false
            setTimeout(_ => {
                this.$message.success('修改成功')
            }, 2000)
        },

        handleCurrentChange (page) {

        },

        handleSizeChange (size) {

        }
    }
}
</script>

<style lang="stylus">

</style>
