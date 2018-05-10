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
            <el-button v-if="!view" type="primary" @click="submit()">提交/更新</el-button>
            <el-button v-else type="primary" @click="$router.back()">返回</el-button>
        </div>
    </div>
</template>

<script>
import '@/../static/ckeditor/ckeditor.js'
import { postRelease, getReleaseById, updateRelease, getUserById } from '@/util/getdata'
import { isReqSuccessful, postJump, patchJump, resetFile } from '@/util/jskit'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

export default {
    created () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
            }
        })
    },

    mounted () {
        window.CKEDITOR.replace('myeditor')

        this.edit = this.$route.query.edit || this.$route.query.view
        this.view = this.$route.query.view
        if (this.edit) {
            getReleaseById(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.model
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
                {label: '专家在线课堂', value: 'course'},
                {label: '首页介绍', value: 'index', children: [
                    {label: '集团', value: 'company'},
                    {label: '产品', value: 'product'},
                    {label: '有机', value: 'organic'},
                    {label: '效益', value: 'efficiency'},
                    {label: '加盟', value: 'join'},
                    {label: '新闻', value: 'news'},
                    {label: '联系我们', value: 'contact'}
                ]},
                {label: '生产方案', value: 'record', children: [
                    {label: '卫生与动物福利管理', value: 'welfare'},
                    {label: '免疫', value: 'immune'},
                    {label: '驱虫', value: 'antiscolic'},
                    {label: '阶段营养', value: 'stage'},
                    {label: '配种产子管理', value: 'breed'},
                    {label: '疫病防治', value: 'prevention'}
                ]}
            ],
            type: null,
            config: {},
            title: '',

            edit: false,
            view: false

        }
    },

    methods: {
        postReleaseFile () {
            let ref = this.$refs.image
            let file = ref.files[0]

            let formdata = new FormData()
            formdata.append('file', file)
            this.sendingImage = true
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/notice/upload', {
                body: formdata,
                method: 'POST',
                headers
            }).then(async res => {
                let body = await res.json()
                if (isReqSuccessful(body)) {
                    this.$message.success('上传成功')
                    // remember to take http://
                    window.CKEDITOR.instances.myeditor.insertHtml(`<img style="max-width: 100%" src="http://${body.data.List}"/>`)
                }
                this.sendingImage = false
                resetFile(ref)
            }, () => {
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

            if (!html.replace(/\s/g, '')) {
                this.$message.warning('发布信息不能为空')
            } else if (!this.type && this.type !== 0) {
                this.$message.warning('发布位置不能为空')
            } else {
                let type = this.type.slice(0).pop()
                let data = {
                    type,
                    title: this.title,
                    content: html,
                    operatorId: this.user.id,
                    operatorName: this.user.pkUserid
                }
                if (this.edit) {
                    updateRelease(this.edit, data).then(res => {
                        if (isReqSuccessful(res)) {
                            patchJump('release')
                        }
                    }, _ => {
                        this.$message.error('更新失败')
                    })
                } else {
                    postRelease(data).then(res => {
                        if (isReqSuccessful(res)) {
                            postJump('release')
                        }
                    }, _ => {
                        this.$message.error('发布失败')
                    })
                }
            }
        }
    }
}
</script>

<style lang="stylus">
.release
    .release-title
        width 355px
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
            right 430px
            color #000
            cursor pointer
</style>
