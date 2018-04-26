<template>
    <div class="admin-form">
        <div class="release-module el-input-group__prepend">选择发布位置</div><el-select size="small" class="release-to" v-model="type" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input class="release-title block" size="small" v-model="title" placeholder="请输入标题">
            <template slot="prepend">标题:</template>
        </el-input>

        <p class="card-title">发布系统</p>
        <textarea name="myeditor" id="myeditor"></textarea>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import '@/../static/ckeditor/ckeditor.js'
import { postRelease, getRelease, updateRelease } from '@/util/getdata'
import { isReqSuccessful, postJump, patchJump } from '@/util/jskit'

export default {
    mounted () {
        window.CKEDITOR.replace('myeditor')

        this.edit = this.$route.query.edit
        if (this.edit) {
            getRelease(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List[0]
                    this.title = data.title
                    this.content = data.content
                    this.type = data.type
                }
            }).catch(_ => {
                this.$message.error('获取发布档案失败')
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
            options: [
                {label: '专家课堂', value: '0'},
                {label: '发布位置2', value: '2'},
                {label: '发布位置3', value: '3'},
                {label: '发布位置4', value: '4'},
                {label: '发布位置5', value: '5'}
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
                    type: type,
                    operatorId,
                    operatorName,
                    title,
                    content: html
                }
                if (this.edit) {
                    updateRelease(data).then(res => {
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
.release-to,
.release-title
    margin-bottom 15px
.release-module
    display inline-block
    line-height 32px
    font-size 14px
</style>
