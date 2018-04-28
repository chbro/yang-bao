<template>
    <div class="admin-form">
        <p class="card-title">免疫实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
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
import { checkForm, isReqSuccessful, postJump, patchJump, getImmuneTypes, getDoses, getInfectWays, getPeriods } from '@/util/jskit'
import { baseUrl } from '@/util/fetch'
import { getImmune } from '@/util/getdata'

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
            getImmune({id: this.edit}).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List[0]
                    Object.keys(this.models).forEach(v => {
                        this.models[v] = data[v]
                    })
                    this.remark = data.remark
                    this.prevfile = data.immuneEartag
                }
            }).catch(_ => {
                this.$message.error('获取免疫实施档案失败')
            })
        }
    },

    data () {
        return {
            items: [
                {model: 'immuneEartagFile', type: 'file', block: true},
                {label: '接种时间', model: 'immuneTime', type: 'time'},
                {label: '接种羊群', model: 'crowdNum'},
                {label: '疫苗种类', model: 'immuneKind', type: 'select', fetchSuggestions: getImmuneTypes, mr: true},
                {label: '接种方法', model: 'immuneWay', type: 'select', fetchSuggestions: getInfectWays},
                {label: '接种剂量', model: 'dose', type: 'select', fetchSuggestions: getDoses},
                {label: '免疫期', model: 'immuneDuring', type: 'select', fetchSuggestions: getPeriods, mr: 1}
            ],
            models: {
                factoryNum: 1,
                factoryName: '老嫖猪场',
                immuneEartagFile: null,
                immuneTime: null,
                crowdNum: null,
                immuneKind: null,
                immuneWay: null,
                dose: null,
                immuneDuring: null
            },
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
            if (!this.models.immuneEartagFile) {
                form.delete('immuneEartagFile')
            }

            if (this.remark !== null) {
                form.append('remark', this.remark)
            }
            if (this.prevfile) {
                form.append('immuneEartag', this.prevfile)
            }
            form.append('id', this.edit)
            if (this.edit) {
                window.fetch(baseUrl + '/ip/update', {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump('health/immune')
                    }
                })
            } else {
                if (!this.models.immuneEartagFile) {
                    this.$message.warning('请选择耳牌文件')
                    return
                }

                window.fetch(baseUrl + '/ip/save', {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        postJump('health/immune')
                    }
                })
            }
        }
    }
}
</script>
