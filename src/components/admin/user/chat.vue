<template>
    <div class="chat-wrapper">
        <el-tabs type="border-card">
            <el-tab-pane label="咨询">
                <el-container>
                    <el-main>
                        <div class="dialog_box" ref="dialog">
                            <div class="dialog-item" :class="{self: item.self}" v-for="(item, i) in items" :key="i"><span v-text="item.self ? user.name : expert.name"></span><span class="msg" v-html="item.html"></span></div>
                        </div>
                        <div class="input_box">
                            <div class="chat-option">
                                <i class="iconfont icon-smile emoji" ref='btn' @click='showEmoji = !showEmoji'></i>
                                <input hidden ref="file" type="file" @change="sendFile()" class="file">
                                <i class="iconfont icon-3801wenjian" @click="$refs.file.click()"></i>
                            </div>
                            <vue-emoji
                                v-show='showEmoji'
                                ref='emoji'
                                @select='handleEmojiSelect'
                                @hide="showEmoji = false"
                            ></vue-emoji>
                            <div class="chat-input">
                                <div autofocus contenteditable ref='edit' class="chat_area"></div>
                            </div>
                            <div class="opr-btns">
                                <el-button type="primary" size="small" @click="dialogFormVisible = true">关闭</el-button>
                                <el-button type="primary" size="small" @click="send()" class="send">发送</el-button>
                            </div>
                        </div>
                    </el-main>
                    <el-aside width="25%">
                        <ul>
                            <li>类型：{{ expert.type }}</li>
                            <li>姓名：{{ expert.realName || expert.name }}</li>
                            <li>邮件：{{ expert.email }}</li>
                            <li>电话：{{ expert.phone }}</li>
                        </ul>
                        <img class="flybar" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525981450379&di=9e7e2242dc95f0113c3c84e880b301a7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F242dd42a2834349bc83325b9c2ea15ce36d3bed1.jpg"/>
                    </el-aside>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="留言">
                <div class="message">
                    <el-form>
                        <el-form-item>
                            <el-input v-model="form.name" auto-complete="off" placeholder="用户姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.email" auto-complete="off" placeholder="邮件地址"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="textarea" :rows="4" v-model="form.message" placeholder="留言内容"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitMessage" type="primary" class="submit_message">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="评价" :visible.sync="dialogFormVisible">
            <el-form :model="form" class="chat-formdialog">
                <el-form-item label="评价" label-width="80px">
                    <el-radio-group v-model="evaluation">
                        <el-radio :label="5">非常满意</el-radio>
                        <el-radio :label="4">满意</el-radio>
                        <el-radio :label="3">一般</el-radio>
                        <el-radio :label="2">不满意</el-radio>
                        <el-radio :label="1">很差</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="评价内容字数不超过200"
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
import 'rui-vue-emoji/dist/vue-emoji.css'
import VueEmoji from 'rui-vue-emoji'
import { keepLastIndex, isReqSuccessful, resetFile } from '@/util/jskit'
import { getExpert, evalulateExpert, getUserById, CommentInsert } from '@/util/getdata'
import { wsUrl, baseUrl, tokenStr, authStr } from '@/util/fetch'

export default {
    components: {
        VueEmoji
    },

    mounted () {
        let uid = this.$route.params.id
        getUserById(uid).then(res => {
            if (isReqSuccessful(res)) {
                let { userFactory, userRealname, userRole } = res.data.model
                this.user = {
                    id: uid,
                    name: userRealname,
                    aid: res.data.agent,
                    userRole
                }
            }
        }).then(_ => {
            getExpert(this.user.aid).then(res => {
                if (res.data === null) {
                    this.$notify.warning({
                        duration: 5000,
                        title: '友情提醒',
                        message: '当前没有专家在线'
                    })
                    return
                }
                if (isReqSuccessful(res)) {
                    let { phone, name, realName, expert_id, type, email } = res.data
                    this.expert = {
                        id: expert_id,
                        realName,
                        name,
                        phone,
                        email,
                        type
                    }
                }
            }, _ => {
                this.$notify.error({
                    duration: 5000,
                    title: '错误',
                    message: '匹配专家失败'
                })
            })
        })


        // 表情组件初始化
        this.$refs.emoji.appendTo({
            area: this.$refs.edit,
            btn: this.$refs.btn,
            position: 'top left'
        })

        let ws = wsUrl + '/' + uid
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
            if (data.order === 'fresh') {
                // 开启群聊
                this.talkid = data.talk_id
                return
            }

            let html = ''
            if (data.order === 'link') {
                let msg = data.message
                let idx = msg.lastIndexOf(':')
                let name = msg.substr(idx + 1)
                let addr = msg.substr(0, idx)
                html = `<a href="${addr}"><i class="el-icon-document"></i>${name}</a>`
            } else {
                html = data.message
                this.pushChatMessage(html, data.order === 'self')
            }
        }

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
                email: '',
                name: '',
                message: ''
            },

            showEmoji: false, // 表情选择框是否可见
            items: [],
            websocket: null, // 本地ws连接
            user: {},
            expert: {}
        }
    },

    methods: {
        submitMessage () {
            // TODO: 用户提交对专家的留言
            // let data = {

            // }
            // CommentInsert(data).then(res => {
            //     if (isReqSuccessful(res)) {
            //         this.$message.success('留言成功')
            //         this.form = {}
            //     }
            // })
        },

        evaluate () {
            if (this.description.length >= 200) {
                this.$message.warning('评价字数不能超过200')
                return
            }
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
                isExpert: false,
                user_id: this.user.id,
                name: this.user.name,
                talk_id: this.expert.id,
                mode: 0
            }
            if (this.talk_id) {
                data.mode = 2
                data.talk_id = this.talk_to
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
            form.append('talk_id', this.expert.id)
            form.append('role_id', this.user.userRole)
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)

            // post文件使用原生fetch,未写入总接口
            window.fetch(baseUrl + '/talk/upload', {
                method: 'POST',
                body: form,
                headers
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
            resetFile(filedom)
        },

        pushChatMessage (html, isSelf) {
            this.items.push({html, self: isSelf})
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
    box-sizing border-box
    width 100%
    padding 10px
    font-size 15px
    .el-input input
        border 1px solid #dcdfe6
        border-radius 5px
    .el-tabs__content
        height auto
    .el-tabs--border-card > .el-tabs__content
        padding 0
    .el-tabs__nav-scroll
        height 50px
        line-height 50px
        .el-tabs__nav
            float left
            height 100%
    .el-tabs--border-card > .el-tabs__header .el-tabs__item
            line-height 50px
    .el-tabs__item
        height 100%
    .el-main
        height auto
        overflow-y hidden
        .dialog_box
            margin 10px 10px 0 0
            height 250px
            border 1px solid #e4e7ed
            border-radius 5px
            overflow-y auto
            .dialog-item
                overflow hidden
                font-size 1em
                margin 10px 20px
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
        .input_box
            position relative
            margin 0 10px 10px 0
            .chat-option
                height 50px
                line-height 50px
                width 100%
                i
                    margin-right 5px
                    cursor pointer
                    font-size 20px
        .chat-input
            padding 10px 20px 50px 20px
            border 1px solid #e4e7ed
            border-radius 5px
            color #6f7180
            .chat_area
                min-height 100px
                overflow-y auto
                margin 5px
                outline 0
        .opr-btns
            position absolute
            right 20px
            bottom 10px

    .el-aside
        position relative
        background-color #f5f7fa
        height auto
        li
            padding 5%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .flybar
            position absolute
            bottom 0
            width 100%
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
