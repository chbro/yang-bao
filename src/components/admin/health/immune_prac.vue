<template>
    <div class="admin-form">
        <p class="card-title">免疫实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">消毒方法:</p>
            <el-input type="textarea" v-model="models.note"></el-input>
        </div>
        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import Submitter from '@/components/admin/submitter'
import { checkForm, checkSubmit } from '@/util/jskit'

export default {
    components: {
        BasicInfo, Submitter
    },

    data () {
        let immunes = [
            {value: '小反兽疫和疫苗', key: 0},
            {value: '亚洲1-0型口蹄疫二价', key: 1},
            {value: '灭活苗', key: 2},
            {value: '羊梭菌三联四防灭活苗', key: 3},
            {value: '山羊传染性胸膜肺炎灭活苗', key: 4},
            {value: '山羊痘弱毒疫苗', key: 5},
            {value: '口疮弱毒细胞冻干苗', key: 6},
            {value: '羔羊痢疾氢氢化铝菌苗', key: 7}
        ]
        let getImmuneTypes = (q, cb) => {
            cb(immunes)
        }

        let infectWays = [
            {value: '颈部皮下注射', key: 0},
            {value: '肌肉注射', key: 1},
            {value: '皮下或肌肉注射', key: 2},
            {value: '皮下注射', key: 3},
            {value: '大腿内侧或尾根皮肉注射', key: 4},
            {value: '口腔粘膜注射', key: 5},
            {value: '在后腿内侧皮下注射', key: 6}
        ]
        let getInfectWays = (q, cb) => {
            cb(infectWays)
        }

        let doses = [
            {value: '1ML', key: 0},
            {value: '4月龄-2岁1ML', key: 1},
            {value: '2岁以上2ML', key: 2},
            {value: '6月龄以下3ML', key: 3},
            {value: '6月龄以上5ML', key: 4},
            {value: '0.5ML', key: 5},
            {value: '0.2ML', key: 6},
            {value: '20-30天2ML', key: 7},
            {value: '10-20天3ML', key: 8}
        ]
        let getDoses = (q, cb) => {
            cb(doses)
        }

        let periods = [
            {value: '5个月', key: 0},
            {value: '6个月', key: 1},
            {value: '12个月', key: 2},
            {value: '18个月', key: 3}
        ]
        let getPeriods = (q, cb) => {
            cb(periods)
        }
        return {
            items: [
                {label: '免疫耳牌号', model: 'immunetag', type: 'file', block: true},
                {label: '接种羊群', model: 'sheep'},
                {label: '疫苗种类', model: 'medicine', type: 'select', fetchSuggestions: getImmuneTypes},
                {label: '接种方法', model: 'way', type: 'select', fetchSuggestions: getInfectWays, mr: true},
                {label: '接种剂量', model: 'dose', type: 'select', fetchSuggestions: getDoses},
                {label: '免疫期', model: 'period', type: 'select', fetchSuggestions: getPeriods}
            ],
            models: {
                immunetag: null,
                sheep: null,
                medicine: null,
                way: null,
                dose: null,
                period: null,
                note: null
            },
            submitter: {}
        }
    },

    methods: {
        submit () {
            console.log(this.models, this.submitter)
            if (!checkForm(this.models)) {
                return
            }
            if (!checkSubmit(this.submitter)) {
                return
            }
            console.log(this.models, this.submitter)
        }
    }
}
</script>
