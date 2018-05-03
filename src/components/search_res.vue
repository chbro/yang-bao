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
                <b-map address="贵州省铜仁市沿河县努比亚山羊养殖场"></b-map>
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
                    <span class="mod_search_doc">档案完整度</span>
                    <el-rate
                        class="mod_search_rate"
                        :colors="['#6aaf08', '#6aaf08', '#6aaf08']"
                        v-model="rate">
                    </el-rate>
                    <el-button class="btn_green" size="small" type="primary">用户评分</el-button>
                </div>
            </div><div class="mod">
                <div v-for="(v, i) in modules" :key="i">
                    <i class="iconfont" :class="'icon-' + v.icon"></i>
                    <span class="color-gr" v-text="v.text"></span>
                    <el-button @click="show(v.name)" class="btn_green" size="small" type="primary">点击查看</el-button>
                </div>
            </div>
        </div>

        <div class="verify color-gr">
            <div class="block-intro">
                <i class="el-icon-edit"></i>
                <div>
                    <p>产品认证</p>
                    <span class="mod_search_doc">认证完整度</span>
                    <el-rate
                        class="mod_search_rate"
                        :colors="['#6aaf08', '#6aaf08', '#6aaf08']"
                        v-model="rate">
                    </el-rate>
                    <el-button class="btn_green" size="small" type="primary">用户评分</el-button>
                </div>
            </div><ul class="lists">
                <li v-for="(v, i) in reports" :key="i">
                    <span v-text="v.text"></span>
                    <span><i class="el-icon-success color-gr"></i> 已检测 </span>
                    <a @click="show(i)" class="mod_search_cert" href="javascript:void(0);">查看证书</a> <i class="el-icon-arrow-right color-gr"></i>
                </li>
            </ul>
        </div>

        <div class="buy">
            <div class="block-intro color-gr">
                <i class="el-icon-edit"></i>购买信息
            </div><div class="tabs">
                <el-tabs v-model="tab" type="card">
                    <el-tab-pane label="电商平台" name="first">
                        <a href="" class="mod_search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                        <a href="" class="mod_search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                        <a href="" class="mod_search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                        <a href="" class="mod_search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                        <a href="" class="mod_search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
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
        <!-- 系谱档案 -->
        <div v-if="dialog.gen" class="mod_search_dialog">
            <div class="dialog_body">
                <el-tabs v-model="gen" type="card">
                    <el-tab-pane label="卫生消毒实验档案" name="first">
                        <my-table></my-table>
                    </el-tab-pane>
                    <el-tab-pane label="免疫实施档案" name="second">
                        1111
                    </el-tab-pane>
                    <el-tab-pane label="驱虫实施档案" name="third">
                        2222
                    </el-tab-pane>
                </el-tabs>

                <div class="dialog_btn">
                    <span class="btn_print">打印</span>
                    <span class="btn_close">关闭</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BMap from './map'
import MyTable from './table'

export default {
    data () {
        return {
            ak: 'GSEcVhNVMzjFympEWRH9EOkmZw7mbKRp',
            // 溯源码
            code: '',
            // 档案完整度
            rate: 3,
            dialog: {
                gen: true,
                san: false,
                nut: false,
                dis: false,
                vis: false,
                org: false
            },
            gen: 'first',
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
                {icon: 'smile', text: '系谱档案', name: 'gen'},
                {icon: 'smile', text: '卫生疫控', name: 'san'},
                {icon: 'smile', text: '营养生产', name: 'nut'},
                {icon: 'smile', text: '疫病防治', name: 'dis'},
                {icon: 'smile', text: '可视系统', name: 'vis'},
                {icon: 'smile', text: '有机养殖环境', name: 'org'}
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
    components: {
        BMap,
        MyTable
    },
    created () {
        this.code = this.$route.query.code || ''
    },
    methods: {
        show (name) {
            document.body.style.overflow = 'hidden'
            this.$set(this.dialog, name, true)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color'

.btn_green
    border 1px solid color-green
    background-color color-green
.mod_search_doc
    font-size 12px
.mod_search_rate
    margin 0 0 10px 0
.mod_search_cert
    margin-right 20px
    text-decoration-line underline
.mod_search_ec
    display inline-block
    margin 0 30px 10px 0
    padding 5px
    box-sizing border-box
    border-radius 5px
    border 1px solid #ddd
    width 150px
    height 80px
    .ec_logo
        width 100%
        height 100%
.mod_search_dialog
    position fixed
    z-index 999
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(0, 0, 0, 0.6)
    .dialog_body
        margin 150px auto 0
        padding 30px 40px
        box-sizing border-box
        border 2px solid color-green
        width 800px
        background-color #fff
    .dialog_btn
        text-align right
        font-size 15px
        color color-green
        cursor pointer
        .btn_print
            margin-right 30px

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
        display flex
        justify-content space-between
        >div
            width calc(70% - 15px)
            display inline-block
            vertical-align top
        .t-item
            display flex
            box-sizing border-box
            height 56px
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

.trace-res .mid-summary
    padding 0 10px
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
            >button
                margin 10px auto 10px
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
