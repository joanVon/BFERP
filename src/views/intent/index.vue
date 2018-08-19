<template>
  <div class="page-content home">
    <div class="page-toolbar project-bar">
      <el-select v-model="filter.baseInfo" multiple collapse-tags placeholder="基础信息">
        <el-option v-for="item in baseInfo" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-select v-model="filter.paramInfo" multiple collapse-tags placeholder="工程量参考信息">
        <el-option v-for="item in paramInfo" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-select v-model="filter.doneInfo" multiple collapse-tags placeholder="设计部执行信息">
        <el-option v-for="item in doneInfo" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>
      <div class="opt-btn-group">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addIntent">新增</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="reloadIntent">刷新</el-button>
      </div>
    </div>

    <!-- table -->
    <el-table class="project-table" :data="intentTableData" stripe height="85%" style="width: 100%;margin-left: 10px;">
      <el-table-column prop="number" label="工程编号" fixed="left" width="120">
         <template slot-scope="scope">
          <el-button @click="updaeInfo(scope.$index, scope.row)" type="text" size="small">
            {{ scope.row.number }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="year" label="年号" sortable :filters="[{text: '2018', value: '2018'}, {text: '2017', value: '2017'}, {text: '2016', value: '2016'}, {text: '2015', value: '2015'}]" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="month" label="月份" sortable :filters="[{text: '1', value: '1'}, {text: '2', value: '2'}, {text: '3', value: '3'}, {text: '4', value: '4'}, {text: '5', value: '5'}, {text: '6', value: '6'}, 
      {text: '7', value: '7'}, {text: '8', value: '8'}, {text: '9', value: '9'}, {text: '10', value: '10'}, {text: '11', value: '11'}, {text: '12', value: '12'}]" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="province" label="省份" :filters="filterProv" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="city" label="城市">
      </el-table-column>
      <el-table-column prop="region" label="区/县">
      </el-table-column>
      <el-table-column prop="town" label="乡/镇">
      </el-table-column>
      <el-table-column prop="storeName" label="商场名称" :filters="filterStore" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="brand" label="品牌">
      </el-table-column>
      <el-table-column prop="projectAttribute" label="工程属性" :filters="filterProjectAttr" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="storeAttribute" label="店铺属性" :filters="filterStoreAttr" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="clientName" label="客户姓名">
      </el-table-column>
      <el-table-column prop="deposit" label="定金(元)">
      </el-table-column>
      <el-table-column prop="responsePerson" label="业务负责">
      </el-table-column>
      <el-table-column prop="designDepartment" label="设计部门">
      </el-table-column>
      <el-table-column prop="businessArea" label="营业面积">
      </el-table-column>
      <el-table-column prop="cupboardLength" label="柜台总长">
      </el-table-column>
      <el-table-column prop="backCupboardArea" label="背柜面积">
      </el-table-column>
      <el-table-column prop="metalCrafts" label="金属工艺">
      </el-table-column>
      <el-table-column prop="basicEquipResponse" label="基装责任">
      </el-table-column>
      <el-table-column prop="orderUrgent" label="派单级别">
      </el-table-column>
      <el-table-column prop="siteAccuracy" label="场地准确性">
      </el-table-column>
      <el-table-column fixed="right" label="" width="190">
        <template slot-scope="scope">
          <el-button @click.native.prevent="order(scope.row)" type="primary" size="mini">
            下单
          </el-button>
          <el-button @click.native.prevent="loose(scope.row)" type="primary" size="mini">
            跑单
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.row)" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- dialog -->
    <el-dialog title="团队设置" :visible.sync="groupDialog" :append-to-body="true" :close-on-click-modal="false" width="30%">
      <group-set @get-members="getPersons"></group-set>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="groupDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="setGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import proxy from './proxy.js'
import groupSet from './grpup-set'
import filter from './mixins/filters.js'
export default {
  name: 'Intent',
  components: { groupSet },
  mixins: [filter],
  data () {
    return {
      intentTableData: [],
      groupDialog: false,
      selectedPersons: [],
      filterProv: [],  // 省份筛选项
      filterStore: [],
      filterProjectAttr: [
        {text: '老店类', value: '老店类'},
        {text: '新店类', value: '新店类'},
        {text: '改造类', value: '改造类'}
      ],

      filterStoreAttr: [
        {text: '商场类', value: '商场类'},
        {text: '专卖店类', value: '专卖店类'},
        {text: '品牌展厅类', value: '品牌展厅类'},
        {text: '会所类', value: '会所类'},
        {text: '批发类', value: '批发类'},
        {text: '批发定制类', value: '批发定制类'}
      ]
    }
  },

  mounted () {
    this.getIntentTableData()
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['property']
      // this.filterProv =
      return String(row[property]) === value
    },
    reloadIntent () {
      this.getIntentTableData()
    },

    getIntentTableData () {
      this.filterProv = []
      proxy.getIntentTable().then(res => {
        this.intentTableData = res.data

        res.data.forEach(ele => {
          if (ele.province) {
            this.filterProv.push({text: ele.province, value: ele.province})
          }
          if (ele.storeName) {
            this.filterStore.push({text: ele.storeName, value: ele.storeName})
          }
        })
      })
    },
    addIntent () {
      this.groupDialog = true
    },
    getPersons (persons) {
      // console.log(persons)
      this.selectedPersons = persons
    },

    // 创建意向工程
    setGroup () {
      proxy.newGroupProject({ teamUserIds: this.selectedPersons }).then(res => {
        // if (res.ret === 0) {
        this.$message({
          message: '工程创建成功',
          type: 'success'
        })
        // this.reloadIntent()
        this.groupDialog = false
        // }
        this.$router.push({ name: 'ProjectFlow', params: { id: res.data.id } })
        // this.getFlowData(res.data.id)
      })
    },

    // 基本信息跳转
    updaeInfo (index, row) {
      localStorage.setItem('curProject', JSON.stringify(row))

      this.$router.push({ name: 'UpdateProject', params: { id: row.id } })
    },
    // 下单
    order (row) {
      proxy.orderProject(row.id).then(res => {
        this.$message({
          message: '下单成功',
          type: 'success'
        })
        this.reloadIntent()
      })
    },
    // 跑单
    loose (row) {
      proxy.loseProject(row.id).then(res => {
        this.$message({
          message: '工程已跑单',
          type: 'success'
        })
        this.reloadIntent()
      })
    },
    // 删除工程单
    deleteRow (row) {
      this.$confirm('是否确定删除该工程？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proxy.deleteProject(row.id).then(res => {
          this.$message({
            message: '工程已删除',
            type: 'success'
          })
          this.reloadIntent()
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
.project-bar {
  width: 100%;
  // height: calc(1vh -120px);
  background-color: #fff;
  padding: 12px;
  margin-left: 12px;
  box-sizing: border-box;
}
</style>

