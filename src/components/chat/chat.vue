<template>
    <div class="chat-wrapper">
        <el-container>
            <el-header height="20%">
                <img src="../../assets/imgs/index/LOGO-2.png" alt="Logo">
                <el-menu :default-active="activeIndex2" class="el-menu-demo chat-menu" mode="horizontal" @select="handleSelect" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">咨询</el-menu-item>
                    <el-menu-item index="2">留言</el-menu-item>
                    <el-menu-item index="3">自助</el-menu-item>
                    <el-menu-item index="4">电话</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-main>
                    <div class="dialog_box">
                        <div class="dialog-item" :class="item.class" v-for="(item, i) in items" :key="i" v-html="item.html"></div>
                    </div>
                    <div class="input_box">
                        <div class="chat-option">
                            <button ref='btn' @click='showEmoji = !showEmoji'>emoji</button>
                            <input ref="file" type="file" @change="sendFile()">
                        </div>
                        <vue-emoji
                            v-show='showEmoji'
                            ref='emoji'
                            @select='handleEmojiSelect'
                            @hide="showEmoji = false"
                        ></vue-emoji>
                        <div @keypress.enter="send($event)" contenteditable ref='edit' class="chat-input"></div>
                        <el-button @click="send()">发送</el-button>
                    </div>
                </el-main>
                <el-aside width="25%">
                    <ul>
                        <li>类型：</li>
                        <li>姓名：</li>
                        <li>邮件：</li>
                        <li>电话：</li>
                    </ul>
                </el-aside>
            </el-container>
        </el-container>
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
    },

    data () {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            myText: 'sdd',
            showEmoji: false,
            items: [],
            value: '',
            websocket: null
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
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.chat-wrapper
    width 800px
    height 700px
    margin 50px auto 0
.is-vertical
    height 100%
    width 100%
    border 1px solid #eee

.el-header
    width 100%
    background-color color-main
    // color #333
    border-bottom 4px solid #58B22E
    img
        height 92%
        margin-top 1%
        margin-left 5%
    .el-menu
        display inline-block
        background-color color-main
        width 60%
        margin-left 20%
        .el-menu-item
            width 25%
            text-align center
            font-size 1.1em
        .is-active
            color green
.el-container
    width 100%;
    height 80%
.el-main
    height 99%
    width 75%
    padding 0
    overflow hidden
    .dialog_box
        height 75%
        width 99%
        background-color #fff
        margin-top 0px
        margin-left 0px
        overflow-y auto
        max-height 70%
        border 1px solid #CCCCCC
        margin-bottom 2px
        margin-top 1%
    .input_box
        height 25%
        width 100%
        // background-color #444
        .el-button
            width 8%
            padding 10px
.el-aside
    color #333
    height 99%
    background-color rgb(238, 241, 246)
    border 1px solid #CCCCCC
    margin-right 2px
    margin-top 1%
    ul
        margin-left 10%
.chat-menu
    border-bottom 0
    .el-menu-item
        &:hover
            color #58B22E !important
            backface-color #2891D1 !important
        &.is-active
            border-bottom 0
            color #58B22E !important
            backface-color #2891D1 !important

.chat-input
    box-sizing border-box
    display inline-block
    width 90%
    padding 10px
    vertical-align bottom
    height 100px
    outline 0

.dialog-item
    &.user
        text-align right
</style>
