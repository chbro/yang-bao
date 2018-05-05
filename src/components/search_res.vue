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
            <div ref="qrcode"></div>
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
                    <el-button @click="open(v.name)" class="btn_green" size="small" type="primary">点击查看</el-button>
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
                    <a class="mod_search_cert" href="javascript:void(0);">查看证书</a> <i class="el-icon-arrow-right color-gr"></i>
                </li>
            </ul>
        </div>

        <div class="buy">
            <div class="block-intro color-gr">
                <i class="el-icon-edit"></i>购买信息
            </div><div class="tabs">
                <el-tabs class="my-el-tab" v-model="tab" type="card">
                    <el-tab-pane label="电商平台" name="first">
                        <div class="mod_search_ec">
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                            <a href="" class="search_ec"><img class="ec_logo" src="../assets/imgs/header-logo.png"></a>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="实体店购买" name="second">
                        <div class="mod_search_entity">
                            <figure class="search_entity">
                                <a href="" class="entity_img"><img src="../assets/imgs/header-logo.png"></a>
                                <p class="entity_name"><a href="javascript:void(0);">贵州华联超市</a></p>
                            </figure>
                            <figure class="search_entity">
                                <a href="" class="entity_img"><img src="../assets/imgs/header-logo.png"></a>
                                <p class="entity_name"><a href="javascript:void(0);">贵州华联超市</a></p>
                            </figure>
                            <figure class="search_entity">
                                <a href="" class="entity_img"><img src="../assets/imgs/header-logo.png"></a>
                                <p class="entity_name"><a href="javascript:void(0);">贵州华联超市</a></p>
                            </figure>
                            <figure class="search_entity">
                                <a href="" class="entity_img"><img src="../assets/imgs/header-logo.png"></a>
                                <p class="entity_name"><a href="javascript:void(0);">贵州华联超市</a></p>
                            </figure>
                            <figure class="search_entity">
                                <a href="" class="entity_img"><img src="../assets/imgs/header-logo.png"></a>
                                <p class="entity_name"><a href="javascript:void(0);">贵州华联超市</a></p>
                            </figure>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="销售联络方式" name="third">
                        2222
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- 系谱档案 -->
        <el-dialog
            custom-class="mod_search_dialog"
            :visible.sync="dialog.gen"
            width="800px"
            :show-close="false">
            <record-table
                type="table"
                title="系谱档案"
                :data="genData">
            </record-table>
            <div class="dialog_btn">
                <span class="btn_print">打印</span>
                <span @click="close('gen')" class="btn_close">关闭</span>
            </div>
        </el-dialog>
        <!-- 卫生疫控 -->
        <el-dialog
            custom-class="mod_search_dialog"
            :visible.sync="dialog.san"
            width="800px"
            :show-close="false">
            <el-tabs class="my-el-tab" v-model="tab_san" type="card">
                <el-tab-pane label="卫生与动物福利操作实施档案" name="first">
                    <record-table
                        type="table"
                        title="卫生·疫控档案"
                        :data="sanData.welfare">
                    </record-table>
                </el-tab-pane>
                <el-tab-pane label="消毒实施档案" name="second">
                    <record-table
                        type="table"
                        title="卫生·疫控档案"
                        :data="sanData.disinfect">
                    </record-table>
                </el-tab-pane>
                <el-tab-pane label="免疫实施档案" name="third">
                    <record-table
                        type="table"
                        title="卫生·疫控档案"
                        :data="sanData.immune">
                    </record-table>
                </el-tab-pane>
                <el-tab-pane label="驱虫实施档案" name="fourth">
                    <record-table
                        type="table"
                        title="卫生·疫控档案"
                        :data="sanData.expelling">
                    </record-table>
                </el-tab-pane>
            </el-tabs>
            <div class="dialog_btn">
                <span class="btn_print">打印</span>
                <span @click="close('san')" class="btn_close">关闭</span>
            </div>
        </el-dialog>
        <!-- 营养生产 -->
        <el-dialog
            custom-class="mod_search_dialog"
            :visible.sync="dialog.nut"
            width="800px"
            :show-close="false">
            <el-tabs class="my-el-tab" v-model="tab_nut" type="card">
                <el-tab-pane label="阶段营养实施档案" name="first">
                    <record-table
                        type="table"
                        title="营养·生产档案"
                        :data="nutData.stage">
                    </record-table>
                </el-tab-pane>
                <el-tab-pane label="配种产子实施档案" name="second">
                    <record-table
                        type="table"
                        title="卫生·疫控档案"
                        :data="nutData.hybrid">
                    </record-table>
                </el-tab-pane>
            </el-tabs>
            <div class="dialog_btn">
                <span class="btn_print">打印</span>
                <span @click="close('nut')" class="btn_close">关闭</span>
            </div>
        </el-dialog>
        <!-- 疫病防治 -->
        <el-dialog
            custom-class="mod_search_dialog"
            :visible.sync="dialog.dis"
            width="800px"
            :show-close="false">
            <record-table
                type="table"
                title="疫病防治档案"
                :data="disData">
            </record-table>
            <div class="dialog_btn">
                <span class="btn_print">打印</span>
                <span @click="close('dis')" class="btn_close">关闭</span>
            </div>
        </el-dialog>
        <!-- 可视系统 -->
        <el-dialog
            custom-class="mod_search_dialog"
            :visible.sync="dialog.vis"
            width="800px"
            :show-close="false">
            <record-table
                type="grid"
                title="可视系统·生产环节可视"
                :data="genData">
            </record-table>
            <div class="dialog_btn">
                <span class="btn_print">打印</span>
                <span @click="close('vis')" class="btn_close">关闭</span>
            </div>
        </el-dialog>        
    </div>
