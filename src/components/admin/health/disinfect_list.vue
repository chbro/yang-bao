<template>
    <div>
        <admin-table
            modpath="health/disinfect"
            find-by="factoryNum"
            :is-disinfect="true"
            :get-data="getAllDisinfects"
            :delete-data="deleteDisinfect"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllDisinfects, deleteDisinfect } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllDisinfects,
            deleteDisinfect,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: 100},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'disinfectTime', label: '消毒时间', width: 180},
                {prop: 'disinfectName', label: '消毒药品名称', width: 180},
                {prop: 'dose', label: '用药剂量'},
                {prop: 'disinfectWay', label: '消毒方法', width: '160'},
                {prop: 'remark', label: '备注', width: '200'},
            ]
        }
    }
}
</script>
