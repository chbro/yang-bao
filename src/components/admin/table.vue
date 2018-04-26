<template>
    <div>
        <div class="admin-list-pass">
            <el-select width="120" v-if="!isGenea" size="small" v-model="isPass" placeholder="请选择">
                <el-option
                    v-for="(val, key) in options"
                    :key="val"
                    :label="key"
                    :value="val">
                </el-option>
            </el-select>
            <template v-else>
                <el-input class="pick-erpai" size="small">
                    <template slot="prepend">父耳牌号:</template>
                </el-input>
                <el-input class="pick-erpai" size="small">
                    <template slot="prepend">母耳牌号:</template>
                </el-input>
            </template>
            <el-date-picker
                v-if="isDisinfect"
                placeholder="消毒时间:"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                type="datetime">
            </el-date-picker>
            <el-input class="pick-erpai" size="small">
                <template slot="prepend">工厂号:</template>
            </el-input>
            <el-input class="pick-erpai" size="small">
                <template slot="prepend">耳牌号:</template>
            </el-input>
            <el-button @click="fetchData()" size="small" type="primary">查询</el-button>
        </div>
        <el-table
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
                :width="isGenea ? 240 : 320">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="showDetail(scope.$index)">查看</span>
                        <span @click="edit(scope.$index)">编辑</span>
                        <span @click="deleteItem(scope.$index)">删除</span>
                        <template v-if="!isGenea">
                            <span @click="reviewItem(scope.$index)">专家审核</span>
                            <span @click="reviewItem(scope.$index)">监督执行</span>
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
        },
        id: {
            type: Number
        },
        headers: {
            type: Array
        },
        isGenea: {
            type: Boolean,
            default: false
        },
        isDisinfect: {
            type: Boolean,
            default: false
        }
    },

    mounted () {
        this.fetchData()
    },

    data () {
        return {
            page: 1,
            total: 10,
            isPass: null,
            tableData: [],
            options: {
                所有数据: 4,
                已通过: 1,
                未通过: 0,
                待审核: 2
            }
        }
    },

    methods: {
        showDetail (index) {
            console.log(this.tableData[index])
        },

        reviewItem (index) {
            console.log(this.tableData[index])
        },

        fetchData () {
            let { id, isPass, page } = this
            let param = {
                factoryNum: id,
                isPass,
                page: page - 1,
                size: 10
            }
            this.getData(param).then(res => {
                if (isReqSuccessful(res)) {
                    this.tableData = res.data.List
                    this.total = res.data.total
                }
            }, _ => {
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
            this.$router.push(`/admin/${this.modpath}?edit=${id}`)
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
