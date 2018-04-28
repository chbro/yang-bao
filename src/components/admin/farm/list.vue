<template>
    <div>
        <admin-table
            :getData="getFarms"
            :deleteData="deleteFarm"
            name="羊场"
            :postfix="false"
            :is-release="true"
            modpath="farm"
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
