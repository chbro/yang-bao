<template>
    <div>
        <admin-table :tableData="tableData" name="系谱档案" :postfix="false" api="api/disinfectplan" editurl="/admin/health/disinfectprac?edit="></admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            tableData: [
                {id: 1, date: '2018-4-22', name: 'xxx填写的系谱档案'},
                {id: 2, date: '2018-4-22', name: 'xxx填写的第二个系谱档案'}
            ]
        }
    }
}
</script>
