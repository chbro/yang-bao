<template>
    <div class="admin-form">
        <p class="card-title">配种产子实施档案</p>

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
import Submitter from '@/components/admin/submitter'
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, checkSubmit } from '@/util/jskit'

export default {
    components: {
        BasicInfo, Submitter
    },

    mounted () {
        let editId = this.$route.query.edit
        if (editId) {
            console.log(editId)
        }
    },

    data () {
        return {
            items: [
                {label: '栏/栋', model: 'house_id'},
                {label: '母羊免疫耳牌', model: 'immunetag'},
                {label: '母羊商标耳牌', model: 'tradetag', mr: true},
                {label: '种公羊免疫耳牌', model: 'male_immunetag'},
                {label: '种公羊商标耳牌', model: 'male_tradetag'},
                {label: '配种时间', model: 'breed_time', mr: true, type: 'time'},
                {label: '妊娠时间', model: 'pregnance_time', type: 'time'},
                {label: '产前免疫（三联四防）接种时间', model: 'antenatal_immunetime', doubleWidth: true, mr: true, type: 'time'},
                {label: '产羔时间', model: 'lambing_time', type: 'time'},
                {label: '产羔', model: 'lambing_num', type: 'number'}
            ],
            models: {
                house_id: null,
                immunetag: null,
                tradetag: null,
                male_immunetag: null,
                male_tradetag: null,
                breed_time: null,
                pregnance_time: null,
                antenatal_immunetime: null,
                lambing_time: null,
                lambing_num: null,
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
