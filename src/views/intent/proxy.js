import http from '@/api/index'
import qs from 'qs'
export default {
  // 获取意向工程表格
  getIntentTable () {
    return http.get('/service/v1/project/intent/list')
  },

  // 一级部门
  getDepartmentTop (level) {
    return http.get('/service/v1/department/level/' + level)
  },

  // 二级部门
  getDepartmentByLevel (id) {
    return http.get('/service/v1/department/id/' + id + '/children')
  },
  // 根据部门ID获取人员列表
  getPersonByDepart (id) {
    return http.get('/service/v1/user/departmentId/' + id + '/list')
  },

  //  创建团队 新建意向工程
  newGroupProject (data) {
    return http.post('/service/v1/project', data)
  },

  // PUT /v1/project
  updateProject (data) {
    return http.put('/service/v1/project', qs.stringify(data))
  },

  // 流程数据
  getFlowData (id) {
    return http.get('/service/v1/flow/id/' + id)
  },
  // POST /v1/project/id/{id}/placeOrder
  orderProject (id) {
    return http.post('/service/v1/project/id/' + id + '/placeOrder')
  },
  // POST /v1/project/id/{id}/lostOrder
  loseProject (id) {
    return http.post('/service/v1/project/id/' + id + '/lostOrder')
  },
  // DELETE /v1/project/id/{id}
  deleteProject (id) {
    return http.delete('/service/v1/project/id/' + id)
  }
}
