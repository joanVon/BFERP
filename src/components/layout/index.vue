<template>
  <!-- <Container></Container> -->

  <div class="layout-view">
    <Header></Header>
    <!-- <div class="top-collapse"> -->
      <el-button class="collapse-menu-btn" :class="isCollapse===false ? '' : 'put-left'" @click="isCollapse = !isCollapse">
        <i class="icon-erp icon-collapse-btn"></i>
      </el-button>
    <!-- </div> -->
    
    <nav class="layout-sidebar">
      <el-menu :default-active="activePath" router class="el-menu-vertical-erp" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#333744" text-color="#f8f8f8">
        <el-submenu :index="''+$index+''" v-for="(menu, $index) in sidebar" :key="$index">
          <template slot="title">
            <i class="icon-erp" :class="'icon-nav-'+$index"></i>
            <span slot="title">{{menu.name}}</span>
          </template>
          <el-menu-item :index="secondMenu.index" v-for="(secondMenu, $idx) in menu.childrenItems" :key="$idx">
            <span v-if="secondMenu.index !== '/department'">{{secondMenu.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </nav>

    <div class="layout-container" :class="{'container-collapse': isCollapse}">
      <div class="page"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>

import Header from './Header'
export default {
  name: 'Layout',
  components: { Header },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    // 左侧菜单
    sidebar () {
      let sideBar = this.$store.getters.sidebar
      let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
      if (loginInfo) {
        sideBar = loginInfo.sideBarMenu
      }

      // console.log(sideBar)

      return sideBar
    },
    activePath () {
      let firstPath = '/' + this.$route.path.split('/')[1]
      // console.log(this.$route.path)
      return firstPath
    }
  },
  mounted () {
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@defaultColor: #284dbb;
@cont2top: 48px;
.layout-view {
  position: relative;
  height: 100%;
}

.collapse-menu-btn {
  position: absolute;
  top: 56px;
  left: 168px;
  color: #f8f8f8;
  z-index: 2;
  font-size: 20px;
  padding: 0;
  /* padding: 0 0 0 20px; */
  background: none;
  border: 0 none;
  /* margin-right: 10px; */
  /* line-height: 36px; */

  &.put-left {
    left: 24px;
  }
  

  &:hover {
    color: @defaultColor;
  }
}
.layout-sidebar {
  max-width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: @cont2top;
  padding-top: 36px;
  z-index: 1;
  background: #333;

  .el-menu {
    height: inherit;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: @defaultColor !important;
  }
}
.layout-container {
  padding-top: @cont2top;
  padding-left: 210px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &.container-collapse {
    padding-left: 75px;
  }

  .page {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-right: 10px;
    padding-left: inherit;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    background: #f9f9f9;
  }
}

.el-menu-vertical-erp:not(.el-menu--collapse) {
  width: 200px;
}
</style>
