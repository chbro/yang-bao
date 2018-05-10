<template>
    <div>
        <el-tooltip class="item" effect="dark" content="点击获取直播推流地址" placement="top">
            <el-button :disabled="disabled" type="primary" size="small" @click="getPushUrl" title="">我要直播</el-button>
        </el-tooltip>
        <template v-if="pushUrl">
            <span class="address" v-text="pushUrl"></span>
            <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
                <i @click="copy" class="el-icon-document icon_copy"></i>
            </el-tooltip>
        </template>
        <div class="publish">
            <h2 v-text="title"></h2>
            <p class="course-richtext" v-html="content"></p>
        </div>
    </div>
</template>

<script>
import { getPushUrl, getReleaseByName } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data() {
        return {
            content: '',
            title: '',
            pushUrl: '',
            disabled: false
        }
    },

    async mounted () {
        let res = await getReleaseByName('course')
        let data = res.data.List[0]
        this.title = data.title
        this.content = data.content
    },

    methods: {
        getPushUrl() {
            getPushUrl(this.$route.params.id).then((res) => {
                if(isReqSuccessful(res)) {
                    this.pushUrl = res.data.liveBroadcastResp.data.pushUrl
                    this.disabled = true
                }
            })
        },
        // 复制
        copy () {
            var oInput = document.createElement('input')
            oInput.value = this.pushUrl
            document.body.appendChild(oInput)
            oInput.select() // 选择对象
            document.execCommand("Copy") // 执行浏览器复制命令
            document.body.removeChild(oInput)
        }
    }
}
</script>

<style lang="stylus" scoped>
.address
    display inline-block
    margin 0 0 0 10px
    font-size 14px
.icon_copy
    font-size 18px
    cursor pointer
.course-richtext
    img
        max-width 100%
.publish
    h2
        text-align center
    p
        text-indent 2em
</style>
