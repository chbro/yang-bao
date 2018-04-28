<template>
    <div>
        <footer class="app-footer">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="info">
                        <a href="#">
                            <img src="../../assets/imgs/footer-logo.png" alt="Nubis Sheep">
                        </a>
                        <p class="mg-p">&nbsp;ADD：贵州省铜仁市沿河县官舟镇枣树村</p>
                        <ul class="contact">
                            <li><i class="iconfont icon-ditu00"></i><span>电子地图</span></li>
                            <li><i class="iconfont icon-dianhua"></i><span>(0856) 6995166</span></li>
                            <li><i class="iconfont icon-email1"></i><span>382102369@qq.com</span></li>
                        </ul>
                        <ul class="social">
                            <li><a href="http://www.nubiangoat.cn"><i class="iconfont icon-laptop"></i></a></li>
                            <li><a href="#"><i class="iconfont icon-phone"></i></a></li>
                            <li class="ico-center"><a href="info/weixin.html"></a></li>
                            <li><a href="info/xcx.html"><i class="iconfont icon-h5"></i></a></li>
                            <li><a href="http://www.nubiangoat.net"><i class="iconfont icon-wbcloudy"></i></a></li>
                        </ul>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="quick-links">
                        <h3 class="footer-title">网站导航</h3>
                        <ul>
                            <li v-for="(item, i) in links" :key="i">
                                <i class="el-icon-arrow-right"></i><a :href="item.href">{{ item.label }}</a>
                            </li>
                        </ul>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="news-post">
                        <h3 class="footer-title">最新动态</h3>
                        <ul>
                            <li v-for="(item, i) in news" :key="i">
                               <img :src="item.imgsrc" alt="news">
                                <div class="content">
                                    <router-link :to="'/posts/' + item.id">{{ item.content }}</router-link>
                                    <span v-text="item.date"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="contact-widget">
                        <h3 class="footer-title">留言专栏</h3>
                        <div class="contact-form">
                            <input v-model="form.username" placeholder="Full Name" minlength="2" maxlength="20">
                            <input v-model="form.contact" placeholder="Email Address" minlength="5" maxlength="30">
                            <textarea minlength="1" maxlength="500" v-model="form.message" placeholder="Your Message"></textarea>
                            <el-select v-model="tagValue" placeholder="请选择">
                                <el-option
                                  v-for="tag in tags"
                                  :key="tag.value"
                                  :label="tag.label"
                                  :value="tag.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="attitudeValue" placeholder="请选择">
                                <el-option
                                  v-for="attitude in attitudes"
                                  :key="attitude.value"
                                  :label="attitude.label"
                                  :value="attitude.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="intentionValue" placeholder="请选择">
                                <el-option
                                  v-for="intention in intentions"
                                  :key="intention.value"
                                  :label="intention.label"
                                  :value="intention.value">
                                </el-option>
                            </el-select>
                            <button @click="addNote()">Send</button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </footer>
        <p class="footer-bottom">Copyright &copy; 2018.贵州省东骏有机农业科技有限公司(Guizhou Dongjun Organic Agriculture Technology Co., Ltd.) 版权所有</p>
    </div>
</template>

