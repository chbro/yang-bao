<template>
    <div class="chat-wrapper">
        <el-tabs type="border-card">
            <el-tab-pane label="咨询">
                <el-container>
                    <el-main>
                        <div class="dialog_box">
                            <div class="dialog-item" :class="{user: item.user}" v-for="(item, i) in items" :key="i"><span v-text="item.user ? '用户' : '专家'"></span><span class="msg" v-html="item.html"></span></div>
                        </div>
                        <div class="input_box">
                            <div class="chat-option">
                                <i class="iconfont icon-smile emoji" ref='btn' @click='showEmoji = !showEmoji'></i>
                                <input hidden ref="file" type="file" @change="sendFile()" class="file">
                                <i class="iconfont icon-3801wenjian" @click="$refs.file.click()"></i>
                            </div>
                            <vue-emoji style="top:68px;"
                                v-show='showEmoji'
                                ref='emoji'
                                @select='handleEmojiSelect'
                                @hide="showEmoji = false"
                            ></vue-emoji>
                            <div class="chat-input">
                                <div @keypress.enter="send($event)" contenteditable ref='edit' class="chat_area"></div>
                            </div>
                            <div class="opr-btns">
                                <el-button size="small" @click="dialogFormVisible = true">关闭</el-button>
                                <el-button size="small" @click="send()" class="send">发送</el-button>
                            </div>
                        </div>
                    </el-main>
                    <el-aside width="25%">
                        <ul>
                            <li>类型：</li>
                            <li>姓名：</li>
                            <li>邮件：</li>
                            <li>电话：</li>
                        </ul>
                        <div class="id1"></div>
                    </el-aside>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="留言">
                <div class="message">
                    <el-form>
                        <el-form-item>
                            <el-input v-model="form.name" auto-complete="off" placeholder="Full Name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.email" auto-complete="off" placeholder="Email Address"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="textarea" :rows="4" v-model="form.message" placeholder="Your Message"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit_message">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="评价" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="评价" :label-width="formLabelWidth">
                    <el-radio-group v-model="satisfy">
                        <el-radio :label="5">非常满意</el-radio>
                        <el-radio :label="4">满意</el-radio>
                        <el-radio :label="3">一般</el-radio>
                        <el-radio :label="2">不满意</el-radio>
                        <el-radio :label="1">很差</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="form.desciption">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import VueEmoji from 'rui-vue-emoji'
import 'rui-vue-emoji/dist/vue-emoji.css'
import { keepLastIndex, isReqSuccessful } from '@/util/jskit'
// import { baseUrl } from '@/util/fetch'
import { getExpert } from '@/util/getdata'

