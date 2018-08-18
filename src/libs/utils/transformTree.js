// const Tree = (data) => {
//   data = data || [] // 数据
//   this.groups = {} // 分组
//   // this.data = []
// }

const Tree = function (data, pid) {
  return this.init(data, pid)
}

Tree.prototype = {
  groups: {},  // 分组
  init (data, pid) {
    // this.data = data
    for (let i = 0; i < data.length; i++) {
      if (this.groups[data[i].pid]) {
        this.groups[data[i].pid].push(data[i])
      } else {
        this.groups[data[i].pid] = []
        this.groups[data[i].pid].push(data[i])
      }
    }
    let transData = this.getData(this.groups[pid])
    // console.log(transData)
    return transData
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
