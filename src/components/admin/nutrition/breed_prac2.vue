<template>
    <div class="admin-form">
        <p class="card-title">配种产子实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'
import { postBreeding, getBreeding, updateBreeding } from '@/util/getdata'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            getBreeding(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List
                    Object.keys(this.models).forEach(v => {
                        this.models[v] = data[v]
                    })
                }
            }).catch(_ => {
                this.$message.error('获取配种产子档案失败')
            })
        }
    },

    data () {
        return {
            items: [
                {label: '栏/栋', model: 'building'},
                {label: '母羊免疫耳牌', model: 'mEtI'},
                {label: '母羊商标耳牌', model: 'mEtB', mr: true},
                {label: '种公羊免疫耳牌', model: 'fEtI'},
                {label: '种公羊商标耳牌', model: 'fEtB'},
                {label: '配种时间', model: 's_breedingT', mr: true, type: 'time'},
                {label: '妊娠时间', model: 's_gestationT', type: 'time'},
                {label: '产前免疫（三联四防）接种时间', model: 's_prenatalIT', doubleWidth: true, mr: true, type: 'time'},
                {label: '产羔时间', model: 's_cubT', type: 'time'},
                {label: '产羔', model: 'quantity', type: 'number'}
            ],
            models: {
                factoryNum: 123,
                factoryName: '老嫖猪场',
                building: null,
                mEtI: null,
                mEtB: null,
                fEtI: null,
                fEtB: null,
                s_breedingT: null,
                s_gestationT: null,
                s_prenatalIT: null,
                s_cubT: null,
                quantity: null
            }
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }
            this.models.operator = this.submitter.operator
            this.models.factoryNum = this.factoryNum

            if (this.edit) {
                updateBreeding(this.edit, this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump('nutrition/stage')
                    }
                }).catch(_ => {
                    this.$message.error('修改失败')
                })
            } else {
                postBreeding(this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump('nutrition/stage')
                    }
                }, _ => {
                    console.log('录入失败')
                })
            }
        }
    }
}
</script>