export default {
    components: {
        VueEmoji
    },

    mounted () {
        // 表情组件初始化
        this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        })

        // first http:
        // let urlRidOfHost = baseUrl.substr(baseUrl.indexOf(':'))
        // // last :port
        // let host = urlRidOfHost.substr(0, urlRidOfHost.indexOf(':'))
        // let wsUri = `ws://${host}:8080/websocket/${this.agentid}`
        let wsUri = `ws://192.168.1.112:8080/websocket/${this.agentid}`
        this.websocket = new WebSocket(wsUri)
        this.websocket.onclose = evt => {
            this.$notify.error({
                duration: 0, // will not close automatically
                title: '错误',
                message: '连接已关闭'
            })
        }
        this.websocket.onmessage = evt => {
            console.log(evt)
            let data = JSON.parse(evt.data)
            if (data.order === 'link') {
                this.$message.error('发送失败')
                this.items.push({html: '<i class="el-icon-document"></i>' + data.message, class: 'user'})
            } else {
                this.items.push({html: data.message, user: 1})
            }
        }
        this.websocket.onerror = evt => {
            // this.$notify.error({
            //     duration: 0,
            //     title: '连接错误',
            //     message: '连接发生了一个错误'
            // })
        }

        getExpert(this.agentid).then(res => {
            if (isReqSuccessful(res)) {
                this.expertid = res.data.expert_id
            }
        }, res => {
            this.$notify.error({
                duration: 0,
                title: '错误',
                message: res.meta.errorMsg || '当前没有专家在线'
            })
        })

        window.onbeforeunload = function () {
            return false
        }
    },

    destroyed () {
        window.onbeforeunload = null
    },

    data () {
        return {
            satisfy: 5, // 评价满意度
            dialogFormVisible: false, // 评价弹框是否可见
            form: {
                desciption: '',
                region: '',
                resource: '',
                desc: '',
                email: '',
                name: '',
                message: ''
            },
            formLabelWidth: '120px',

            activeIndex: '1',
            showEmoji: false, // 表情选择框是否可见
            items: [ // 聊天内容数组
                {html: '你好啊，请问有什么问题？'},
                {html: '你好', user: 1}
            ],
            websocket: null, // 本地ws连接
            agentid: 3,
            expertid: 11 // 聊天专家id
        }
    },

    methods: {
        // select a img dom and append it to a contenteditable div
        handleEmojiSelect (img) {
            let edit = this.$refs.edit
            img.src = img.src.replace('/images', '/static/images')
            edit.appendChild(img)
            keepLastIndex(edit)
        },

        // send chat message
        send (e) {
            // 按下button时e == undefiend
            e && e.preventDefault()
            let edit = this.$refs.edit
            let data = {
                message: edit.innerHTML,
                role_id: 1,
                user_id: 3,
                name: 'zym',
                talk_id: 11,
                mode: 0
            }
            this.websocket.send(JSON.stringify(data))
            edit.innerHTML = ''
        },

        // send chat file with formdata
        sendFile () {
            let file = this.$refs.file.files[0]

            if (file === undefined) {
                this.$message.warning('未选择文件')
                file.value = undefined
                return
            }
            let form = new FormData()
            form.append('file', file)
            form.append('user_id', 3)
            form.append('user_name', 'zym')
            form.append('talk_id', 11)
            form.append('mode', 0)

            // post文件使用原生fetch,未写入总接口
            window.fetch('http://192.168.1.112:8080/talk/upload', {
                method: 'POST',
                body: form
            }).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('文件发送成功')
                    console.log(res)
                }
            }, _ => {
                this.$notify.error({
                    duration: 0,
                    title: '错误',
                    message: '文件发送失败'
                })
                file.value = null
            })
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.chat-wrapper
    width 60%
    min-width 800px
    margin 50px auto 0
    background-color #666
    .el-tabs__content
        height 429px
    .el-tabs--border-card > .el-tabs__content
        padding 0
    .el-tabs__nav-scroll
        height 85px
        background url("../../assets/imgs/header-logo.png")
        background-repeat no-repeat
        background-position 15px 2px
        .el-tabs__nav
            float right
            height 100%
    .el-tabs--border-card > .el-tabs__header .el-tabs__item
            line-height 85px
    .el-tabs__item
        height 100%
    .el-main
        height 429px
        overflow-y hidden
        .dialog_box
            height 60%
            border 1px solid #e4e7ed
            overflow-y auto
            .dialog-item
                overflow hidden
                font-size 1em
                margin 10px 0
                margin-left 15px
                line-height 25px
                span, .msg
                    float left
                    padding 5px
                .msg
                    float left
                    max-width 80%
                    padding-left 15px
                    padding-right 15px
                    border-radius 10px
                    color #000
                    background-color rgba(240,240,240,0.5)
                    i
                        font-size 20px
                &.user
                    margin-left 0
                    margin-right 15px
                    span, .msg
                        float right
                    .msg
                        color #fff
                        background-color #3385ff
        .input_box
            position relative
            height 40%
            .chat-option
                height 27%
                width 100%
                padding 15px 0 0 0
                i
                    margin-right 5px
                    cursor pointer
                    font-size 20px
        .chat-input
            border 1px solid #e4e7ed
            height 100px
            .chat_area
                width 86%
                height 60px
                overflow-y auto
                margin 5px
                outline 0
        .opr-btns
            position absolute
            right 20px
            bottom 0

    .el-aside
        background-color #f5f7fa
        height 429px
        li
            padding 5%
        .id1
            background: url("http://www.looyu.com/images/yiduiyi.png") no-repeat
            cursor pointer
            height 220px
            width 100%
            margin-top 24.5px
            background-size cover
    .message
        width 80%
        margin 50px auto 0
        .submit_message
            margin 0
            width 100%
    .telephone
        width 80%
        margin 50px auto 0
    .submit_telephone
        margin 0
</style>
