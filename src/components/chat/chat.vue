<template>
    <div class="chat-wrapper">
            <el-tabs type="border-card">
                <el-tab-pane label="咨询">
                    <el-container>
                        <el-main>
                            <div class="dialog_box">
                                <div class="dialog-item" :class="item.class" v-for="(item, i) in items" :key="i" v-html="item.html"></div>
                            </div>
                            <div class="input_box">
                                <div class="chat-option">
                                    <button ref='btn' @click='showEmoji = !showEmoji' class="emoji"><img src="../../assets/imgs/smile.png" alt="" class="emoji_picture"></button>
                                    <input hidden ref="file" type="file" @change="sendFile()" class="file"><img src="../../assets/imgs/picture.png" alt="" class="picture_picture" @click="selectFile()">
                                    <input hidden ref="file" type="file" @change="sendFile()" class="file"><img src="../../assets/imgs/file.png" alt="" class="file_picture" @click="selectFile()">
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
                                <!-- <el-button @click="close()">关闭</el-button>
                                <el-popover
                                    ref="popover4"
                                    placement="right"
                                    width="400"
                                    trigger="click">
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                         <el-form-item>
                                            <e-p>评价</e-p>
                                        </el-form-item>
                                    </el-form>
                                </el-popover> -->

                                <el-button v-popover:popover4>关闭</el-button>
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
                <el-tab-pane label="电话">
                    <div class="telephone">
                        <p>输入您的手机号码，点击“拨打”按钮，系统将自动为您建立免费通话！</p>
                        <el-form>
                            <el-form-item>
                                <el-input v-model="telephone_number" auto-complete="off" placeholder="手机">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="code" auto-complete="off" placeholder="验证码">
                                </el-input>
                            </el-form-item>
                            <el-item-form>
                                <el-button type="primary" class="submit_telephone">拨打</el-button>
                            </el-item-form>
                        </el-form>
                        <p>请输入合法的手机号码，如：13987654321。</p>
                        <P>非来电免费手机只产生接听费用，无其他额外费用</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
                <!-- <img src="../../assets/imgs/index/LOGO-2.png" alt="Logo"> -->
    </div>
</template>

<script>
import { keepLastIndex } from '@/util/jskit'
import 'rui-vue-emoji/dist/vue-emoji.css'
import VueEmoji from 'rui-vue-emoji'

export default {
    components: {
        VueEmoji
    },

    mounted () {
        this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        })

        let wsUri = 'ws://192.168.1.126:8080/websocket/2'
        this.websocket = new WebSocket(wsUri)
        this.websocket.onopen = evt => {
            // console.log(evt, 1111)
        }
        this.websocket.onclose = evt => {
            this.$message.error('连接已关闭')
        }
        this.websocket.onmessage = evt => {
            console.log(evt)
            let data = JSON.parse(evt.data)
            this.items.push({html: data.message, class: 'user'})
        }
        this.websocket.onerror = evt => {
            this.$message.error('连接错误')
        }

        window.onbeforeunload = function () {
            return false
        }
    },

    data () {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            myText: 'sdd',
            showEmoji: false,
            items: [
                {html: '<p><span class="chat_user_message">&nbsp;&nbsp;&nbsp;你好&nbsp;&nbsp;&nbsp;</span><span class="chat_user_name">客户</span></p>', class: 'chat_user'},
                {html: '<p><span class="chat_user_message">&nbsp;&nbsp;&nbsp;hello&nbsp;&nbsp;&nbsp;</span><span class="chat_user_name">客户</span></p>', class: 'chat_user'},
                {html: '<p><span class="chat_user_message">&nbsp;&nbsp;&nbsp;请问在吗？&nbsp;&nbsp;&nbsp;</span><span class="chat_user_name">客户</span></p>', class: 'chat_user'},
                {html: '<p><span class="chat_professor_name">专家</span><span class="chat_professor_message">&nbsp;&nbsp;&nbsp;你好啊，请问有什么问题？</span></p>', class: 'chat_professor'}
            ],
            value: '',
            websocket: null,
            email: '',
            name: '',
            message: ''
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
            e && e.preventDefault()
            let edit = this.$refs.edit
            // this.items.push({html: edit.innerHTML, class: 'user'})
            // console.log(this.websocket)
            let data = {
                message: edit.innerHTML,
                to: [3],
                user_id: 2,
                role: 'common',
                mode: 0,
                name: 'zym'
            }
            this.websocket.send(JSON.stringify(data))
            edit.innerHTML = ''
        },

        sendFile () {
            let file = this.$refs.file.files[0]

            if (file === undefined) {
                return
            }
            console.log(file)
            var reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = evt => {
                console.log({data: evt.target.result})
            }
        },

        selectFile () {
            this.$refs.file.click()
        },

        close () {

        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.chat-wrapper
    width 700px
    height 510px
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
        //background-color color-main
        .el-tabs__nav
            float right
            height 100%
    .el-tabs--border-card > .el-tabs__header .el-tabs__item
            line-height 85px
    .el-tabs__item
        height 100%
    .el-main
        height 429px
        .dialog_box
            height 60%
            border 1px solid #e4e7ed
            .dialog-item
                font-size 1.1em
                margin-left 15px
                &.chat_user
                    color #000
                    margin-right 15px
                    text-align right
                    p
                        margin 1%
                        .chat_user_message
                            background-color #3385ff
                            color #ffffff
                            border-radius 10px
                            margin-right 1%
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
                    //.chat_professor_name
        .input_box
            height 40%
            .chat-option
                height 27%
                width 100%
                .emoji
                    border none
                    background none
                    margin-top 2%
                .file_picture
                    padding-left 1.5%
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
    .el-aside
        background-color #f5f7fa
        height 429px
        li
            padding 5%
        .id1
            background-image: url("http://www.looyu.com/images/yiduiyi.png")
            cursor pointer
            height 220px
            width 100%
            margin-top 10px
            background-position center bottom
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
