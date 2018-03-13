<template>
    <div>
        <search/>

        <div class="xipu-contaner">
            <div class="bread-wrapper">
                <el-breadcrumb separator="-">
                    <el-breadcrumb-item to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">云羊宝</el-breadcrumb-item>
                    <el-breadcrumb-item>有机养殖生产管理追溯系统</el-breadcrumb-item>
                    <el-breadcrumb-item>系谱档案</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <h2>系谱档案</h2>
            <div class="query-form" ref="query-form">
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

            <div class="query-result">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column v-for="(column, i) in query_labels" :key="i" :label="column.label"></el-table-column>
                    <el-table-column label="初登时间"></el-table-column>
                    <el-table-column label="初登体重"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
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
            select: {
                'sex': [
                    {label: '男', value: 0},
                    {label: '女', value: 1}
                ],
                'color': [
                    {label: '黑', value: 0},
                    {label: '白', value: 1},
                    {label: '灰', value: 2}
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
            console.log(query)
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'

.xipu-contaner
    width 80%
    margin 0 auto
    color color-main
    text-align center

    .bread-wrapper
        border 1px solid color-main
        height 45px
        position relative
        margin-top 15px
        .el-breadcrumb
            position absolute
            top 0
            bottom 0
            line-height 45px
            padding-left 20px
            span[role="link"]
                color color-main

    >h2
        font-size 24px
    .query-form
        color #fff
        background-color color-main
        padding-top 30px
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
            width 150px
            input
                border-radius 0
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

        .has-gutter
            background-color color-main
</style>
