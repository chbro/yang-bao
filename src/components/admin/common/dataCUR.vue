<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>

        <basic-info :radio-sex="radioSex" :items="items" :models.sync="models"></basic-info>
        <div class="card" v-if="hasRemark">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="admin-send" v-if="canModify">
            <el-button type="primary" v-if="!check && !view" :disabled="disableBtn" @click="submit()">提交/更新</el-button>
            <template v-else-if="!view">
                <el-button type="primary" :disabled="disableBtn" @click="Spv(true)">通过</el-button>
                <el-button type="primary" :disabled="disableBtn" @click="Spv()">拒绝</el-button>
            </template>
            <el-button type="primary" v-else :disabled="disableBtn" @click="$router.back()">返回</el-button>
        </div>
        <div class="admin-send" v-else>已审核</div>
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
        },

        superviseData: {
            type: Function
        },
        checkData: {
            type: Function
        },

        radioSex: {
            type: Boolean,
            default: false
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
            this.check = newV.query.check
            this.supervise = newV.query.supervise
            this.view = newV.query.view
        }
    },

    mounted () {
        this.check = this.$route.query.check
        this.supervise = this.$route.query.supervise
        this.view = this.$route.query.view
        this.edit = this.$route.query.edit || this.$route.query.check || this.$route.query.supervise || this.view
        if (this.edit) {
            this.getData(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let obj = {}
                    Object.keys(this.models).forEach(v => {
                        obj[v] = res.data.model[v]
                    })
                    if ('agentArea' in obj) {
                        obj.agentArea = addressToArray(obj.agentArea)
                    }
                    if ('breedLocation' in obj) {
                        obj.breedLocation = addressToArray(obj.breedLocation)
                    }
                    this.$emit('update:models', obj)
                }
            }, _ => {
                this.$message.error(`获取${this.title}失败`)
            })
        }
    },

    data () {
        return {
            edit: false,
            check: false,
            supervise: false,
            view: false,
            canModify: true,

            disableBtn: false,
            map: ['', '省级代理', '市级代理', '县级代理']
        }
    },

    methods: {
        spv (isPass) {
            if (this.supervise) {
                this.superviseData({ispassSup: isPass}).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.suucess('审核成功')
                    }
                }, _ => {
                    this.$message.suucess('审核失败')
                })
            } else if (this.check) {
                this.checkData({ispassCheck: isPass}).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.suucess('修改监督状态成功')
                    }
                }, _ => {
                    this.$message.suucess('修改监督状态失败')
                })
            }
        },

        submit () {
            console.log(this.models, this.$store.state.user)
            if (!checkForm(this.models)) {
                return
            }

            let data = Object.assign({}, this.models)
            data.factoryNum = this.$store.state.user.factoryId
            if (!this.isAgent) {
                data.operatorName = this.$store.state.user.username
                data.operatorId = this.$store.state.user.id
                data.factoryName = this.$store.state.user.departmentName
            } else {
                let area = data.agentArea || data.breedLocation
                if (Array.isArray(area)) {
                    if (data.agentArea) {
                        if (!area.length) {
                            this.$message.warning('请选择代理所属地域')
                            return
                        } else {
                            data.agentArea = area.join('')
                        }
                    } else {
                        if (!area.length) {
                            this.$message.warning('请选择羊场地理位置')
                            return
                        } else {
                            data.breedLocation = area.join('')
                        }
                    }
                }
                data.responsibleId = -1
                data.agent = this.$store.state.user.id
            }
            this.disableBtn = true
            if (this.edit) {
                this.updateData(this.edit, data).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump(this.modpath)
                    }
                    this.disableBtn = false
                }, _ => {
                    this.$message.error('修改失败')
                    this.disableBtn = false
                })
            } else {
                this.postData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump(this.modpath)
                    }
                    this.disableBtn = false
                }, _ => {
                    this.$message.error('录入失败')
                    this.disableBtn = false
                })
            }
        }
    }
}
</script>
