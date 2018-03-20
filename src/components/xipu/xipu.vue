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
                        v-model="queries.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <div class="quert-weight">
                        <span class="label-span">初登体重：</span>
                        <el-input size="small" v-model="queries.left_weight"></el-input> 公斤
                        <span>至</span>
                        <el-input size="small" v-model="queries.right_weight"></el-input> 公斤
                    </div>
                </div>
                <el-button class="query-btn" size="small" @click="launchQuery()">查询</el-button>
            </div>

            <div class="query-result" v-show="tableData.length">
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
                    :page-sizes="[10, 20, 30]"
                    layout="sizes, prev, pager, next, total, jumper"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/search'

export default {
    components: {
        Search
    },

    data () {
        return {
            bread: [
                {label: '首页', to: ''},
                {label: '云羊宝', to: 'index'},
                {label: '有机养殖生产管理追溯系统', to: ''},
                {label: '系谱档案', to: 'xipu'}
            ],
            select: {
                'sex': [
                    {label: '男', value: 0},
                    {label: '女', value: 1}
                ],
                'color': [
                    {label: '黑色', value: 0},
                    {label: '白色', value: 1},
                    {label: '灰色', value: 2}
                ]
            },
            query_labels: [
                {label: '原耳牌', model: 'erpai'},
                {label: '免疫耳牌', model: 'erpai_immune'},
                {label: '商标耳牌', model: 'erpai_brand'},
                {label: '种羊基地', model: 'base'},
                {label: '颜色', model: 'color'},
                {label: '性别', model: 'sex'},
                {label: '父号', model: 'father'},
                {label: '母号', model: 'mother'},
                {label: '父父号', model: 'fa_father'},
                {label: '父母号', model: 'fa_mother'},
                {label: '母父号', model: 'fa_mother'},
                {label: '母母号', model: 'mo_father'}
            ],
            query_res: [
                {label: '原耳牌', prop: 'erpai'},
                {label: '免疫耳牌', prop: 'erpai_immune'},
                {label: '颜色', prop: 'color'},
                {label: '商标耳牌', prop: 'erpai_brand'},
                {label: '种羊基地', prop: 'base'},
                {label: '初登时间', prop: 'erpai'}
            ],
            queries: {
                erpai: null,
                erpai_immune: null,
                erpai_brand: null,
                base: null,
                color: null,
                sex: null,
                father: null,
                mother: null,
                fa_father: null,
                fa_mother: null,
                mo_father: null,
                mo_mother: null,
                time: null
            },
            tableData: []
        }
    },

    methods: {
        launchQuery () {
            let query = {}
            Object.keys(this.queries).forEach(v => {
                if (this.queries[v] !== null) {
                    query[v] = this.queries[v]
                }
            })
            this.tableData.push(
                {id: 1, erpai: 12345, erpai_immune: 456465, erpai_brand: 879, color: '黑色'},
                {id: 2, erpai: 12345, erpai_immune: 456465, erpai_brand: 879, color: '黑色'}
            )
            console.log(query)
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/common'

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
                        width 182px
        .label-span
            display inline-block
            width 30%
            text-align right
            margin-right 3%
        .query-time
            text-align left
            padding-left 45px
            .label-span
                width 78px
                margin-right 10px
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
