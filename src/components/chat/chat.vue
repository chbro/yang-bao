<template>
    <div id="wrapper">
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
                        dialog_box<br/>
                        dialog_box<br/>
                        dialog_box<br/>
                        dialog_box<br/>dialog_box<br/>dialog_box<br/>dialog_box<br/>dialog_box<br/>
                        dialog_box<br/>dialog_box<br/>dialog_box<br/>dialog_box<br/>dialog_box<br/>
                        dialog_box<br/>dialog_box<br/>dialog_box<br/>dialog_box<br/>
                    </div>
                    <div class="input_box">
                        <div contenteditable ref = 'edit'></div>
                        <button ref = 'btn' @click = 'showEmoji = !showEmoji'>emoji</button>
                        <vue-emoji
                        v-show = 'showEmoji'
                        ref = 'emoji'
                        @select = 'handleEmojiSelect'
                        @hide = 'handleHide'
                        ></vue-emoji>
                        <!-- <el-input></el-input> -->
                        <el-button>发送</el-button>
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
import 'rui-vue-emoji/dist/vue-emoji.css'
import VueEmoji from 'rui-vue-emoji'

export default {
    components: {
        VueEmoji
    },
    data () {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            myText: 'sdd',
            showEmoji: false,
            data: [],
            value: ''
        }
    },
    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
        },
        hide () {
            this.showEmoji = false
        },
        handleHide (e) {
            this.hide()
        },

        handleEmojiSelect (img) {
            console.log(img.src, img.src.substr(3))
            img.src = img.src.replace('/images', '/static/images')
            this.$refs.edit.appendChild(img)
        }
    },
    mounted () {
        console.log(this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        }))
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

#wrapper
    height 700px
    width 800px
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
</style>
