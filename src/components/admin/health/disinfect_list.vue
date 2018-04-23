<template>
    <div>
        <admin-table name="消毒档案" :postfix="false" :getData="getDisinfectList" :deleteData="deleteDisinfect" modpath="health/disinfectprac"></admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getDisinfectList, deleteDisinfect } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getDisinfectList,
            deleteDisinfect
        }
    }
}
</script>
