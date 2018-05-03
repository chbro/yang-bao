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
                {label: '免疫耳牌号', model: 'eartagFile', type: 'file', block: true},
                {label: '接种羊（群）', model: 'crowdNum'},
                {label: '驱虫时间', model: 'repellentTime', type: 'time'},
                {label: '药物名称', model: 'repellentName', type: 'select', fetchSuggestions: getMedicines, mr: true},
                {label: '给药途径', model: 'repellentWay', type: 'select', fetchSuggestions: getWays},
                {label: '给药剂量', model: 'dose', type: 'select', fetchSuggestions: getDoses}
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
