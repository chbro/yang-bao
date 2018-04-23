<template>
    <div class="admin-form">
        <p class="card-title">卫生消毒实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">消毒方法:</p>
            <el-input type="textarea" v-model="models.way"></el-input>
        </div>
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
import { checkForm, checkSubmit, isReqSuccessful } from '@/util/jskit'
import { baseUrl } from '@/util/fetch'

export default {
    components: {
        BasicInfo, Submitter
    },

    data () {
        let medicines = [
            {value: '戊二醛癸甲溴铵溶液', key: 0},
            {value: '聚维酮碘', key: 1},
            {value: '三氯异氰尿酸粉', key: 2}
        ]
        let getMedicines = (q, cb) => {
            cb(medicines)
        }
        return {
            items: [
                {label: '免疫耳牌号文件', model: 'immunetag', type: 'file'},
                {label: '消毒时间', model: 'time', type: 'time'},
                {label: '消毒场所', model: 'place'},
                {label: '消毒药名称', model: 'medicine', type: 'select', fetchSuggestions: getMedicines},
                {label: '用药剂量', model: 'dose', mr: true}
            ],
            models: {
                immunetag: null,
                time: null,
                place: null,
                way: null,
                medicine: null,
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
            let form = new FormData()
            let { immunetag, time, medicine, dose, note, way, place } = this.models
            place = place || 1
            form.append('disinfectEartagFile', immunetag)
            form.append('disinfectName', medicine)
            form.append('disinfectTime', time)
            form.append('factoryNum', place)
            form.append('disinfectQuality', dose)
            form.append('remark', note)
            form.append('disinfectWay', way)
            form.append('operator', this.submitter.operator)
            window.fetch(baseUrl + '/df/saveshow', {
                method: 'POST',
                body: form
            }).then(async res => {
                let body = await res.json()
                if (isReqSuccessful(body)) {
                    console.log(body)
                }
            })
        }
    }
}
</script>
