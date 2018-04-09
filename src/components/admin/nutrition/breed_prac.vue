<template>
    <div class="admin-form">
        <p class="card-title">有机养殖环境追溯</p>

        <div class="border-main">
            <div class="form-summary">
                <el-input size="small" v-model="models.house_id">
                    <template slot="prepend">栏/栋:</template>
                </el-input>
                <el-input size="small" v-model="models.immunetag">
                    <template slot="prepend">母羊免疫耳牌:</template>
                </el-input>
                <el-input size="small" v-model="models.tradetag">
                    <template slot="prepend">母羊商标耳牌:</template>
                </el-input>
                <el-input size="small" v-model="models.male_immunetag">
                    <template slot="prepend">种公羊免疫耳牌:</template>
                </el-input>
                <el-input size="small" v-model="models.male_tradetag">
                    <template slot="prepend">种公羊商标耳牌:</template>
                </el-input>

                <div class="time el-input-group">
                    <span class="time-span">配种时间:</span>
                    <el-date-picker
                        size="small"
                        v-model="models.breed_time"
                        type="date">
                    </el-date-picker>
                </div>
                <div class="time el-input-group">
                    <span class="time-span">妊娠时间:</span>
                    <el-date-picker
                        size="small"
                        v-model="models.pregnance_time"
                        type="date">
                    </el-date-picker>
                </div>
                <div class="time el-input-group double-width">
                    <span class="time-span">产前免疫（三联四防）接种时间:</span>
                    <el-date-picker
                        size="small"
                        v-model="models.antenatal_immunetime"
                        type="date">
                    </el-date-picker>
                </div>
                <div class="time el-input-group">
                    <span class="time-span">产羔时间:</span>
                    <el-date-picker
                        size="small"
                        v-model="models.lambing_time"
                        type="date">
                    </el-date-picker>
                </div>
                <div class="time el-input-group">
                    <span class="time-span">产羔数量:</span>
                    <el-input-number :min="1" size="small" v-model="models.lambing_num"></el-input-number>
                </div>
            </div>

            <div class="card">
                <p class="card-title ta-l">备注:</p>
                <el-input type="textarea" v-model="models.note"></el-input>
            </div>
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
import { checkSubmit } from '@/util/jskit'

export default {
    components: {
        Submitter
    },

    mounted () {
        let editId = this.$route.query.edit
        if (editId) {
            console.log(editId)
        }
    },

    data () {
        return {
            summary: [
                {label: '栏/栋:'},
                {label: '母羊免疫耳牌:'},
                {label: '母羊商标耳牌:'},
                {label: '种公羊免疫耳牌:'},
                {label: '种公羊商标耳牌:'},
                {label: '配种时间:'},
                {label: '妊娠时间:'},
                {label: '产前免疫（三联四防）接种时间:'},
                {label: '产羔时间:'},
                {label: '产羔'}
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
            if (Object.keys(this.models).some(v => this.models[v] === null || this.models[v] === '')) {
                this.$message.warning('请完善追溯信息')
                return
            }

            if (!checkSubmit(this.submitter)) {
                this.$message.warning('请完善操作员信息')
                return
            }
            console.log(this.submitter, this.models)
        }
    }
}
</script>
