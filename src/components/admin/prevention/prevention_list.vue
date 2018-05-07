<template>
    <div>
        <admin-table
            modpath="prevention"
            :getData="getAllPrevention"
            :deleteData="deletePrevention"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllPrevention, deletePrevention } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllPrevention,
            deletePrevention,
            headers: [
                {label: '日期', prop: 'diagnosisTime'},
                {label: '栏号/栋数',prop: 'buildingNum'},
                {label: '商标耳牌号', prop: 'earTag'},
                {label: '观察检测分析症状',prop: 'symptom'},
                {label: '诊断结果', prop: 'diagnosisResult'},

                {label: '治疗方案及用药剂量', prop: 'diagnosisMethod'},
                {label: '总用药量',prop: 'dose'},
                {label: '治疗效果',prop: 'treatEffect'}
                
                
            ]
        }
    }
}
</script>
