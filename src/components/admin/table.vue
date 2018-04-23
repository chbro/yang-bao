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
                prop="gmtCreate"
                label="发布时间"
                width="250">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="disinfectName"
                :label="name + (postfix ? '方案名称' : '')">
            </el-table-column>
            <el-table-column
                label="操作"
                width="240">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="showDetail(scope.$index)">查看</span>
                        <span @click="edit(scope.$index)">编辑</span>
                        <template v-if="modpath">
                            <span @click="setTop(scope.$index)">置顶</span>
                            <span @click="deleteItem(scope.$index)">删除</span>
                            <span @click="reviewItem(scope.$index)">审核</span>
                        </template>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            :current-page="page">
        </el-pagination>
    </div>
</template>

<script>
import { isReqSuccessful } from '@/util/jskit'

export default {
    props: {
        name: {
            type: String
        },
        modpath: {
            type: String
        },
        getData: {
            type: Function
        },
        deleteData: {
            type: Function
        },
        postfix: {
            type: Boolean,
            default: true
        }
    },

    mounted () {
        this.fetchData()
    },

    data () {
        return {
            page: 1,
            total: 10,
            tableData: []
        }
    },

    methods: {
        showDetail (index) {
            console.log(this.tableData[index])
        },

        reviewItem (index) {
            console.log(this.tableData[index])
        },

        fetchData (page = this.page, isPass = 0, size = 10) {
            this.getData({
                isPass,
                page,
                size
            }).then(res => {
                if (isReqSuccessful(res)) {
                    this.tableData = res.data.List
                    this.total = res.data.size
                }
            }, _ => {
                this.$message.error('获取数据失败')
            })
        },

        handleCurrentChange (page) {
            this.fetchData(page)
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
            this.$router.push('/admin/' + this.modpath + id)
        },

        deleteItem (index) {
            this.$confirm('将永久此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[index].id
                this.deleteData(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.tableData.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                })
            }).catch(() => {
                return false
            })
        }
    }
}
</script>
