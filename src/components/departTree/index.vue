<template>
  <div class="department-tree">
    <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick">
      <span class="custom-tree-node" :title="node.label" slot-scope="{ node, data }">
        <!-- <span :data="data.id"> -->
          {{ node.label }}
          <span v-if="data.id !== 0 && data.id !== 1">
            (<span style="color: #ff0000;">{{ data.activeCount }}</span>/{{ data.allCount }})
          </span>
        <!-- </span> -->
      </span>
    </el-tree>
  </div>
</template>

<script>
import './style.less'
export default {
  name: 'DepartmentTree',
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // tree: this.treeData,
      defaultProps: {
        id: 'id',
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    handleNodeClick (department, node, vNode) {
      this.$emit('getByDepartment', department, node, vNode)
    }
  }

}
</script>

