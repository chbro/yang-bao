<template>
    <div class="admin-form">
        <p class="card-title">操作流程审核</p>

        <quill-editor v-model="html"></quill-editor>
        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import Submitter from '@/components/admin/submitter'
import { checkSubmit } from '@/util/jskit'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    components: {
        Submitter, quillEditor
    },

    data () {
        return {
            html: '',
            submitter: {}
        }
    },

    submit () {
        if (!this.html.replace(/\s/g, '')) {
            return false
        }
        if (!checkSubmit(this.submitter)) {
            return false
        }
        console.log(this.html)
    }
}
</script>

<style lang="stylus">

</style>
