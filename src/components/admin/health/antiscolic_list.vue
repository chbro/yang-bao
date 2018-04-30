<template>
    <div>
        <admin-table
            name="驱虫档案"
            modpath="health/antiscolic"
            :getData="getAntiscolic"
            :deleteData="deleteAntiscolic"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAntiscolic, deleteAntiscolic } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAntiscolic,
            deleteAntiscolic,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '100'},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'repellentTime', label: '驱虫时间', width: '160'},
                {prop: 'repellentName', label: '药物名称'},
                {prop: 'dose', label: '给药剂量'},
                {prop: 'repellentWay', label: '给药方式', width: '160'}
            ]
        }
    }
}
</script>
