<template>
    <div>
        <section class="blog-home" v-cloak>
            <search></search>
            <div class="container po-r">
                <span class="block-title">追溯系统</span>
                <div class="sec-title">
                    <img class="tree-logo" src="../assets/imgs/index/logo-input.png">
                    <img src="../assets/imgs/index/tree-chart.png" usemap="#hotmap">
                </div>
            </div>
            <map name="hotmap" id="hotmap">
                <area shape="rect" coords="140,220,250,260" href ="/#/genea" alt="系谱档案">
            </map>

            <div class="icon-text">
                <span class="block-title">溯源查询</span>
                <div v-for="(item, i) in icontexts" :key="i">
                    <i :class="'iconfont icon-' + item.class"></i>
                    <span v-text="item.sub"></span>
                    <p v-text="item.text"></p>
                </div>
            </div>

            <div class="icon-group po-r">
                <span class="block-title">溯源系统功能</span>
                <div class="left-icons">
                    <router-link tag="div" to="/genea" v-for="(item, i) in icons" :key="i">
                        <i :class="'iconfont icon-' + item.class"></i>
                        <span v-text="item.text"></span>
                    </router-link>
                </div>
                <img src="../assets/imgs/index/jianguan.png" width="16%">
            </div>
        </section>

        <section class="sponsors-section" style="background-color: #2891d1"></section>
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
            icontexts: [
                { class: 'xitongtupianziyuan', sub: '网站查询', text: '推行互联网+“云养殖”模式，建设有机追溯体系。有机羊肉食品电子商务网络销售平台。利用大户局打造智慧型畜牧业……' },
                { class: 'phone', sub: '手机查询', text: '通过移动终端使用“云羊宝”有机追溯平台，公众不仅满足努比亚山羊生产溯源的知情权，还能提升对山羊产品质量安全的信心......' },
                // { class: 'duanxinzhongxin', sub: '短信查询', text: '短信查询服务: 电信用户、移动、联通用户编辑追溯码信息发送到“云羊宝”追溯系统特定的溯源查询号08566995166.....' },
                { class: 'danganheji', sub: '溯源管理', text: '以培育国家级山羊品种“努比亚山羊、沿河有机白山羊”为课题，规模养殖、“云养殖”、立体有机养殖为路径建立有机追溯体系......' }
            ],

            icons: [
                { class: '111', text: '专家课堂' },
                { class: 'renyuandanganguanli', text: '系谱档案' },
                { class: 'cross', text: '卫生疫控' },
                { class: 'daocha', text: '营养生产' },
                { class: 'zhusheqi', text: '疾病防治' },
                { class: 'wuzicaigou', text: '生产物资' },
                { class: 'jianshiqicai01', text: '可视系统' },
                { class: 'goat', text: '养殖追溯' }
            ]
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'

img
    max-width 100%
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
    padding 30px 10% 60px
    .left-icons
        display inline-block
        width 75%
        cursor pointer
        >div
            display inline-block
            vertical-align middle
            width 24%
            color color-main
            text-align center
            i
                font-size 50px
                display block
                margin 15px auto 5px

.tree-logo
    display block
    margin 30px auto 10px
    width 105px
.sec-title
    margin-bottom 10px
    overflow hidden
    text-align center

@media screen and (max-width 600px)
    .icon-group
        .left-icons
            width 100%
            >div
                i
                    font-size 40px
            &+img
                display none
</style>
