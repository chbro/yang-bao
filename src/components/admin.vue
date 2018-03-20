<template>
    <div>
        <el-container style="border: 1px solid #eee" class="container bg-blue">
            <el-aside width="200px" class="main-aside">
                <div><img src="../assets/imgs/index/LOGO.png" width="120px"></div>
                <el-tree :data="treedata" accordion></el-tree>
            </el-aside>

            <el-container class="app-main">
                <el-header class="main-header">
                    <div class="header-title">
                        <p><span class="span-large">东骏</span>（有机）养殖生产管理追溯系统管理平台</p>
                        <span class="span-date">日期：{{ datestr }}</span>
                    </div>

                    <div class="admin-tabs">
                        <el-button type="primary">溯源管理</el-button>
                        <el-button type="primary">进销存系统</el-button>
                        <el-button type="primary">财务管理管理</el-button>
                        <el-button type="primary">退出</el-button>
                    </div>
                    <div class="tab-right">
                        <span>用户：{{user.name}}</span>
                        <span>部门：{{user.department}}</span>
                        <span><i class="el-icon-refresh"></i>刷新</span>
                        <span><i class="el-icon-printer"></i>通讯录</span>
                        <span><i class="el-icon-message"></i>（{{ msg_cnt }}）</span>
                    </div>
                </el-header>

                <el-main>
                    <div class="admin-hl pos">
                        <b><i class="el-icon-caret-right"></i>位置：</b>溯源管理
                        <span class="fs"><i class="el-icon-menu"></i>全屏</span>
                    </div>
                    <div class="admin-search">
                        <div class="options">
                            <el-button class="admin-hl hl-btn" type="primary" v-for="(item, i) in options" :key="i">{{ item }}</el-button>
                        </div>
                        <el-input class="search" placeholder="方案搜索" v-model="search_key" size="small">
                            <el-button slot="append" icon="el-icon-search">搜索</el-button>
                        </el-input>
                    </div>

                    <div class="main-content">
                        <p class="card-title">有机养殖环境追溯</p>

                        <div class="border-main">
                            <div class="summary">
                                <el-input size="small" v-for="(item, i) in summary" :key="i" v-model="summaryModel[item.model]">
                                    <template slot="prepend">{{ item.label }}</template>
                                </el-input>
                            </div>

                            <div class="card">
                                <p class="card-title">粗饲料配方</p>
                                <div class="border-main">
                                    <div class="card-item">
                                        <el-input size="small">
                                            <template slot="prepend">青料:</template>
                                        </el-input> , 用量
                                        <el-input class="input-days" size="small"></el-input>%/天。
                                        <span><i class="el-icon-caret-right"></i>增加青料设置</span>
                                    </div>
                                    <div class="card-item">
                                        <el-input size="small">
                                            <template slot="prepend">干料:</template>
                                        </el-input> , 用量
                                        <el-input class="input-days" size="small"></el-input>%/天。
                                        <span><i class="el-icon-caret-right"></i>增加干料设置</span>
                                    </div>
                                    <div class="card-item">
                                        <el-input size="small">
                                            <template slot="prepend">其他:</template>
                                        </el-input> , 用量
                                        <el-input class="input-days" size="small"></el-input>%/天。
                                        <span><i class="el-icon-caret-right"></i>增加“其他”设置</span>
                                    </div>
                                </div>
                            </div>

                            <div class="admin-submit">
                                <el-input v-model="submit.operator" size="small">
                                    <template slot="prepend">操作员:</template>
                                </el-input>
                                <el-input v-model="submit.reviewer" size="small">
                                    <template slot="prepend">技术审核:</template>
                                </el-input>
                                <el-input v-model="submit.executor" size="small">
                                    <template slot="prepend">监督执行:</template>
                                </el-input>
                            </div>
                            <div class="admin-send">
                                <el-button type="primary">取消</el-button>
                                <el-button type="primary">提交/更新</el-button>
                            </div>
                        </div>
                    </div>
                </el-main>

            </el-container>
        </el-container>

        <section class="sponsors-section" style="background-color: #2891d1">
            <div class="container"></div>
        </section>
    </div>
</template>

