<template>
    <div class="admin-form">
        <p class="card-title">驱虫实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">备注:</p>
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
        let medicines = [
            {value: '伊维菌素注射注射液', key: 0},
            {value: '阿维菌素片', key: 1},
            {value: '硝氯酚片', key: 2},
            {value: '吡喹酮片', key: 3},
            {value: '双甲脒溶液', key: 4},
            {value: '氯氰菊酯', key: 5}
        ]
        let getMedicines = (q, cb) => {
            cb(medicines)
        }

        let ways = [
            {value: '皮下注射', key: 0},
            {value: '口服', key: 1},
            {value: '药浴', key: 2},
            {value: '圈舍环境喷洒', key: 3}
        ]
        let getWays = (q, cb) => {
            cb(ways)
        }

        let doses = [
            {value: '0.3mg/kg', key: 0},
            {value: '4mg/kg', key: 1},
            {value: '35mg/kg', key: 2},
            {value: '1000倍稀释', key: 3},
            {value: '500倍稀释', key: 4}
        ]
        let getDoses = (q, cb) => {
            cb(doses)
        }

        /* eslint-disable object-property-newline */
        return {
            items: [
                {label: '免疫耳牌号', model: 'immunetag', block: true},
                {label: '接种羊（群）', model: 'sheep'},
                {label: '驱虫时间', model: 'time', type: 'time'},
                {label: '药物名称', model: 'infect', type: 'select', fetchSuggestions: getMedicines},
                {label: '给药途径', model: 'way', type: 'select', fetchSuggestions: getWays},
                {label: '给药剂量', model: 'dose', type: 'select', fetchSuggestions: getDoses}
            ],
            models: {
                immunetag: null,
                sheep: null,
                time: null,
                infect: null,
                way: null,
                dose: null,
                note: null
            },
            submitter: {}
        }
    },

    methods: {
        submit () {
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
