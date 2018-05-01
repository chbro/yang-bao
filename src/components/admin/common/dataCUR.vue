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
import { checkForm, isReqSuccessful, postJump, patchJump, addressToArray } from '@/util/jskit'

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
        }
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            this.getData(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.model
                    let obj = {}
                    Object.keys(this.models).forEach(v => {
                        obj[v] = data[v]
                    })
                    if (this.isAgent) {
                        this.$emit('updateLevel', obj.agentRank)
                        obj.agentRank = this.map[obj.agentRank]
                        obj.agentArea = addressToArray(obj.agentArea)
                    }
                    this.models = obj
                }
            }).catch(_ => {
                this.$message.error(`获取${this.title}失败`)
            })
        }
    },

    data () {
        return {
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
            if (!this.isAgent) {
                this.models.operatorName = '嫖'
                this.models.operatorId = 1
                this.models.factoryNum = 1
                this.models.factoryName = '老嫖猪场'
            } else {
                this.models.responsibleId = -1
                let area = this.models.agentArea
                if (Array.isArray(area)) {
                    this.models.agentArea = area.join('')
                }
                let rank = this.models.agentRank
                this.models.agentRank = this.map.indexOf(rank)
                console.log(rank, this.map.indexOf(rank), this.models)
            }

            this.disableBtn = true
            if (this.edit) {
                this.updateData(this.edit, this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump(this.modpath)
                    }
                    this.disableBtn = false
                }).catch(_ => {
                    this.disableBtn = false
                    this.$message.error('修改失败')
                })
            } else {
                this.postData(this.models).then(res => {
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
