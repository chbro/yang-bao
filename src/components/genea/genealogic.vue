<template>
    <div>
        <search></search>

        <div class="xipu-container">
            <div class="bread-wrapper">
                <el-breadcrumb separator="-">
                    <el-breadcrumb-item v-for="(item, i) in bread" :key="i" to="item.to">{{ item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <h2>系谱档案</h2>
            <div class="query-form">
                <div class="label-group">
                    <label v-for="(query, i) in query_labels" :key="i">
                        <span class="label-span">{{ query.label }}：</span>
                        <el-input v-if="query.model !== 'color' && query.model !== 'sex'" v-model="queries[query.model]" size="small"></el-input>
                        <el-select v-else v-model="queries[query.model]" size="small">
                            <el-option
                                v-for="(item, i) in select[query.model]"
                                :key="i"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </label>
                </div>
                <div class="query-time">
                    <span class="label-span">初登时间：</span>
                    <el-date-picker
                        size="small"
                        v-model="queries.birthTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <div class="quert-weight">
                        <span class="label-span">初登体重：</span>
                        <el-input size="small" v-model="queries.birthWeightStart"></el-input> 公斤
                        <span>至</span>
                        <el-input size="small" v-model="queries.birthWeightEnd"></el-input> 公斤
                    </div>
                </div>
                <el-button class="query-btn" size="small" @click="launchQuery()">查询</el-button>
            </div>

            <div class="query-result" v-if="tableData.length" v-loading="loading">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column v-for="(column, i) in query_res" :key="i" :label="column.label" :prop="column.prop"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <router-link :to="'/xipu_detail/' + tableData[scope.$index].id">查看</router-link>
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
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/search'
import { queryGenea } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        Search
    },

    data () {
        return {
            loading: false,
            bread: [
                {label: '首页', to: ''},
                {label: '云羊宝', to: 'index'},
                {label: '有机养殖生产管理追溯系统', to: ''},
                {label: '系谱档案', to: 'xipu'}
            ],
            select: {
                'sex': [
                    {label: '请选择'},
                    {label: '公', value: 0},
                    {label: '母', value: 1}
                ],
                'color': [
                    {label: '请选择'},
                    {label: '棕色', value: '棕色'},
                    {label: '暗红', value: '暗红'},
                    {label: '杂色', value: '杂色'}
                ]
            },
            query_labels: [
                {label: '原耳牌', model: 'nativeEartag'},
                {label: '免疫耳牌', model: 'immuneEartag'},
                {label: '商标耳牌', model: 'tradeMarkEartag'},
                {label: '种羊基地', model: 'breedingSheepBase'},
                {label: '颜色', model: 'color'},
                {label: '性别', model: 'sex'},
                {label: '父号', model: 'earTagOfFather'},
                {label: '母号', model: 'earTagOfMother'},
                {label: '父父号', model: 'earTagOfFathersFather'},
                {label: '父母号', model: 'earTagOfFathersMother'},
                {label: '母父号', model: 'earTagOfMothersFather'},
                {label: '母母号', model: 'earTagOfMothersMother'}
            ],
            query_res: [
                {label: '原耳牌', prop: 'selfEartag'},
                {label: '免疫耳牌', prop: 'immuneEartag'},
                {label: '颜色', prop: 'color'},
                {label: '商标耳牌', prop: 'tradeMarkEartag'},
                {label: '种羊基地', prop: 'breedingSheepBase'},
                {label: '初登时间', prop: 'gmtCreate'}
            ],
            queries: {
                nativeEartag: null,
                immuneEartag: null,
                tradeMarkEartag: null,
                breedingSheepBase: null,
                color: null,
                sex: null,
                earTagOfFather: null,
                earTagOfMother: null,
                earTagOfFathersFather: null,
                earTagOfFathersMother: null,
                earTagOfMothersFather: null,
                earTagOfMothersMother: null,
                birthTime: null,
                birthWeightStart: null,
                birthWeightEnd: null,
                remark: null,
                gmtCreate: null,
                gmtModified: null
            },
            tableData: [],

            total: 0,
            page: 1
        }
    },

    methods: {
        getQuery () {
            let query = {}
            Object.keys(this.queries).forEach(v => {
                let val = this.queries[v]
                if (val !== null && val !== undefined && val !== '') {
                    query[v] = val
                }
            })

            let birth = query.birthTime
            if (Array.isArray(birth)) {
                query.birthTimeStart = birth[0]
                query.birthTimeEnd = birth[1]
            }
            delete query.birthTime
            return query
        },

        launchQuery (currentPage, pageSize) {
            let query = this.getQuery()
            if (!Object.keys(query).length) {
                this.$message.warning('请输入查询条件')
                return
            }
            if (this.tableData.length) {
                this.loading = true
            }
            query.page = currentPage || this.page
            query.size = pageSize || this.size
            query.page--
            queryGenea(query).then(res => {
                if (isReqSuccessful(res)) {
                    this.total = res.data.size
                    this.tableData = res.data.List
                }
                this.loading = false
            }, _ => {
                this.$message.error('查询失败')
                this.loading = false
            })
            console.log(query)
        },

        handleCurrentChange (currentPage) {
            this.launchQuery(currentPage)
        },

        handleSizeChange (pageSize) {
            this.launchQuery(null, pageSize)
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/genea-common'

.xipu-container
    .query-form
        color #fff
        background-color color-main
        padding-top 30px
        margin-bottom 40px
        .label-group
            display flex
            flex-wrap wrap
            justify-content space-around
            >label
                font-size 12px
                font-weight 500
                width 26%
                margin-bottom 15px
                .el-input,
                .el-select
                    display inline-block
                    width 65%
                    input
                        border-radius 0
                        outline 0 none
                .el-select
                    .el-input
                        width 100%
        .label-span
            display inline-block
            width 30%
            text-align right
            margin-right 3%
        .query-time
            text-align left
            padding-left 45px
            .label-span
                width 85px
                margin-right 0
            .el-date-editor
                border-radius 0
        .query-btn
            color color-main
            margin 40px 0 20px
            padding .4em 4em
            font-size 18px
            letter-spacing 10px

    .quert-weight
        display inline-block
        margin-left 20px
        .el-input
            width 100px
            input
                border-radius 0
                width w=100px !important
                min-width w !important
            &+span
                display inline-block
                margin 0 10px

    .query-result
        margin-top 40px
        padding 10px
        border 1px solid #ddd
        .number
            &.active
                background-color color-main
                color #fff
        .el-pagination
            margin 30px 0
            text-align right

        .has-gutter
            tr, th
                color #fff
                background-color color-main

        .el-table
            .el-table__row
                div
                    text-align left
                td
                    background-color color-lightblue
                    color color-main
</style>
