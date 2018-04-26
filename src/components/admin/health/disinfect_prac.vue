<template>
    <div class="admin-form">
        <p class="card-title">卫生消毒实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">消毒方法:</p>
            <el-input type="textarea" v-model="disinfectWay"></el-input>
        </div>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="remark"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'
import { baseUrl } from '@/util/fetch'
import { getDisinfect } from '@/util/getdata'

export default {
    components: {
        BasicInfo
    },

    watch: {
        '$route' (newV, oldV) {
            if (oldV.query.edit && !newV.query.edit) {
                this.edit = false
            }
        }
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            getDisinfect({id: this.edit}).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List[0]
                    Object.keys(this.models).forEach(v => {
                        if (v !== null) {
                            this.models[v] = data[v]
                        }
                    })
                    this.remark = data.remark
                    this.disinfectWay = data.disinfectWay
                    this.prevfile = data.disinfectEartag
                }
            }).catch(_ => {
                this.$message.error('获取卫生消毒实施档案失败')
            })
        }
    },

    data () {
        return {
            edit: false,
            items: [
                {label: '免疫耳牌号文件', model: 'disinfectEartagFile', type: 'file'},
                {label: '消毒药名称', model: 'disinfectName'},
                {label: '用药剂量', model: 'dose', mr: 1, placeholder: '请注明单位'},
                {label: '消毒场所', model: 'place'},
                {label: '消毒时间', model: 'disinfectTime', type: 'time'}
            ],
            models: {
                factoryNum: 1,
                factoryName: '老嫖猪场',
                disinfectEartagFile: null,
                disinfectName: null,
                dose: null,
                place: null,
                disinfectTime: null
            },
            disinfectWay: null,
            remark: null
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }

            this.models.operatorName = '嫖'
            this.models.operatorId = 1

            let form = new FormData()
            Object.keys(this.models).forEach(v => {
                form.append(v, this.models[v])
            })
            if (!this.models.disinfectEartagFile) {
                form.delete('disinfectEartagFile')
            }

            form.append('disinfectWay', this.disinfectWay)
            form.append('remark', this.remark)
            if (this.prevfile) {
                form.append('disinfectEartag', this.prevfile)
            }
            if (this.edit) {
                form.append('id', this.edit)
                window.fetch(baseUrl + '/df/update', {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump('health/disinfect')
                    }
                })
            } else {
                // when jump from edit to add,
                // disinfectEartagFile is undefined and cannot be found by checkForm
                if (!this.models.disinfectEartagFile) {
                    this.$message.warning('请选择耳牌文件')
                    return
                }

                window.fetch(baseUrl + '/df/save', {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        postJump('health/disinfect')
                    }
                })
            }
        }
    }
}
</script>
