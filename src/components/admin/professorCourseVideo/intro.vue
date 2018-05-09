<template>
    <div>
        <el-button size="small" @click="getPushUrl">获取推流地址</el-button>
        <span class="address" v-show="pushUrl" v-text="pushUrl"></span>
        <div class="publish">
            <h2 v-text="title"></h2>
            <p class="course-richtext" v-html="content"></p>
        </div>
    </div>
</template>

<script>
import { getReleaseByName } from '@/util/getdata'

export default {
    data() {
        return {
            content: '',
            title: '',
            pushUrl: ''
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
            // TODO
        }
    }
}
</script>

<style lang="stylus" scoped>
.course-richtext
    img
        max-width 100%
.publish
    h2
        text-align center
    p
        text-indent 2em
</style>
