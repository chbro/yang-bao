<template>
    <div>
        <admin-table
            name="疾病防治"
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
                {label: '诊断结果', prop: 'diagnosisResult'},
                {label: '诊断方法', prop: 'diagnosisMethod'},
                {label: '监督确认时间', type: 'time', prop: 'gmtSup'},
                {label: '诊疗时间', type: 'time', prop: 'diagnosisTime'},
                {label: '种公羊商标耳牌', prop: 'buildingNum'},
                {label: '商标耳牌号', prop: 'earTag'}
            ]
        }
    }
}
</script>
