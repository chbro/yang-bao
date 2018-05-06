<template>
    <div>
        <admin-table
            modpath="welfare"
            :getData="getAllWelfare"
            :deleteData="deleteWelfare"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllWelfare, deleteWelfare } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllWelfare,
            deleteWelfare,
            headers: [
                {prop: 'ispassCheck', label: '审核状态'},
                {prop: 'factoryName', label: '工厂名', width: 150},
                {prop: 'building', label: '自检/主管上级检查时间', width: 300}
            ]
        }
    }
}
</script>
