<template>
  <div class="page-content account">
    <div class="page-toolbar">
      <div class="page-title">账号列表</div>
    </div>

    <el-form ref="accountForm" :model="accountForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="姓名" required>
            <el-input v-model="accountForm.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="账号" required>
            <el-input v-model="accountForm.account"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="性别" required>
            <el-radio-group v-model="accountForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="手机号" required>
            <el-input v-model="accountForm.phone"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="密码" required>
            <el-input v-model="accountForm.password"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="确认密码" required>
            <el-input v-model="accountForm.confirmPwd"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="隶属部门" required>
            <el-select v-model="accountForm.belongsTopLevelDepartment" placeholder="请选择">
              <el-option label="设计部" value="dd"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="accountForm.birthday">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="所属分部" required>
            <el-select v-model="accountForm.belongsDepartment" placeholder="请选择">
              <el-option label="设计部" value="dd"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="家庭住址">
            <el-input v-model="accountForm.address"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="所属级别" required>
            <el-select v-model="accountForm.accountLevelName" placeholder="请选择">
              <el-option label="设计部" value="dd"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="状态">
            <el-radio-group v-model="accountForm.active">
              <el-radio :label="1">在职</el-radio>
              <el-radio :label="0" :disabled="this.$route.params.id === 'add'">离职</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ModifyAccount',
  data () {
    return {
      accountForm: {
        name: '',
        account: '',
        phone: '',
        password: '',
        belongsTopLevelDepartment: '',
        accountLevelName: '',
        belongsDepartment: '',
        birthday: '',
        address: '',
        active: 1
      }
    }
  }
}
</script>

