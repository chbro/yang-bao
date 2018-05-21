<template>
    <div>
        <admin-table
            name="免疫实施档案"
            modpath="health/immune"
            find-by="factoryNum"
            :get-data="getAllImmune"
            :delete-data="deleteImmune"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllImmune, deleteImmune } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllImmune,
            deleteImmune,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '养殖场'},
                {prop: 'crowdNum', label: '接种羊(群)', width: '180'},
                {prop: 'eartagFile', label: '免疫耳牌附件号'},
                {prop: 'immuneTime', label: '接种时间', width: '180'},
                {prop: 'immuneKind', label: '疫苗种类'},
                {prop: 'immuneWay', label: '接种方法'},
                {prop: 'dose', label: '接种剂量(ml)'},
                {prop: 'immuneDuring', label: '免疫期', width: '160'},
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注', width: '200'}
            ]
        }
    }
}
</script>
