<template>
    <div>
        <el-table
            ref="table"
            tooltip-effect="light"
            class="admin-table"
            :data="tableData">
            <el-table-column
                type="selection"
                width="50">
            </el-table-column>
            <el-table-column
                prop="date"
                label="发布时间"
                width="150">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="name"
                label="配种产子方案名称">
            </el-table-column>
            <el-table-column
                label="操作"
                width="240">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="setTop(scope.$index)">置顶</span>
                        <span @click="edit(scope.$index)">编辑</span>
                        <!-- <span>修改</span> -->
                        <span @click="deleteItem(scope.$index)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            :current-page.sync="page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [
                {id: 0, date: '2014-01-01', name: '方案A'},
                {id: 1, date: '2014-01-01', name: '方案B'}
            ],
            page: 1,
            total: 100
        }
    },

    methods: {
        handleCurrentChange (page) {
            console.log(page)
        },

        setTop (index) {
            if (index === 0) {
                return
            }

            let item = this.tableData[index]
            this.tableData.splice(index, 1)
            this.tableData.unshift(item)
        },

        edit (index) {
            let id = this.tableData[index].id
            this.$router.push('/admin/nutrition/breedprac?edit=' + id)
        },

        deleteItem (index) {
            this.$confirm('将永久此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[index].id
                this.tableData.splice(index, 1)
                console.log(id)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                return false
            })
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/admin-table'
</style>
