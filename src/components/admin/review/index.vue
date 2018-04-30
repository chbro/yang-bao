<template>
    <div>
        <admin-table
            modpath="review"
            :getData="getAllReviews"
            :chekcData="doReview"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllReviews, doReview } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllReviews,
            doReview,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
                {prop: 'building', label: '提交人'},
                {prop: 'mEtI', label: '提交时间'},
                {prop: 'mEtB', label: '文件'}
            ]
        }
    }
}
</script>
