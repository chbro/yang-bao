<template>
    <div>
        <admin-table name="免疫" api="api/disinfectplan" editurl="/admin/health/disinfectprac?edit="></admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'

export default {
    components: {
        AdminTable
    }
}
</script>
