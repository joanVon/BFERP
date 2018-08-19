<template>
  <div class="login-page">
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="login-content">

      <el-form class="login-form" ref="loginForm" :model="loginForm">
        <div class="login-logo">
          <img src="../../../static/imgIcon/logo.png" alt="">
          <div>百福ERP登录</div>
        </div>
        <el-form-item label="">
          <el-input v-model="loginForm.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="loginForm.pwd" placeholder="请输入密码" @keyup.enter.native="login()"></el-input>
          <el-button type="text" style="float: right; font-size: 12px;" @click="showPassword">忘记密码</el-button>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" @click="login" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- dialog -->
    <el-dialog title="密码重置" :visible.sync="dialogPassword" width="30%">
      <el-form :model="passForm" status-icon :rules="passRules" ref="passForm" label-width="100px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="passForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model.number="passForm.code" :maxlength="6">
            <el-button slot="append" @click="sendCode(passForm.phone)" size="mini">发送验证码</el-button>
          </el-input>
          <!-- <el-button @click.prevent="sendCode(passForm.phone)" size="mini">发送验证码</el-button> -->
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model.trim="passForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="passForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPassword = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitPass('passForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import './style.less'
import regex from '@/libs/utils/regex'
import proxy from './proxy.js'
export default {
  name: 'login',
  // components: { Layout },
  data () {
    return {
      loginForm: {
        account: '',
        pwd: ''
      },
      dialogPassword: false,
      passForm: {
        phone: '',
        password: '',
        checkPass: '',
        code: ''
      },

      passRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: regex.mobile, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: this.checkPassword, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请确认新密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: regex.privNumber, message: '请输入正确的校验吗', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkPassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    login () {
      this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
        this.$router.push({ name: 'Intent' })
      })
    },

    showPassword () {
      this.dialogPassword = true
    },
    sendCode (mobile) {
      proxy.getVerifyCode({phone: mobile}).then(res => {

      })
    },
    submitPass (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = {
            phone: this.passForm.phone,
            code: this.passForm.code,
            password: this.passForm.password
          }
          proxy.resetPassword(this.passForm.phone, newData).then(res => {
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            this.dialogPassword = false
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>