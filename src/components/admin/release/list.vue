<template>
    <div>
        <admin-table
            modpath="release"
            :getData="getAllRelease"
            :deleteData="deleteRelease"
            :is-release="true"
            :no-prac="true"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllRelease, deleteRelease } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllRelease,
            deleteRelease,
            headers: [
                {prop: 'ispassCheck', label: '审核状态'},
                {prop: 'operatorName', label: '发布人'},
                {prop: 'type', label: '发布位置'},
                {prop: 'title', label: '标题'},
                {prop: 'content', label: '内容', width: '260'}
            ]
        }
    }
}
</script>
