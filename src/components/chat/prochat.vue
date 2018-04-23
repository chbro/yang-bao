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
                        :filter-node-method="filterNode3"
                        ref="tree3">
                    </el-tree>
                </el-aside>
                <el-main>
                    <div class="pro-dialog_box" ref="dialog">
                        <div class="pro-dialog-item" :class="{self: item.self}" v-for="(item, i) in items" :key="i"><span v-text="item.self ? '专家' : '用户'"></span><span class="msg" v-html="item.html"></span></div>
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
import { keepLastIndex, isReqSuccessful } from '@/util/jskit'
// import { baseUrl } from '@/util/fetch'
import 'rui-vue-emoji/dist/vue-emoji.css'
import VueEmoji from 'rui-vue-emoji'
import { getExpert } from '@/util/getdata'

export default {
    components: {
        VueEmoji
    },

    data () {
        return {
            showEmoji: false,
            user: {
                id: 10,
                agentid: 3
            },
            items: [
                {html: '我是客户？'},
                {html: '请说出你的问题', self: 1}
            ],
            activeIndex: '1',
            options: [{
                value: '选项1',
                label: '在线'
            }, {
                value: '选项2',
                label: '隐身'
            }, {
                value: '选项3',
                label: '忙碌'
            }],
            filterText: '',
            data2: [{
                id: 1,
                label: '我的访客',
                children: [{
                    id: 4,
                    label: '排队中',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                },
                {
                    id: 4,
                    label: '对话中',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                },
                {
                    id: 4,
                    label: '离开客人',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '我的同事',
                children: [{
                    id: 5,
                    label: '总公司',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }, {
                    id: 6,
                    label: '某县级',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            filterText3: '',
            data3: [{
                id: 1,
                label: '问候',
                children: [{
                    id: 4,
                    label: '早安',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],

            defaultProps3: {
                children: 'children',
                label: 'label'
            },
            count: 1
        }
    },

    mounted () {
        this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        })

        let wsUri = 'ws://192.168.1.112:8080/websocket/' + this.user.id
        this.websocket = new WebSocket(wsUri)
        this.websocket.onopen = evt => {
            // console.log(evt)
        }
        this.websocket.onclose = evt => {
            this.$notify.error({
                duration: 5000,
                title: '错误',
                message: '连接已关闭'
            })
        }
        this.websocket.onmessage = evt => {
            console.log(evt)
            let data = JSON.parse(evt.data)
            let html = ''
            if (data.order === 'link') {
                html = `<i class="el-icon-document"></i><a href="${data.message}"></a>`
            } else {
                html = data.message
            }
            this.items.push({html})
            this.$nextTick(_ => {
                let dialog = this.$refs.dialog
                dialog.scrollTop = dialog.scrollHeight
            })
        }
        this.websocket.onerror = evt => {

        }

        window.onbeforeunload = function () {
            return false
        }
    },

    destroyed () {
        window.onbeforeunload = undefined
    },

    methods: {
        filterNode (value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },

        filterNode3 (value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },

        handleEmojiSelect (img) {
            let edit = this.$refs.edit
            img.src = img.src.replace('/images', '/static/images')
            edit.appendChild(img)
            // 保持上次的光标位置
            keepLastIndex(edit)
        },

        send (e) {
            e && e.preventDefault()
            let edit = this.$refs.edit
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
                this.$message.warning('未选择文件')
                return
            }
            let form = new FormData()
            form.append('file', file)
            form.append('user_id', 11)
            form.append('user_name', 'zym2')
            form.append('talk_id', 3)
            form.append('mode', 0)

            window.fetch('http://192.168.1.112:8080/talk/upload', {
                method: 'POST',
                body: form
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
            file.value = null
        },

        invite () {
            getExpert(this.user.agentid).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('邀请成功')
                    // to invite another professor
                }
            }, res => {
                this.$message.error(res.meta.errorMsg || '邀请成功')
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
