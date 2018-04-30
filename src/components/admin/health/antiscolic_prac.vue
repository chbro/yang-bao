<template>
    <div class="admin-form">
        <p class="card-title">驱虫实施档案</p>

        <basic-info :items="items" :models.sync="models"></basic-info>
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
import { getMedicines, getWays, getDoses } from '@/util/dataselect'
import { baseUrl } from '@/util/fetch'
import { getAntiscolic } from '@/util/getdata'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            getAntiscolic({id: this.edit}).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List[0]
                    Object.keys(this.models).forEach(v => {
                        this.models[v] = data[v]
                    })
                    this.remark = data.remark
                    this.prevfile = data.immuneEartag
                }
            }).catch(_ => {
                this.$message.error('获取驱虫档案失败')
            })
        }
    },

    data () {
        /* eslint-disable object-property-newline */
        return {
            items: [
                {label: '免疫耳牌号', model: 'repellentEartagFile', type: 'file', block: true},
                {label: '接种羊（群）', model: 'crowdNum'},
                {label: '驱虫时间', model: 'repellentTime', type: 'time'},
                {label: '药物名称', model: 'repellentName', type: 'select', fetchSuggestions: getMedicines, mr: true},
                {label: '给药途径', model: 'repellentWay', type: 'select', fetchSuggestions: getWays},
                {label: '给药剂量', model: 'dose', type: 'select', fetchSuggestions: getDoses}
            ],
            models: {
                factoryNum: 1,
                factoryName: '老嫖猪场',
                repellentEartagFile: null,
                crowdNum: null,
                repellentTime: null,
                repellentName: null,
                repellentWay: null,
                dose: null
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
            if (!this.models.repellentEartagFile) {
                form.delete('repellentEartagFile')
            }

            if (this.remark !== null) {
                form.append('remark', this.remark)
            }
            if (this.prevfile) {
                form.append('repellentEartag', this.prevfile)
            }
            if (this.edit) {
                form.append('id', this.edit)
                window.fetch(baseUrl + '/rp/update', {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump('health/antiscolic')
                    }
                })
            } else {
                if (!this.models.repellentEartagFile) {
                    this.$message.warning('请选择耳牌文件')
                    return
                }

                window.fetch(baseUrl + '/rp/save', {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        postJump('health/antiscolic')
                    }
                })
            }
        }
    }
}
</script>
