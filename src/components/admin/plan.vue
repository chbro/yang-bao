<template>
    <div>
        <admin-table
            v-if="!this.isView"
            :modpath="releaseType + 'plan'"
            :release-type="releaseType"
            :headers="headers">
        </admin-table>
        <div class="release-article" v-else>
            <h2 v-text="title"></h2>
            <div v-html="content"></div>
            <el-button size="small" @click="$router.push({name: releaseType + 'plan'})">返回列表</el-button>
        </div>
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
        '$route': {
            handler (newV) {
                this.isView = newV.query.view
                if (this.isView) {
                    this.getContent()
                }
            },
            immediate: true
        }
    },

    data () {
        return {
            isView: false,
            content: '',
            title: '',

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
    },

    methods: {
        async getContent (id = this.isView) {
            let res = await getReleaseById(id)
            let data = res.data.model
            this.title = data.title
            this.content = data.content
        }
    }
}
</script>
