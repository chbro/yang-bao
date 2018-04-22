<template>
    <div class="trace-res">
        <div class="image">
            <img class="img" src="../assets/imgs/header-logo.png">
            <div>
                <div class="t-item">
                    <div>
                        <p class="color-gr">品名:</p>
                        <span v-text="item.name"></span>
                    </div>
                    <div>
                        <p class="color-gr">耳牌号:</p>
                        <span v-text="item.erpai"></span>
                    </div>
                </div>
                <div class="t-item">
                    <div>
                        <p class="color-gr">产地:</p>
                        <span v-text="item.birthplace"></span>
                    </div>
                    <div>
                        <p class="color-gr">单位:</p>
                        <span v-text="item.factory"></span>
                    </div>
                </div>
                <baidu-map class="bm-area" :center="center" :zoom="zoom" @ready="initBaiduMap()" :ak="ak"></baidu-map>
            </div>
        </div>

        <div class="mid-summary">
            <div>
                <p class="color-gr">品牌/商标:</p>
                <span v-text="item.brand"></span>
            </div>
            <div>
                <p class="color-gr">品类:</p>
                <span v-text="item.type"></span>
            </div>
            <div>
                <p class="color-gr">用途:</p>
                <span v-text="item.usage"></span>
            </div>
            <div>
                <p class="color-gr">出栏时间:</p>
                <span v-text="item.outtime"></span>
            </div>
            <div>
                <p class="color-gr">养殖单位认证:</p>
                <span v-text="item.factory_verify"></span>
            </div>
        </div>

        <div class="company">
            <img class="img" src="../assets/imgs/header-logo.png">
            <div>
                <p v-for="(v, i) in  companyInfo" :key="i">
                    <span class="color-gr" v-text="v.label + ':'"></span>
                    <span v-text="item.company[v.model]"></span>
                </p>
            </div>
            <div>
                <img width="100%" src="../assets/imgs/header-logo.png">
            </div>
        </div>

        <div class="prod-intro">
            <p class="color-gr"><i class="el-icon-edit"></i>产品简介</p>
            <div v-text="item.intro"></div>
        </div>

        <div class="trace">
            <div class="block-intro color-gr">
                <i class="el-icon-edit"></i>
                <div>
                    <p>溯源档案</p>
                    档案完整度
                    <el-button size="small" type="primary">用户评分</el-button>
                </div>
            </div><div class="mod">
                <div v-for="(v, i) in modules" :key="i">
                    <i class="iconfont" :class="'icon-' + v.icon"></i>
                    <span v-text="v.text"></span>
                    <router-link to="/"><el-button size="small" type="primary">点击查看</el-button></router-link>
                </div>
            </div>
        </div>

        <div class="verify color-gr">
            <div class="block-intro">
                <i class="el-icon-edit"></i>
                <div>
                    <p>产品认证</p>
                    认证完整度
                    <el-button size="small" type="primary">用户评分</el-button>
                </div>
            </div><ul class="lists">
                <li v-for="(v, i) in reports" :key="i">
                    <span v-text="v.text"></span>
                    <span><i class="el-icon-success color-gr"></i>已检测</span>
                    <router-link to="/">查看证书</router-link>
                </li>
            </ul>
        </div>

        <div class="buy">
            <div class="block-intro color-gr">
                <i class="el-icon-edit"></i>购买信息
            </div><div class="tabs">
                <el-tabs v-model="tab" type="card">
                    <el-tab-pane label="电商平台" name="first">
                        <img width="20%" src="../assets/imgs/header-logo.png">
                        <img width="20%" src="../assets/imgs/header-logo.png">
                        <img width="20%" src="../assets/imgs/header-logo.png">
                    </el-tab-pane>
                    <el-tab-pane label="实体店购买" name="second">
                        1111
                    </el-tab-pane>
                    <el-tab-pane label="销售联络方式" name="third">
                        2222
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'

