<template>
  <div class="department-menu">
  <!-- <el-button icon="el-icon-search"></el-button> -->
  <el-menu >
    <template v-for="value in nav">
      <el-submenu :index="''+value.id+''" v-if="value.childrenItems.length">
        <template slot="title">
          <span slot="title">{{value.name}}</span>
        </template>
        <el-menu-item :index="''+secondMenu.id+''" v-for="(secondMenu, $idx) in value.childrenItems" :key="$idx">
          {{secondMenu.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item :index="''+value.id+''" v-else>
        <span slot="title">{{value.name}}</span>
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
    getByDepart () {
      this.$emit('getByDepartment', 'department')
    }
  },
  created () {
    if (this.isSimpleData) {
      // let ddd = new Tree(this.nav).init(null)
      // console.log(ddd)
    }
    console.log(this.departmentMenu)
  }
}
</script>

