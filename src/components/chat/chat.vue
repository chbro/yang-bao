<template>
    <div class="chat-wrapper">
        <el-tabs type="border-card">
            <el-tab-pane label="咨询">
                <el-container>
                    <el-main>
                        <div class="dialog_box">
                            <div class="dialog-item" :class="{user: item.user}" v-for="(item, i) in items" :key="i" v-html="item.html"></div>
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
                                <div @keypress.enter="send($event)" contenteditable ref='edit' name="" class="chat_area"></div>
                            </div>
                            <el-button type="text" @click="dialogFormVisible = true" class="close">关闭</el-button>

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
                           <el-button @click="send()" class="send">发送</el-button>
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
                            <el-input v-model="name" auto-complete="off" placeholder="Full Name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="email" auto-complete="off" placeholder="Email Address"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="textarea" :rows="4" v-model="message" placeholder="Your Message"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit_message">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import VueEmoji from 'rui-vue-emoji'
import 'rui-vue-emoji/dist/vue-emoji.css'
import { keepLastIndex, isReqSuccessful } from '@/util/jskit'
import { baseUrl } from '@/util/fetch'
import { matchExpert } from '@/util/getdata'

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

        let wsUri = 'ws://192.168.1.110:8080/websocket/1'
        this.websocket = new WebSocket(wsUri)
        this.websocket.onclose = evt => {
            this.$notify.error({
                duration: 0,
                title: '错误',
                message: '连接已关闭'
            })
        }
        this.websocket.onmessage = evt => {
            console.log(evt)
            let data = JSON.parse(evt.data)
            if (data.order === 'order') {
                this.$message.error('发送失败')
                return
            }
            this.items.push({html: data.message, user: 1})
        }
        this.websocket.onerror = evt => {
            this.$notify.error({
                duration: 0,
                title: '错误',
                message: '连接错误'
            })
        }

        matchExpert(this.agentid).then(res => {
            if (isReqSuccessful(res)) {
                this.expertid = res.data.expert_id
            }
        }, res => {
            this.$message.error(res.meta.errorMsg || '邀请专家加入聊天失败')
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
            satisfy: 5,
            dialogFormVisible: false,
            form: {
                desciption: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',

            activeIndex: '1',
            activeIndex2: '1',
            showEmoji: false,
            items: [
                {html: '你好', user: 1},
                {html: '你好啊，请问有什么问题？'}
            ],
            websocket: null,
            email: '',
            name: '',
            message: '',

            agentid: 3,
            expertid: null
        }
    },

    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
        },

        handleEmojiSelect (img) {
            let edit = this.$refs.edit
            img.src = img.src.replace('/images', '/static/images')
            edit.appendChild(img)
            keepLastIndex(edit)
        },

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

            window.fetch(baseUrl + '/talk/upload', {
                method: 'POST',
                body: form
            }).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('文件发送成功')
                    this.data.push({html: '<i class="el-icon-document"></i>' + file.name, class: 'user'})
                    console.log(res)
                } else {
                    this.$message.error('文件发送失败')
                }
            }, _ => {
                this.$message.error('文件发送失败')
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
                font-size 1em
                margin-left 15px
                line-height 25px
                &.user
                    text-align right
                    padding-right 15px
                    background-color #3385ff
                    color #fff
                    border-radius 10px
                    margin-right 1%
                    padding 0 10px
                    display inline-block
                    max-width 80%
                &.chat_user
                    color #000
                    margin-right 15px
                    text-align right
                    p
                        margin 1%
                        .chat_user_name
                            color #777777
                &.chat_professor
                    color #777777
                    p
                        margin 0
                    .chat_professor_message
                        margin-left 10px
                        background-color rgba(240,240,240,0.5)
                        border-radius 10px
                        padding 0 10px
                        display inline-block
                        max-width 65%
                    //.chat_professor_name
        .input_box
            height 40%
            .chat-option
                height 27%
                width 100%
                padding 15px 0 0 0
                i
                    margin-right 5px
                    cursor pointer
                    font-size 20px
            .rui-emoji
                top 80px
                left 20px
        .chat-input
            border 1px solid #e4e7ed
            height 100px
            .chat_area
                height 95px
                width 83%
                overflow-x hidden
                overflow-y auto
                border none
                margin-left 1%
                word-wrap break-word//换行
                outline 0
        .close
            position relative
            top -5px
            right 80px
            //background-color orange
            width 70px
            border 1px solid #e4e7ed

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
    .el-button
        margin-left 410px
        margin-top -45px
        display block
    .rui-emoji
        top 68px !important
        left 22px !important
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
