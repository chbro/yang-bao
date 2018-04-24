<template>
    <div>
        <admin-table
            :getData="getGeneas"
            :deleteData="deleteGeneaRec"
            name="系谱档案"
            :postfix="false"
            :id="1"
            modpath="genealogic"
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
                {prop: 'gmtCreate', label: '录入时间', width: '230'},
                {prop: 'nativeEartag', label: '原耳牌'},
                {prop: 'immuneEartag', label: '免疫耳牌'},
                {prop: 'tradeMarkEartag', label: '商标耳牌'},
                {prop: 'typeName', label: '品种'},
                {prop: 'breedingSheepBase', label: '种羊基地'}
            ]
        }
    }
}
</script>
