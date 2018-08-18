<template>
  <div class="page-content page-left-nav account">
    <department-tree :treeData="departData" @getByDepartment="getInfoByDepart">
    </department-tree>
    <div class="table-container">
      <div class="page-toolbar">
        <!-- <div class="page-title">账号列表</div> -->
        <div class="" style="float: left;">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addDepartment">添加部门</el-button>
          <el-button icon="el-icon-delete" size="small" @click="deleteDepartment">删除</el-button>
        </div>
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

     <!-- DIALOG -->
      <el-dialog class="department-dialog" :title="action === 'add' ? '添加部门' : '修改部门'" :modal-append-to-body="false" width="30%" :visible.sync="dialogFormVisible" @open="openDepartDialog" @close="closeDepartDialog">
        <el-form ref="departmentForm" :model="departmentForm" label-width="72px">
          <el-form-item label="隶属部门">
            <el-select v-model="departmentForm.parentDepartmentName" placeholder="请选择">
              <el-option v-for="top in departmentTop" :key="top.id" :label="top.name" :value="top.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名">
            <el-input v-model="departmentForm.departmentName" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="form-opt-btn" size="small" type="primary" @click="saveDepartment">确 定</el-button>
          <el-button class="form-opt-btn" size="small" @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    
  </div>
</template>
<script>
// import Util from '@/libs/utils'
import Tree from '@/libs/utils/transformTree'
import DepartmentTree from '@/components/departTree/index'
import proxy from './proxy.js'

export default {
  components: { DepartmentTree },
  data () {
    return {
      departData: [],
      accountTable: [],

      dialogFormVisible: false,
      action: 'add',
      actionId: '',
      currentDepartment: {},
      departmentForm: {
        parentDepartmentName: '',
        departmentName: ''
      },
      departmentTop: []
    }
  },
  computed: {
    accessToken () {
      return this.$store.getters.token
    }
  },
  methods: {
    // 添加跳转
    addDepartment () {
      this.dialogFormVisible = true
      this.action = 'add'
    },
    openDepartDialog () {
      proxy.getDepartmentTop(0).then(res => {
        this.departmentTop = res.data
      })
    },
    closeDepartDialog () {
      this.departmentForm.parentDepartmentName = ''
      this.departmentForm.departmentName = ''
      // this.$refs['departmentForm'].resetFields()
    },
    // 删除部门
    deleteDepartment () {
      console.log(this.currentDepartment)

      if (!this.currentDepartment.id || this.currentDepartment.level !== 1) {
        return this.$message('请选择部门子节点')
      }
      this.$confirm('是否确定删除该部门？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proxy.deleteDepartment(this.currentDepartment.id).then(res => {
          this.getDepartmentList()
        })
      }).catch(() => { })
    },

    saveDepartment () {
      // console.log(this.action)
      if (this.action === 'add') {
        this.saveAdd()
      }
      this.getDepartmentList()
    },

    saveAdd () {
      proxy.addSaveDepartment(this.departmentForm).then(res => {
        this.dialogFormVisible = false
        // this.getInfoByDepart(this.currentDepartment)
      })
    },

    // 添加跳转
    addAccount () {
      this.$router.push({ name: 'ModifyAccount', params: { id: 'add' } })
    },
    // 修改跳转
    modifyRow (row) {
      // console.log(row.id)
      this.$router.push({ name: 'ModifyAccount', params: { id: row.id } })
    },
    deleteRow (row) {
      this.$confirm('是否确定删除该账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proxy.deleteAccount(row.id).then(res => {
          this.getAccountTable()
        })
      }).catch(() => { })
    },
    getDepartmentList () {
      if (this.departData.length) {
        this.departDat.forEach(prop => {
          this.departData.splice(prop, 0)
        })
      }
      proxy.getDepartmentAll().then(res => {
        this.departData = new Tree(res.data, null)
      })
    },
    getAccountTable () {
      proxy.getAllAccount().then(res => {
        this.accountTable = res.data
        // console.log(this.accountTable)
      })
    },
    getTableByDepart (id) {
      proxy.getAccountByDepart(id).then(res => {
        this.accountTable = res.data
      })
    },
    getInfoByDepart (depart) {
      // console.log(depart)
      this.currentDepartment = depart
      this.getTableByDepart(depart.id)
    }
  },
  beforeMount () {
    this.getDepartmentList()
    this.getAccountTable()
  }
}
</script>
<style lang="less" scoped>
.department-dialog {
  .el-select {
    width: 100%;
  }
}
</style>

