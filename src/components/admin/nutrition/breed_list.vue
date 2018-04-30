<template>
    <div>
        <admin-table
            modpath="nutrition/breed"
            :getData="getAllBreeding"
            :deleteData="deleteBreeding"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllBreeding, deleteBreeding } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllBreeding,
            deleteBreeding,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'building', label: '栏/栋'},
                {prop: 'mEtI', label: '母羊免疫耳牌'},
                {prop: 'mEtB', label: '母羊商标耳牌'},
                {prop: 'quantity', label: '产羔'}
            ]
        }
    }
}
</script>
