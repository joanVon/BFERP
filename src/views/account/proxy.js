import http from '@/api/index'
import qs from 'qs'
export default {
  // 获取部门结构
  getDepartmentAll () {
    return http.get('/service/v1/department/listAll')
  },

  // GET /v1/user/list
  getAllAccount () {
    return http.get('/service/v1/user/list')
  },
  // GET /v1/user/departmentId/{departmentId}/list
  getAccountByDepart (departmentId) {
    return http.get('/service/v1/user/departmentId/' + departmentId + '/list')
  },
  addSaveAccount (data) {
    return http.post('/service/v1/user', qs.stringify(data))
  },
  addSaveDepartment (data) {
    return http.post('/service/v1/department', qs.stringify(data))
  },
  // PUT /v1/user/id/{id}
  modifySaveAccount (data, id) {
    return http.put('/service/v1/user/id/' + id, qs.stringify(data))
  },

  // GET /v1/department/level/{level}
  getDepartmentTop (level) {
    return http.get('/service/v1/department/level/' + level)
  },
  // GET /v1/department/id/{id}/children
  getDepartmentByLevel (id) {
    return http.get('/service/v1/department/id/' + id + '/children')
  },
  // GET /v1/department/position/departmentId/{departmentId}
  getPositionById (id) {
    return http.get('/service/v1/department/position/departmentId/' + id)
  },
  // GET /v1/user/id/{id}
  getAccountById (id) {
    return http.get('/service/v1/user/id/' + id)
  },
  // DELETE /v1/user/id/{id}
  deleteAccount (id) {
    return http.delete('/service/v1/user/id/' + id)
  },
  // DELETE /v1/department/id/{id}
  deleteDepartment (id) {
    return http.delete('/service/v1/department/id/' + id)
  }
}
