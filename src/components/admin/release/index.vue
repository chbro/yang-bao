<template>
    <div class="admin-form">
        <p class="card-title">发布系统</p>

        <textarea
            name="myeditor"
            id="myeditor"
            v-model="html">
        </textarea>
        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import Submitter from '@/components/admin/submitter'
import '@/../static/ckeditor/ckeditor.js'
import { checkSubmit } from '@/util/jskit'

export default {
    components: {
        Submitter
    },

    mounted () {
        console.log(window.CKEDITOR)
        window.CKEDITOR.replace('myeditor')
    },

    destroy () {
        let ins = window.CKEDITOR.instances.myeditor
        if (ins) {
            ins.destroy(true)
        }
    },

    data () {
        return {
            html: '',
            config: {},
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
