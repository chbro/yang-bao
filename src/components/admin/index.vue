<template>
    <div class="app-home">
        <admin-head></admin-head>
        <el-container class="container bg-blue">
            <el-aside :width="side_width" class="main-aside">
                <div class="tree-switch" @click="toggleTree()">
                    <div>
                        <i class="el-icon-caret-right"></i>
                    </div>会员管理平台
                    <i class="el-icon-d-arrow-right" ref="switchIcon"></i>
                </div>
                <el-tree v-show="showTree" :data="treedata" :indent="40" accordion @node-click="clickTree"></el-tree>
            </el-aside>

            <el-container class="app-main">
                <el-main>
                    <span class="hide-span" @click="toggleAside"><i ref="hidespan" class="el-icon-arrow-left"></i></span>
                    <div class="admin-hl pos">
                        <b><i class="el-icon-arrow-down"></i>位置：</b>
                        <el-breadcrumb separator="-">
                             <el-breadcrumb-item v-for="(item, i) in bread" :key="i">{{item.text}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <span class="fs"><i class="el-icon-menu"></i>全屏</span>
                    </div>

                    <div class="bg-blue pad">
                        <div class="admin-search">
                            <div class="options">
                                <el-button @click="changeActive(item.to, i)" class="admin-hl hl-btn" :class="{'active': item.active}" type="primary" v-for="(item, i) in options" :key="i">{{ item.label }}</el-button>
                            </div>
                            <el-input class="search" placeholder="方案搜索" v-model="search_key" size="small">
                                <el-button slot="append" icon="el-icon-search">搜索</el-button>
                            </el-input>
                        </div>

                        <div class="main-content">
                            <router-view></router-view>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <admin-foot></admin-foot>
    </div>
</template>

<script>
import AdminHead from '@/components/common/admin_head'
import AdminFoot from '@/components/common/admin_foot'

export default {
    components: {
        AdminHead, AdminFoot
    },

    data () {
        return {
            /* eslint-disable object-property-newline */
            side_width: '15%',

            treedata: [
                {label: '权限管理', children: [
                    {label: '权限管理', to: 'auth'},
                    {label: '用户管理', to: 'authuser'},
                    {label: '角色管理', to: 'authrole'}
                ]},
                {label: '专家课堂', to: 'consult'},
                {label: '系谱档案', to: 'genealogic'},
                {label: '卫生·疫控', children: [
                    {label: '专家咨询', to: 'consult'},
                    {label: '卫生消毒方案', to: 'disinfectplan'},
                    {label: '卫生消毒实施档案', to: 'disinfectprac'},
                    {label: '免疫方案', to: 'immuneplan'},
                    {label: '免疫实施档案', to: 'immuneprac'},
                    {label: '驱虫方案', to: 'antiscolicplan'},
                    {label: '驱虫实施档案', to: 'antiscolicprac'}
                ]},
                {label: '营养·生产', children: [
                    {label: '专家咨询', to: 'consult'},
                    {label: '阶段营养方案', to: 'stageplan'},
                    {label: '阶段营养实施档案', to: 'stageprac'},
                    {label: '配种产子管理方案', to: 'breedplan'},
                    {label: '配种产子实施档案', to: 'breedprac'}
                ]},
                {label: '疫病防治', children: [
                    {label: '专家咨询', to: 'consult'},
                    {label: '疫病防治方案', to: 'preventionplan'},
                    {label: '疫病防治实施档案', to: 'preventionprac'}
                ]},
                {label: '生产物资平台', to: 'https://baidu.com', out: true},
                {label: '可视系统', children: [
                    {label: '诊断可视', to: 'diagnose'},
                    {label: '生产环节可视', to: 'production'}
                ]},
                {label: '有机养殖环境追溯', children: [
                    {label: '追溯图表', to: 'charts'}
                ]},
                {label: '有机·监管', children: [
                    {label: '国家认证', to: 'nation'},
                    {label: '企业监控认证', children: [
                        {label: '生产可视截图', to: 'capture'},
                        {label: '操作流程审核', to: 'audit'},
                        {label: '回收化验指标', to: 'recovery_index'}
                    ]}
                ]}
            ],
            options: [],
            search_key: null,
            showTree: true,
            bread: [
                {text: '溯源管理'}
            ]
        }
    },

    methods: {
        changeActive (name, index) {
            this.options.forEach(v => v.active && delete v.active)
            this.options[index].active = true
            this.$router.push({name})
        },

        toggleAside () {
            if (this.side_width !== '0') {
                this.side_width = '0'
                this.$refs.hidespan.classList.remove('el-icon-arrow-left')
                this.$refs.hidespan.classList.add('el-icon-arrow-right')
            } else {
                this.side_width = '15%'
                this.$refs.hidespan.classList.remove('el-icon-arrow-right')
                this.$refs.hidespan.classList.add('el-icon-arrow-left')
            }
        },

        toggleTree () {
            let classlist = this.$refs.switchIcon.classList
            if (classlist.contains('normal')) {
                classlist.remove('normal')
            } else {
                classlist.add('normal')
            }
            this.showTree = !this.showTree
        },

        clickTree (node, data) {
            if (data.isLeaf) {
                let arr = [{text: '溯源管理'}]
                let parent = data.parent
                if (Object.prototype.toString.call(parent.data) === '[object Object]') {
                    arr.push({text: parent.data.label})
                }
                arr.push({text: node.label})
                this.bread = arr

                this.options = data.parent.data.children
                this.options && this.options.forEach(v => {
                    if (v.label === node.label) {
                        v.active = true
                    } else if (v.active) {
                        delete v.active
                    }
                })
                node.to && this.$router.push({name: node.to})
            }
        }
    },

    mounted () {
        let map = {
            expert: '专家课堂',
            genealogic: '系谱档案',
            health: {text: '卫生·疫控', children: {
                consult: '专家咨询',
                disinfectplan: '卫生消毒方案',
                disinfectprac: '卫生消毒实施档案',
                immuneplan: '免疫方案',
                immuneprac: '免疫实施档案',
                antiscolicplan: '驱虫方案',
                antiscolicprac: '驱虫实施档案'
            }},
            nutrition: {text: '营养·生产', children: {
                consult: '专家咨询',
                stageplan: '阶段营养方案',
                stageprac: '阶段营养实施档案',
                breedplan: '配种产子管理方案',
                breedprac: '配种产子实施档案'
            }},
            auth: '权限管理',
            visual: '可视系统',
            trace: {text: '有机养殖环境追溯', children: {
                charts: '追溯图表'
            }}
        }

        let path = this.$route.path.substr(7)
        let [parent, child] = path.split('/')
        let arr = [{text: '溯源管理'}]

        if (parent && child) {
            let children = map[parent].children
            arr.push({text: map[parent].text})
            child && arr.push({text: children[child]})
            this.bread = arr
            Object.keys(children).forEach(v => {
                let obj = {label: children[v], to: v}
                if (v === child) {
                    obj.active = true
                }
                this.options.push(obj)
            })
        } else if (parent) {
            this.bread = [{text: '溯源管理'}, {text: map[parent]}]
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/admin-form'
@import '~@/assets/css/admin-table'

.fl-l
    float left
.pad
    padding-left 8px
.bg-blue
    background-color color-main

.app-home
    min-width 1200px
    background-color color-main

.main-aside
    min-height 500px
    padding-left 5px
    transition width .3s
    .el-tree
        padding-left 5px
        background-color color-main
        >div
            border-bottom 1px solid #ddd
            >.el-tree-node__content
                padding-left 20px !important

    .el-tree-node__content
        color #fff
        height 40px
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover
        background-color color-main
    div[role="group"]
        .el-tree-node__content,
        .el-tree-node:focus>.el-tree-node__content
            background-color #fff
            color color-main
        .el-tree-node__content:hover
            background-color #ddd
        .el-tree-node__content
            &::before
                content '·'
                font-size 30px
                margin-right 5px
    .el-tree-node__expand-icon
        display none

    .tree-switch
        border-top 1px solid #bbb
        border-bottom 1px solid #bbb
        line-height 30px
        cursor pointer
        color #fff
        >div
            display inline-block
            margin-right 10px
            border-radius 50%
            background-color #fff
            color color-main
            line-height 1
        .el-icon-d-arrow-right
            float right
            margin-right 15px
            margin-top 8px
            transform rotate(90deg)
            transition transform .3s
            &.normal
                transform rotate(0)

.app-main
    div.el-input-group__prepend
        box-sizing border-box
        padding-right 0
        width 140px
        color #fff
        background-color color-main
    .el-input
        input,
        .el-input-group__prepend
            border-radius 0
            border 1px solid color-main
            &:hover,
            &:focus
                outline 0 none
    .el-main
        position relative
        padding 0
        padding-left 10px
        background-color #fff
        .hide-span
            position absolute
            left 0
            top 50%
            width 14px
            height h=50px
            line-height h
            background-color color-main
            color #fff
            border-left 1px solid #fff
            border-radius 4px
            cursor pointer
            i
                font-size 12px
        .pos
            height h=30px
            line-height h
            padding-left 0
            .fs
                position absolute
                right 310px
        .search
            width 300px
            .el-input-group__append
                background-color color-main
                color #fff

        .hl-btn
            padding 6px 20px
    .main-content
        min-height 400px
        margin-top 20px
        padding 10px
        background-color #fff
        color color-main

// 当前位置和搜索
.admin-hl
    background-color #fff
    color color-main
    padding 0 20px
    i
        font-weight bolder
        margin-right 5px
    .el-breadcrumb
        display inline-block
        .el-breadcrumb__inner
            color color-main
.admin-search
    padding-top 5px
    margin 5px 20px
    .options
        margin-bottom 5px
        .el-button
            border-bottom-left-radius 0
            border-bottom-right-radius 0

        .active
            border 1px solid #fff
            border-bottom 0
            color #fff
            background-color color-main

</style>
