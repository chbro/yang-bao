<template>
    <div class="app-video">
        <div v-show="showVideo" id="app-video"></div>
        <div v-if="showPic" class="app-video-no">
            <p class="app-video-tips">暂无专家直播</p>
        </div>
        <div class="video-list">
            <ul>
                <li v-for="(item, i) in this.videoList" :key="i">
                    <i class="list-item-icon iconfont icon-video"></i>
                    <span v-text="item.name"></span>
                    <span class="list-item-time" v-text="item.time" :title="item.time"></span>
                    <a class="list-item-download" :href="item.link" download>下载</a>
                </li>
            </ul>
            <el-pagination
                class="video-list-page"
                layout="prev, pager, next"
                :total="total"
                @current-change="getVideoList"
                :current-page.sync="page">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '@/util/fetch.js'
import { getChannelList, getVideoUrl, getVideo } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import '@/assets/TcPlayer-2.2.1.js'

export default {
    data () {
        return {
            page: 1,
            total: 0,
            showVideo: false,
            showPic: false,
            videoList: []
        }
    },

    mounted () {
        this.getVideoList()

        getChannelList().then(res => {
            if (isReqSuccessful(res)) {
                if(res.data.liveChannelResp.data.output[0].all_count) {
                    this.showVideo = true
                    let channelName = res.data.liveChannelResp.data.output[0].channel_list[0].channel_name
                    let url = 'http://' + channelName.split('_')[0] + '.liveplay.myqcloud.com/live/' + channelName
                    console.log(url)
                    var player = new TcPlayer('app-video', {
                        'm3u8': url + '.m3u8',
                        // 增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
                        'flv': url + '.flv',
                        'autoplay': true,
                        // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                        // 视频的显示宽度，请尽量使用视频分辨率宽度
                        'width': '100%',
                        // 视频的显示高度，请尽量使用视频分辨率高度
                        'height': '100%',
                    })
                } else {
                    this.showPic = true
                }

            }
        }, _ => {
            this.$message.error('获取直播信息失败')
        })
    },

    methods: {
        getVideoList () {
            getVideo({
                page: this.page - 1
            }).then(res => {
                this.videoList = []
                if(isReqSuccessful(res)) {
                    this.total = res.data.size || 0
                    res.data.List.forEach((item) => {
                        this.videoList.push({
                            id: item.id,
                            time: item.gmtCreate,
                            name: item.fileName,
                            link: `${baseUrl}/movie/${item.fileName}`
                        })
                    })
                }
            })
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'
.app-video
    display flex
    flex-wrap wrap
    .app-video-no
        position relative
        box-sizing border-box
        width 55%
        min-width 600px
        height 400px
        margin 20px 0 20px 5%
        background-image url('//otxtxlg3e.bkt.clouddn.com/QQ20180511-0.jpg')
        background-size cover
        .app-video-tips
            margin 0
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            line-height 400px
            text-align center
            color #fff
            font-size 16px
            background-color rgba(0, 0, 0, 0.7)
    #app-video
        box-sizing border-box
        width 55%
        min-width 600px
        height 400px
        margin 20px 0 20px 5%
        .vcp-player
            margin 0
        .vcp-error-tips // 视频播放失败样式
            top 0
            height 100%
            line-height 400px
            margin-top 0
            background-color rgba(0, 0, 0, 0.7)
            font-size 16px
            color #fff
    .video-list
        box-sizing border-box
        padding 10px 5% 0 50px
        width 40%
        margin 0
        >ul
            box-sizing border-box
            display inline-block
            vertical-align middle
            width 100%
            padding 20px 0 0 0
            li
                position relative
                overflow hidden
                white-space nowrap
                box-sizing border-box
                padding-right 50px
                height 35px
                line-height 35px
                border-bottom 1px solid #eee
                font-size 14px
                color color-main
                text-overflow ellipsis
                .list-item-icon
                    position relative
                    top 2px
                    margin-right 5px
                    font-size 17px
                .list-item-time
                    color color-lightblue
                .list-item-download
                    position absolute
                    right 0
                    color color-main
                    cursor pointer
                    &:hover
                        color #014F9D
        .video-list-page
            margin 10px 0 0
    .el-pagination
        text-align right
</style>
