<template>
    <div class="app-home">
        <admin-head></admin-head>
        <el-container class="container bg-blue">
            <el-aside :width="side_width" class="main-aside">
                <el-tree node-key="to" :default-expanded-keys="expanded_key" :data="treedata" :indent="30" accordion @node-click="clickTree"></el-tree>
            </el-aside>

            <el-container class="app-main">
                <el-main>
                    <span class="hide-span" @click="toggleAside"><i ref="hidespan" class="el-icon-arrow-left"></i></span>
                    <div class="admin-hl pos">
                        <b><i class="el-icon-arrow-down"></i>位置：</b>
                        <el-breadcrumb separator="-">
                            <el-breadcrumb-item :to="{name: item.to}" v-for="(item, i) in bread" :key="i">{{item.text}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <!-- <span class="fs"><i class="el-icon-menu"></i>全屏</span> -->
                    </div>

                    <div class="bg-blue pad">
                        <div class="admin-search">
                            <div class="options" v-if="!isProCheck">
                                <el-button class="admin-hl hl-btn" @click="changeActive(module)" type="primary">{{ module.label }}</el-button>
                                <el-button v-if="isProdModule()" class="admin-hl hl-btn" type="primary" @click="changeActive(module, 1)">{{ module.label }}列表</el-button>
                            </div>
                            <div class="options" v-else>
                                <el-button v-for="(item, i) in production" :key="i" class="admin-hl hl-btn" type="primary" @click="checkModule(item)">{{ item.label }}</el-button>
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
import { getUserById } from '@/util/getdata'
import { retrieveRank } from '@/util/store'
import { isReqSuccessful, getLocalUid } from '@/util/jskit'

/* eslint-disable object-property-newline */
export default {
    components: {
        AdminHead, AdminFoot
    },

    watch: {
        '$route' (newV, oldV) {
            // console.log(newV)
            if (newV.name !== 'review') {
                this.isProCheck = false
            } else {
                this.isProCheck = true
            }
        }
    },

    data () {
        return {
            module: {label: '', to: ''},
            side_width: '18%',
            expanded_key: null,
            showEditTable: false,
            treedata: [
                {label: '会员中心', children: [
                    {label: '个人信息修改', to: 'userinfo'},
                    {label: '密码修改', to: 'passmod'}
                ]},
                {label: '系统管理员平台', children: [
                    {label: '代理管理', to: 'agent'},
                    {label: '羊场管理', to: 'farm'},
                    {label: '用户管理', to: 'account'},
                    {label: '角色权限管理', to: 'authrole'},
                    {label: '发布系统', to: 'release'},
                    {label: '专家课堂视频发布', to: 'test5'},
                    {label: '短信平台', to: 'message'},
                    {label: '留言统计', to: 'test10'},
                    {label: '专家客户评价结果', to: 'test7'}
                ]},
                {label: '专家工作', children: [
                    {label: '客户评价', to: 'test3'},
                    {label: '专家在线课堂', to: 'onlineCourse'},
                    {label: '生产档案审核', to: 'review'},
                    {label: '在线诊断', to: 'prochat'}
                ]}
            ],
            productionTree: {
                label: '生产管理平台',
                children: [
                    {label: '专家课堂', to: 'course'},
                    {label: '系谱档案', to: 'genealogic'},
                    {label: '卫生·疫控', name: 'health', children: [
                        {label: '专家咨询', to: 'chat'},
                        {label: '卫生与动物福利管理方案', to: 'welfareplan'},
                        {label: '卫生与动物福利操作档案', to: 'welfareprac'},
                        // {label: '卫生消毒方案', to: 'disinfectplan'},
                        {label: '消毒实施档案', to: 'disinfectprac'},
                        {label: '免疫方案', to: 'immuneplan'},
                        {label: '免疫实施档案', to: 'immuneprac'},
                        {label: '驱虫方案', to: 'antiscolicplan'},
                        {label: '驱虫实施档案', to: 'antiscolicprac'}
                    ]},
                    {label: '营养·生产', name: 'nutrition', children: [
                        {label: '专家咨询', to: 'chat'},
                        {label: '阶段营养方案', to: 'stageplan'},
                        {label: '阶段营养实施档案', to: 'stageprac'},
                        {label: '配种产子管理方案', to: 'breedplan'},
                        {label: '配种产子实施档案', to: 'breedprac'}
                    ]},
                    {label: '疫病防治', to: 'prevention', children: [
                        {label: '专家咨询', to: 'chat'},
                        {label: '疫病防治方案', to: 'preventionplan'},
                        {label: '疫病防治实施档案', to: 'preventionprac'}
                    ]},
                    {label: '生产物资平台', to: 'app-delivery'},
                    {label: '可视系统', name: 'visual', children: [
                        {label: '诊断可视', to: 'diagnose'},
                        {label: '生产环节可视', to: 'production'}
                    ]},
                    {label: '有机养殖环境追溯', to: 'trace'},
                    {label: '有机·监管', name: 'supervise', children: [
                        {label: '国家认证', to: 'nation'},
                        {label: '企业监控认证', children: [
                            {label: '生产可视截图', to: 'capture'},
                            {label: '操作流程审核', to: 'audit'},
                            {label: '回收化验指标', to: 'recovery_index'}
                        ]}
                    ]}
                ]
            },
            options: [],
            search_key: null,
            showTree: true,
            bread: [
                {text: '溯源管理', to: 'auth'}
            ],
            isProCheck: false,
            // 7大生产环节
            production: [
                {label: '卫生与动物福利', mod: 'welfare'},
                {label: '消毒', mod: 'disinfect'},
                {label: '免疫', mod: 'immune'},
                {label: '驱虫', mod: 'antiscolic'},
                {label: '阶段营养', mod: 'stage'},
                {label: '配种产子', mod: 'breed'},
                {label: '疫病防治', mod: 'prevention'}
            ],
            // local map for content header tabs
            map: [
                {label: '个人信息修改', to: 'userinfo'},
                {label: '密码修改', to: 'passmod'},
                {label: '代理管理', to: 'agent'},
                {label: '羊场管理', to: 'farm'},
                {label: '用户管理', to: 'account'},
                {label: '角色权限管理', to: 'authrole'},
                {label: '发布系统', to: 'release'},
                {label: '专家课堂视频发布', to: 'test5'},
                {label: '短信平台', to: 'message'},
                {label: '留言统计', to: 'test10'},
                {label: '专家客户评价结果', to: 'test7'},
                {label: '客户评价', to: 'test3'},
                {label: '专家在线课堂', to: 'test8'},
                {label: '生产档案审核', to: 'review'},
                {label: '专家课堂', to: 'course'},
                {label: '系谱档案', to: 'genealogic'},
                {label: '专家咨询', to: 'chat'},
                {label: '卫生与动物福利管理方案', to: 'welfareplan'},
                {label: '卫生与动物福利操作档案', to: 'welfare'},
                // {label: '卫生消毒方案', to: 'disinfectplan'},
                {label: '消毒实施档案', to: 'disinfectprac'},
                {label: '免疫方案', to: 'immuneplan'},
                {label: '免疫实施档案', to: 'immuneprac'},
                {label: '驱虫方案', to: 'antiscolicplan'},
                {label: '驱虫实施档案', to: 'antiscolicprac'},
                {label: '阶段营养方案', to: 'stageplan'},
                {label: '阶段营养实施档案', to: 'stageprac'},
                {label: '配种产子管理方案', to: 'breedplan'},
                {label: '配种产子实施档案', to: 'breedprac'},
                {label: '疫病防治方案', to: 'preventionplan'},
                {label: '疫病防治实施档案', to: 'preventionprac'},
                {label: '诊断可视', to: 'diagnose'},
                {label: '生产环节可视', to: 'production'},
                {label: '有机养殖环境追溯', to: 'trace'},
                {label: '国家认证', to: 'nation'},
                {label: '生产可视截图', to: 'capture'},
                {label: '操作流程审核', to: 'audit'},
                {label: '回收化验指标', to: 'recovery_index'}
            ]
        }
    },

    created () {        
        // 工厂用户才可以录入信息
        if (this.$store.state.user.agentRank === -1 || retrieveRank() === -1) {
            this.treedata.push(this.productionTree)
        }
    },

    mounted () {
        getUserById(getLocalUid()).then(res => {
            if (isReqSuccessful(res)) {
                this.$store.commit('storeUserInfo', res.data.model)
                console.log(this.$store.state, this.$store.state.user)
            }
        }, _ => {
            this.$message.error('获取用户信息失败')
        })

        this.isProCheck = this.$route.name === 'review'

        // rid '/admin/'
        let path = this.$route.path.substr(7)
        let [parent, child, postfix] = path.split('/')

        let arr = [{text: '溯源管理'}]
        let mod
        let submod
        this.treedata.forEach(v => {
            let m = v.children.find(v => v.to === parent || v.name === parent)
            if (m) {
                mod = m
                if (mod.children) {
                    submod = mod.children.find(v => v.to === child + postfix || v.name === child + postfix || v.to === child + 'prac' || v.name === child + 'prac')
                }
            }
        })
        // if (!m) {
        //     m = this.treedata[3].children
        // }
        // console.log(mod, submod)
        if (mod && submod) {
            // open left tree
            if (postfix === 'list') {
                this.expanded_key = [child + 'prac']
            } else {
                this.expanded_key = [child]
            }
            // console.log(this.expanded_key)

            arr.push({text: mod.label}, {text: submod.label})
            this.module = submod
        } else if (mod) {
            this.expanded_key = [parent]

            // some module has no child
            arr.push({text: mod.label})
            this.module = mod
        } else {
            // default index of admin
            arr.push({text: '用户权限'})
            this.module = {label: '用户权限', to: 'auth'}
        }
        this.bread = arr
    },

    methods: {
        checkModule (item) {
            console.log(item)
        },

        isProdModule () {
            let name = this.$route.name
            return ['welfare', 'genealogic', 'farm', 'agent', 'release', 'diagnose'].includes(name) || name.endsWith('prac') || name.endsWith('list')
        },

        changeActive (item, isTo) {
            if (isTo) {
                // itemprac -> itemlist
                let idx = item.to.indexOf('prac')
                if (idx === -1) {
                    this.$router.push({name: item.to + 'list'})
                } else {
                    this.$router.push({name: item.to.substr(0, item.to.indexOf('prac')) + 'list'})
                }
            } else {
                this.$router.push({name: item.to})
            }
        },

        toggleAside () {
            if (this.side_width !== '0') {
                this.side_width = '0'
                this.$refs.hidespan.classList.remove('el-icon-arrow-left')
                this.$refs.hidespan.classList.add('el-icon-arrow-right')
            } else {
                this.side_width = '18%'
                this.$refs.hidespan.classList.remove('el-icon-arrow-right')
                this.$refs.hidespan.classList.add('el-icon-arrow-left')
            }
        },

        clickTree (node, data) {
            if (data.isLeaf) {
                if (node.to.startsWith('test')) {
                    return
                }
                if (node.to === 'app-delivery') {
                    window.open('http://www.nubiangoat.biz/')
                    return
                }
                // if chat open another page
                if (node.to === 'chat') {
                    window.open(window.location.origin + '/#/chat?from=' + window.encodeURIComponent(data.parent.label))
                    return
                }

                let arr = [{text: '溯源管理'}]
                let parent = data.parent
                if (Object.prototype.toString.call(parent.data) === '[object Object]') {
                    arr.push({text: parent.data.label})
                }
                arr.push({text: node.label, to: node.to})
                this.bread = arr

                this.module = {label: node.label, to: node.to}
                node.to && this.$router.push({name: node.to})
            }
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
    height calc(100% - 30px)
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
            float right
            width 300px
            .el-input-group__append
                background-color color-main
                color #fff

        .hl-btn
            padding 6px 20px
    .main-content
        min-height 400px
        margin-top 20px
        box-sizing border-box
        height calc(100% - 67px)
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
    padding-top 15px
    margin 0 20px 0 20px
    overflow hidden
    .options
        float left
        .el-button
            border-bottom-left-radius 0
            border-bottom-right-radius 0

        .active
            border 1px solid #fff
            border-bottom 0
            color #fff
            background-color color-main

</style>
