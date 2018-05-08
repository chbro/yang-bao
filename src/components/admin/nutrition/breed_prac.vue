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
                {label: '配种后移至栏/栋', model: 'building'},
                {label: '母羊商标耳牌', model: 'mEtB'},
                {label: '种公商标耳牌', model: 'fEtB', mr: 1},
                {label: '配种时间', model: 'breedingT', type: 'time'},
                {label: '妊娠时间', model: 'gestationT', type: 'time'},
                {label: '产前免疫种类及时间', model: 'prenatalIT', doubleWidth: true, type: 'time'},
            ],
            models: {
                building: null,
                mEtB: null,
                fEtB: null,
                breedingT: null,
                gestationT: null,
                prenatalIT: null,
            }
        }
    }
}
</script>
