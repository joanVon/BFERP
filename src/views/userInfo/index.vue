<template>
  <div class="page-content user-info">
    <div class="page-toolbar">
      <div class="page-title">
        <span>基本信息</span>
      </div>
    </div>

    <div class="page-form-content">
      <el-form ref="userForm" :model="userForm">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="user-avatar">
              <img :src="userAvatar" alt="">
            </div>
          </el-col>

          <!-- 姓名 -->
          <el-col :span="6">
            <el-form-item label="姓名">
              <span>{{userForm.name}}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span v-if="userForm.sex === 0">男</span>
              <span v-else>女</span>
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{userForm.phone}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="出生日期">
              <span>{{userForm.birthday}}</span>
            </el-form-item>
            <el-form-item label="家庭住址">
              <span>{{userForm.address}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="page-toolbar">
      <div class="page-title">
        <span>账号信息</span>
      </div>
    </div>
    <div class="page-form-content" style="padding-left: 12px;">
      <el-form :model="userForm">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="账号">
              <span>{{userForm.account}}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span v-if="userForm.active === 1">在职</span>
              <span v-else>离职</span>
              <!-- <span>{{userForm.active}}</span> -->
            </el-form-item>
            <el-form-item label="隶属部门">
              <span>{{userForm.belongsTopLevelDepartment}}</span>
            </el-form-item>
            <el-form-item label="所属分部">
              <span>{{userForm.belongsDepartment}}</span>
            </el-form-item>
            <el-form-item label="岗位级别">
              <span>{{userForm.accountLevelName}}</span>
            </el-form-item>
            <el-form-item label="最近登录时间">
              <span>{{userForm.updatedAt}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import proxy from './proxy.js'
export default {
  name: 'UserInfo',
  data () {
    return {
      userAvatar: '',
      userForm: {}
    }
  },
  computed: {
    accessToken () {
      return this.$store.getters.token
    },
    accountName () {
      let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
      return loginInfo.account
    }
  },

  methods: {
    getAccountInfo () {
      proxy.getUserInfo(this.accessToken, this.accountName).then(res => {
        this.userForm = res.data

        if (this.userForm.sex === 0) {  // 男
          this.userAvatar = '../../../static/imgPage/img_man.png'
        } else {
          this.userAvatar = '../../../static/imgPage/img_women.png'
        }
      })
    }
  },
  beforeMount () {
    this.getAccountInfo()
  }
}
</script>
