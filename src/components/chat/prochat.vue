<template>
    <div id="pro_wrapper">
        <el-container>
            <el-header>
                <router-link to="/"><img src="~@/assets/imgs/header-logo.png" alt="header-logo"></router-link>
                <el-menu :default-active="activeIndex" class="chat-menu" mode="horizontal" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">生产物资平台</el-menu-item>
                    <el-menu-item index="2">退出</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside class="aside1" width="180px">
                    <el-input
                        placeholder="过滤关键字"
                        v-model="filterText">
                    </el-input>

                    <el-tree
                        class="filter-tree"
                        :data="data2"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="tree2">
                    </el-tree>
                </el-aside>
                <el-aside class="aside2">
                    <p>常 用 语</p>
                    <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText3">
                    </el-input>

                    <el-tree
                        class="filter-tree"
                        :data="data3"
                        :props="defaultProps3"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="tree3">
                    </el-tree>
                </el-aside>
                <el-main>
                    <div class="pro-dialog_box" ref="dialog">
                        <div class="pro-dialog-item" :class="{self: item.self}" v-for="(item, i) in items" :key="i"><span v-text="item.self ? expert.name : user.name"></span><span class="msg" v-html="item.html"></span></div>
                    </div>
                    <div class="my_input_box">
                        <div class="my_chat_option">
                            <i class="iconfont icon-smile emoji" ref='btn' @click='showEmoji = !showEmoji'></i>
                            <input hidden ref="file" type="file" @change="sendFile()" class="file">
                            <i class="iconfont icon-3801wenjian" @click="$refs.file.click()"></i>
                            <i title="邀请专家" class="iconfont icon-icon_users my_inviation" @click="invite()"></i>
                        </div>
                        <vue-emoji style="top:68px;"
                            v-show='showEmoji'
                            ref='emoji'
                            @select='handleEmojiSelect'
                            @hide="showEmoji = false"
                        ></vue-emoji>
                        <div class="my_chat_input">
                            <div @keypress.enter="send($event)" contenteditable ref='edit' name="" class="chat_area"></div>
                        </div>
                        <el-button @click="send()" class="send">发送</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import 'rui-vue-emoji/dist/vue-emoji.css'
import VueEmoji from 'rui-vue-emoji'
import { keepLastIndex, isReqSuccessful, resetFile } from '@/util/jskit'
import { getExpert, getUserById, getExpressions } from '@/util/getdata'
import { wsUrl, baseUrl } from '@/util/fetch'
import { tokenStr } from '@/util/fetch'

