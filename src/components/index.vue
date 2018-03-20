<template>
    <div>
        <section class="blog-home">
            <search></search>
            <div class="container po-r">
                <span class="block-title">追溯系统</span>
                <div class="sec-title text-center">
                    <img class="tree-logo" src="../assets/imgs/index/logo-input.png">
                    <img src="../assets/imgs/index/tree-chart.png">
                </div>
            </div>

            <div class="icon-text">
                <span class="block-title">溯源查询</span>
                <div><img src="../assets/imgs/index/WEB-UI-index-3-1.png"><span>网站查询</span><p>推行互联网+“云养殖”模式，建设有机追溯体系。有机羊肉食品电子商务网络销售平台。利用大户局打造智慧型畜牧业……</p></div>
                <div><img src="../assets/imgs/index/WEB-UI-index-3-2.png" height="100"><span>手机查询</span><p>通过移动终端使用“云羊宝”有机追溯平台，公众不仅满足努比亚山羊生产溯源的知情权，还能提升对山羊产品质量安全的信心......</p></div>
                <div><img src="../assets/imgs/index/WEB-UI-index-3-3.png"><span>短信查询</span><p>短信查询服务: 电信用户、移动、联通用户编辑追溯码信息发送到“云羊宝”追溯系统特定的溯源查询号08566995166.....</p></div>
                <div><img src="../assets/imgs/index/WEB-UI-index-3-4.png"><span>溯源管理</span><p>以培育国家级山羊品种“努比亚山羊、沿河有机白山羊”为课题，规模养殖、“云养殖”、立体有机养殖为路径建立有机追溯体系......</p></div>
            </div>

            <div class="icon-group po-r">
                <span class="block-title">溯源系统功能</span>
                <div class="left-icons">
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-1.png">
                        <span>专家课堂</span>
                    </router-link>
                    <router-link tag="div" to="/xipu">
                        <img src="../assets/imgs/index/WEB-UI-index-4-2.png">
                        <span>系谱档案</span>
                    </router-link>
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-3.png">
                        <span>卫生疫控</span>
                    </router-link>
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-4.png">
                        <span>营养生产</span>
                    </router-link>
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-5.png">
                        <span>疫病防治</span>
                    </router-link>
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-6.png">
                        <span>生产物资平台</span>
                    </router-link>
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-7.png">
                        <span>可视系统</span>
                    </router-link>
                    <router-link tag="div" to="">
                        <img src="../assets/imgs/index/WEB-UI-index-4-8.png">
                        <span>有机养殖环境追溯</span>
                    </router-link>
                </div>
                <img src="../assets/imgs/index/WEB-UI-index-4-9.png" width="24%">
            </div>
        </section>

        <section class="sponsors-section" style="background-color: #2891d1">
            <div class="container"></div>
        </section>
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
            icons: [
                { class: 'zhuanjia', text: '专家课堂' },
                { class: 'xipu', text: '系谱档案' },
                { class: 'weisheng', text: '卫生疫控' },
                { class: 'yingyang', text: '营养生产' },
                { class: 'jibing', text: '疾病防治' },
                { class: 'shengchan', text: '生产物资平台' },
                { class: 'keshi', text: '可视系统' },
                { class: 'yangzhi', text: '有机养殖环境追溯' }
            ]
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'

.po-r
    position relative

#chart-container
    .title
        background-color #fff
        color color-main
        font-weight bold
        border 2px solid color-main
        border-radius 0
    .lines
        [class*='Line']
            border-color color-main
        .downLine
            background-color color-main
    .node
        cursor pointer

.icon-text
    display flex
    justify-content space-between
    background-color color-main
    position relative
    padding 0 10% 50px
    >div
        width 25%
        text-align center
        color #fff
        margin-top 40px
        i
            display block
            font-size 50px
        span
            font-weight bold
            font-size 16px
            display block
            margin 5px 0
        p
            padding 0 10px
            text-align justify
.block-title
    position absolute
    display inline-block
    width 8em
    text-align center
    top 0
    left 50%
    transform translate(-50%, -50%)
    background-color color-main
    color #fff
    border 2px solid #fff
    border-radius .2em
    padding .4em 0
    font-weight bold

.icon-group
    padding 30px 10%
    .left-icons
        display inline-block
        width 75%
        vertical-align middle
        cursor pointer
        >div
            display inline-block
            width 24%
            color color-main
            text-align center
            img
                display block
                margin 15px auto 5px

.tree-logo
    display block
    margin 30px auto 10px
    width 105px
.sec-title
    margin-bottom 10px
</style>
