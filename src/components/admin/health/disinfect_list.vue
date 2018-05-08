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
                {prop: 'disinfectTime', label: '日期', width: 200},
                {prop: 'place', label: '消毒场所'},
                {prop: 'disinfectName', label: '消毒药名称'},
                {prop: 'dose', label: '用药剂量'},
                {prop: 'disinfectWay', label: '消毒方法'},
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注', width: '200'},
            ]
        }
    }
}
</script>
