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
          <el-input v-model="loginForm.account" placeholder="请输入用户名" @keyup.enter.native="login()"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="loginForm.pwd" placeholder="请输入密码" @keyup.enter.native="login()"></el-input>
        </el-form-item>

        <el-form-item label="" style="margin-top: 42px;">
          <el-button type="primary" @click="login" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
import './style.less'
export default {
  name: 'login',
  // components: { Layout },
  data () {
    return {
      loginForm: {
        account: '',
        pwd: ''
      }
    }
  },
  methods: {
    login () {
      // commit('SET_SIDEBAR', response.data.sideBarMenu)
      this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
        this.$router.push({ name: 'Account' })
      })
      // proxy.loginByUsername(this.loginForm).then(res => {
      //   commit('SET_SIDEBAR', res.data.sideBarMenu)
      // })
    }
  }
}
</script>

<style lang="less" scoped>

</style>