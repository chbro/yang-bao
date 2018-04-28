<template>
    <div class="app-video">
        <div id="app-video"></div>
        <div class="video-list">
            <el-card v-for="(item, i) in videos" :key="i" :body-style="{ padding: '0px' }">
                <img src="~@/assets/imgs/weixin.png" class="image">
                <div style="padding: 14px;">
                    <span>视频名称: 11</span>
                    <div class="bottom clearfix">
                        <time class="time">2018-4-28 19:02:02</time>
                        <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="page">
        </el-pagination>
    </div>
</template>

<script>
import { getVideoUrl } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import '@/assets/TcPlayer-2.2.1.js'

export default {
    mounted () {
        // console.log(window.TcPlayer)
        getVideoUrl(1, 1).then(res => {
        /* eslint-disable no-unused-vars, no-undef */
            if (isReqSuccessful(res)) {
                let url = res.data.liveBroadcastResp.data.pushUrl

                var player = new TcPlayer('app-video', {
                    'm3u8': url,
                    // 增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
                    'flv': url,
                    'autoplay': true,
                    // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                    // 'coverpic': 'http://www.test.com/myimage.jpg',
                    // 视频的显示宽度，请尽量使用视频分辨率宽度
                    'width': '480',
                    // 视频的显示高度，请尽量使用视频分辨率高度
                    'height': '320'
                })
            }
        }, _ => {
            this.$message.error('获取直播信息失败')
        })
    },

    data () {
        return {
            page: 1,
            total: 1,
            videos: [
                {src: ''},
                {src: ''},
                {src: ''},
                {src: ''},
                {src: ''}
            ]
        }
    }
}
</script>

<style lang="stylus">
.app-video
    #app-video
        margin 20px 0
        min-height 320px
        .vcp-player
            margin 0 auto

    .video-list
        display flex
        width 80%
        margin 10px auto
        flex-wrap wrap
        >div
            box-sizing border-box
            width 20%
            padding 0 10px
    .el-pagination
        text-align right
        margin-right 10%
</style>
