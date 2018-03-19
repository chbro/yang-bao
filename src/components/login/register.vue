<template>
  <div id="main">
      <div class="head_title" style="text-align: center;">
          <img src="../../assets/imgs/user-logo-2.png" alt="logo" class="logo">
      </div>
      
      <div class="box">
            <p>会&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</p>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input style="display:inline-block;" type="test" v-model="ruleForm2.username" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>账户名是您以后登录所用的账号，可以由字母a-z或数字组成</p>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input type="test" v-model="ruleForm2.email" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>您将使用此邮箱登录，请输入正确的常用邮箱</p>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>6-20位字符。密码由字母a-z及数字组成</p>
                </el-form-item>
                <el-form-item label="密码强度">
                    <el-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;弱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                    <el-tag type="success">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                    <el-tag type="info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;强&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                </el-form-item>
                
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    <p class="note">&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span>请再次输入密码</p>
                </el-form-item>
                <el-form-item label="MSN" prop="MSN">
                    <el-input type="test" v-model="ruleForm2.MSN" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="QQ">
                    <el-input type="test" v-model="ruleForm2.QQ" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="办公电话" prop="officephone">
                    <el-input type="test" v-model="ruleForm2.officephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭电话" prop="familyphone">
                    <el-input type="test" v-model="ruleForm2.familyphone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="telephone">
                    <el-input type="test" v-model="ruleForm2.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码提示问题">
                    <el-select class="select-q" v-model="value" placeholder="请选择密码提示问题">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                 
                <el-form-item label="密码问题答案" prop="answer">
                    <el-input v-model.number="ruleForm2.answer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>
                    
                </el-form-item>
            </el-form>
      </div>
    

  </div>
</template>
<script>


export default {
   data() {
      // var checkAge = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('年龄不能为空'));
      //   }
      //   setTimeout(() => {
      //     if (!Number.isInteger(value)) {
      //       callback(new Error('请输入数字值'));
      //     } else {
      //       if (value < 18) {
      //         callback(new Error('必须年满18岁'));
      //       } else {
      //         callback();
      //       }
      //     }
      //   }, 1000);
      // };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkusername = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      var checkemail = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('email不能为空'));
        }else{
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          // age: ''
          username:'',
          email:'',
          MSN:'',
          QQ:'',
          officephone:'',
          familyphone:'',
          telephone:'',
          answer:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]
          username: [
            { validator: checkusername, trigger: 'blur' }
          ],
          email: [
            { validator: checkemail, trigger: 'blur' }
          ],
          // MSN: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // QQ: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // officephone: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // familyphone: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // telephone: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // answer: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
        },
        options: [{
          value: '选项1',
          label: '您的出生日期是？'
        }, {
          value: '选项2',
          label: '您父亲的名字？'
        }, {
          value: '选项3',
          label: '您母亲的名字？'
        }, {
          value: '选项4',
          label: '您的小学教师的姓名是？'
        }, {
          value: '选项5',
          label: '您毕业的学校是？'
        }],
        value: ''
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
      }
    }
}
</script>
<style lang="stylus">
@import '../../assets/css/color'
    #main{
        background-color color-main
        height 1500px 
    }
    .head_title{
        padding-top 100px
    }
    .logo{
        text-align center
    }
    .box {
        // width :42%;
        width 840px
        min-width 180px
        background-color #ffffff
        // margin-left 29%
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
    .el-input__inner{
      width 32%
      min-width 150px
    }
    .el-input p{
      display inline
      color #000
      background-color red
    }
    .el-button{
      width 30%
      min-width 150px
      margin-bottom 50px
    }
    .box p.note{
      display: inline-block;
      color: #000;
      font-size: 14px;
      padding-top: 0;
      min-width: 150px;
      width: 54%;
      text-align left 
    }
    .box p.note span{
      color red
    }
    .el-input{
      width 25%
    }
    .el-input__inner{
      width 100%
    }
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .select-q
    .el-input
      width auto
      input
        width auto        

</style>