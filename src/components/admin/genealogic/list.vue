<template>
    <div>
        <admin-table
            modpath="genealogic"
            find-by="factoryNum"
            hide-filter
            :getData="getGeneas"
            :deleteData="deleteGeneaRec"
            :isGenea="true"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getGeneas, deleteGeneaRec } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getGeneas,
            deleteGeneaRec,
            headers: [
                {prop: 'gmtCreate', label: '录入时间', width: 200},
                {prop: 'nativeEartag', label: '原耳牌'},
                {prop: 'immuneEartag', label: '免疫耳牌'},
                {prop: 'tradeMarkEartag', label: '商标耳牌'},
                {prop: 'typeName', label: '品种', width: 150},
                {prop: 'breedingSheepBase', label: '种羊基地'}
            ]
        }
    }
}
</script>
