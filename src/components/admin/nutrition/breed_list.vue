<template>
    <div>
        <admin-table
            :getData="getImmune"
            :deleteData="deleteImmune"
            name="免疫实施档案"
            :postfix="false"
            :id="1"
            modpath="health/immuneprac"
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
                {prop: 'disinfectTime', label: '消毒时间', width: '180'},
                {prop: 'disinfectName', label: '消毒药品名称'},
                {prop: 'dose', label: '用药剂量'},
                {prop: 'disinfectWay', label: '消毒方法', width: '160'}
            ]
        }
    }
}
</script>
