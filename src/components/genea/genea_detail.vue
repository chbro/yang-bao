<template>
    <div>
        <div class="xipu-container">
            <div class="bread-wrapper">
                <el-breadcrumb separator="-">
                    <el-breadcrumb-item v-for="(item, i) in bread" :key="i" to="item.to">{{ item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <h2>种羊系谱</h2>
            <div class="details">
                <div class="details-head">免疫耳牌： [ {{ details.erpai_immune }} ] 种羊系谱档案</div>
                <div class="details-body">
                    <div class="details-row">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <span>颜色：</span>
                                {{ details.color }}
                            </el-col>
                            <el-col :span="20">
                                <span>性别：</span>
                                {{ details.sex }}
                            </el-col>
                        </el-row>
                    </div>
                    <div class="details-row">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <span>原耳牌：</span>
                                {{ details.selfEartag }}
                            </el-col>
                            <el-col :span="4">
                                <span>免疫耳牌：</span>
                                {{ details.immuneEartag }}
                            </el-col>
                            <el-col :span="4">
                                <span>商标耳牌：</span>
                                {{ details.tradeMarkEartag }}
                            </el-col>
                            <el-col :span="12">
                                <span>种羊基地：</span>
                                {{ details.breedingSheepBase }}
                            </el-col>
                        </el-row>
                    </div>
                    <div class="details-row">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <span>父号：</span>
                                {{ details.earTagOfFather }}
                            </el-col>
                            <el-col :span="4">
                                <span>母号：</span>
                                {{ details.earTagOfMother }}
                            </el-col>
                            <el-col :span="4">
                                <span>父父号：</span>
                                {{ details.earTagOfFathersFather }}
                            </el-col>
                            <el-col :span="4">
                                <span>父母号：</span>
                                {{ details.earTagOfFathersMother }}
                            </el-col>
                            <el-col :span="4">
                                <span>母父号：</span>
                                {{ details.earTagOfMothersFather }}
                            </el-col>
                            <el-col :span="4">
                                <span>母母号：</span>
                                {{ details.earTagOfMothersMother }}
                            </el-col>
                        </el-row>
                    </div>
                    <div class="details-row">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <span>初登时间：</span>
                                {{ details.birthTime }}
                            </el-col>
                            <el-col :span="20">
                                <span>初登体重：</span>
                                {{ details.birthWeight }}
                            </el-col>
                        </el-row>
                    </div>
                    <div class="details-note">
                        <p>备注：</p>
                        <p class="note-content" v-text="details.remark"></p>
                    </div>
                </div>
            </div>
        </div>

        <section class="sponsors-section" style="background-color: #2891d1">
            <div class="container"></div>
        </section>
    </div>
</template>

<script>
import { getGeneaRec } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    mounted () {
        getGeneaRec(this.$route.params.id).then(res => {
            if (isReqSuccessful(res)) {
                this.details = res.data.object
            }
        }, _ => {
            this.$message.error('获取详情失败')
        })
    },

    data () {
        return {
            bread: [
                {label: '首页', to: ''},
                {label: '云羊宝', to: 'index'},
                {label: '有机养殖生产管理追溯系统', to: ''},
                {label: '系谱档案', to: 'xipu'},
                {label: '阅读页', to: ''}
            ],

            details: {}
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/genea-common'

.details
    padding 10px
    margin-bottom 30px
    color #fff
    border 1px solid color-main
    .details-head
        background-color color-main
        margin-bottom 10px
        padding 10px 0
    .details-body
        font-weight bold
        color color-main
        background-color color-lightblue
    .el-row
        margin 0 !important
    .el-col
        text-align left
        border 1px solid #ddd
        >span
            display inline-block
            width 6em
            text-align right
            padding 10px 5px
            border-right 1px solid #ddd

    .details-note
        text-align left
        padding-bottom 20px
        p
            padding 10px 4em 0
            margin-bottom 0
        .note-content
            margin 0 4em
            padding 1em
            border 1px solid #ddd
            min-height 100px

</style>
