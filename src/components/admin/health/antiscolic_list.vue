<template>
    <div>
        <admin-table
            modpath="health/antiscolic"
            has-common-tail-header
            has-common-header
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
                {prop: 'crowdNum', label: '驱虫羊(群)'},
                {prop: 'eartagFile', label: '耳牌附件号'},
                {prop: 'repellentTime', label: '驱虫时间', width: 200},
                {prop: 'repellentName', label: '药物名称', width: 160},
                {prop: 'repellentWay', label: '给药途径', width: '160'},
                {prop: 'dose', label: '给药剂量(ml)'},
                {prop: 'remark', label: '备注', width: '200'}
            ]
        }
    }
}
</script>
