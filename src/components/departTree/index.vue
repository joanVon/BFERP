<template>
  <div class="department-tree"></div>
</template>

<script>
import Tree from './transform.js'
export default {
  name: 'DepartmentTree',
  props: {
    isSimpleData: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tree: this.treeData
      // isSimple: this.isSimpleData
    }
  },

  methods: {

  },
  created () {
    if (this.isSimpleData) {
      // let children = []
      let ddd = new Tree(this.treeData).init(0)
      // console.log()
      // this.treeData.forEach(node => {
      //   node.children = children
      //   console.log(node)
      // })
    }
  },
  mounted () {

  }

}
</script>

