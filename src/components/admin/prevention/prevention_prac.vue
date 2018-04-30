<template>
    <div>
        <data-cur
            title="疫病防治实施档案"
            modpath="prevention"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :get-data="getPrevention"
            :post-data="postPrevention"
            :update-data="updatePrevention">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getPrevention, postPrevention, updatePrevention } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getPrevention,
            postPrevention,
            updatePrevention,
            items: [
                {label: '商标耳牌号', model: 'earTag'},
                {label: '栏/栋', model: 'buildingNum'},
                {label: '诊断结果', model: 'diagnosisResult'},
                {label: '诊断方法', model: 'diagnosisMethod'},
                {label: '诊断效果', model: 'treatEffect', mr: 1},
                {label: '监督确认时间', type: 'time', model: 'gmtSup'},
                {label: '诊疗时间', type: 'time', model: 'diagnosisTime'},
                {label: '剂量', model: 'dose', mr: 1}
            ],
            models: {
                diagnosisMethod: null,
                buildingNum: null,
                diagnosisResult: null,
                gmtSup: null,
                diagnosisTime: null,
                earTag: null,
                treatEffect: null,
                dose: null
            }
        }
    }
}
</script>
