<template>
    <div>
        <div class="admin-list-pass" v-if="!hideFilter">
            <el-input class="pick-erpai" size="small" v-model="factoryName">
                <template slot="prepend">单位名:</template>
            </el-input>
            <el-select width="120" v-if="!hidePass" size="small" v-model="isPass" placeholder="所有数据">
                <el-option
                    v-for="(val, key) in options"
                    :key="val"
                    :label="key"
                    :value="val">
                </el-option>
            </el-select>
<!--             <el-input class="pick-erpai" size="small" v-model="eartag">
                <template slot="prepend">耳牌号:</template>
            </el-input>
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
            </el-date-picker> -->
            <el-button @click="fetchData()" size="small" type="primary">查询</el-button>
        </div>
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
                :width="th.width || 'auto'">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span v-if="!hideView" @click="edit(scope.$index, 1)">查看</span>
                        <template v-if="!checkData.length">
                            <span @click="edit(scope.$index)">编辑</span>
                            <span @click="deleteItem(scope.$index)">删除</span>
                        </template>
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
        // 隐藏操作栏的查看功能
        hideView: {
            type: Boolean,
            default: false
        },
        // 隐藏头部筛选
        hideFilter: {
            type: Boolean,
            default: false
        },
        // 跳转路径
        modpath: {
            type: String
        },
        getData: {
            type: Function
        },
        deleteData: {
            type: Function,
            default () {
                return () => {}
            }
        },
        // 审核接口
        checkData: {
            type: Function,
            default () {
                return () => {}
            }
        },
        headers: {
            type: Array
        },

        // 是否显示操作栏的审核功能
        hidePass: {
            type: Boolean,
            default: false
        },
        // 跳转路径是否没有prac
        noPrac: {
            type: Boolean,
            default: false
        },
        // id字段含义
        findBy: {
            type: String,
            default: 'factoryNum'
        },
        // 代理表头需要转换
        isAgent: {
            type: Boolean,
            default: false
        }
    },

    mounted () {
        this.fetchData()
    },

    data () {
        return {
            load: true, // 是否显示loading动画
            page: 1, // 当前页码
            total: 10, // 总共数据条数
            tableData: [], // 表格数据

            isPass: null, // 筛选条件-是否通过
            factoryName: null, // 筛选条件-工厂名称
            options: { // 表格审核状态列，显示转换映射
                所有数据: null,
                未通过: 0,
                已通过: 1,
                未审核: 2
            }
        }
    },

    methods: {
        fetchData () {
            let param = {
                page: this.page - 1,
                size: 10
            }
            if (this.isPass !== null) {
                param.ispassCheck = this.isPass
            }
            if (this.factoryName) {
                param.factoryName = this.factoryName
            }

            let id
            let { factoryId, agentId } = this.$store.state.user
            // let findBy = this.findBy
            if (this.$store.state.user.id !== undefined) {
                id = this.$store.state.user.id
            } else if (factoryId !== undefined) {
                id = factoryId
            } else if (agentId !== undefined) {
                id = agentId
            }

            if (id === null || id === undefined) {
                this.tableData = []
                this.load = false
            } else {
                this.load = true
                this.getData(id, param).then(res => {
                    if (isReqSuccessful(res)) {
                        let data = res.data

                        if (this.isAgent) {
                            data.List.forEach(v => {
                                let map = ['', '省级代理', '市级代理', '县级代理']
                                v.agentRank = map[v.agentRank]
                            })
                        }
                        let item = data.List[0]
                        if (item && item.ispassCheck !== null && item.ispassCheck !== undefined) {
                            data.List.forEach(v => {
                                let map = ['未通过', '已通过', '未审核']
                                v.ispassCheck = map[v.ispassCheck]
                            })
                        }
                        this.tableData = data.List
                        this.total = data.size
                    }
                    this.load = false
                }, _ => {
                    this.load = false
                    this.$message.error('获取数据失败')
                })
            }
        },

        edit (index, isView) {
            let id = this.tableData[index].id
            let path
            if (this.noPrac) {
                if (isView) {
                    path = `/admin/${this.modpath}?view=${id}`
                } else {
                    path = `/admin/${this.modpath}?edit=${id}`
                }
            } else {
                if (isView) {
                    path = `/admin/${this.modpath}/prac?view=${id}`
                } else {
                    path = `/admin/${this.modpath}/prac?edit=${id}`
                }
            }
            this.$router.push(path)
        },

        deleteItem (index) {
            this.$confirm('将永久此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let { id } = this.tableData[index]
                this.deleteData(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.fetchData()
                        this.$message.success('删除成功!')
                    }
                })
            }).catch(() => {
                return false
            })
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.el-table th
    border-left 2px solid #98c9e6
    color #fff
    background-color color-main
</style>
