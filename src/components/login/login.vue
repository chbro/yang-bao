<template>
  <div id="main">
      <div class="head_title" style="text-align: center;">
          <img src="../../assets/imgs/user-logo-2.png" alt="logo" class="logo">
          <!-- <p class="title">东俊（有机）养殖生产管理追溯系统管理平台</p> -->
      </div>
      
      <div class="box">
          <p>登   录</p>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">

            <el-form-item prop="username">
                <el-input style="width:90%;min-width:150px;" type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名/Login Name"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
                <el-input style="width:90%;min-width:150px;" type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码/Password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input style="width:30%;min-width:50px;" v-model="code"></el-input>
                <div class="code" @click="refreshCode">
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
            </el-form-item>
            
            <el-form-item>
                <el-button style="width:90%;min-width:150px;" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>

            <el-form-item>
                <el-checkbox>保存登录/Remember ME</el-checkbox>
            </el-form-item>

         </el-form>
      </div>
      <div class="link">
        <router-link to="/register">新用户注册</router-link>  |  <router-link to="/">找回密码</router-link>
      </div>
  </div>
</template>
<script>
import SIdentify from '@/components/login/identify'

export default {
    components: {
      SIdentify
    },
    data() {
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          
          callback();
        }
      };

      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          username: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUser, trigger: 'blur' }
          ]
        },
        code: null,
        identifyCodes:'1234567890abcdefghigklmnopqrstuvwxyz',
        identifyCode:''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      }
    },
    mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
}
</script>
<style lang="stylus">
@import '../../assets/css/color'
    #main{
        background-color color-main
        height 720px 
    }
    .head_title{
        padding-top 80px
    }
    .logo{
        text-align center
    }
    // .title{
    //     color #ffffff
    //     font-size 1.5em
    //     text-align center
    // }
    .box {
        // width :20%;
        width 420px
        min-width 180px
        background-color #ffffff
        // margin-left 40%
        margin 0 auto
        margin-top 25px
    }
    .box p{
        color color-main
        text-align center
        font-size 1.5em
        padding-top 5%
    }
    .demo-ruleForm{
        width 100%
        margin-left 5%
    } 
    .code{
      // display inline
      float right 
      margin-right 38%
    }
    .link{
      text-align center
      color #ffffff
    }
    .link a{
      color #ffffff
    }
</style>