<template>
    <div>
        <data-cur
            title="配种产子实施档案"
            modpath="nutrition/breed"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :get-data="getBreeding"
            :post-data="postBreeding"
            :update-data="updateBreeding">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getBreeding, postBreeding, updateBreeding } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getBreeding,
            postBreeding,
            updateBreeding,
            items: [
                {label: '栏/栋', model: 'building'},
                {label: '母羊免疫耳牌', model: 'mEtI'},
                {label: '母羊商标耳牌', model: 'mEtB', mr: 1},
                {label: '种公羊免疫耳牌', model: 'fEtI'},
                {label: '种公羊商标耳牌', model: 'fEtB'},
                {label: '配种时间', model: 'breedingT', type: 'time'},
                {label: '妊娠时间', model: 'gestationT', type: 'time'},
                {label: '产羔时间', model: 'cubT', type: 'time', mr: 1},
                {label: '产前免疫（三联四防）接种时间', model: 'prenatalIT', doubleWidth: true, type: 'time'},
                {label: '产羔', model: 'quantity', type: 'number', mr: 1}
            ],
            models: {
                building: null,
                mEtI: null,
                mEtB: null,
                fEtI: null,
                fEtB: null,
                breedingT: null,
                gestationT: null,
                prenatalIT: null,
                cubT: null,
                quantity: null
            }
        }
    }
}
</script>
