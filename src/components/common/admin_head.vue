<template>
    <div class="admin-head">
        <div class="logo">
            <router-link to="/"><img src="~@/assets/imgs/index/logo-header.png"></router-link>
        </div>

        <div class="con">
            <div class="header">
                <p><span>东骏</span>（有机）养殖生产管理追溯系统管理平台</p>
                <span>日期：{{ datestr }}</span>
            </div>

            <div class="admin-tabs">
                <el-button>溯源管理</el-button>
                <el-button>进销存</el-button>
                <el-button>财务管理</el-button>
                <el-button @click="logout()">退出</el-button>
            </div>

            <div class="tab-right">
                <div class="u-info">
                    <span>用户：{{username}}</span>
                    <span>部门：{{department}}</span>
                    <span>姓名：{{name}}</span>
                    <span>角色：{{rolename}}</span>
                </div>
                <!-- <span @click="refresh()"><i class="el-icon-refresh"></i>刷新</span> -->
                <!-- <span><i class="iconfont icon-user yellow"></i>通讯录</span> -->
                <!-- <span @click="logout()"><i class="iconfont icon-icon_users"></i>注销</span> -->
            </div>
        </div>
    </div>
</template>

<script>
import { getUserById, LogOut } from '@/util/getdata'
import { jumpToLogin, isReqSuccessful } from '@/util/jskit'

export default {
    props: {
        username: {
            type: String
        },
        department: {
            type: String
        },
        name: {
            type: String
        },
        rolename: {
            type: String
        }
    },

    data () {
        return {
            datestr: ''
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
    },

    methods: {
        refresh () {
            window.location.reload()
        },

        logout () {
            this.$confirm('确定要注销吗?', '提示', {
                type: 'warning'
            }).then(() => {
                LogOut(this.$route.params.id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('注销成功')
                        // setTimeout(_ => {
                        jumpToLogin(this.$router)
                        // }, 600)
                    }
                })
            }).catch(() => {
                return false
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color'

.admin-head
    overflow hidden
    color #fff
.logo
    width 18%
    min-width 100px
    text-align center
    float left
    img
        height 100px
.header
    p
        display inline-block
        margin 20px 0 0
        font-size 22px
        span
            font-size 28px
    >span
        margin-left 310px

// 右侧头部选项卡
.admin-tabs,
.tab-right
    display inline-block
    span
        cursor pointer
.admin-tabs
    vertical-align middle
    margin 10px 10px 0 0
    button
        padding 8px 20px
        margin-bottom 10px
        margin-left 0
        background-color #fff
        color color-main
        border-bottom-left-radius 0
        border-bottom-right-radius 0
        &:active
            background-color color-main
            color #fff
        &:first-child
            background-color color-main
            color #fff
            border-color #fff
            border-bottom 0
.tab-right
    span
        margin-right 15px
        i
            margin-right 5px
            font-weight bold
            &.yellow
                color #bdbd34
    .u-info
        display inline-block
        max-width 650px
</style>
