<template>
    <div>
        <data-cur
            title="羊场管理"
            modpath="farm"
            :update-submitter="true"
            is-agent
            :models.sync="models"
            :items="items"
            :get-data="getFarmById"
            :post-data="postFarm"
            :update-data="updateFarm">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { postFarm, updateFarm, getFarmById } from '@/util/getdata'
// import { addressToArray, isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        dataCur
    },

    // mounted () {
    //     this.edit = this.$route.query.edit
    //     if (this.edit) {
    //         getFarmById(this.edit).then(res => {
    //             if (isReqSuccessful(res)) {
    //                 let data = res.data.model
    //                 let obj = {}
    //                 Object.keys(this.models).forEach(v => {
    //                     obj[v] = data[v]
    //                 })
    //                 obj.breedLocation = addressToArray(obj.breedLocation)
    //                 this.models = obj
    //             }
    //         }, _ => {
    //             this.$message.error('获取羊场失败')
    //         })
    //     }
    // },

    data () {
        return {
            getFarmById,
            postFarm,
            updateFarm,
            items: [
                {label: '羊场编号', model: 'pkNumber'},
                {label: '羊场名称', model: 'breedName'},
                {label: '羊场地理位置', model: 'breedLocation', type: 'address'},
                {label: '羊场详细位置', model: 'breedLocationDetail'},
                {label: '羊场负责人', model: 'responsiblePersonId', mr: 1},
                {label: '消毒场所', model: 'disinfectP'},
                // {label: '上级代理', model: 'agent'},
                {label: '加入时间', model: 'createTime', type: 'time'}
            ],
            models: {
                pkNumber: null,
                breedName: null,
                breedLocation: null,
                breedLocationDetail: null,
                responsiblePersonId: null,
                disinfectP: null,
                // agent: null,
                createTime: null,
                remark: null
            }
        }
    }
}
</script>
