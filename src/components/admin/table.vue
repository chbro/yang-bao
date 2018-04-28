<template>
    <div>
<!--         <div class="admin-list-pass">
            <el-input class="pick-erpai" size="small">
                <template slot="prepend">工厂名:</template>
            </el-input>
            <el-input class="pick-erpai" size="small">
                <template slot="prepend">耳牌号:</template>
            </el-input>
            <el-select width="120" v-if="!isGenea" size="small" v-model="isPass" placeholder="所有数据">
                <el-option
                    v-for="(val, key) in options"
                    :key="val"
                    :label="key"
                    :value="val">
                </el-option>
            </el-select>
            <el-date-picker
                size="small"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right">
            </el-date-picker>
            <el-date-picker
                v-if="isDisinfect"
                placeholder="消毒时间:"
                size="small"
                type="datetime">
            </el-date-picker>
            <el-button @click="fetchData()" size="small" type="primary">查询</el-button>
        </div> -->
        <el-table
            v-loading="load"
            ref="table"
            tooltip-effect="light"
            class="admin-table"
            :data="tableData">
            <!-- :filter-method="filterMethod" -->
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                :prop="th.prop"
                :label="th.label"
                :width="th.width || '120'">
            </el-table-column>
            <el-table-column
                label="操作"
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="showDetail(scope.$index)">查看</span>
                        <span @click="edit(scope.$index)">编辑</span>
                        <span @click="deleteItem(scope.$index)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="fetchData"
            :current-page.sync="page">
        </el-pagination>
    </div>
</template>

<script>
import { isReqSuccessful } from '@/util/jskit'

export default {
    props: {
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
        },
        headers: {
            type: Array
        },
        // 系谱档案模块没有审核功能
        isGenea: {
            type: Boolean,
            default: false
        },
        //
        isDisinfect: {
            type: Boolean,
            default: false
        },
        // 发布模块采用rest接口，加以区分
        isRelease: {
            type: Boolean,
            default: false
        }
    },

    mounted () {
        this.fetchData()
    },

    data () {
        return {
            id: 1,
            load: true,
            page: 1,
            total: 10,
            isPass: null,
            tableData: [],
            options: {
                所有数据: 4,
                已通过: 1,
                未通过: 0,
                待审核: 2
            },
            filterData: []
        }
    },

    methods: {
        filterMethod (value, row, column) {
            console.log(value, row, column)
        },

        showDetail (index) {
            console.log(this.tableData[index])
        },

        fetchData () {
            let param = {
                page: this.page - 1,
                size: 10
            }
            this.load = true
            // if (this.isRelease) {
            //     delete param.factoryNum
            //     delete param.isPass
            // }
            this.getData(this.id, param).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data
                    let map = {
                        0: '未通过',
                        1: '已通过',
                        2: '未审核'
                    }
                    // 发布系统不用审核
                    if (!this.isRelease) {
                        data.List.forEach(v => {
                            v.ispassCheck = map[v.ispassCheck]
                        })
                    }
                    this.tableData = data.List
                    this.total = data.size
                }
                this.load = false
            }).catch(_ => {
                this.load = false
                this.$message.error('获取数据失败')
            })
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
            let path
            if (this.isRelease) {
                path = `/admin/${this.modpath}?edit=${id}`
            } else {
                path = `/admin/${this.modpath}/prac?edit=${id}`
            }
            this.$router.push(path)
        },

        deleteItem (index) {
            this.$confirm('将永久此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let { id } = this.tableData[index]
                this.deleteData(id, {}).then(res => {
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
