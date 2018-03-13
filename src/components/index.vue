<template>
    <div>
        <section class="blog-home">
            <search></search>
            <div class="container po-r">
                <span class="block-title">追溯系统</span>
                <div class="sec-title text-center">
                    <vo-basic :data="chartData" :toggleCollapse="false" :pan="true" :zoom="true"></vo-basic>
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
                    <div v-for="(icon, i) in icons" :key="i">
                        <i class="el-icon-refresh"></i>
                        <span v-text="icon.text"></span>
                    </div>
                </div>
                <img src="../assets/imgs/footer-logo.png" width="24%">
            </div>
        </section>

        <section class="sponsors-section" style="background-color: #2891d1">
            <div class="container"></div>
        </section>
    </div>
</template>

<script>
import Search from '@/components/search'
import { VoBasic } from 'vue-orgchart'

export default {
    components: {
        Search, VoBasic
    },

    data () {
        return {
            chartData: {
                name: '（有机）养殖生产管理追溯系统',
                children: [
                    { name: '进销存系统' },
                    {
                        name: '有机养殖生产管理追溯系统',
                        children: [
                            { name: '专家课堂' },
                            { name: '系谱档案' },
                            { name: '卫生·疫控' },
                            { name: '营养·生产' },
                            { name: '疾病防治' },
                            { name: '生产物资平台' },
                            { name: '可视系统' },
                            { name: '有机养殖环境追溯' },
                            { name: '有机·监管' }
                        ]
                    },
                    { name: '财务管理系统' }
                ]
            },

            icons: [
                { class: 'hehe', text: '专家课堂' },
                { class: 'hehe', text: '系谱档案' },
                { class: 'hehe', text: '卫生疫控' },
                { class: 'hehe', text: '营养生产' },
                { class: 'hehe', text: '疾病防治' },
                { class: 'hehe', text: '生产物资平台' },
                { class: 'hehe', text: '可视系统' },
                { class: 'hehe', text: '有机养殖环境追溯' }
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
    display inline-block
    position absolute
    top 0
    left 50%
    transform translate(-50%, -50%)
    background-color color-main
    color #fff
    border 2px solid #fff
    border-radius .2em
    padding .4em 1em
    font-weight bold

.icon-group
    padding 30px 10%
    .left-icons
        width 75%
        display inline-block
        vertical-align middle
        >div
            display inline-block
            width 25%
            color color-main
            text-align center
            i
                display block
                font-size 50px
                margin-top 15px
</style>
