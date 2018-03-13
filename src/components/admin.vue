<template>
    <div>
        <el-container style="height: 500px; border: 1px solid #eee" class="container bg-blue">
            <el-aside width="200px" class="main-aside">
                <div><img src="../assets/imgs/logo.png" width="200px" height="100px"></div>
                <el-tree :data="treedata"></el-tree>
            </el-aside>

            <el-container>
                <el-header class="main-header">
                    <div class="header-title">
                        <p><span class="span-large">东骏</span>（有机）养殖生产管理追溯系统管理平台</p>
                        <span class="span-date">日期：{{ datestr }}</span>
                    </div>

                    <el-tabs v-model="activeTab" type="card" class="fl-l">
                        <el-tab-pane label="溯源管理" name="first">溯源管理</el-tab-pane>
                        <el-tab-pane label="进销存系统" name="second">进销存系统</el-tab-pane>
                        <el-tab-pane label="财务管理管理" name="third">财务管理管理</el-tab-pane>
                        <el-tab-pane label="退出" name="fourth">退出</el-tab-pane>
                    </el-tabs>
                    <div class="tab-right fl-l">
                        用户：{{user.name}}
                        部门：{{user.department}}
                        <i class="el-icon-refresh"></i>刷新
                        <i class="el-icon-printer"></i>通讯录
                        <i class="el-icon-message"></i>
                    </div>
                </el-header>

                <el-main>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            treedata: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [{label: '三级 1-1-1'}]
                        }
                    ]
                },
                {label: '二级 2-2', children: [{label: '三级 2-2-1'}]}
            ],

            datestr: '',

            user: {
                name: '二狗',
                department: 'UED'
            },

            activeTab: null
        }
    },

    mounted () {
        let formatDate = num => num < 10 ? ('0' + num) : ('' + num)

        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        let weekdayChinese = ['一', '二', '三', '四', '五', '六', '日']
        let weekday = weekdayChinese[date.getDay() - 1]
        month = formatDate(month)
        day = formatDate(day)
        this.datestr = `${year}-${month}-${day} 星期${weekday}`
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'

.fl-l
    float: left
.bg-blue
    background-color: color-main

.main-aside
    border-right: 5px solid #fff
    .el-tree-node__content
        background-color: color-main
        color: #fff
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover
        background-color: color-main
    div[role="group"]
        .el-tree-node__content,
        .el-tree-node:focus>.el-tree-node__content,
        .el-tree-node__content:hover
            background-color: #fff
            color: color-main
    .el-tree>div
        border-bottom: 1px solid #ddd

.main-header
    font-size: 14px
    color: #fff
    .header-title
        position: relative
        p
            font-size: 18px
            margin: 20px 0
        .span-large
            font-size: 24px
        .span-date
            position: absolute
            bottom: 0
            right: 20px
</style>
