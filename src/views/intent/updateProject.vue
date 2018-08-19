<template>
  <div class="page-content update-intent">
    <div class="page-toolbar">
      <div class="page-title">工程信息</div>
    </div>
    <el-form ref="infoForm" :model="form" label-width="120px" style="padding-bottom: 12px;">
      <el-row type="flex" class="base-info-bg" :gutter="28">
        <el-col :span="11">
          <el-form-item label="工程编号">
            <el-input placeholder="请输入内容" disabled v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="接单日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.orderDate">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="工程名称" :rules="[{ required: true, message: '请输入工程名称', trigger: 'blur' }]">
            <el-cascader :options="cityInfo" placeholder="省(直辖市)/市/区" v-model="selectedOptions" :props="props" :change-on-select="true" :clearable="true" @change="handleChange">
            </el-cascader>
          </el-form-item>

          <el-form-item label="详细地址" :rules="[{ required: true, message: '请输入地名', trigger: 'blur' }]">
            <el-input placeholder="请输入内容" v-model="form.houseNumber"></el-input>
          </el-form-item>
          <el-form-item label="商场名称" :rules="[{ required: true, message: '请输入商场名称', trigger: 'blur' }]">
            <el-input v-model="form.storeName"></el-input>
          </el-form-item>
          <el-form-item label="品牌" :rules="[{ required: true, message: '请输入品牌', trigger: 'blur' }]">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="工程属性" :rules="[{ required: true, message: '请选择属性', trigger: 'blur' }]">
            <el-select v-model="form.projectAttribute">
              <el-option label="老店类" value="老店类"></el-option>
              <el-option label="新店类" value="新店类"></el-option>
              <el-option label="改造类" value="改造类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺属性" :rules="[{ required: true, message: '请选择属性', trigger: 'blur' }]">
            <el-select v-model="form.storeAttribute">
              <el-option label="商场类" value="商场类"></el-option>
              <el-option label="专卖店类" value="专卖店类"></el-option>
              <el-option label="品牌展厅类" value="品牌展厅类"></el-option>
              <el-option label="会所类" value="会所类"></el-option>
              <el-option label="批发类" value="批发类"></el-option>
              <el-option label="批发定制类" value="批发定制类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预开日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.advanceOpenDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="营业面积" :rules="[{ required: true, message: '请输入面积', trigger: 'blur' }]">
            <el-input placeholder="请输入内容" v-model="form.businessArea">
              <template slot="append">㎡</template>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="设计部门" :rules="{ required: true, message: '请输入部门名称', trigger: 'blur' }">
            <el-input placeholder="请输入内容" v-model="form.designDepartment"></el-input>
          </el-form-item> -->
        </el-col>

        <el-col :span="11">
          <el-form-item label="客户属性" :rules="[{ required: true, message: '请选择客户属性', trigger: 'blur' }]">
            <el-select v-model="form.clientAttribute">
              <el-option label="A级老客户" value="A级老客户"></el-option>
              <el-option label="B级老客户" value="B级老客户"></el-option>
              <el-option label="C级老客户" value="C级老客户"></el-option>
              <el-option label="拓展业务" value="拓展业务"></el-option>
              <el-option label="推荐业务" value="推荐业务"></el-option>
              <el-option label="慕名业务" value="慕名业务"></el-option>
              <el-option label="展会业务" value="展会业务"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户">
            <el-input placeholder="姓名" v-model="form.clientName" style="width: 30%;"></el-input>
            <el-input placeholder="电话" v-model="form.clientPhone" style="width: 68%;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="联系电话" :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]">
            <el-input placeholder="请输入内容" v-model="form.clientPhone"></el-input>
          </el-form-item> -->
          <el-form-item label="客户QQ">
            <el-input placeholder="请输入内容" v-model="form.clientQq"></el-input>
          </el-form-item>
          <el-form-item label="客户微信">
            <el-input placeholder="请输入内容" v-model="form.clientWechat"></el-input>
          </el-form-item>
          <el-form-item label="甲方经理">
            <el-input placeholder="姓名" v-model="form.firstPartyManager" style="width: 30%"></el-input>
            <el-input placeholder="电话" v-model="form.firstPartyManagerPhone" style="width:68%"></el-input>
          </el-form-item>

          <el-form-item label="商场经理">
            <el-input placeholder="姓名" v-model="form.storeManager" style="width: 30%"></el-input>
            <el-input placeholder="电话" v-model="form.storeManagerPhone" style="width:68%"></el-input>
          </el-form-item>

          <el-form-item label="定金标准" :rules="[{ required: true, message: '请输入定金标准', trigger: 'blur' }]">
            <el-input placeholder="请输入内容" v-model="form.deposit">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="业务负责" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
            <el-input placeholder="姓名" v-model="form.responsePerson" style="width: 30%"></el-input>
            <el-input placeholder="电话" v-model="form.responsePersonPhone" style="width:68%"></el-input>
          </el-form-item>

          <el-form-item label="测量日期" :rules="[{ required: true, message: '请选择日期', trigger: 'blur' }]">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.measureDate">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="测量人员" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
            <el-input placeholder="姓名" v-model="form.measureStaff" style="width: 30%"></el-input>
            <el-input placeholder="电话" v-model="form.measureStaffPhone" style="width:68%"></el-input>
          </el-form-item>
          <!-- <el-form-item label="设计主管" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
            <el-input placeholder="姓名" v-model="form.designDepartmentManager" style="width: 30%"></el-input>
            <el-input placeholder="电话" v-model="form.designDepartmentManagerPhone" style="width:68%"></el-input>
          </el-form-item> -->

        </el-col>
      </el-row>
      <!-- <div class="page-toolbar">
        <div class="page-title">执行信息</div>
      </div>

      <el-row type="flex" class="base-info-bg" :gutter="28">
        <el-col :span="8">
          <el-form-item label="派单级别" :rules="[{ required: true, message: '请选择属性', trigger: 'blur' }]">
            
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- 更新工程信息表单操作 -->
      <el-form-item class="form-footer-toolbar" label-width="0px">
        <el-button type="primary" @click="saveProject('infoForm')" size="medium">保存</el-button>
        <el-button @click="cancelPanel" size="medium">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import './style.less'
