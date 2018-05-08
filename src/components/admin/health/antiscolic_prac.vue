<template>
    <div>
        <formdata-cur
            title="驱虫实施档案"
            modpath="health/antiscolic"
            apiurl="rp"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :get-data="getAntiscolic">
        </formdata-cur>
    </div>
</template>

<script>
import formdataCur from '@/components/admin/common/formdataCUR'
import { getAntiscolic } from '@/util/getdata'
import { getMedicines, getWays, getDoses } from '@/util/dataselect'

export default {
    components: {
        formdataCur
    },

    data () {
        /* eslint-disable object-property-newline */
        return {
            getAntiscolic,
            items: [
                {label: '驱虫羊(群)', model: 'crowdNum'},
                {label: '耳牌附件号', model: 'eartagFile', type: 'file'},
                {label: '驱虫时间', model: 'repellentTime', type: 'time',mr: 1},
                {label: '药物名称', model: 'repellentName', type: 'select', fetchSuggestions: getMedicines},
                {label: '给药途径', model: 'repellentWay', type: 'select', fetchSuggestions: getWays},
                {label: '给药剂量(ml)', model: 'dose', type: 'select', fetchSuggestions: getDoses,mr: 1}
            ],
            models: {
                eartagFile: null,
                crowdNum: null,
                repellentTime: null,
                repellentName: null,
                repellentWay: null,
                dose: null,
                remark: null
            }
        }
    }
}
</script>
