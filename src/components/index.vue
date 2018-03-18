<template>
    <div>
        <section class="blog-home">
            <search></search>
            <div class="container po-r">
                <span class="block-title">追溯系统</span>
                <div class="sec-title text-center">
                    <img class="tree-logo" src="../assets/imgs/index/logo.png">
                    <img src="../assets/imgs/index/tree-chart.png">
                </div>
            </div>

            <div class="icon-text">
                <span class="block-title">溯源查询</span>
                <div><i class="el-icon-picture-outline"></i><span>网站查询</span><p>推行互联网+“云养殖”模式，建设有机追溯体系。有机羊肉食品电子商务网络销售平台。利用大户局打造智慧型畜牧业……</p></div>
                <div><i class="el-icon-picture-outline"></i><span>网站查询</span><p>推行互联网+“云养殖”模式，建设有机追溯体系。有机羊肉食品电子商务网络销售平台。利用大户局打造智慧型畜牧业……</p></div>
                <div><i class="el-icon-picture-outline"></i><span>网站查询</span><p>推行互联网+“云养殖”模式，建设有机追溯体系。有机羊肉食品电子商务网络销售平台。利用大户局打造智慧型畜牧业……</p></div>
                <div><i class="el-icon-picture-outline"></i><span>网站查询</span><p>推行互联网+“云养殖”模式，建设有机追溯体系。有机羊肉食品电子商务网络销售平台。利用大户局打造智慧型畜牧业……</p></div>
            </div>

            <div class="icon-group po-r">
                <span class="block-title">溯源系统功能</span>
                <div class="left-icons">
                    <router-link tag="div" v-for="(icon, i) in icons" :key="i" :to="icon.class">
                        <i class="el-icon-refresh"></i>
                        <span v-text="icon.text"></span>
                    </router-link>
                </div>
                <img src="../assets/imgs/index/icons-logo.png" width="24%">
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
            width 25%
            color color-main
            text-align center
            i
                display block
                font-size 50px
                margin-top 15px

.tree-logo
    display block
    margin 30px auto 10px
    width 105px
.sec-title
    margin-bottom 10px
</style>
