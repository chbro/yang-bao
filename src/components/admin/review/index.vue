<template>
    <div>
        <admin-table
            modpath="review"
            find-by="aid"
            :is-review="true"
            :get-data="getAllDisinfects"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllDisinfects } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllDisinfects,
            headers: [
                {prop: 'ispassCheck', label: '审核状态'},
                {prop: 'factoryName', label: '工厂名', width: 200},
                {prop: 'building', label: '提交人', width: 180},
                {prop: 'mEtI', label: '提交时间', width: 200},
                {prop: 'mEtB', label: '文件', width: 200}
            ]
        }
    }
}
</script>
