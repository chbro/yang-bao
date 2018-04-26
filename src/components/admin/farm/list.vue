<template>
    <div>
        <admin-table :getData="getGeneaRec" name="羊场" :postfix="false" :id="1" modpath="farm"></admin-table>
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
