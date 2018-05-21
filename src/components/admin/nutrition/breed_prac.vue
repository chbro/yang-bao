<template>
    <div>
        <data-cur
            title="配种产子实施档案----配种"
            modpath="nutrition/breed"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :get-data="getBreeding"
            :post-data="postBreeding1"
            :update-data="updateBreeding">
        </data-cur>
        <data-cur
            title="配种产子实施档案----产前免疫"
            modpath="nutrition/breed"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items_2"
            :has-remark="false"
            :get-data="getBreeding"
            :post-data="postBreeding1"
            :update-data="updateBreeding"
            class="data-cur-2">
        </data-cur>
        <data-cur
            title="配种产子实施档案----产子"
            modpath="nutrition/breed"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items_3"
            :has-remark="false"
            :get-data="getBreeding"
            :post-data="postBreeding1"
            :update-data="updateBreeding"
            class="data-cur-2">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getBreeding, postBreeding1, postBreeding2, updateBreeding } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getBreeding,
            postBreeding1,
            updateBreeding,
            items: [
                {label: '配种后移至栏/栋', model: 'building'},
                {label: '母羊商标耳牌', model: 'mEtB'},
                {label: '种公商标耳牌', model: 'fEtB', mr: 1},
                {label: '配种时间', model: 'breedingT', type: 'time'},
                {label: '妊娠时间', model: 'gestationT', type: 'time'},
                {label: '备注', model: 'info'},                
            ],
            items_2: [
                {label: '产前免疫种类', model: 'prenatalTP'},                
                {label: '产前免疫时间', model: 'prenatalIT', type: 'time'},
                {label: '备注', model: 'info'},                                
            ],
            items_3: [
                {label: '移至待产栏/栋', model: 'building'},
                {label: '产羔时间', model: 'lambingTime', type: 'time'},
                {label: '产羔数量', model: 'lambingNum'},
                {label: '备注', model: 'info'}
            ],
            models: {
                building: null,
                mEtB: null,
                fEtB: null,
                breedingT: null,
                gestationT: null,
                prenatalTP: null,                
                prenatalIT: null,
            }
        }
    }
}
</script>
<style>
    .data-cur-2 {
        margin-top: 30px;
        margin-bottom: 10px;
    }
</style>

