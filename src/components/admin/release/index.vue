<template>
    <div class="admin-form release">
        <div class="release-module el-input-group__prepend">选择发布位置</div><el-cascader
            size="small"
            :options="options"
            v-model="type"
            @change="handleChange">
        </el-cascader>
        <el-input class="release-title block" size="small" v-model="title" placeholder="请输入标题">
            <template slot="prepend">标题:</template>
        </el-input>

        <p class="card-title file-wrap">发布系统<i class="iconfont icon-3801wenjian" @click="$refs.image.click()" title="上传图片"></i></p>
        <input type="file" ref="image" hidden @change="postReleaseFile()">
        <textarea v-loading="sendingImage" name="myeditor" id="myeditor"></textarea>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import '@/../static/ckeditor/ckeditor.js'
import { postRelease, getRelease, updateRelease } from '@/util/getdata'
import { isReqSuccessful, postJump, patchJump, resetFile } from '@/util/jskit'
import { baseUrl } from '@/util/fetch'

export default {
    mounted () {
        window.CKEDITOR.replace('myeditor')

        this.edit = this.$route.query.edit
        if (this.edit) {
            getRelease(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List
                    this.title = data.title
                    window.CKEDITOR.instances.myeditor.setData(data.content)
                    console.log(this.options.find(v => v.children.find(v2 => v2.value === data.type)))
                }
            })
        }
    },

    destroy () {
        let ins = window.CKEDITOR.instances.myeditor
        if (ins) {
            ins.destroy(true)
        }
    },

    data () {
        return {
            /* eslint-disable object-property-newline */
            sendingImage: false,
            options: [
                {label: '专家课堂', value: 0, children: [
                    {label: '模块1', value: '0'},
                    {label: '模块2', value: '1'}
                ]}
            ],
            type: null,
            config: {},
            operatorId: 1,
            operatorName: '老嫖',
            title: '',

            edit: false

        }
    },

    methods: {
        postReleaseFile () {
            let ref = this.$refs.image
            let file = ref.files[0]

            let formdata = new FormData()
            formdata.append('file', file)
            this.sendingImage = true
            window.fetch(baseUrl + '/notice/upload', {
                body: formdata,
                method: 'POST'
            }).then(async res => {
                let body = await res.json()
                if (isReqSuccessful(body)) {
                    this.$message.success('上传成功')
                    // remember to take http://
                    window.CKEDITOR.instances.myeditor.insertHtml(`<img src="http://${body.data.List}"/>`)
                }
                this.sendingImage = false
                resetFile(ref)
            }).catch(() => {
                this.$message.error('上传失败')
                this.sendingImage = false
                resetFile(ref)
            })
        },

        handleChange (v) {
            console.log(v)
        },

        submit () {
            let html = window.CKEDITOR.instances.myeditor.getData()
            console.log(html)

            if (!html.replace(/\s/g, '')) {
                this.$message.warning('发布信息不能为空')
            } else if (!this.type && this.type !== 0) {
                this.$message.warning('发布位置不能为空')
            } else {
                let { title, type, operatorId, operatorName } = this
                let data = {
                    type: type.pop(),
                    operatorId,
                    operatorName,
                    title,
                    content: html
                }
                if (this.edit) {
                    updateRelease(this.edit, data).then(res => {
                        if (isReqSuccessful(res)) {
                            patchJump('release')
                        }
                    }).catch('更新失败')
                } else {
                    postRelease(data).then(res => {
                        if (isReqSuccessful(res)) {
                            postJump('release')
                        }
                    }).catch('发布失败')
                }
            }
        }
    }
}
</script>

<style lang="stylus">
.release
    .release-to,
    .release-title
        margin 15px 0
    .release-module
        display inline-block
        line-height 32px
        font-size 14px
    .file-wrap
        position relative
        i
            position absolute
            bottom -96px
            color #000
            cursor pointer
</style>