<script>
export default {
    data () {
        return {
            treedata: [
                {label: '可视系统', children: [{label: '1-1'}]},
                {label: '有机养殖环境追溯', children: [{label: '2-1'}]}
            ],

            datestr: '',

            user: {
                name: '二狗',
                department: 'UED'
            },

            msg_cnt: 10,
            options: [1, 2],
            search_key: null,
            submit: {
                operator: null,
                reviewer: null,
                executor: null
            },
            summary: [
                {label: '栋号:', model: 'house_id'},
                {label: '使用日期:', model: 'date'},
                {label: '羊数:', model: 'num'},
                {label: '阶段:', model: 'stage'},
                {label: '饮水:', model: 'water'}
            ],
            summaryModel: {
                house_id: null,
                date: null,
                num: null,
                stage: null,
                water: null
            }
        }
    },

    mounted () {
        let formatDate = num => num < 10 ? ('0' + num) : ('' + num)

        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        let weekdayChinese = ['日', '一', '二', '三', '四', '五', '六']
        let weekday = weekdayChinese[date.getDay()]
        month = formatDate(month)
        day = formatDate(day)
        this.datestr = `${year}-${month}-${day} 星期${weekday}`
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'

.fl-l
    float left
.bg-blue
    background-color color-main
.border-main
    border 1px solid color-main
    border-top 0
    padding 10px

.main-aside
    border-right 5px solid #fff
    text-align center
    .el-tree-node__content
        background-color color-main
        color #fff
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover
        background-color color-main
    div[role="group"]
        .el-tree-node__content,
        .el-tree-node:focus>.el-tree-node__content,
        .el-tree-node__content:hover
            background-color #fff
            color color-main
    .el-tree>div
        border-bottom 1px solid #ddd

.main-header
    height auto !important
    font-size 14px
    color #fff
    .header-title
        position relative
        p
            font-size 18px
            margin 20px 0 0
        .span-large
            font-size 24px
        .span-date
            position absolute
            bottom 0
            right 20px

.app-main
    div.el-input-group__prepend
        width 100px
        background-color color-main
        color #fff
    .el-input
        input,
        .el-input-group__prepend
            border-radius 0
            border 1px solid color-main
            &:hover,
            &:focus
                outline 0 none
                border-color color-main
    .el-main
        padding 0 20px
        .pos
            height h=30px
            line-height h
            padding-left 10px
            .fs
                float right
                margin-right 10px
        .search
            width 300px
            .el-input-group__append
                background-color color-main
                color #fff

        .hl-btn
            padding 6px 20px
    .main-content
        margin-top 20px
        padding 10px
        background-color #fff
        color color-main
        .card-title
            margin 0
            padding 10px 0
            text-align center
            font-size 15px
            background-color color-main
            color #fff

// 右侧头部选项卡
.admin-tabs,
.tab-right
    display inline-block
.admin-tabs
    vertical-align middle
    margin 10px 10px 0 0
    .el-button--primary
        padding 8px 20px
        margin-bottom 10px
        margin-left 0
        background-color #fff
        color color-main
        &:active
            background-color color-main
            color #fff
.tab-right
    span
        margin-right 15px
        i
            margin-right 5px

// 当前位置和搜索
.admin-hl
    color color-main
    background-color #fff
    padding 0 20px
.admin-search
    margin 5px 20px
    .options
        margin-bottom 5px
// 头部填写的信息
.summary
    .el-input
        width calc((100% - 40px) / 3)
        margin-right 20px
        margin-top 10px
        &:nth-child(3n)
            margin-right 0
// 具体信息
.card
    margin-top 20px
    .card-item
        display inline-block
        vertical-align middle
        width 49%
        .el-input--small
            width 60%
            input
                width 150px
            &.input-days
                width 30px
                margin-right 5px
                input
                    width 30px
                    padding 0 2px
        >span
            display block
            margin 10px 0

// 提交
.admin-submit
    margin-top 15px
    font-size 0
    .el-input
        width calc((100% - 40px) / 3)
        min-width 200px
        margin-right 20px
        &:last-child
            margin-right 0
.admin-send
    margin-top 10px
    text-align center
    .el-button
        padding 5px 20px
        border-radius 0
</style>
