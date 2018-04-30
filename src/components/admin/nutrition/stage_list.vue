<template>
    <div>
        <admin-table
            :getData="getAllStages"
            :deleteData="deleteStage"
            name="阶段营养"
            modpath="nutrition/stage"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllStages, deleteStage } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllStages,
            deleteStage,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'nutritionT', label: '使用日期', width: '160'},
                {prop: 'building', label: '栋号'},
                {prop: 'quantity', label: '羊数'},
                {prop: 'period', label: '阶段'},
                {prop: 'water', label: '饮水'}
            ]
        }
    }
}
</script>
