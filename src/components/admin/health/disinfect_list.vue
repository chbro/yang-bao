<template>
    <div>
        <admin-table
            :getData="getDisinfect"
            :deleteData="deleteDisinfect"
            name="消毒档案"
            :postfix="false"
            :isDisinfect="true"
            :id="1"
            modpath="health/disinfectprac"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getDisinfect, deleteDisinfect } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getDisinfect,
            deleteDisinfect,
            headers: [
                {prop: 'disinfectTime', label: '消毒时间', width: '230'},
                {prop: 'disinfectName', label: '消毒药品名称'},
                {prop: 'dose', label: '用药剂量'},
                {prop: 'disinfectWay', label: '消毒方法', width: '260'}
            ]
        }
    }
}
</script>
