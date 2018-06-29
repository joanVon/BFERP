<template>
  <div class="login-page">
    <div class="login-content">

      <el-form ref="loginForm" :model="loginForm" label-width="80px">
        <el-form-item label="">
          <el-input v-model="loginForm.account" @keyup.enter.native="login()"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="loginForm.pwd" @keyup.enter.native="login()"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="login" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
// import proxy from './proxy'
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
        this.$router.push({ name: 'Intent' })
      })
      // proxy.loginByUsername(this.loginForm).then(res => {
      //   commit('SET_SIDEBAR', res.data.sideBarMenu)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  height: 100%;
  .login-content {
    width: 460px;
    height: inherit;
    margin: 0 auto;
    transform: translate(0, 30%);
  }
}
</style>