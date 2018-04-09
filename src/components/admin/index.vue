<template>
    <div class="admin-form">
        <p class="card-title">有机养殖环境追溯</p>

        <div class="border-main">
            <div class="form-summary">
                <el-input size="small" v-for="(item, i) in summary" :key="i" v-model="summaryModel[item.model]">
                    <template slot="prepend">{{ item.label }}</template>
                </el-input>
            </div>

            <div class="card">
                <p class="card-title">粗饲料配方</p>
                <div class="border-main">
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">青料:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加青料设置</span>
                    </div>
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">干料:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加干料设置</span>
                    </div>
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">其他:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加“其他”设置</span>
                    </div>
                </div>
            </div>

            <submitter :submitter.sync="submitter"></submitter>
            <div class="admin-send">
                <el-button type="primary">取消</el-button>
                <el-button type="primary">提交/更新</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Submitter from '@/components/admin/submitter'

export default {
    components: {
        Submitter
    },

    data () {
        return {
            submitter: {},
            summary: [
                {label: '栋号:', model: 'house_id'},
                {label: '使用日期:', model: 'date'},
                {label: '羊数:', model: 'num'},
                {label: '阶段:', model: 'stage'},
                {label: '饮水:', model: 'water'}
            ],
            summaryModel: {
                house_id: null,
                date: null,
                num: null,
                stage: null,
                water: null
            }
        }
    }
}
</script>
