<template>
    <div id="pro_wrapper">
        <el-container>
            <el-header>
                <img src="../../assets/imgs/header-logo.png" alt="LOGO">
                <el-menu :default-active="activeIndex2" class="el-menu-demo chat-menu" mode="horizontal" @select="handleSelect" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="3">退出</el-menu-item>
                    <el-menu-item index="2">商店</el-menu-item>
                    <el-menu-item index="1">
                        <el-select class="select" v-model="value" placeholder="在线">
                            <el-option
                            class="option"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside class="aside1">
                    <el-input
                        placeholder="输入关键字进行过滤"
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
                    <div class="my_dialog_box">
                        <div class="my_dialog-item" :class="item.class" v-for="(item, i) in items" :key="i" v-html="item.html"></div>
                    </div>
                    <div class="my_input_box">
                        <div class="my_chat_option">
                            <el-tooltip content="表情" placement="top">
                                <!-- <button ref='btn' @click='showEmoji = !showEmoji' class="my_emoji"><img src="../../assets/imgs/smile.png" alt="表情" class="emoji_picture"></button> -->
                                <i class="iconfont icon-smile my_emoji" ref='btn' @click='showEmoji = !showEmoji'></i>
                            </el-tooltip>
                            <input hidden ref="file" type="file" @change="sendFile()" class="file">
                                <el-tooltip content="上传图片" placement="top">
                                    <!-- <img src="../../assets/imgs/picture.png" alt="上传图片" class="my_picture_picture" @click="selectFile()"> -->
                                    <i class="iconfont icon-xitongtupianziyuan my_picture_picture" @click="selectFile()"></i>                                    
                                </el-tooltip>
                            <input hidden ref="file" type="file" @change="sendFile()" class="file">
                                <el-tooltip content="上传文件" placement="top">
                                    <!-- <img src="../../assets/imgs/file.png" alt="上传文件" class="my_file_picture" @click="selectFile()"> -->
                                    <i class="iconfont icon-3801wenjian my_file_picture" @click="selectFile()"></i>
                                </el-tooltip>
                            <el-tooltip content="邀请专家" placement="top">
                                <!-- <el-button type="text" @click="dialogTableVisible = true"><img src="../../assets/imgs/person-stalker.png" alt="邀请专家" class=""></el-button> -->
                                <i class="iconfont icon-icon_users my_inviation" @click="invite()"></i>
                            </el-tooltip>
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
import { keepLastIndex } from '@/util/jskit'
import 'rui-vue-emoji/dist/vue-emoji.css'
import VueEmoji from 'rui-vue-emoji'

export default {
    components: {
        VueEmoji
    },

    data () {
        return {
            showEmoji: false,
            items: [
                {html: '<p><span class="user_message">你好，啊hello</span><span class="username">客户</span></p>', class: 'user'},
                {html: '<p><span class="user_message">你好，啊&nbsp;&nbsp;&nbsp;</span><span>客户</span></p>', class: 'user'},
                {html: '<p><span class="user_message">sdfsdfdsfsdf</span><span>客户</span></p>', class: 'user'},
                {html: '<p><span class="professorname">专家</span><span class="professor_message">&nbsp;&nbsp;&nbsp;你好，请问有什么问题?&nbsp;&nbsp;&nbsp;</span></p>', class: 'professor'}
            ],
            value: '',
            activeIndex: '1',
            activeIndex2: '1',
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
                    label: '邀请中',
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
                    label: '在线客人',
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
            
            count: 1,
        }
    },
    mounted () {
        this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        })
        window.onbeforeunload = function () {
            return false
        }
    },
    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
        },
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

        handleNodeClick (data) {
            console.log(data)
        },

        invite () {
            alert('确认邀请')
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
            //width 85px
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
                        color #ffffff
    .el-menu--horizontal
        background-color color-main
        width 100%
        height 100%
    .el-aside1
        height 850px
        background-color #ffffff
    .aside2
        height 850px
        background-color #ffffff
        border-left 2px solid color-main
        border-right 2px solid color-main
        p
            text-align center
            color color-main
    .el-main
        height 850px
        //background-color orange
        .my_dialog_box
            height 65%
            border 1px solid #e4e7ed
            .my_dialog-item
                font-size 1.2em
                margin-left 1%
                width auto
                padding 1%
                max-width 98%
                word-break: break-all;
                word-wrap: break-word;
                p
                    display inline
                &.user
                    text-align right
                    margin-right 1%
                    color #777777
                    //background url("../../assets/imgs/dialog.png")
                    // background-repeat no-repeat
                    // background-position 99.5% 0
                    .user_message
                        //background-color rgba(40,170,255,0.7)
                        background-color #3385ff
                        color #ffffff
                        border-radius 10px
                        margin-right 1%
                        overflow hidden
                        padding 0 10px
                        display inline-block
                        max-width 80%
                &.professor
                    color #777777
                    .professor_message
                        margin-left 10px
                        background-color rgba(240,240,240,0.5)
                        border-radius 10px
                        padding 0 10px
                        display inline-block
                        max-width 80%
        .my_input_box
            height 35%
            .my_chat_option
                height 15%
                width 100%
                padding-top 1.5%
                .my_emoji
                    border none
                    background none
                    margin-top 2%
                    font-size 1.8em
                    cursor pointer
                .my_picture_picture
                    cursor pointer
                    font-size 1.8em
                    padding-left 0.5%
                .my_file_picture
                    padding-left 0.5%
                    cursor pointer
                    font-size 1.8em
                .my_inviation
                    cursor pointer
                    font-size 1.8em
                    padding-left 0.5%
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
                height 145px
                width 83%
                overflow-x hidden
                overflow-y auto
                border none
                margin-left 0.5%
                margin-top 0.5%
                word-wrap break-word//换行
                outline 0
</style>
