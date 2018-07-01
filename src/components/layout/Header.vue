<template>
  <header class="layout-header">
    <div class="layout-header-inner">
      <div class="layout-header-logo">
        <img src="../../../static/imgIcon/logo.png" alt="">
        <span>百福ERP管理系统</span>
      </div>
      <div class="layout-header-btns">
        <!-- <el-button icon="el-icon-setting" circle></el-button> -->

        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <span>{{username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item v-for="(item, idx) in userItems" :key="idx">{{item.name}}</el-dropdown-item> -->
            <el-dropdown-item @click.native="goToUserInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { removeToken } from '@/api/auth'
import './style.less'
export default {
  name: 'Header',
  data () {
    return {
      // username: '',
    }
  },
  computed: {
    username () {
      let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
      // this.username = loginInfo.account
      return loginInfo.account
    }
  },
  methods: {
    goToUserInfo () {
      this.$router.push({ name: 'UserInfo' })
    },
    logOut () {
      removeToken()
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.layout-header-logo {
  font-size: 16px !important;
  img {
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
    box-shadow: inset 2px 0px 0px 0px rgba(0, 0, 0, 0.1803921568627451);
  }
}
</style>
