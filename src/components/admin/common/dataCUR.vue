<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>

        <basic-info :radio-index="radioIndex" :items="items" :models.sync="models" :update-submitter="updateSubmitter"></basic-info>
        <div class="card" v-if="hasRemark">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="admin-send" v-if="canModify">
            <el-button type="primary" v-if="!check && !view" :disabled="disableBtn" @click="submit(checkFull)">提交/更新</el-button>
            <template v-else-if="!view">
                <el-button type="primary" :disabled="disableBtn" @click="Spv(1)">通过</el-button>
                <el-button type="primary" :disabled="disableBtn" @click="Spv(0)">拒绝</el-button>
            </template>
            <el-button type="primary" v-else :disabled="disableBtn" @click="$router.back()">返回</el-button>
        </div>
        <div class="admin-send" v-else>已审核</div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, isReqSuccessful, postJump, patchJump, addressToArray } from '@/util/jskit'
import { getUserById, patchWelfare, patchBreeding, patchPrevention, patchProWelfare, patchProPrevention, patchProBreeding } from '@/util/getdata'
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
        hasRemark: {
            type: Boolean,
            default: true
        },
        checkFull: {
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

        radioIndex: {
            type: Number,
            default: 0
        },
        updateSubmitter: {
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
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
            }
        })

        if (this.edit) {
            this.getData(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let obj = {}
                    // console.log(res.data.model, this.models)
                    Object.keys(this.models).forEach(v => {
                        obj[v] = res.data.model[v]
                    })

                    if ('breedLocation' in obj) {
                        obj.breedLocation = addressToArray(obj.breedLocation)
                    }
                    // 0审核未通过 1审核通过 2未审核
                    if (res.data.ispassCheck && res.data.ispassCheck === '1') {
                        this.canModify = false
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
        Spv (isPass) {
            // let sMap = {
            //     welfare: patchWelfare,
            //     prevention: patchPrevention,
            //     'nutrition/breed': patchBreeding
            // }
            // let pMap = {
            //     welfare: patchProWelfare,
            //     prevention: patchProPrevention,
            //     'nutrition/breed': patchProBreeding
            // }
            // if (this.supervise) {
            //     sMap[this.modpath](this.supervise, {ispassSup: isPass}).then(res => {
            //         if (isReqSuccessful(res)) {
            //             this.$message.success('修改监督状态成功')
            //             this.$router.push({name: 'review'})
            //         }
            //     }, _ => {
            //         this.$message.error('修改监督状态失败')
            //     })
            // } else if (this.check) {
            //     sMap[this.modpath](this.check, {ispassCheck: isPass}).then(res => {
            //         if (isReqSuccessful(res)) {
            //             this.$message.success('审核成功')
            //             this.$router.push({name: 'review'})
            //         }
            //     }, _ => {
            //         this.$message.error('审核失败')
            //     })
            // }
        },

        submit ( checkFull ) {
            if (!checkForm(this.models, checkFull)) {
                return
            }

            let data = Object.assign({}, this.models)
            let { userFactory, userRealname, id, factoryName } = this.user
            data.factoryNum = this.models.factoryNum || userFactory
            // if (this.updateSubmitter) {
            //     data.factoryNum = this.models.factoryNum || userFactory
            // } else {
            //     data.factoryNum = userFactory
            // }
            if (!this.isAgent) {
                data.operatorName = userRealname
                data.operatorId = id
                data.factoryName = factoryName
            } else {
                let area = data.breedLocation
                if (Array.isArray(area)) {
                    if (!area.length) {
                        this.$message.warning('请选择羊场地理位置')
                        return
                    } else {
                        data.breedLocation = area.join('')
                    }
                }
                data.responsibleId = -1
                data.agent = id
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
