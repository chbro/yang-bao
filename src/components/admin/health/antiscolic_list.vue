<template>
    <div>
        <admin-table
            modpath="health/antiscolic"
            find-by="factoryNum"
            :get-data="getAllAntiscolic"
            :delete-data="deleteAntiscolic"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllAntiscolic, deleteAntiscolic } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllAntiscolic,
            deleteAntiscolic,
            headers: [
                {prop: 'ispassCheck', label: '审核状态'},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'repellentTime', label: '驱虫时间', width: 160},
                {prop: 'repellentName', label: '药物名称', width: 160},
                {prop: 'dose', label: '给药剂量'},
                {prop: 'repellentWay', label: '给药方式', width: '160'},
                {prop: 'remark', label: '备注', width: '200'}
            ]
        }
    }
}
</script>
