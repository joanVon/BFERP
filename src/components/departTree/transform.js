const Tree = (data) => {
  this.tree = data || [] // 数据
  this.groups = {} // 分组
}

Tree.prototype = {
  init: function (pid) {
    this.group()
    var data = this.getData(this.groups[pid])
    return data
  },
  group: function () {
    for (var i = 0; i < this.tree.length; i++) {
      if (this.groups[this.tree[i].pId]) {
        this.groups[this.tree[i].pId].push(this.tree[i])
      } else {
        this.groups[this.tree[i].pId] = []
        this.groups[this.tree[i].pId].push(this.tree[i])
      }
    }
  },
  getData: function (info) {
    if (!info) return

    var children = []
    for (var i = 0; i < info.length; i++) {
      var item = info[i]
      item.children = item['children'].concat(this.getData(this.groups[item.id]))
      children.push(item)
    }

    return children
  }
}

export default Tree
