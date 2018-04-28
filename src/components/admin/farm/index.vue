<template>
    <div class="admin-form">
        <p class="card-title">羊场管理</p>
        <basic-info :items="items" :models="models"></basic-info>

        <div class="card">
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
import { postFarm, getFarmById, updateFarm } from '@/util/getdata'
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            getFarmById(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List
                    let place = data.breedLocation
                    let arr = []
                    arr[0] = place.substr(0, place.indexOf('省') + 1)
                    arr[1] = place.substring(place.indexOf('省') + 1, place.indexOf('市') + 1)
                    arr[2] = place.substr(place.indexOf('市') + 1)
                    data.breedLocation = arr
                    let obj = {}
                    Object.keys(this.models).forEach(v => {
                        obj[v] = data[v]
                    })
                    this.models = obj
                }
            }).catch(_ => {
                this.$message.error('获取羊场信息失败')
            })
        }
    },

    data () {
        return {
            area: null,
            items: [
                {label: '羊场编号', model: 'pkNumber'},
                {label: '羊场名称', model: 'breedName'},
                {label: '羊场地理位置', model: 'breedLocation', type: 'address'},
                {label: '羊场详细位置', model: 'breedLocationDetail'},
                {label: '羊场负责人', model: 'responsiblePersonId', mr: 1},
                {label: '消毒场所', model: 'disinfectP'},
                {label: '上级代理', model: 'agent'},
                {label: '加入时间', model: 'createTime', type: 'time', mr: 1}
            ],
            models: {
                pkNumber: null,
                breedName: null,
                breedLocation: null,
                breedLocationDetail: null,
                responsiblePersonId: null,
                disinfectP: null,
                agent: null,
                createTime: null,
                remark: null
            }
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }

            let data = this.models
            if (Array.isArray(data.breedLocation)) {
                data.breedLocation = data.breedLocation.join('')
            }
            if (this.edit) {
                updateFarm(this.edit, data).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump('farm')
                    }
                }).catch('更新失败')
            } else {
                postFarm(data).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump('farm')
                    }
                }).catch('发布失败')
            }
        }
    }
}
</script>
