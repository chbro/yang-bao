<template>
    <div class="app-header">
        <section class="top-bar container">
            <div>
                <p><span>“云羊宝”-中国努比亚有机山羊品牌官方网</span>&nbsp;&nbsp;&nbsp;&nbsp;http://www.nubiangoat.cn</p>
            </div>
            <ul class="social-icons">
                <el-popover
                    ref="popover"
                    placement="bottom-end"
                    width="200"
                    trigger="hover">
                    <img src="../../assets/imgs/weixin.png" width="200px">
                </el-popover>
                <li><i class="iconfont icon-laptop"></i>PC端</li>
                <li><i class="iconfont icon-phone"></i>移动端</li>
                <li v-popover:popover><i class="iconfont icon-wechat"></i>公众号</li>
                <li><i class="iconfont icon-h5"></i>小程序</li>
                <li><i class="iconfont icon-wbcloudy"></i>云羊宝</li>
            </ul>
        </section>

        <header class="contact-info container">
            <div class="logo">
                <router-link to="/">
                    <img src="../../assets/imgs/header-logo.png" alt="“云羊宝”-中国努比亚有机山羊品牌官方网"/>
                </router-link>
            </div>
            <div class="header-right-info">
                <div class="info-item">
                    <div class="icon-box">
                        <i class="iconfont icon-email"></i>
                    </div>
                    <div class="content">
                        <h3>EMAIL</h3>
                        <p>382102369@qq.com</p>
                    </div>
                </div>
                <div class="info-item">
                    <div class="icon-box">
                        <i class="iconfont icon-call"></i>
                    </div>
                    <div class="content">
                        <h3>CALL NOW</h3>
                        <p><b>(0856)-6995166</b></p>
                    </div>
                </div>
                <div class="info-item">
                    <button @click="toBottom()">留言/Contact Us</button>
                </div>
            </div>
        </header>

        <nav class="header-menu container" ref="indexNav">
            <div class="navigation">
                <ul class="nav-tabs">
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="/company">集团</router-link></li>
                    <li><router-link to="/product">产品</router-link></li>
                    <li><router-link to="/organic">有机</router-link></li>
                    <li><router-link to="/benefit">效益</router-link></li>
                    <li><router-link to="/league">加盟</router-link></li>
                    <li><router-link to="/news">新闻</router-link></li>
                    <li><router-link to="/contact">联系我们</router-link></li>
                </ul>
                <div class="login-entry">
                    <template v-if="!hasLoggedIn">
                        <router-link to="/login">登录</router-link>/<router-link to="/register">注册</router-link>
                    </template>
                    <router-link v-else :to="{name: 'userinfo', params: {id: uid}}">个人中心</router-link>
                </div>
                <div class="nav-search">
                    <input placeholder="搜索-Search...">
                    <button type="submit"><i class="el-icon-search"></i></button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { tokenStr } from '@/util/fetch'

export default {
    data () {
        return {
            uid: null,
            hasLoggedIn: false
        }
    },

    created () {
        this.hasLoggedIn = window.localStorage.getItem(tokenStr)
        if (this.hasLoggedIn) {
            this.uid = this.hasLoggedIn.substr(0, this.hasLoggedIn.indexOf(':'))
        }
    },

    mounted () {
        let nav = this.$refs.indexNav
        let ticking = false

        let toggleNavClass = () => {
            let st = document.documentElement.scrollTop || document.body.scrollTop

            if (st > 180) {
                if (!nav.classList.contains('fadeInDown')) {
                    nav.classList.add('fadeInDown')
                }
            } else {
                if (nav.classList.contains('fadeInDown')) {
                    nav.classList.remove('fadeInDown')
                }
            }
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    toggleNavClass()
                    ticking = false
                })
                ticking = true
            }
        }, {passive: false})
    },

    methods: {
        toBottom () {
            document.body.scrollTop = document.body.scrollHeight
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.app-header
    .container
        padding 0 5%
    .top-bar
        overflow hidden
        border-bottom 1px solid #eaeaea
        >div
            float left
            color #b6b6b6
            span
                color #000
        .social-icons
            float right
            line-height 53px
            li
                float right
                cursor pointer
                border-right 1px solid #eaeaea
                padding 0 16px
                transition background-color .3s ease
                &:last-child
                    border-left 1px solid #eaeaea
                &:hover
                    background-color color-green
                    color #fff
                    i
                        color #fff
                i
                    color #a4a4a4
                    margin-right 5px
                    font-size 20px
.contact-info
    overflow hidden
    margin 30px auto
    .logo
        float left
    .header-right-info
        float right
        .info-item
            display inline-block
            vertical-align middle
            margin-right 10px
            .icon-box
                display inline-block
                vertical-align bottom
                margin-right 10px
                padding 20px
                border-radius 50%
                border 1px solid #ddd
                i
                    font-size 30px
                    color color-green
            button
                outline 0
                cursor pointer
                background: #6aaf08;
                border-radius: 30px;
                display: inline-block;
                color: #fff;
                font-size: 12px;
                font-family: 'Raleway', sans-serif;
                text-transform: uppercase;
                font-weight: bold;
                padding: 12px 35px;
                border: 2px solid transparent;
                transition: all .3s ease;
                &:hover
                    background-color #fff
                    color color-green
                    border-color color-green
        .content
            display inline-block
            font-size 13px

.header-menu
    background-color color-main
    border-bottom 4px solid color-green
    .navigation
        overflow hidden
        .nav-tabs
            float left
            li
                float left
                line-height 66px
                a
                    color #fff
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    transition: color .3s ease;
                    margin 0 20px
                    &:hover
                        color color-green
        .nav-search
            float right
            input, button
                background-color: transparent;
                border: none;
                outline: none;
                font-size: 15px;
                color: #dad9d9;
                line-height: 65px;
            input
                width: 80%;
            button
                width 15%
    &.fadeInDown
        box-sizing border-box
        position fixed
        top 0
        z-index 9
        width 100%
        padding 0 5%

    .login-entry
        float right
        line-height 66px
        color #fff
        a
            color #fff
            &:hover
                text-decoration underline
            &:first-of-type
                margin-right 3px
            &:last-of-type
                margin-left 3px
</style>
