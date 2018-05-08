<template>
    <div>
        <formdata-cur
            title="免疫实施档案"
            modpath="health/immune"
            apiurl="ip"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :get-data="getImmune">
        </formdata-cur>
    </div>
</template>

<script>
import formdataCur from '@/components/admin/common/formdataCUR'
import { getImmune } from '@/util/getdata'
import { getImmuneTypes, getDoses, getInfectWays, getPeriods } from '@/util/jskit'

export default {
    components: {
        formdataCur
    },

    data () {
        return {
            getImmune,
            items: [
                {label: '接种羊(群)', model: 'crowdNum'},
                {label: '免疫耳牌附件号', model: 'eartagFile', type: 'file'},
                {label: '接种时间', model: 'immuneTime', type: 'time',mr: 1},
                {label: '疫苗种类', model: 'immuneKind', type: 'select', fetchSuggestions: getImmuneTypes},
                {label: '接种方法', model: 'immuneWay', type: 'select', fetchSuggestions: getInfectWays},
                {label: '接种剂量(ml)', model: 'dose', type: 'select', fetchSuggestions: getDoses,mr: 1},
                {label: '免疫期', model: 'immuneDuring', type: 'select', fetchSuggestions: getPeriods, mr: 1}
            ],
            models: {
                eartagFile: null,
                immuneTime: null,
                crowdNum: null,
                immuneKind: null,
                immuneWay: null,
                dose: null,
                immuneDuring: null,
                remark: null
            }
        }
    }
}
</script>
