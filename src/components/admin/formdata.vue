<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>

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
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'
import { baseUrl } from '@/util/fetch'
import { getAntiscolic } from '@/util/getdata'

export default {
    props: {
        title: {
            type: String
        },
        getData: {
            type: Function
        },
        postData: {
            type: Function
        },
        items: {
            type: Array
        },
        models: {
            type: Array
        }
    },

    components: {
        BasicInfo
    },

    watch: {
        '$route' (newV, oldV) {
            // from edit to post
            if (oldV.query.edit && !newV.query.edit) {
                this.edit = false
            }
        }
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            getData({id: this.edit}).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List[0]
                    Object.keys(this.models).forEach(v => {
                        this.models[v] = data[v]
                    })
                    this.remark = data.remark
                }
            }).catch(_ => {
                this.$message.error(`获取${title}失败`)
            })
        }
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
