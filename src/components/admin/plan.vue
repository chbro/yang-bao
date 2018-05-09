<template>
    <div>
        <admin-table
            v-if="!this.isView"
            :modpath="releaseType + 'plan'"
            :release-type="releaseType"
            :headers="headers">
        </admin-table>
        <p v-else v-text="plantext"></p>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getReleaseById } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        AdminTable
    },

    props: {
        releaseType: {
            type: String
        }
    },

    watch: {
        '$route' (newV) {
            this.isView = newV.query.view
        }
    },

    data () {
        return {
            isView: false,
            plantext: '',
            headers: [
                {prop: 'gmtCreate', label: '发布时间', width: 200},
                {prop: 'operatorName', label: '发布人'},
                {prop: 'title', label: '标题'},
                {prop: 'content', label: '内容', width: 410}
            ]
        }
    },

    mounted () {
        this.isView = this.$route.query.view
        if (this.isView !== undefined) {
            getReleaseById(this.isView).then(res => {
                if (isReqSuccessful(res)) {
                    this.plantext = res.data.List
                }
            })
        }
    }
}
</script>