export default {
    components: {
        VueEmoji
    },

    data () {
        return {
            expert: {},
            user: {},

            showEmoji: false,
            items: [],
            activeIndex: '1',

            options: [],
            filterText: '',
            data2: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            filterText3: '',
            data3: [],
            defaultProps3: {
                children: 'children',
                label: 'label'
            },

            msgCount: 0
        }
    },

    mounted () {
        let id = 17
        getExpressions(id).then(res => {
            if (isReqSuccessful(res)) {
                let arr = []
                res.data.List.forEach(v => {
                    arr.push({label: v.expression})
                })
                this.data3 = arr
            }
        })

        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                let { userRealname } = res.data.model
                this.expert = {
                    id,
                    name: userRealname
                }
            }
        })

        this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        })

        let ws = wsUrl + '/' + id
        this.websocket = new WebSocket(ws)
        let cb = evt => {
            this.$notify.error({
                duration: 5000,
                title: '错误',
                message: evt.message || '连接已关闭'
            })
        }
        this.websocket.onerror = cb 
        this.websocket.onclose = cb

        this.websocket.onmessage = evt => {
            console.log(evt)
            let data = JSON.parse(evt.data)
            let html = ''
            this.msgCount++
            if (this.msgCount === 1) {
                this.user = {
                    id: data.talk_id,
                    name: data.name
                }
                console.log(this.user)
            }
            if (data.order === 'link') {
                let msg = data.message
                let idx = msg.lastIndexOf(':')
                let name = msg.substr(idx + 1)
                let addr = msg.substr(0, idx)
                html = `<a href="${addr}"><i class="el-icon-document"></i>${name}</a>`
            } else {
                html = data.message
            }
            this.pushChatMessage(html, data.order === 'self')
        }

        // window.onbeforeunload = function () {
        //     return false
        // }
    },

    destroyed () {
        window.onbeforeunload = undefined
    },

    methods: {
        filterNode (value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
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
            if (edit.innerHTML === '') {
                this.$message.warning('请输入内容')
                return
            }
            let data = {
                message: edit.innerHTML,
                isExpert: true,
                user_id: this.expert.id,
                name: this.user.name,
                talk_id: this.user.id,
                mode: 0
            }
            console.log(data)
            try {
                this.websocket.send(JSON.stringify(data))
            } catch (e) {
                this.$message.error('消息发送失败')
                return
            }
            edit.innerHTML = ''
        },

        sendFile () {
            let file = this.$refs.file.files[0]

            if (file === undefined) {
                this.$message.warning('未选择文件')
                return
            }
            let form = new FormData()
            form.append('file', file)
            form.append('user_id', this.user.id)
            form.append('user_name', this.user.name)
            form.append('talk_id', this.expert.id)
            form.append('mode', 0)

            let headers = {}
            headers[tokenStr] = window.localStorage.getItem(tokenStr)

            window.fetch(baseUrl + '/talk/upload', {
                method: 'POST',
                body: form,
                headers
            }).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('文件发送成功')
                    this.data.push({html: '<i class="el-icon-document"></i>' + file.name})
                    console.log(res)
                }
            }, _ => {
                this.$notify.error({
                    duration: 5000,
                    title: '错误',
                    message: '文件发送失败'
                })
            })
            resetFile(this.$refs.file)
        },

        invite () {
            // agent id
            getExpert(2).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('邀请成功')
                    let data = {
                        mode: 1,
                        to: [+this.user.id, this.expert.id, res.data.expert_id],
                        user_id: this.expert.id
                    }
                    console.log(data)
                    this.websocket.send(JSON.stringify(data))
                }
            }, _ => {
                this.$message.error('邀请失败')
            })
        },

        pushChatMessage (html, isSelf) {
            this.items.push({html, self: isSelf})
            this.$nextTick(_ => {
                let dialog = this.$refs.dialog
                if (dialog) { 
                    dialog.scrollTop = dialog.scrollHeight
                }
            })
        }
    },
    watch: {
        filterText (val) {
            this.$refs.tree2.filter(val)
        },
        filterText3 (val) {
            this.$refs.tree3.filter(val)
        }
    }
}
</script>

<style lang="stylus">
@import '../../assets/css/color'

#pro_wrapper
    height auto
    .el-header
        height 80px !important
        padding 0
        img
            position absolute
            z-index 777
        li
            float right
            height 100%
            line-height 80px
            &:hover
                background-color color-main
            &:active
                background-color color-main
            .select
                width 75px
                background-color color-main
                    input
                        background-color color-main
                        border none
                        color #fff
    .el-menu--horizontal
        background-color color-main
        width 100%
        height 100%
    .el-aside1
        height 850px
        background-color #fff
    .aside2
        height 850px
        background-color #fff
        border-left 2px solid color-main
        border-right 2px solid color-main
        p
            text-align center
            color color-main
    .el-main
        .pro-dialog_box
            overflow-y auto
            height 250px
            border 1px solid #e4e7ed
            .pro-dialog-item
                overflow hidden
                font-size 16px
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
                    a
                        color #fff
                &.self
                    margin-left 0
                    margin-right 15px
                    span, .msg
                        float right
                    .msg
                        color #fff
                        background-color #3385ff
        .my_input_box
            height 35%
            .my_chat_option
                height 15%
                width 100%
                padding-top 1.5%
                i
                    margin-right 5px
                    font-size 20px
                    cursor pointer
                .inviation
                    margin-left 88%
            .rui-emoji
                top 80px
                left 20px
            .send
                margin-left 92%
                margin-top 10px
                width 8%
                display inline
        .my_chat_input
            border 1px solid #e4e7ed
            height 150px
            .chat_area
                width 86%
                height 140px
                overflow-y auto
                margin 5px
                outline 0
</style>
