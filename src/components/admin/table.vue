<template>
    <div>
        <div class="admin-list-pass" v-if="!hideFilter">
            <el-input class="pick-erpai" size="small" v-model="factoryName">
                <template slot="prepend">单位名:</template>
            </el-input>
<!--             <el-input class="pick-erpai" size="small" v-model="eartag">
                <template slot="prepend">耳牌号:</template>
            </el-input> -->
            <el-select width="120" v-if="!isGenea" size="small" v-model="isPass" placeholder="所有数据">
                <el-option
                    v-for="(val, key) in options"
                    :key="val"
                    :label="key"
                    :value="val">
                </el-option>
            </el-select>
<!--             <el-date-picker
                size="small"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right">
            </el-date-picker> -->
<!--             <el-date-picker
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
                :prop="th.prop"
                :label="th.label"
                :width="th.width || '120'">
            </el-table-column>
            <el-table-column
                label="操作"
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span v-if="!hideView" @click="showDetail(scope.$index)">查看</span>
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
import { retrieveAid } from '@/util/store'

export default {
    props: {
        hideView: {
            type: Boolean,
            default: false
        },
        hideFilter: {
            type: Boolean,
            default: false
        },
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
        checkData: {
            type: Function,
            default () {
                return () => {}
            }
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
            load: true,
            page: 1,
            total: 10,
            tableData: [],

            // eartag: null,
            isPass: null,
            factoryName: null,
            options: {
                未通过: 0,
                已通过: 1,
                未审核: 2,
                所有数据: 3
            },
            map: ['', '省级代理', '市级代理', '县级代理']
        }
    },

    methods: {
        showDetail (index) {
            console.log(this.tableData[index])
        },

        fetchData () {
            let param = {
                factoryNum: 1,
                page: this.page - 1,
                size: 10
            }
            if (this.isPass !== null) {
                param.ispassCheck = this.isPass
            }
            this.load = true

            if (this.isRestful) {
                this.getData(retrieveAid(), param).then(res => {
                    if (isReqSuccessful(res)) {

                    }
                })
            }
            this.getData(param).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data
                    // 发布系统不用审核
                    if (!this.isRelease) {
                        data.List.forEach(v => {
                            v.ispassCheck = this.options[v.ispassCheck]
                        })
                    }
                    if (this.hideView) {
                        data.List.forEach(v => {
                            v.agentRank = this.map[v.agentRank]
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
