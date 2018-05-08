<template>
    <div class="app-video">
        <div id="app-video"></div>
        <div class="video-list">
            <ul>
                <li v-for="(item, i) in this.videoList" :key="i">
                    <span v-text="item.name"></span>
                    <span v-text="item.time"></span>
                    <a class="list-item-download" :href="item.link">下载</a>
                </li>
            </ul>
            <el-pagination
                layout="prev, pager, next"
                :total="total"
                :current-page.sync="page">
            </el-pagination>
        </div>
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
                    'width': '100%',
                    // 视频的显示高度，请尽量使用视频分辨率高度
                    'height': '100%'
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
            videoList: [
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'}
            ]
        }
    }
}
</script>

<style lang="stylus">
.app-video
    display flex
    flex-wrap wrap
    #app-video
        box-sizing border-box
        padding-left 5%
        width 60%
        min-width 600px
        height 400px
        margin 20px 0
        .vcp-player
            margin 0
    .video-list
        box-sizing border-box
        padding-left 50px
        padding-right 5%
        width 40%
        margin 0
        >ul
            box-sizing border-box
            display inline-block
            vertical-align middle
            width 100%
            padding 20px 0
            li
                line-height 38px
                border-bottom 1px solid #ddd
                font-size 15px
                .list-item-download
                    float right
    .el-pagination
        text-align right
</style>
