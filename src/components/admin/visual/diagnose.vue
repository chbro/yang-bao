<template>
    <div class="admin-form">
        <p class="card-title">诊断可视</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">症状描述:</p>
            <el-input type="textarea" v-model="models.note"></el-input>
        </div>
        <div class="card">
            <p class="card-title">诊断结果:</p>
            <el-input type="textarea" v-model="models.note"></el-input>
        </div>
        <div class="card">
            <p class="card-title">解决方法:</p>
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

export default {
    components: {
        Submitter, BasicInfo
    },

    data () {
        let sexs = [
            {value: '雌', key: 0},
            {value: '雄', key: 1}
        ]
        let getSex = (q, cb) => {
            cb(sexs)
        }

        let experts = [
            {value: 'a', key: 0},
            {value: 'b', key: 1},
            {value: 'c', key: 2}
        ]
        let getExpert = (q, cb) => {
            cb(experts)
        }
        return {
            items: [ {
                label: '请选择上传文件',
                model: 'upfile',
                type: 'file',
                block: true
            }, {
                label: '畜生性别',
                model: 'sex',
                type: 'select',
                fetchSuggestions: getSex
            }, {
                label: '商标耳牌',
                model: 'signal'
            }, {
                label: '检疫耳牌',
                model: 'check'
            }, {
                label: '就诊专家',
                model: 'expert',
                type: 'select',
                fetchSuggestions: getExpert
            }],
            models: {
                upfile: null,
                sex: null,
                signal: null,
                check: null,
                expert: null
            },
            submitter: {}
        }
    }
}
</script>

<style lang="stylus">
.diagnose-upload
    display relative
    p
    display inline-block
    #diagnose-upcont
        width 400px
    #diagnose-up
        position absulote
        opacity 0
        left 0px
        top 0px

form
    width 80%
    margin 0 auto
    .diagonse-form
        width 60%
        margin 20px auto
    .el-input,.el-textarea
        width 60%
</style>
