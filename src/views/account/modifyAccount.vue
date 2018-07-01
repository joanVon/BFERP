<template>
  <div class="page-content account">
    <div class="page-toolbar">
      <div class="page-title">
        <span v-if="this.$route.params.id !== 'add'">修改账号</span>
        <span v-else>添加账号</span>
      </div>
    </div>
    <div class="page-form-content">
      <el-form ref="accountForm" :rules="rules" :model="accountForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="accountForm.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="账号" prop="account">
              <el-input v-model="accountForm.account"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="accountForm.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="手机号" prop="phone">
              <el-input :maxlength="11" v-model="accountForm.phone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="accountForm.password"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="accountForm.checkPass"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="隶属部门" prop="belongsTopLevelDepartment">
              <el-select v-model="accountForm.belongsTopLevelDepartment" @change="getSeconds" placeholder="请选择">
                <el-option v-for="(top, $index) in topDepartments" :key="$index" :label="top.name" :value="top"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="accountForm.birthday">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="所属分部" prop="belongsDepartment">
              <el-select v-model="accountForm.belongsDepartment" @change="getThirds" placeholder="请选择">
                <el-option v-for="(second, $idx) in secDepartments" :key="$idx" :label="second.name" :value="second"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="家庭住址" prop="address">
              <el-input v-model="accountForm.address"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="所属级别" prop="accountLevelName">
              <el-select v-model="accountForm.accountLevelName" placeholder="请选择">
                <el-option v-for="pos in positions" :key="pos" :label="pos" :value="pos"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="状态" prop="active">
              <el-radio-group v-model="accountForm.active">
                <el-radio :label="1">在职</el-radio>
                <el-radio :label="0" :disabled="this.$route.params.id === 'add'">离职</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="page-opt-bottom">
        <el-button class="form-opt-btn" type="primary" size="small" @click="saveAccount('accountForm')">确定</el-button>
        <el-button class="form-opt-btn" size="small" @click="cancelOperate">取消</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import _ from 'lodash'
import proxy from './proxy.js'
export default {
  name: 'ModifyAccount',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.accountForm.checkPass !== '') {
          this.$refs.accountForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const regExpMobild = /^1[345789]\d{9}$/
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!regExpMobild.test(value)) {
        callback(new Error('请输入合法11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        name: '',
        account: '',
        sex: 0,
        phone: '',
        password: '',
        checkPass: '',
        belongsTopLevelDepartment: '',
        accountLevelName: '',
        belongsDepartment: '',
        birthday: '',
        address: '',
        active: 1
      },
      curTopId: '',
      topDepartments: [],  // 隶属部门 最上级部门
      secDepartments: [],  // 所属分部 二级部门
      positions: [],  // 职位级别 三级
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        belongsTopLevelDepartment: [
          { required: true, message: '请选择隶属部门', trigger: 'blur' }
        ],
        belongsDepartment: [
          { required: true, message: '请选择所属分部', trigger: 'blur' }
        ],
        accountLevelName: [
          { required: true, message: '请选择所属级别', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      accountId: this.$route.params.id !== 'add' ? this.$route.params.id : ''
    }
  },
  computed: {
    accessToken () {
      return this.$store.getters.token
    }
  },
  methods: {
    saveAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.accountForm = _.omit(this.accountForm, 'checkPass')
          if (this.accountId !== '') {
            let accountPost = _.omit(this.accountForm, 'id', 'checkPass', 'accountLevel', 'createdAt', 'updatedAt')
            proxy.modifySaveAccount(this.accessToken, accountPost, this.accountId).then(res => {
              this.$message({
                message: '修改账号成功！',
                type: 'success'
              })
              this.$router.push({ name: 'Account' })
            })
          } else {
            let accountPost = _.omit(this.accountForm, 'checkPass')
            proxy.addSaveAccount(this.accessToken, accountPost).then(res => {
              this.$message({
                message: '添加账号成功！',
                type: 'success'
              })
              this.$router.push({ name: 'Account' })
            })
          }
        } else {
          // console.info('error submit!!')
          return false
        }
      })
    },
    cancelOperate () {
      this.$router.push({ name: 'Account' })
    },
    // 最上级部门
    getDepartment () {
      //
      proxy.getDepartmentTop(this.accessToken, 0).then(res => {
        // console.log(res.data)
        this.topDepartments = res.data
      })
    },
    // 二级部门
    getSeconds (top) {
      this.accountForm.belongsDepartment = ''
      this.accountForm.accountLevelName = ''
      this.curTopId = top.id
      this.accountForm.belongsTopLevelDepartment = top.name

      // let top = this.accountForm.belongsTopLevelDepartment
      proxy.getDepartmentByLevel(this.accessToken, top.id).then(res => {
        this.secDepartments = res.data
      })
    },
    getThirds (second) {
      this.accountForm.accountLevelName = ''
      this.accountForm.belongsDepartment = second.name
      // let top = this.accountForm.belongsTopLevelDepartment
      // let pos = this.accountForm.belongsDepartment
      proxy.getPositionById(this.accessToken, this.curTopId).then(res => {
        this.positions = res.data
      })
    },
    // 查询单个account详情
    getAccountDetail (accountId) {
      proxy.getAccountById(this.accessToken, accountId).then(res => {
        this.accountForm = res.data
        this.accountForm.checkPass = res.data.password
      })
    }
  },
  created () {
    this.getDepartment()
  },
  beforeMount () {
    if (this.accountId && this.accountId !== '') {
      this.getAccountDetail(this.accountId)
    }
  }
}
</script>

