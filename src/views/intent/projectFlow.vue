<template>
  <div class="page-content project-flow">
    <div class="page-toolbar">
      <div class="page-title">工程流程</div>
    </div>

    <el-row :gutter="20" class="flow-card-group">
      <el-col :span="5">
        <div class="flow-card bg-purple">
          <div class="card-title">待录入人数/总录入人数</div>
          <div class="card-count input">
            <span class="font-36">{{flowData.pendRecordCnt}}</span>
            <span class="font-24">/{{flowData.allRecordCnt}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="flow-card bg-purple">
          <div class="card-title">已审核数量/总审核数量</div>
          <div class="card-count check">
            <span class="font-36">{{flowData.doneExamineCnt}}</span>
            <span class="font-24">/{{flowData.allExamineCnt}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="flow-card bg-purple">
          <div class="card-title refuse">审核不通过数</div>
          <div class="card-count">
            <span class="font-36">{{flowData.examineFailedCnt}}</span>
            <!-- <span class="font-24">/</span> -->
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="flow-card bg-purple">
          <div class="card-title apply">审核通过数</div>
          <div class="card-count">
            <span class="font-36">{{flowData.examinePassCnt}}</span>
            <!-- <span class="font-24">/</span> -->
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="flow-card bg-purple bg-setting" @click="updateGroup">
          <div class="card-title setting">团队设置</div>
          <div class="card-count el-icon-setting">
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- flow-list -->
    <el-row :gutter="23" class="flow-content">
      <el-col :span="8">
        <div class="flow-title">流程一</div>
        <li class="flow-block" v-for="(flow1, index) in flowList1" :key="flow1.name" @click="inDetail(index, flow1)">
          <div class="flow-item">
            <div class="flow-index" :class="'color-'+(index+1)">
              <span v-if="index < 10">0{{index+1}}</span>
              <span v-else>{{index+1}}</span>
            </div>
            <div class="flow-context">{{flow1.name}}</div>
          </div>
        </li>
      </el-col>
      <el-col :span="8">
        <div class="flow-title">流程二</div>
        <li class="flow-block" v-for="(flow2, index) in flowList2" :key="flow2.name">
          <div class="flow-item">
            <div class="flow-index" :class="'color-'+5">
              <span>{{flow2.idx}}</span>
            </div>
            <div class="flow-context">{{flow2.name}}</div>
          </div>
        </li>
      </el-col>
      <el-col :span="8">
        <div class="flow-title">流程三</div>
        <li class="flow-block" v-for="(flow3, index) in flowList3" :key="flow3.name">
          <div class="flow-item">
            <div class="flow-index" :class="'color-'+(5)">
              <span>{{flow3.idx}}</span>
            </div>
            <div class="flow-context">{{flow3.name}}</div>
          </div>
        </li>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import './style.less'
import FlowList from './mixins/flow-list.js'
import proxy from './proxy.js'
export default {
  name: 'ProjectFlow',
  mixins: [FlowList],
  data () {
    return {
      projectId: this.$route.params.id,
      flowData: {
        pendRecordCnt: 0,
        allRecordCnt: 0,
        doneExamineCnt: 0,
        allExamineCnt: 0,
        examinePassCnt: 0,
        examineFailedCnt: 0
      }
    }
  },

  mounted () {
    this.getFlowData()
  },
  methods: {
    getFlowData () {
      proxy.getFlowData(this.projectId).then(res => {
        console.log(res)
      })
    },
    // 更新团队
    updateGroup () {

    },

    inDetail (index, card) {
      if (index === 0) {
        this.$router.push({ name: 'UpdateProject', params: { id: this.projectId } })
      } else {
        return false  // 暂时不开放
      }
    }
  }
}
</script>

