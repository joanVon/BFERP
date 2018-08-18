<template>
  <div class="page-content home">
    <div class="page-toolbar project-bar">
      <div class="opt-btn-group">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addIntent">新增</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="reloadIntent">刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import proxy from './proxy.js'
export default {
  name: 'Intent',
  data () {
    return {
      intentTableData: []
    }
  },

  beforeMount () {
    this.getIntentTableData()
  },
  methods: {
    reloadIntent () {
      this.getIntentTableData()
    },

    getIntentTableData () {
      proxy.getIntentTable().then(res => {
        this.intentTableData = res.data
      })
    },

    addIntent () {}
  }

}
</script>

<style lang="less" scoped>
.project-bar {
  width: 100%;
  background-color: #fff;
  padding: 12px;
  margin-left: 12px;
  box-sizing: border-box;
}
</style>

