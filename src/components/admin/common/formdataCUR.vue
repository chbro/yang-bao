<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>

        <basic-info :items="items" :models.sync="models"></basic-info>
        <div class="card" v-if="isDisinfect">
            <p class="card-title">消毒方法:</p>
            <el-input type="textarea" v-model="models.disinfectWay"></el-input>
        </div>
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
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { retrieveUid, retrieveName, retrieveFacName, retrieveFacNum } from '@/util/store'

export default {
    props: {
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
        // 消毒方法输入框和备注一样大
        isDisinfect: {
            type: Boolean,
            default: false
        },

        apiurl: {
            type: String
        },
        getData: {
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
                    let data = res.data.model
                    let obj = {}
                    Object.keys(this.models).forEach(v => {
                        obj[v] = data[v]
                    })
                    this.canModify = data.ispassCheck === '2'
                    console.log(this.canModify)
                    this.$emit('update:models', obj)
                }
            }).catch(_ => {
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

            disableBtn: false
        }
    },

    methods: {
        Spv (isPass) {
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            if (this.supervise) {
                window.fetch(baseUrl + '/' + this.apiurl + '/s/' + this.supervise, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({ispassSup: isPass, supervisor: retrieveUid()})
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump(this.modpath)
                    }
                }).catch(_ => {
                    this.$message.success('修改监督状态失败')
                })
            } else if (this.check) {
                window.fetch(baseUrl + '/' + this.apiurl + '/p/' + this.check, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({ispassCheck: isPass, professor: retrieveUid()})
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump(this.modpath)
                    }
                }).catch(_ => {
                    this.$message.error('审核失败')
                })
            }
        },

        submit () {
            console.log(this.models)
            if (!checkForm(this.models)) {
                return
            }

            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            this.models.operatorName = retrieveName()
            this.models.operatorId = retrieveUid()
            this.models.factoryNum = retrieveFacNum()
            this.models.factoryName = retrieveFacName()
            console.log(this.models)

            let form = new FormData()
            Object.keys(this.models).forEach(v => {
                form.append(v, this.models[v])
            })

            if (this.edit) {
                form.append('id', this.edit)
                window.fetch(baseUrl + '/' + this.apiurl + '/' + this.edit, {
                    method: 'POST',
                    body: form,
                    headers
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump(this.modpath)
                    }
                })
            } else {
                window.fetch(baseUrl + '/' + this.apiurl, {
                    method: 'POST',
                    body: form,
                    headers
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        postJump(this.modpath)
                    }
                })
            }
        }
    }
}
</script>
