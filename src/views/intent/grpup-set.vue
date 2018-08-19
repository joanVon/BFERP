<template>
  <div class="group-form">
    <el-form ref="groupForm" :rules="rules" :model="groupForm" label-width="80px">
      <el-form-item label="隶属部门" prop="belongsTopLevelDepartment">
        <el-select v-model="groupForm.belongsTopLevelDepartment" @change="getSeconds" value-key="id" placeholder="请选择">
          <el-option v-for="(top, $index) in topDepartments" :key="$index" :label="top.name" :value="top"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分部" prop="belongsDepartment">
        <el-select v-model="groupForm.belongsDepartment" @change="getPersonList" value-key="id" placeholder="请选择">
          <el-option v-for="(second, $idx) in secDepartments" :key="$idx" :label="second.name" :value="second"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门人员" prop="person">
        <!-- <el-select v-model="groupForm.person" placeholder="请选择">
          <el-option v-for="pos in persons" :key="pos" :label="pos" :value="pos"></el-option>
        </el-select> -->
        <el-select v-model="groupForm.person" multiple placeholder="请选择" @change="selectPerson">
          <el-option v-for="item in persons" :key="item.value" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import proxy from './proxy.js'
export default {
  name: 'group-set',
  data () {
    return {
      groupForm: {
        belongsTopLevelDepartment: '',
        belongsDepartment: '',
        person: []
      },
      curTopId: null,
      topDepartments: [],
      secDepartments: [],
      persons: [],

      rules: {
        belongsTopLevelDepartment: [
          { required: true, message: '请选择隶属部门', trigger: 'blur' }
        ],
        belongsDepartment: [
          { required: true, message: '请选择分部门', trigger: 'blur' }
        ],
        person: [
          { required: true, message: '请选择团队成员', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 'groupForm.person' (newList) {
    //   this.$emit('', newList)
    // }
  },
  methods: {
    // 最上级部门
    getDepartment () {
      proxy.getDepartmentTop(0).then(res => {
        this.topDepartments = res.data
      })
    },
    // 获取二级部门
    getSeconds (top) {
      this.groupForm.person = []
      this.curTopId = top.id
      this.groupForm.belongsTopLevelDepartment = top.name

      proxy.getDepartmentByLevel(top.id).then(res => {
        this.secDepartments = res.data
      })
    },
    // 获取部门人员
    getPersonList (sec) {
      this.groupForm.belongsDepartment = sec.name
      proxy.getPersonByDepart(sec.id).then(res => {
        this.persons = res.data
      })
    },
    selectPerson () {
      this.$emit('get-members', this.groupForm.person)
    }
  },
  created () {
    this.getDepartment()
  }
}
</script>
<style lang="less" scoped>
.group-form {
  .el-select {
    width: 100%;
  }
}
</style>


