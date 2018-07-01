<template>
  <div class="page-content page-left-nav account">
    <department-nav :nav="departData" :isSimpleData="true" @getByDepartment="getInfoByDepart">
    </department-nav>
    <div class="table-container">
      <div class="page-toolbar">
        <div class="page-title">账号列表</div>
        <div class="opt-btn-group">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addAccount">添加账号</el-button>
        </div>
      </div>
      <el-table :data="accountTable" stripe max-height="450">
      <el-table-column fixed prop="account" label="账号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>

      <el-table-column prop="belongsDepartment" label="所属分布">
      </el-table-column>
      <el-table-column prop="belongsTopLevelDepartment" label="所属级别">
      </el-table-column>
      <el-table-column prop="active" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.active === 0">离职</span>
          <span v-else>在职</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="modifyRow(scope.row, accountTable)" type="primary" size="mini">
            修改
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.row, accountTable)" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    
  </div>
</template>
<script>
import DepartmentNav from '@/components/departmentNav/index'
import proxy from './proxy.js'

export default {
  components: { DepartmentNav },
  data () {
    return {
      departData: [],
      accountTable: []
    }
  },
  computed: {
    accessToken () {
      return this.$store.getters.token
    }
  },
  methods: {
    // 添加跳转
    addAccount () {
      this.$router.push({ name: 'ModifyAccount', params: { id: 'add' } })
    },
    // 修改跳转
    modifyRow (row) {
      // debugger
      // console.log(row.id)
      this.$router.push({ name: 'ModifyAccount', params: { id: row.id } })
    },
    deleteRow (row) {
      this.$confirm('是否确定删除该账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proxy.deleteAccount(this.accessToken, row.id).then(res => {
          this.getAccountTable()
        })
      }).catch(() => { })
    },
    getDepartmentList () {
      proxy.getDepartmentAll(this.accessToken).then(res => {
        // console.log(res)
        this.departData = res.data
      })
    },
    getAccountTable () {
      proxy.getAllAccount(this.accessToken).then(res => {
        this.accountTable = res.data
        // console.log(this.accountTable)
      })
    },
    getTableByDepart (id) {
      proxy.getAccountByDepart(this.accessToken, id).then(res => {
        this.accountTable = res.data
      })
    },
    getInfoByDepart (depart) {
      // console.log(depart)
      this.getTableByDepart(depart.id)
    }
  },
  beforeMount () {
    this.getDepartmentList()
    this.getAccountTable()
  }
}
</script>

