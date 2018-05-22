<template>
    <div>
        <admin-table
            modpath="nutrition/breed"
            :getData="getAllBreeding"
            :deleteData="deleteBreeding"
            :headers1="headers_1"
            :headers2="headers_2"
            :headers3="headers_3">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import { getAllBreeding, deleteBreeding } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllBreeding,
            deleteBreeding,
            headers_1: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '养殖场'},
                {label: '配种后移至栏/栋', prop: 'building'},
                {label: '母羊商标耳牌', prop: 'mEtB'},
                {label: '种公商标耳牌', prop: 'fEtB'},
                {label: '配种时间', prop: 'breedingT'},
                {label: '妊娠时间', prop: 'gestationT'},           
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注'}
            ],
            headers_3: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {label: '移至待产栏/栋', prop: 'building'},
                {label: '产羔时间', prop: 'breedingT'},
                {label: '产羔数量', prop: 'gestationT'},             
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注'}
            ],
            headers_2: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {label: '产前免疫种类', prop: 'prenatalIT'},
                {label: '产前免疫时间', prop: 'prenatalIT'},     
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注'}
            ]
        }
    }
}
</script>
