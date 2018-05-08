<template>
    <div>
        <data-cur
            title="疫病防治实施档案"
            modpath="prevention"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="true"
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
                {label: '日期', type: 'time', model: 'diagnosisTime'},
                {label: '栏/栋', model: 'buildingNum'},
                {label: '商标耳牌号', model: 'earTag',mr: 1},
                {label: '观察检测分析症状',model: 'symptom'},
                {label: '诊断结果', model: 'diagnosisResult'},
                {label: '治疗方案及用药剂量', model: 'diagnosisMethod',mr: 1},
                {label: '总用药量',model: 'dose'},
                {label: '治疗效果', model: 'treatEffect', mr: 1}
            ],
            models: {
                diagnosisMethod: null,
                buildingNum: null,
                diagnosisResult: null,
                symptom:null,
                diagnosisTime: null,
                earTag: null,
                treatEffect: null,
                dose: null,
                remark: null
            }
        }
    }
}
</script>
