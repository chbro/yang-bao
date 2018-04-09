<template>
    <div>
        <div id="app-video"></div>
    </div>
</template>

<script>
import { getVideoUrl } from '@/util/getdata'

export default {
    data () {
        return {

        }
    },

    mounted () {
        getVideoUrl().then(res => {
        /* eslint-disable no-unused-vars, no-undef */
            if (res.meta.code === 0) {
                let url = res.data.liveBroadcastResp.data.getVideoUrl

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
            } else {
                this.$message.error(res.meta.errorMsg || '获取直播信息失败')
            }
        })
    }
}
</script>

<style lang="stylus">
#app-video
    margin 20px 0
    .vcp-player
        margin 0 auto
</style>
