<template>
    <div>
        <div class="admin-list-pass" v-if="!hideFilter && !releaseType ">
            <el-select @change="fetchData()" width="120" v-if="!hidePass" size="small" v-model="isPass" placeholder="所有数据">
                <el-option
                    v-for="(val, key) in options"
                    :key="val"
                    :label="key"
                    :value="val">
                </el-option>
            </el-select>
            <el-input class="pick-erpai" size="small" v-model="factoryName">
                <template slot="prepend">养殖场:</template>
            </el-input>
            <el-input v-if="!hideEartagFilter" class="pick-erpai" size="small" v-model="eartag">
                <template slot="prepend">耳牌号:</template>
            </el-input>
            <el-date-picker
                size="small"
                v-model="gmtCreate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                align="right">
            </el-date-picker>
            <el-button @click="fetchData()" size="small" type="primary">查询</el-button>
            <el-button @click="export2xls()" size="small" type="primary" icon="el-icon-download">导出表格</el-button>
        </div>
        <el-table
            v-loading="load"
            ref="table"
            tooltip-effect="dark"
            class="admin-table"
            :data="tableData">
            <template v-if="hasCommonHeader">
                <el-table-column
                    align='center'
                    width="150"
                    prop="ispassCheck"
                    label="审核状态">
                </el-table-column>
                <el-table-column
                    align='center'
                    width="150"
                    prop="factoryName"
                    label="养殖场">
                </el-table-column>
                <el-table-column
                    align='center'
                    width="200"
                    prop="gmtCreate"
                    label="提交时间">
                </el-table-column>
            </template>
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="th.width || 150">
                <el-table-column
                    v-if="th.children"
                    v-for="(thc, j) in th.children"
                    :key="j"
                    :prop="thc.prop"
                    :label="thc.label"
                    :width="thc.width || 150">
                </el-table-column>
            </el-table-column>
            <template v-if="hasCommonTailHeader">
                <el-table-column
                    align='center'
                    width="150"
                    prop="operatorName"
                    label="操作人员">
                </el-table-column>
                <el-table-column
                    align='center'
                    width="150"
                    :prop="isProName ? 'professorName' : 'professor'"
                    label="技术审核">
                </el-table-column>
                <el-table-column
                    align='center'
                    width="150"
                    :prop="isProName ? 'supervisorName' : 'supervisor'"
                    label="监督执行">
                </el-table-column>
            </template>
            <el-table-column
                width="150"
                align='center'
                v-if="hasUnpass"
                prop="upassReason"
                label="审核拒绝原因">
            </el-table-column>
            <el-table-column
                v-if="hasSup"
                align='center'
                prop="ispassSup"
                label="监督执行状态">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr" v-if="!releaseType && !isCheck">
                        <span v-if="!hideView" @click="edit(scope.$index, 1)">查看</span>
                        <template>
                            <span @click="edit(scope.$index)" v-if="showEdit">编辑</span>
                            <span @click="deleteItem(scope.$index)">删除</span>
                        </template>
                    </div>
                    <div class="opr" v-else-if="releaseType">
                        <span  @click="viewPlan(scope.$index)">查看</span>
                    </div>
                    <div class="opr" v-else>
                        <span @click="Spv(1, scope.$index)">{{isSpv ? '执行' : '通过'}}</span>
                        <span v-if="!isSpv" @click="Spv(0, scope.$index)">拒绝</span>
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
import XLSX from 'xlsx'
import { isReqSuccessful } from '@/util/jskit'
import { getUserById, getReleaseByName } from '@/util/getdata'
import {
// 监督执行
    patchWelfare,
    patchBreeding,
    patchPrevention,
    patchDisinfect,
    patchImmune,
    patchAntiscolic,
    patchStage,
// 专家审核
    patchProWelfare,
    patchProPrevention,
    patchProBreeding,
    patchProDisinfect,
    patchProImmune,
    patchProAntiscolic,
    patchProStage
} from '@/util/getdata'


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
        isCheck: {
            type: Boolean,
            default: false
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
        // 代理表头需要转换
        isAgent: {
            type: Boolean,
            default: false
        },
        // 方案表
        releaseType: {
            type: String,
            default: ''
        },
        showEdit: {
            type: Boolean,
            default: true
        },
        hideEartagFilter: {
            type: Boolean,
            default: false
        },
        checkModule: {
            type: String
        },
        // 表头是否有监督执行状态字段
        hasSup: {
            type: Boolean,
            default: true
        },
        // 是否有公用尾部表头
        hasCommonTailHeader: {
            type: Boolean,
            default: false
        },
        // 是否有公用首部表头
        hasCommonHeader: {
            type: Boolean,
            default: false
        },
        // 是否有审核拒绝原因
        hasUnpass: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        checkModule (newM) {
            this.isProName = ['prevention', 'nutrition/stage', 'welfare', 'nutrition/breed'].includes(newM)
        },

        getData (newV) {
            this.fetchData()
        }
    },

    mounted () {
        this.isProName = ['prevention', 'nutrition/stage', 'welfare', 'nutrition/breed'].includes(this.modpath)
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                this.isSpv = res.data.model.userRole === 20
            }
        }).then(this.fetchData)
    },

    data () {
        return {
            isSpv: false, // 是否监督员登录
            isProName: false,
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
            },

            eartag: null,
            gmtCreate: null
        }
    },

    methods: {
        // 导出表格数据为 xls 表单并自动下载
        export2xls () {
            if (!this.tableData.length) {
                this.$message.warning('表格数据为空')
            }

            let s2ab = s => {
                if (typeof ArrayBuffer !== 'undefined') {
                    var buf = new ArrayBuffer(s.length)
                    var view = new Uint8Array(buf)
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
                    return buf
                } else {
                    var buf = new Array(s.length)
                    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
                    return buf
                }
            }

            let eBody = this.tableData.slice(0)
            eBody.forEach(v => {
                Object.keys(v).forEach(vk => {
                    let inTable = false
                    // 有的表头含有 children ，要特殊处理
                    this.headers.forEach(vh => {
                        if (vh.children) {
                            inTable = vh.children.find(v => v.prop === vk)
                        }
                    })

                    if (!inTable) {
                        inTable = this.headers.find(v => v.prop === vk)
                    }
                    if (inTable && inTable.label) {
                        v[inTable.label] = v[vk]
                    }

                    // this.header 不含有一些公共表头如养殖场 factoryName 等，在这里手动加入
                    if (!['ispassCheck', 'factoryName', 'gmtCreate', 'remark', 'ispassSup', 'operatorName', 'professorName', 'upassReason', 'supervisorName'].includes(vk)) {
                        delete v[vk]
                    } else {
                        let map = {
                            ispassCheck: '审核状态',
                            factoryName: '养殖场',
                            gmtCreate: '提交时间',
                            remark: '备注',
                            ispassSup: '监督执行状态',
                            operatorName: '操作人员',
                            professorName: '技术审核',
                            upassReason: '审核拒绝原因',
                            supervisorName: '监督执行'
                        }
                        v[map[vk]] = v[vk]
                        delete v[vk]
                    }
                })
            })
            // console.log(eBody)
            const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
            const wopts = { bookType: 'biff8', bookSST: false, type: 'binary' }
            wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(eBody)

            let tmpa = document.createElement("a");
            let obj = new Blob([s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
            tmpa.download = '下载.xls'
            tmpa.href = URL.createObjectURL(obj) //绑定a标签
            tmpa.click() //模拟点击实现下载
            setTimeout(function () { //延时释放
                URL.revokeObjectURL(obj) //用URL.revokeObjectURL()来释放这个object URL
            }, 100)
        },

        async Spv (isPass, idx) {
            try {
                let result
                if (isPass === 0) {
                    result = await this.$prompt('请输入不通过原因', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /.+/,
                        inputErrorMessage: '原因不能为空'
                    })
                }
                let {id, ispassCheck, ispassSup} = this.tableData[idx]
                let superviseMap = {
                    welfare: patchWelfare,
                    prevention: patchPrevention,
                    'nutrition/breed': patchBreeding,
                    'nutrition/stage': patchStage,
                    'health/antiscolic': patchAntiscolic,
                    'health/disinfect': patchDisinfect,
                    'health/immune': patchImmune
                }
                let professorMap = {
                    welfare: patchProWelfare,
                    prevention: patchProPrevention,
                    'nutrition/breed': patchProBreeding,
                    'nutrition/stage': patchProStage,
                    'health/antiscolic': patchProAntiscolic,
                    'health/disinfect': patchProDisinfect,
                    'health/immune': patchProImmune
                }
                let unpassReason = result && result.value
                let data = {
                    unpassReason: unpassReason || '',
                    factoryNum: this.user.userFactory,
                    name: this.user.userRealname
                }

                // userRole 20羊场监督员
                if (this.user.userRole == 20) {
                    if (ispassSup === '执行') {
                        this.$message.warning('该条记录已检查')
                        return
                    }
                    data.supervisor = +this.$route.params.id

                    data.ispassSup = isPass
                    delete data.unpassReason
                    superviseMap[this.checkModule](id, data).then(res => {
                        if (isReqSuccessful(res)) {
                            this.$message.success('监督执行成功')
                            this.tableData[idx].ispassSup = isPass ? '已执行' : '未执行'
                            this.$set(this.tableData[idx], 'supervisor', this.user.userRealname)
                            this.$set(this.tableData[idx], 'supervisorName', this.user.userRealname)
                        }
                    }, _ => {
                        this.$message.error('监督执行失败')
                    })
                } else {
                    if (ispassCheck !== '未审核') {
                        this.$message.warning('该条记录已审核')
                        return
                    }
                    data.professor = +this.$route.params.id

                    data.ispassCheck = isPass
                    professorMap[this.checkModule](id, data).then(res => {
                        if (isReqSuccessful(res)) {
                            this.$message.success('审核成功')
                            this.tableData[idx].ispassCheck = isPass ? '已通过' : '未通过'
                            this.tableData[idx].professor = this.user.userRealname
                            this.tableData[idx].professorName = this.user.userRealname
                            if (isPass === 0) {
                                this.$set(this.tableData[idx], 'upassReason', unpassReason)
                            }
                        }
                    }, _ => {
                        this.$message.error('审核失败')
                    })
                }
            } catch(e) {
                e.message && console.log(e.message)
                return false
            }
        },

        viewPlan (index) {
            let id = this.tableData[index].id
            this.$router.push({name: this.modpath, query: {view: id}})
        },

        async fetchData () {
            let param = {
                page: this.page - 1,
                size: 10
            }
            if (this.isPass !== null) {
                param.ispassCheck = this.isPass
            }
            if (this.factoryName !== null) {
                param.factoryName = this.factoryName
            }
            if (this.gmtCreate !== null) {
                console.log(this.gmtCreate)
                param.startTime = this.gmtCreate[0]
                param.endTime = this.gmtCreate[1]
            }

            let pathid
            let { userFactory, userRealname, id, factoryName } = this.user
            // 代理 工厂 游客
            if (userFactory !== undefined) {
                pathid = userFactory
            } else if (id !== undefined) {
                pathid = id
            }

            this.load = true
            if (!this.releaseType) {
                this.getData(pathid, param).then(res => {
                    if (isReqSuccessful(res)) {
                        let data = res.data

                        // 是否配种产子页面
                        if (this.checkModule === 'nutrition/breed') {
                            data.List.forEach(v => {
                                v.upassReason = v.professorNotPassReason
                                delete v.professorNotPassReason
                            })
                        }

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
                        if (item && item.ispassSup !== null && item.ispassSup !== undefined) {
                            data.List.forEach(v => {
                                let map = ['未执行', '执行', '未检查']
                                v.ispassSup = map[v.ispassSup]
                            })
                        }
                        if (item && item.killWormDeratization !== undefined) {
                            data.List.forEach(v => {
                                let map = ['否', '是']
                                Object.keys(v).forEach(v2 => {
                                    if (v[v2] === 0 || v[v2] === 1) {
                                        v[v2] = map[v[v2]]
                                    }
                                })
                            })
                        }
                        if (item && item.materialA !== undefined) {
                            data.List.forEach(v => {
                                let map = [
                                    'materialA',
                                    'materialM',
                                    'materialO',
                                    'materialWM',
                                    'materialWO',
                                    'roughageP',
                                    'roughageD',
                                    'roughageO',
                                    'roughageWP',
                                    'roughageWD',
                                    'roughageWO',
                                    'pickingM',
                                    'pickingR',
                                    'pickingO'
                                ]
                                map.forEach(v2 => {
                                    if (v[v2] && v[v2].indexOf('[') !== -1) {
                                        v[v2] = JSON.parse(v[v2]).join(',')
                                    }
                                })
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
            } else {
                let res = await getReleaseByName(this.releaseType)
                this.tableData = res.data.List
                this.total = res.data.size
                this.load = false
            }
        },

        edit (index, isView) {
            let id = this.tableData[index].id
            let path
            let pathid = this.$route.params.id
            if (this.noPrac) {
                if (isView) {
                    path = `/admin/${pathid}/${this.modpath}?view=${id}`
                } else {
                    path = `/admin/${pathid}/${this.modpath}?edit=${id}`
                }
            } else if (!this.isCheck) {
                if (isView) {
                    path = `/admin/${pathid}/${this.modpath}/prac?view=${id}`
                } else {
                    path = `/admin/${pathid}/${this.modpath}/prac?edit=${id}`
                }
            } else {
                path = `/admin/${pathid}/${this.checkModule}/prac?check=${id}`
            }
            this.$router.push(path)
        },

        deleteItem (index) {
            let { id, ispassCheck } = this.tableData[index]
            if (ispassCheck && ispassCheck === '已通过') {
                this.$message.warning('该条记录已通过审核，无法删除')
                return
            }
            this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
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
    background-color color-main !important
</style>
