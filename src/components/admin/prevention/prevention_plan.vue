<template>
    <div>
        <admin-table name="疾病防治" api="api/disinfectplan" editurl="/admin/health/disinfectprac?edit="></admin-table>
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
