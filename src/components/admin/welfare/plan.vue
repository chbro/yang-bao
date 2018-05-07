<template>
    <div>
        <admin-table
            v-if="!this.isView"
            modpath="welfare"
            is-plan
            :get-data="getAllWelfare"
            :delete-data="deleteWelfare"
            :headers="headers">
        </admin-table>
        <p v-else v-text="plantext"></p>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllWelfare, getWelfare, deleteWelfare } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            isView: false,
            plantext: '',

            getAllWelfare,
            deleteWelfare,
            headers: [
                {prop: 'operatorName', label: '发布人'},
                {prop: 'type', label: '发布位置'},
                {prop: 'title', label: '标题'},
                {prop: 'content', label: '内容', width: 520}
            ]
        }
    },

    mounted () {
        this.isView = this.$route.query.view
        if (this.isView !== undefined) {
            getWelfare(this.isView).then(res => {
                if (isReqSuccessful(res)) {
                    this.plantext = res.data
                }
            })
        }
    }
}
</script>
