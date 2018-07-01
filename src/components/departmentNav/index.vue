<template>
  <div class="department-menu">
  <div class="top-root">
    <i class="icon-erp icon-root"></i>
    <span>部门架构</span>
  </div>
  <el-menu>
    <template v-for="value in nav">
      <el-submenu :index="''+value.id+''" v-if="value.childrenItems.length">
        <template slot="title">
          <span class="department-nav-title" slot="title" @click="getByDepart(value)">{{value.name}}</span>
        </template>
        <el-menu-item :index="''+secondMenu.id+''" v-for="(secondMenu, $idx) in value.childrenItems" :key="$idx">
          <span class="department-nav-title" @click="getByDepart(secondMenu)">{{secondMenu.name}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item :index="''+value.id+''" v-else>
        <span class="department-nav-title" slot="title" @click="getByDepart(value)">{{value.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
  </div>
</template>

<script>
// import Tree from './transform.js'
import './style.less'
export default {
  name: 'DepartmentNav',
  props: {
    isSimpleData: {
      type: Boolean,
      default: false
    },
    nav: {type: Array, default: () => { return [] }}
  },
  data () {
    return {
      departmentMenu: this.nav
    }
  },
  methods: {
    getByDepart (department) {
      this.$emit('getByDepartment', department)
    }
  },
  created () {
    if (this.isSimpleData) {
      // let ddd = new Tree(this.nav).init(null)
      // console.log(ddd)
    }
    // console.log(this.departmentMenu)
  }
}
</script>

