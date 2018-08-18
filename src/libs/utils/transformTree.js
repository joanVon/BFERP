const Tree = function (data, pid) {
  return this.init(data, pid)
}

Tree.prototype = {
  groups: {},  // 分组
  init (data, pid) {
    this.groups = {}
    for (let i = 0; i < data.length; i++) {
      if (this.groups[data[i].pid] !== undefined) {
        this.groups[data[i].pid].push(data[i])
      } else {
        this.groups[data[i].pid] = []
        this.groups[data[i].pid].push(data[i])
      }
    }
    let info = this.groups[pid]
    let transData = this.getData(info)
    // console.log(transData)
    return transData
  },
  group (tree) {
    for (var i = 0; i < tree.length; i++) {
      if (this.groups[tree[i].pId]) {
        this.groups[tree[i].pId].push(tree[i])
      } else {
        this.groups[tree[i].pId] = []
        this.groups[tree[i].pId].push(tree[i])
      }
    }
  },

  getData (info) {
    if (!info) return

    let children = []

    for (let i = 0; i < info.length; i++) {
      let item = info[i]

      item.children = this.getData(this.groups[item.id]) || []
      children.push(item)
    }

    return children
  }
}

export default Tree
