<template>
    <div>
        <admin-table
            modpath="genealogic"
            :has-unpass="false"
            :has-sup="false"
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
                {prop: 'gmtCreate', label: '录入时间', width: '200'},
                {prop: 'nativeEartag', label: '原耳牌'},
                {prop: 'immuneEartag', label: '免疫耳牌'},
                {prop: 'tradeMarkEartag', label: '商标耳牌'},
                {prop: 'breedingSheepBase', label: '种羊基地'},
                {prop: 'birthTime', label: '初登时间', width: '200'},
                {prop: 'birthWeight', label: '初登体重'},
                {prop: 'color', label: '颜色'},
                {prop: 'sex', label: '性别'},
                {prop: 'eartagOfFather', label: '父号'},
                {prop: 'eartagOfMother', label: '母号'},
                {prop: 'eartagOfFathersFather', label: '父父号'},
                {prop: 'eartagOfFathersMother', label: '父母号'},
                {prop: 'eartagOfMothersFather', label: '母父号'},
                {prop: 'eartagOfMothersMother', label: '母母号'},
                {prop: 'typeName', label: '品种名'},
                {prop: 'remark', label: '备注', width: '200'}
            ]
        }
    }
}
</script>