export default {
    components: {
        BaiduMap
    },

    data () {
        return {
            ak: 'GSEcVhNVMzjFympEWRH9EOkmZw7mbKRp',
            center: null,
            zoom: 1,
            item: {
                name: '商品羊',
                erpai: '000000001',
                birthplace: '贵州铜仁',
                factory: '贵州省铜仁市沿河县努比亚山羊养殖场',
                brand: '努比亚',
                type: '黑山羊',
                usage: '种羊',
                outtime: '2018/4/12',
                factory_verify: '营业执照已认证',
                company: {
                    name: '贵州省铜仁沿河陈正良努比亚山羊养殖场',
                    person: '陈正良',
                    phone: '13098400001',
                    status: '营业执照已认证',
                    time: '2018/04/12',
                    intro: '贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场'
                },
                intro: '贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场贵州省铜仁沿河陈正良努比亚山羊养殖场'
            },
            companyInfo: [
                {label: '单位名称', model: 'name'},
                {label: '负责人/法人', model: 'person'},
                {label: '联系方式', model: 'phone'},
                {label: '认证状态', model: 'status'},
                {label: '认证时间', model: 'time'},
                {label: '单位简介', model: 'intro'}
            ],

            modules: [
                {icon: 'smile', text: '1'},
                {icon: 'smile', text: '1'},
                {icon: 'smile', text: '1'},
                {icon: 'smile', text: '1'},
                {icon: 'smile', text: '1'}
            ],
            reports: [
                {text: '土壤检测报告'},
                {text: '水质检测报告'},
                {text: 'ISO质量管理体系认证'},
                {text: '食品流通许可证'},
                {text: 'ISO食品安全管理体系认证'},
                {text: '空气检测报告'},
                {text: '营养检测报告'}
            ],
            tab: 'first'
        }
    },

    methods: {
        initBaiduMap () {
            this.center = {
                lat: 28.5639700000,
                lng: 108.5030100000
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color'

.color-gr
    color color-green
p
    margin 0
.img
    width 30%
    margin-right 10px
.trace-res
    width 80%
    min-width 800px
    margin 10px auto
    border 1px solid #ddd
    color #000

    >div
        padding 5px 10px
        border-bottom 1px solid #ddd
    .image
        >img
            width 30%
            height 30%
            margin-right 10px
        >div
            width calc(70% - 15px)
            display inline-block
            vertical-align top
        .t-item
            display flex
            border 1px solid #ddd
            >div
                padding 5px
                width 50%
                &:not(:last-child)
                    border-right 1px solid #ddd
            &:nth-child(2)
                border-top 0
                margin-bottom 10px
    .bm-area
        width 100%
        height 100px

.mid-summary
    display flex
    >div
        width 20%
        padding 10px 5px
        border-right 1px solid #ddd
        &:last-child
            border-right 0

.company
    display flex
    >img
        width 30%
        height 100px
    >div
        width calc(50% - 10px)
        line-height 30px
        &:last-child
            width 20%
        span
            display inline-block
            padding-right 10px
            text-align right
            &:first-child
                width 100px
            &:last-child
                vertical-align top
                max-width calc(100% - 130px)
                text-align justify

.prod-intro
    display flex
    >p
        width 20%
        font-size 20px
        i
            margin-right 10px
    >div
        width 80%
        text-indent 2em
        padding-bottom 20px

.trace, .verify, .buy
    .block-intro
        display inline-block
        width 20%
        i
            display inline-block
            margin-right 10px
            font-size 30px
        >div
            display inline-block
            vertical-align top
            line-height 30px
            .el-button
                display block
.trace
    .mod
        width 80%
        display inline-flex
        vertical-align top
        >div
            width 20%
            border 1px solid #ddd
            >*
                display block
                text-align center
                margin 10px
            i
                font-size 40px

.trace-res .verify
    padding 25px 10px
    .lists
        display inline-block
        width 80%
        vertical-align top
        line-height 30px
        li
            border-bottom 1px solid #ddd
            &:first-child
                border-top 1px solid #ddd
            span
                display inline-block
                width 25%
                &:first-child
                    width 50%
            a
                color #000

.buy
    .tabs
        display inline-block
        vertical-align top
        width 80%
    .my-el-tab
        .el-tabs__item
            background-color color-green
            color #fff
</style>
