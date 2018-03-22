<template>
    <div class="app-header">
        <section class="top-bar container">
            <div>
                <p><span>“云羊宝”-中国努比亚有机山羊品牌官方网</span>&nbsp;&nbsp;&nbsp;&nbsp;http://www.nubiangoat.cn</p>
            </div>
            <ul class="social-icons">
                <li><i class="iconfont icon-laptop"></i>PC端</li>
                <li><i class="iconfont icon-phone"></i>移动端</li>
                <li><i class="iconfont icon-wechat"></i>公众号</li>
                <li><i class="iconfont icon-h5"></i>小程序</li>
                <li><i class="iconfont icon-wbcloudy"></i>云羊宝</li>
            </ul>
        </section>

        <header class="header">
            <div class="container">
                <div class="logo pull-left">
                    <router-link to="/">
                        <img src="../../assets/imgs/logo.png" alt="“云羊宝”-中国努比亚有机山羊品牌官方网"/>
                    </router-link>
                </div>
                <div class="header-right-info pull-right clearfix">
                    <div class="single-header-info">
                        <div class="icon-box">
                            <div class="inner-box">
                                <i class="flaticon-interface"></i>
                            </div>
                        </div>
                        <div class="content">
                            <h3>EMAIL</h3>
                            <p>382102369@qq.com</p>
                        </div>
                    </div>
                    <div class="single-header-info">
                        <div class="icon-box">
                            <div class="inner-box">
                                <i class="flaticon-phone-call"></i>
                            </div>
                        </div>
                        <div class="content">
                            <h3>Call Now</h3>
                            <p><b>(0856)-6995166</b></p>
                        </div>
                    </div>
                    <div class="single-header-info">
                        <a href="#" class="thm-btn">留言/Contact Us</a>
                    </div>
                </div>
            </div>
        </header>
        <nav class="mainmenu-area stricky" ref="indexNav">
            <div class="container">
                <div class="navigation pull-left">
                    <div class="nav-header">
                        <ul>
                            <li><a href="index.html">首页</a></li>
                            <li><a href="about.html">集团</a></li>
                            <li><a href="service.html">产品</a></li>
                            <li><a href="service-details.html">有机</a></li>
                            <li><a href="contact.html">效益</a></li>
                            <li><a href="contact.html">加盟</a></li>
                            <li><a href="contact.html">新闻</a></li>
                            <li><a href="contact.html">联系我们</a></li>
                        </ul>
                    </div>
                    <div class="nav-footer">
                        <button><i class="fa fa-bars"></i></button>
                    </div>
                </div>
                <div class="search-box pull-right">
                    <form action="#">
                        <input type="text" placeholder="搜索-Search...">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },

    mounted () {
        let nav = this.$refs.indexNav
        let ticking = false

        let toggleNavClass = () => {
            let st = document.documentElement.scrollTop || document.body.scrollTop

            if (st > 180) {
                if (!nav.classList.contains('fadeInDown')) {
                    nav.classList.add('stricky-fixed')
                    nav.classList.add('fadeInDown')
                    nav.classList.add('animated')
                }
            } else {
                if (nav.classList.contains('fadeInDown')) {
                    nav.classList.remove('stricky-fixed')
                    nav.classList.remove('fadeInDown')
                    nav.classList.remove('animated')
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
    }
}
</script>

<style lang="stylus">
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
            li
                float right
                cursor pointer
                border-right 1px solid #eaeaea
                padding 0 16px
                transition background-color .3s ease
                &:first-child
                    border-left 1px solid #eaeaea
                &:hover
                    background-color color-green
                i
                    color #a4a4a4
                    margin-right 5px
                    font-size 20px
</style>
