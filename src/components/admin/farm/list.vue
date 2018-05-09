<template>
    <div>
        <admin-table
            modpath="farm"
            find-by="aid"
            :no-prac="true"
            :hide-filter="true"
            :getData="getFarms"
            :deleteData="deleteFarm"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getFarms, deleteFarm } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getFarms,
            deleteFarm,
            headers: [
                {prop: 'agent', label: '上级代理'},
                {prop: 'pkNumber', label: '羊场编号'},
                {prop: 'breedName', label: '羊场名称'},
                {prop: 'breedLocation', label: '羊场地理位置', width: 250},
                {prop: 'responsiblePersonName', label: '羊场负责人'},
                {prop: 'disinfectP', label: '消毒场所'}
            ]
        }
    }
}
</script>