import _ from 'lodash'
import cityData from '@/libs/city-data'
import proxy from './proxy.js'
export default {
  name: 'UpdateProject',
  data () {
    return {
      cityInfo: cityData,
      selectedOptions: [], // 地区筛选数组
      originKeys: [],
      // 区域对应配置参数
      props: {
        value: 'label',
        children: 'children'
      },
      form: {
        id: this.$route.params.id || '', number: '', province: '', city: '', region: '', houseNumber: '', businessArea: '', brand: '', clientAttribute: '', clientName: '', clientPhone: '', clientQq: '', clientWechat: '', deposit: 0, designDepartment: '', designDepartmentManager: '', designDepartmentManagerPhone: '', firstPartyManager: '', firstPartyManagerPhone: '', storeManager: '', storeManagerPhone: '', measureStaff: '', measureStaffPhone: '', measureDate: '', orderDate: '', responsePerson: '', responsePersonPhone: '', advanceOpenDate: '', projectAttribute: '', storeAttribute: ''
      }
    }
  },
  computed: {
    projectId () {
      if (this.$route.params.id) {
        return this.$route.params.id
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.originKeys = Object.keys(this.form)
    if (this.projectId) {
      this.loadCurrentProject()
    }
  },
  methods: {
    // 省市区选择
    handleChange (value) {
      this.form.province = this.selectedOptions[0]
      this.form.city = this.selectedOptions[1]
      this.form.region = this.selectedOptions[2]
    },
    loadCurrentProject () {
      let resData = localStorage.getItem('curProject')
      resData = JSON.parse(resData)
      Object.assign(this.form, resData)
      this.form = _.pick(resData, this.originKeys)
      // console.log(this.form)

      this.selectedOptions = [this.form.province, this.form.city, this.form.region]
    },
    cancelPanel () {
      this.$router.push({ name: 'Intent' })
    },
    saveProject () {
      proxy.updateProject(this.form).then(res => {
        this.$router.push({ name: 'Intent' })
      })
    }
  }
}
</script>



