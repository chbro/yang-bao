<template>
    <div class="admin-form">
        <p class="card-title">诊断可视</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">症状描述:</p>
            <el-input type="textarea" v-model="models.symptom"></el-input>
        </div>
        <div class="card">
            <p class="card-title">解决方法:</p>
            <el-input type="textarea" v-model="models.solution"></el-input>
        </div>

        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>

    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { diagnoseUp, getUserById } from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if(isReqSuccessful(res)) {
                this.user = res.data.model
                this.models.uploader = this.user.pkUserid
            }
        })
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
                label: '商标耳牌',
                model: 'brand'
            }, {
                label: '检疫耳牌',
                model: 'vaccine'
            }, {
                label: '性别',
                model: 'sex',
                type: 'select',
                fetchSuggestions: getSex,
                mr: 1
            }, {
                label: '就诊专家',
                model: 'expert',
                type: 'select',
                fetchSuggestions: getExpert
            }, {
                label: '上传图片或视频:',
                model: 'file',
                type: 'file',
                fetchSuggestions: getSex
            }],
            models: {
                file: null,
                sex: null,
                brand: null,
                vaccine: null,
                expert: null,
                uploader: null
            }
        }
    },
    methods: {
        submit () {
            let form = new FormData()
            // form.append('file', this.models.file)
            Object.keys(this.models).forEach(v =>{
                form.append(v, this.models[v])
            })
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/uploadFile/upload', {
                method: 'POST',
                headers,
                body: form
            })

            // diagnoseUp(this.models).then(res => {
            //     if (isReqSuccessful(res)) {
            //         // this.items = res.data.List
            //         // this.total = res.data.size
            //         this.$router.push({name: 'diagnoseUp'})
            //     }
            // }).catch(_ => {
            //     this.$message.error('查询失败')
            // })
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
