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
                {label: '配种后移至栏/栋', prop: 'building'},
                {label: '母羊商标耳牌', prop: 'mEtB'},
                {label: '种公羊商标耳牌', prop: 'fEtB'},
                {label: '配种时间', prop: 'breedingT'},
                {label: '妊娠时间', prop: 'gestationT'},
                {label: '产前免疫种类及时间', prop: 'prenatalIT'},
                {prop: 'remark', label: '备注'}
            ]
        }
    }
}
</script>
