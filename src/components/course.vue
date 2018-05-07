<template>
    <div class="app-video">
        <div id="app-video"></div>
        <div class="video-list">
            <ul>
                <li v-for="(item, i) in this.videos_left" :key="i">
                    <span v-text="item.name"></span>
                    <span v-text="item.time"></span>
                    <a :href="item.link">下载</a>
                </li>
            </ul><ul>
                <li v-for="(item, i) in this.videos_right" :key="i">
                    <span v-text="item.name"></span>
                    <span v-text="item.time"></span>
                    <a :href="item.link">下载</a>
                </li>
            </ul>
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
            videos_left: [
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'},
                {time: '2018-04-29 20:55:17', name: '文件名', link: '22'}
            ],
            videos_right: [
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
    #app-video
        width 480px
        height 320px
        margin 20px auto
        .vcp-player
            margin 0 auto

    .video-list
        width 80%
        margin 0 auto
        padding
        >ul
            box-sizing border-box
            display inline-block
            vertical-align middle
            width 50%
            padding 0 10px
            li
                line-height 30px
                border-bottom 1px solid #ddd
    .el-pagination
        text-align right
        margin-right 10%
</style>