</template>

<script>
import BMap from './map'
import RecordTable from './table'
import QRCode from 'qrcodejs2'

export default {
    data () {
        return {
            // 溯源码
            code: '',
            // 档案完整度
            rate: 3,
            dialog: {
                gen: false,
                san: false,
                nut: false,
                dis: false,
                vis: false,
                org: false
            },
            tab_san: 'first',
            tab_nut: 'first',
            genData: [ // 系谱档案
                { name: 'nativeEartag', fieldName: '原耳牌', fieldValue: '' },
                { name: 'typeName', fieldName: '品种名', fieldValue: '' },
                { name: 'sex', fieldName: '性别', fieldValue: 0, type: 'radio', label: ['公羊', '母羊'] },
                { name: 'color', fieldName: '颜色', fieldValue: '' },
                { name: 'breedingSheepBase', fieldName: '种羊基地', fieldValue: '', size: 'large' },
                { name: 'immuneEartag', fieldName: '免疫耳牌', fieldValue: '' },
                { name: 'tradeMarkEartag', fieldName: '商标耳牌', fieldValue: '' },
                { name: 'birthTime', fieldName: '初登时间', fieldValue: '' },
                { name: 'birthWeight', fieldName: '初登体重', fieldValue: '' },
                { name: 'eartagOfFather', fieldName: '父号', fieldValue: '' },
                { name: 'eartagOfMother', fieldName: '母号', fieldValue: '' },
                { name: 'eartagOfFathersFather', fieldName: '父父号', fieldValue: '' },
                { name: 'eartagOfFathersMother', fieldName: '父母号', fieldValue: '' },
                { name: 'eartagOfMothersFather', fieldName: '母父号', fieldValue: '' },
                { name: 'eartagOfMothersMother', fieldName: '母母号', fieldValue: '' },
                { name: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
            ],
            sanData: { // 卫生疫控
                welfare: [ // 卫生与动物福利操作档案
                    { fieldNameWidth: '60%', fieldValue: '', fieldName: '自检/主管上级检查时间', name: 'checkTime' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '羊舍空气与温度是否合格', name: 'airTemperature' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '羊只运动与采光是否合格', name: 'exerciseDaylighting' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '车辆进出是否消毒', name: 'carDisinfect' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '圈舍内外是否合格', name: 'colonyHouse' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '饲料库房及加工车间是否合格', name: 'warehouseWorkshop' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '杀虫灭鼠是否合格', name: 'killWormDeratization' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '消毒制度是否执行', name: 'sterilizingRoom' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '是否赤手操作', name: 'operation' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '是否一羊一针头', name: 'needleSheep' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '疫苗及针头的消毒处理是否合格', name: 'vaccine' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '是否做到人员安全防护是否合格', name: 'safetyProtection' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '实验室垃圾与排水是否无害化处理', name: 'rubbishWater' },
                    { type: 'radio', fieldNameWidth: '60%', fieldValue: 0, fieldName: '是否遵守操作规范', name: 'operationSpecification' },
                    { fieldName: 'remark', fieldNameWidth: '60%', fieldName: '备注', fieldValue: '', size: 'large' }
                ],
                disinfect: [ // 消毒实施档案
                    { fieldName: '免疫耳牌号', fieldValue: '', name: 'disinfectEartagFile' },
                    { fieldName: '消毒药名称', fieldValue: '', name: 'disinfectName' },
                    { fieldName: '用药剂量', fieldValue: '', name: 'dose' },
                    { fieldName: '消毒场所', fieldValue: '', name: 'place' },
                    { fieldName: '消毒时间', fieldValue: '', name: 'disinfectTime', size: 'large' },
                    { fieldName: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
                ],
                immune: [ // 免疫实施档案
                    { fieldName: '接种时间', fieldValue: '', name: 'immuneTime' },
                    { fieldName: '接种羊群', fieldValue: '', name: 'crowdNum' },
                    { fieldName: '疫苗种类', fieldValue: '', name: 'immuneKind' },
                    { fieldName: '接种方法', fieldValue: '', name: 'immuneWay' },
                    { fieldName: '接种剂量', fieldValue: '', name: 'dose' },
                    { fieldName: '免疫期', fieldValue: '', name: 'immuneDuring' },
                    { fieldName: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
                ],
                expelling: [ // 驱虫实施档案
                    { fieldName: '免疫耳牌号', fieldValue: '', name: 'repellentEartagFile' },
                    { fieldName: '接种羊（群）', fieldValue: '', name: 'crowdNum'},
                    { fieldName: '驱虫时间', fieldValue: '', name: 'repellentTime' },
                    { fieldName: '药物名称', fieldValue: '', name: 'repellentfieldName' },
                    { fieldName: '给药途径', fieldValue: '', name: 'repellentWay' },
                    { fieldName: '给药剂量', fieldValue: '', name: 'dose' },
                    { fieldName: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
                ]
            },
            nutData: {
                stage: [ // 阶段营养实施档案
                    { fieldName: '栋号', fieldValue: '', name: 'building' },
                    { fieldName: '使用日期', fieldValue: '', name: 'nutritionT' },
                    { fieldName: '羊数', fieldValue: '', name: 'quantity' },
                    { fieldName: '阶段', fieldValue: '', name: 'period' },
                    { fieldName: '饮水', fieldValue: '', name: 'water', size: 'large' },
                    { fieldName: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
                ],
                hybrid: [ // 配种产子实施档案
                    { fieldName: '栏/栋', fieldValue: '', name: 'building' },
                    { fieldName: '母羊免疫耳牌', fieldValue: '', name: 'mEtI' },
                    { fieldName: '母羊商标耳牌', fieldValue: '', name: 'mEtB' },
                    { fieldName: '种公羊免疫耳牌', fieldValue: '', name: 'fEtI' },
                    { fieldName: '种公羊商标耳牌', fieldValue: '', name: 'fEtB' },
                    { fieldName: '配种时间', fieldValue: '', name: 'breedingT' },
                    { fieldName: '妊娠时间', fieldValue: '', name: 'gestationT' },
                    { fieldName: '产羔时间', fieldValue: '', name: 'cubT' },
                    { fieldName: '产前免疫（三联四防）接种时间', fieldValue: '', name: 'prenatalIT' },
                    { fieldName: '产羔', fieldValue: '', name: 'quantity' },
                    { fieldName: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }

                ]
            },
            disData: [ // 疫病防治
                { fieldName: '商标耳牌号', fieldValue: '', name: 'earTag' },
                { fieldName: '栏/栋', fieldValue: '', name: 'buildingNum' },
                { fieldName: '诊断结果', fieldValue: '', name: 'diagnosisResult' },
                { fieldName: '诊断方法', fieldValue: '', name: 'diagnosisMethod' },
                { fieldName: '诊断效果', fieldValue: '', name: 'treatEffect' },
                { fieldName: '监督确认时间', fieldValue: '', name: 'gmtSup' },
                { fieldName: '诊疗时间', fieldValue: '', name: 'diagnosisTime' },
                { fieldName: '剂量', fieldValue: '', name: 'dose'},
                { fieldName: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
            ],
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
        RecordTable
    },
    created () {
        this.code = this.$route.query.code || ''
    },
    mounted () {
        this.qrcode()
    },
    methods: {
        // 生成二维码
        qrcode () {
            let qrcode = new QRCode(this.$refs.qrcode, {
                width: 120,
                height: 120,
                text: window.location.href
            })
        },
        open (name) {
            this.$set(this.dialog, name, true)
        },
        close (name) {
            this.$set(this.dialog, name, false)
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.trace-res
    width 80%
    min-width 800px
    margin 10px auto
    border 1px solid #ddd
    color #000

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
        display flex
        flex-wrap wrap
        .search_ec
            margin 0 20px 10px 0
            padding 5px
            box-sizing border-box
            border-radius 5px
            border 1px solid #ddd
            width 150px
            height 80px
            .ec_logo
                width 100%
                height 100%
    .mod_search_entity
        display flex
        flex-wrap wrap
        .search_entity
            margin 0 20px 0 0
            box-sizing border-box
            .entity_img
                display block
                width 200px
                height 120px
                img
                    width 100%
                    height 100%
            .entity_name
                line-height 40px
                text-align center
                a
                    color color-green
    .mod_search_dialog
        padding 0 30px
        border 2px solid color-green
        border-radius none
        .el-dialog__header
            padding 0
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
            margin 20px
            width 120px
            height 120px
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
        color color-green
        &.is-active
            background-color color-green
            color: #fff
    .el-tabs__item:focus.is-active.is-focus:not(:active)
        box-shadow none
        border-radius 0
</style>
