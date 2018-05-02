<template>
    <div>
        <admin-table
            modpath="farm"
            find-by="aid"
            :is-restful="true"
            :hide-filter="true"
            :getData="getAllFarms"
            :deleteData="deleteFarm"
            :is-release="true"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllFarms, deleteFarm } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllFarms,
            deleteFarm,
            headers: [
                {prop: 'pkNumber', label: '羊场编号'},
                {prop: 'breedName', label: '羊场名称'},
                {prop: 'breedLocation', label: '羊场地理位置'},
                {prop: 'responsiblePersonid', label: '羊场负责人'},
                {prop: 'disinfectP', label: '消毒场所'},
                {prop: 'agent', label: '上级代理'}
            ]
        }
    }
}
</script>
