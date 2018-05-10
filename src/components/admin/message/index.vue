<template>
  <div>
    <div class="user-info admin-form">
      <p class="card-title">短信群发</p>
      <div class="border-main">
        <el-input class="mod_message_tel" v-model="mobile" placeholder="请输入手机号码，号码之间用英文逗号分隔">
          <template slot="prepend">手机号码</template>
        </el-input>
        <div class="card">
          <!-- <p class="card-title">短信内容</p> -->
          <el-input v-model="message" type="textarea" placeholder="请输入短信内容"></el-input>
        </div>
        <div class="admin-send">
          <el-button type="primary" @click="postMessage">发送短信</el-button>
        </div>
      </div>
    </div>
    <div class="mod_message_form user-info admin-form">
    <p class="card-title">预警条数设置</p>
    <div class="border-main">
      <div class="mod_message_professor">
        <span class="professor_name">审核专家</span>
        <el-input-number v-model="pressureTips" controls-position="right" :min=1 size="small"></el-input-number> 条记录未审核
        <el-input-number v-model="expireTime" controls-position="right" :min=1 size="small"></el-input-number>  天内不再发送
      </div>
      <div class="card">
        <!-- <p class="card-title">短信内容模板</p> -->
        <el-input v-model="template" type="textarea" placeholder="请输入短信内容模板"></el-input>
      </div>
      <div class="admin-send">
        <el-button type="primary" @click="postWarningInfo">提交信息</el-button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { postMessage, postWarningInfo } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
  data () {
    return {
      mobile: '',
      message: '',
      pressureTips: 1,
      expireTime: 1,
      template: ''
    }
  },
  methods: {
    // 发送短信
    postMessage () {
      let arr = this.mobile.split(',')
      try {
        arr.forEach((v, i) => {
          if (!/^1[34578]\d{9}$/.test(v)) {
            this.$message.warning(`请检查第${i}个手机号:${v}`)
            throw new Error('rx')
          }
        })
      } catch(e) {
        return
      }

      postMessage({
        mobile: this.mobile,
        message: this.message
      }).then(res => {
        if (isReqSuccessful(res)) {
          this.$message({
              type: 'success',
              message: '短信发送成功'
          })
        }
      }).catch(() => {
        this.$message.error('短信发送失败')
      })
    },
    // 提交信息
    postWarningInfo () {
      postWarningInfo({
        expireTime: this.expireTime,
        pressureTips: this.pressureTips,
        message: this.template
      }).then(res => {
        if (isReqSuccessful(res)) {
          this.$message({
              type: 'success',
              message: '预警信息发送成功'
          })
        }
      }).catch(() => {
        this.$message.error('预警信息发送失败')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mod_message_form
    margin-top 20px
  .mod_message_tel
    width 60%
  .mod_message_professor
    margin 10px 10px 0 5px
    font-size 15px
    .professor_name
      font-weight bold
</style>

