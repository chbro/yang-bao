<template>
    <div>
        <admin-table :getData="getGeneaRec" name="系谱档案" :postfix="false" :id="1" api="api/disinfectplan" editurl="/admin/health/disinfectprac?edit="></admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getGeneaRec } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getGeneaRec
        }
    }
}
</script>
