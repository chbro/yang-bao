<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>

        <basic-info :items="items" :models.sync="models"></basic-info>
        <div class="card" v-if="hasRemark">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary" :disabled="disableBtn" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'
import { retrieveFacNum, retrieveUid, retrieveName, retrieveAid } from '@/util/store'
// import pcaa from 'area-data/pcaa'

export default {
    props: {
        isAgent: {
            type: Boolean,
            default: false
        },
        modpath: {
            type: String
        },
        title: {
            type: String
        },
        items: {
            type: Array
        },
        models: {
            type: Object
        },
        submitCallback: {
            type: Function,
            default () {
                return _ => {}
            }
        },
        hasRemark: {
            type: Boolean,
            default: true
        },

        postData: {
            type: Function
        },
        getData: {
            type: Function
        },
        updateData: {
            type: Function
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
        },

        'models.agentRank' (newV) {
            this.area = newV
        }
    },

    mounted () {
        this.edit = this.$route.query.edit
        // if (this.edit) {
        //     this.getData(this.edit).then(res => {
        //         if (isReqSuccessful(res)) {
        //             let data = res.data.model
        //             let obj = {}
        //             Object.keys(this.models).forEach(v => {
        //                 if (/^\d+$/.test(data[v])) {
        //                     obj[v] = String(data[v])
        //                 } else {
        //                     obj[v] = data[v]
        //                 }
        //             })
        //             if (this.isAgent) {
        //                 obj.agentArea = addressToArray(obj.agentArea)
        //             }
        //             this.models = obj
        //         }
        //     }).catch(_ => {
        //         this.$message.error(`获取${this.title}失败`)
        //     })
        // }
    },

    data () {
        return {
            // pcaa,
            edit: false,
            disableBtn: false,
            map: ['', '省级代理', '市级代理', '县级代理']
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }

            let data = Object.assign({}, this.models)
            data.factoryNum = retrieveFacNum()
            if (!this.isAgent) {
                data.operatorName = retrieveName()
                data.operatorId = retrieveUid()
                data.factoryName = retrieveFacNum()
            } else {
                if (Array.isArray(this.models.agentArea) && !this.models.agentArea.length) {
                    this.$message.warning('请选择代理所属地域')
                    return
                }
                data.responsibleId = -1
                data.agentFather = retrieveAid()
                let area = data.agentArea
                if (Array.isArray(area)) {
                    data.agentArea = area.join('')
                }
                // let rank = data.agentRank
                // data.agentRank = String(this.map.indexOf(rank))
            }
            console.log(data)

            this.disableBtn = true
            console.log(this.edit)
            if (this.edit) {
                this.updateData(this.edit, data).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump(this.modpath)
                    }
                    this.disableBtn = false
                }).catch(_ => {
                    this.disableBtn = false
                    this.$message.error('修改失败')
                })
            } else {
                this.postData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump(this.modpath)
                    }
                    this.disableBtn = false
                }).catch(_ => {
                    this.disableBtn = false
                    this.$message.error('录入失败')
                })
            }
        }
    }
}
</script>
