<template>
  <div class="page-content page-left-nav account">
    <department-tree :treeData="departData" @getByDepartment="getInfoByDepart">
    </department-tree>
    <div class="table-container">
      <div class="page-toolbar">
        <div class="page-title">部门列表</div>
        <div class="opt-btn-group">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addDepartment">添加部门</el-button>
        </div>
      </div>
      <el-table :data="departmentTable" stripe style="width: 100%" max-height="450">
        <el-table-column prop="belongDepart" label="隶属部门">
        </el-table-column>
        <el-table-column prop="name" label="部门名">
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="modifyRow(scope.row, departmentTable)" type="primary" size="mini">
              修改
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.row, departmentTable)" size="mini">
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
import Tree from '@/libs/utils/transformTree'
import DepartmentTree from '@/components/departTree/index'
import proxy from './proxy.js'

export default {
  components: { DepartmentTree },
  data () {
    return {
      departData: [],
      departmentTable: [],
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
    // 修改跳转
    modifyRow (row) {
      this.dialogFormVisible = true
      this.action = 'modify'
      this.actionId = row.id
      this.departmentForm.parentDepartmentName = row.belongDepart
      this.departmentForm.departmentName = row.name
      // proxy.getDepartmentDet(, row.id).then(res => {
      //   // this.departmentForm = res.data
      //   this.departmentForm.parentDepartmentName = row.belongDepart
      //   this.departmentForm.departmentName = row.name
      // })
    },
    deleteRow (row) {
      this.$confirm('是否确定删除该部门？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proxy.deleteDepartment(row.id).then(res => {
          this.getInfoByDepart(this.currentDepartment)
          this.getDepartmentList()
        })
      }).catch(() => { })
    },
    openDepartDialog () {
      proxy.getDepartmentTop(0).then(res => {
        this.departmentTop = res.data
      })
      // console.log('opennnnnnn')
    },
    closeDepartDialog () {
      // console.log('closesssss')
      this.departmentForm.parentDepartmentName = ''
      this.departmentForm.departmentName = ''
      // this.$refs['departmentForm'].resetFields()
    },

    saveAdd () {
      proxy.addSaveDepartment(this.departmentForm).then(res => {
        this.dialogFormVisible = false
        // if (this.currentDepartment === 'undefined') {
        //   this.getInfoByDepart(this.currentDepartment)
        // }
        this.getInfoByDepart(this.currentDepartment)
      })
    },
    saveEdit () {
      proxy.modifySaveDepart(this.departmentForm, this.actionId).then(res => {
        this.getInfoByDepart(this.currentDepartment)
        this.dialogFormVisible = false
      })
    },

    saveDepartment () {
      // console.log(this.action)
      if (this.action === 'add') {
        this.saveAdd()
      } else {
        this.saveEdit()
      }
      // this.getDepartmentList()
      proxy.getDepartmentAll().then(res => {
        // console.log(res)
        // this.departData = res.data
        this.departData = new Tree(res.data, null)
      })
    },
    getDepartmentList () {
      proxy.getDepartmentAll().then(res => {
        // console.log(res)
        this.departData = new Tree(res.data, null)
        if (!this.currentDepartment.id) {
          this.currentDepartment = this.departData[0]
          this.getDepartmentTable(this.departData[0].id, this.departData[0])
        }
      })
    },
    getDepartmentTable (id, department) {
      proxy.getDepartmentByLevel(id).then(res => {
        this.departmentTable = res.data
        this.departmentTable.forEach(depart => {
          depart.belongDepart = department.name
        })
      })
    },
    getInfoByDepart (department) {
      this.currentDepartment = department
      this.getDepartmentTable(department.id, department)
    }
  },
  beforeMount () {
    this.getDepartmentList()
  },
  mounted () {
    // this.getDepartmentTable(this.departData[0].id, this.departData[0])
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


