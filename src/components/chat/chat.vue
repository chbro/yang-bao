<template>
    <div class="chat-wrapper">
        <el-tabs type="border-card">
            <el-tab-pane label="咨询">
                <el-container>
                    <el-main>
                        <div class="dialog_box" ref="dialog">
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
            <el-form :model="form" class="chat-formdialog">
                <el-form-item label="评价" :label-width="formLabelWidth">
                    <el-radio-group v-model="evaluation">
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
                        v-model="description">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="evaluate()">确定</el-button>
                <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import VueEmoji from 'rui-vue-emoji'
import 'rui-vue-emoji/dist/vue-emoji.css'
import { keepLastIndex, isReqSuccessful, resetFile } from '@/util/jskit'
// import { baseUrl } from '@/util/fetch'
import { getExpert, evalulateExpert } from '@/util/getdata'

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
        // console.log(window.decodeURIComponent(this.$route.query.from))

        // first http:
        // let urlRidOfHost = baseUrl.substr(baseUrl.indexOf(':'))
        // last :port
        // let host = urlRidOfHost.substr(0, urlRidOfHost.indexOf(':'))
        // let wsUri = `ws://${host}:8080/websocket/${this.agentid}`
        let wsUri = `ws://192.168.1.112:8080/websocket/${this.user.agentid}`
        this.websocket = new WebSocket(wsUri)
        this.websocket.onclose = evt => {
            this.$notify.error({
                duration: 5000, // will not close automatically
                title: '错误',
                message: '连接已关闭'
            })
        }
        this.websocket.onmessage = evt => {
            console.log(evt)
            let data = JSON.parse(evt.data)
            let html = ''
            if (data.order === 'link') {
                html = `<i class="el-icon-document"></i><a href="${data.message}">`
            } else {
                html = data.message
            }
            this.pushChatMessage(html)
        }
        this.websocket.onerror = evt => {
            // this.$notify.error({
            //     duration: 5000,
            //     title: '连接错误',
            //     message: '连接发生了一个错误'
            // })
        }

        getExpert(this.user.agentid).then(res => {
            if (isReqSuccessful(res)) {
                this.expertid = res.data.expert_id
            }
        }, res => {
            this.$notify.error({
                duration: 5000,
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
            evaluation: 5, // 评价满意度
            dialogFormVisible: false, // 评价弹框是否可见
            description: '',
            form: {
                region: '',
                resource: '',
                desc: '',
                email: '',
                name: '',
                message: ''
            },
            formLabelWidth: '80px',

            activeIndex: '1',
            showEmoji: false, // 表情选择框是否可见
            items: [ // 聊天内容数组
                {html: '你好啊，请问有什么问题？'},
                {html: '你好', user: 1}
            ],
            websocket: null, // 本地ws连接
            user: {
                id: 3,
                role_id: 3,
                agentid: 3
            },
            expertid: 10 // 聊天专家id
        }
    },

    methods: {
        evaluate () {
            let data = {
                expert_name: 'zz',
                expert_id: this.expertid,
                evaluation: this.evaluation,
                description: this.description
            }
            evalulateExpert(data).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('评价成功')
                }
            })
            this.dialogFormVisible = false
            this.description = this.evaluation = null
        },

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
            if (edit.innerHTML === '') {
                this.$message.warning('请输入内容')
                return
            }
            let data = {
                message: edit.innerHTML,
                role_id: this.user.role_id,
                user_id: this.user.agentid,
                name: 'zym',
                talk_id: this.expertid,
                mode: 0
            }
            try {
                this.websocket.send(JSON.stringify(data))
            } catch (e) {
                this.$message.error('消息发送失败')
                return
            }
            edit.innerHTML = ''
        },

        // send chat file with formdata
        sendFile () {
            let filedom = this.$refs.file
            let file = filedom.files[0]

            if (file === undefined) {
                this.$message.warning('未选择文件')
                return
            }
            if (file.size > 50 * 1024 * 1024) {
                this.$message.warning('文件大小不能超过50M')
                resetFile(filedom)
                return
            }
            let form = new FormData()
            form.append('file', file)
            form.append('user_id', this.user.id)
            form.append('user_name', this.user.name)
            form.append('talk_id', this.expertid)
            form.append('mode', 0)

            // post文件使用原生fetch,未写入总接口
            window.fetch('http://192.168.1.112:8080/talk/upload', {
                method: 'POST',
                body: form
            }).then(async res => {
                res = await res.json()
                if (isReqSuccessful(res)) {
                    this.$message.success('文件发送成功')
                }
            }, _ => {
                this.$notify.error({
                    duration: 5000,
                    title: '错误',
                    message: '文件发送失败'
                })
            })
            console.log(filedom)
            filedom = resetFile()
        },

        pushChatMessage (html) {
            this.items.push({html, user: 1})
            this.$nextTick(_ => {
                let dialog = this.$refs.dialog
                dialog.scrollTop = dialog.scrollHeight
            })
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.chat-formdialog
    el-form-item__content
        margin-left 80px

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
