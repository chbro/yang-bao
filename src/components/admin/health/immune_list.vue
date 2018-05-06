<template>
    <div>
        <admin-table
            :getData="getImmune"
            :deleteData="deleteImmune"
            name="免疫实施档案"
            :postfix="false"
            :id="1"
            modpath="health/immune"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getImmune, deleteImmune } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getImmune,
            deleteImmune,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'immuneTime', label: '接种时间', width: '180'},
                {prop: 'immuneWay', label: '接种方法'},
                {prop: 'immuneKind', label: '疫苗种类'},
                {prop: 'dose', label: '接种剂量'},
                {prop: 'immuneDuring', label: '免疫期', width: '160'},
                {prop: 'remark', label: '备注', width: '200'}
            ]
        }
    }
}
</script>
