<template>
    <div>
        <admin-table v-if="!edit" name="疾病防治" api="api/disinfectplan"></admin-table>

        <admin-table v-else name="疾病防治" api="api/disinfectplan" editurl="hehe"></admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'

export default {
    props: {
        edit: {
            type: Boolean,
            default: false
        }
    },

    mounted () {
        console.log(this.edit)
    },

    components: {
        AdminTable
    }
}
</script>