<script>
import { Comment } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data () {
        return {
            links: [
                {label: '首页', href: '/'},
                {label: '有机介绍', href: '/'},
                {label: '联系我们', href: '/'},
                {label: '集团简介', href: '/'},
                {label: '旗下子公司', href: '/'},
                {label: '产品展示', href: '/'},
                {label: '电商旺铺', href: '/'}
            ],

            form: {
                username: '',
                contact: '',
                message: '',
                tag: '',
                attitude: '',
                intention: ''
            },
            tags: [
                {value: 'aaa'},
                {value: 'bbb'},
                {value: 'ccc'}
            ],
            attitudes: [
                {value: 'aaa'},
                {value: 'bbb'},
                {value: 'ccc'}
            ],
            intentions: [
                {value: 'aaa'},
                {value: 'bbb'},
                {value: 'ccc'}
            ],
            tagValue: null,
            attitudeValue: null,
            intentionValue: null,

            news: [
                {id: 1, imgsrc: '../../assets/imgs/blog/s1.jpg', content: '国务院扶贫办到贵州省努比亚牧业调研', date: '31 Dec, 2017'},
                {id: 1, imgsrc: '../../assets/imgs/blog/s2.jpg', content: '贵州省努比亚牧业被列入全市重点企业', date: '31 Dec, 2017'},
                {id: 1, imgsrc: '../../assets/imgs/blog/s3.jpg', content: '新华社记者对松桃“10＋1”扶贫模式进行专访', date: '31 Dec, 2017'}
            ]
        }
    },

    methods: {
        addNote () {
            let nameLen = this.form.username.length
            let msgLen = this.form.message.length
            if (nameLen < 4 || nameLen > 20) {
                this.$message.warning('名字长度在4-20之间')
                return
            }
            if (msgLen === 0 || msgLen > 500) {
                this.$message.warning('留言字数在1-500之间')
                return
            }

            let mailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (!mailReg.test(this.form.contact)) {
                this.$message.warning('请输入正确的邮箱')
                return
            }

            Comment(this.form).then(res => {
                if (isReqSuccessful(res)) {
                    this.$router.push({name: 'comment'})
                }
            }, _ => {
                this.$message.error('留言失败')
            })
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.app-footer
    position relative
    padding 90px 5%
    background-color #262626
    color #C9C9C9

    .footer-title
        position relative
        font-size: 20px;
        text-transform: capitalize;
        font-weight: bold;
        color: #FEF9F9;
        margin: 0;
        margin-bottom 35px
        &::after
            background: #6aaf08;
            bottom: -15px;
            content: "";
            display: block;
            height: 2px;
            left: 0;
            margin-top: 0;
            position: absolute;
            width: 40px;

    .info
        .mg-p
            margin 12px 0 21px
        .contact
            li
                font-size 13px
                margin-bottom 18px
                color color-foot
            i
                font-size 20px
                color #fff
                margin-right 12px
                vertical-align middle
        .social
            li
                float left
                margin-right 6px
                padding 7px
                border 1px solid color-foot
                border-radius 50%
                cursor pointer
                transition background-color ease 0.2s
                a
                    color color-foot
                i
                    font-size 20px
                &:hover
                    background-color color-green
            .ico-center
                padding 16px
                margin-top -8px

    .quick-links
        li
            border-bottom: 1px dashed #454545;
            margin-bottom: 8px;
            padding-bottom: 7px;
        .el-icon-arrow-right
            font-weight bold
            color #fff
        a
            color: #c9c9c9;
            font-size: 14px;
            line-height: 22px;
            padding-left: 15px;
            &:hover
                color color-green

    .news-post
        li
            border-bottom 1px dashed #454545
            padding-bottom p=12px
            margin-bottom p
            img
                float left
                width 70px
            .content
                text-align justify
                margin-left 90px
                span
                    display block
                    color color-green
                    font-size: 12px;
                    font-style: italic;
                    line-height: 1;
                    margin-top: 9px;
                a
                    color color-foot

    .contact-widget
        input, textarea, select
            box-sizing border-box
            background: rgba(0, 0, 0, 0.65);
            border: 1px solid #222;
            color: #fff;
            width: 100%;
            height: 50px;
            font-size: 13px;
            margin-bottom: 12px;
            outline: none;
            padding: 0 20px;
        textarea
            height 100px
            padding-top 15px
        button
            display block
            width 100%
            cursor pointer
            height: 45px;
            line-height: 45px;
            background-color color-green
            color: #fff;
            text-transform: uppercase;
            font-size: 13px;
            border: none;
            outline: none;
            padding: 0;
            font-weight: bold;
            transition: all .3s ease;
            &:hover
                color color-green
                background-color #fff
        option
            width auto
            height 45px
            line-height 45px
            font-size 20px
            background: rgba(0, 0, 0, 0.65)
            padding 0 20px

.footer-bottom
    margin 0
    height h=50px
    line-height h
    text-align center
    color #C9C9C9
    background-color color-main

@media screen and (max-width 600px)
    .app-footer
        padding 15px 5%
        .el-col-6
            width 100%
            margin-bottom 15px
</style>
