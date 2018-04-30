<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card" v-if="hasRemark">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
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
        apiurl: {
            type: String
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
                    this.models = obj                    
                }
            }).catch(_ => {
                this.$message.error(`获取${title}失败`)
            })
        }
    },

    data () {
        return {
            edit: false
        }
    },

    methods: {
        submit () {
            console.log(this.models)
            if (!checkForm(this.models)) {
                return
            }

            this.models.operatorName = '嫖'
            this.models.operatorId = 1
            this.models.factoryNum = 123
            this.models.factoryName = '老嫖猪场'

            let form = new FormData()
            Object.keys(this.models).forEach(v => {
                form.append(v, this.models[v])
            })
            // if (!this.models.repellentEartagFile) {
            //     form.delete('repellentEartagFile')
            // }

            // if (this.remark !== null) {
            //     form.append('remark', this.remark)
            // }
            // if (this.prevfile) {
            //     form.append('repellentEartag', this.prevfile)
            // }
            if (this.edit) {
                form.append('id', this.edit)
                window.fetch(baseUrl + this.apiurl + '/' + id, {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        patchJump(modpath)
                    }
                })
            } else {
                // if (!this.models.eartagFile) {
                //     this.$message.warning('请选择耳牌文件')
                //     return
                // }

                window.fetch(baseUrl + '/' + this.apiurl, {
                    method: 'POST',
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        postJump(modpath)
                    }
                })
            }
        }
    }
}
</script>
