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
import {config} from '@/util/config'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if(isReqSuccessful(res)) {
                this.user = res.data.model
                this.models.expert = this.user.userRealname;
                this.models.uploader = this.user.pkUserid
            }
        })
    },

    data () {
        let sexs = [
            {value: '母'},
            {value: '公'}
        ]
        let getSex = (q, cb) => {
            cb(sexs)
        }

        let experts = [
            //this.user
        ]
        let getExpert = (q, cb) => {
            cb(experts)
        }
        return {
            items: [ {
                label: '性别',
                model: 'sex',
                type: 'select',
                fetchSuggestions: getSex,
            }, {
                label: '商标耳牌',
                model: 'brand'
            }, {
                label: '检疫耳牌',
                model: 'vaccine',
                mr: 1
            }, {
                label: '就诊专家',
                model: 'expert',
                type: 'select',
                //fetchSuggestions: getExpert
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

    watch: {
        'models.sex' ( val ) {
            val === "公"? this.models.brand = 'G' : this.models.brand = 'M'
        }
    },
    methods: {
        submit () {
            if ( !this.beforeUpload ( this.models.file ) ) {
                return false;
            }

            let form = new FormData()
            Object.keys(this.models).forEach(v =>{
                form.append(v, this.models[v])
            })
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/uploadFile/upload', {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        this.$message.success('提交成功')
                    }
                }, _ => {
                    this.$message.error('提交失败')
                })
        },

        beforeUpload ( file ) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < config.imageSize;
            if (isJPG && !isLt2M) {
                this.$message.error(`上传图片大小不能超过 ${config.imageSize} MB!`);
                return false;
            } else {
                return true;
            }
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
