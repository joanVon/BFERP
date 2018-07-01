import http from '@/api/index'
import qs from 'qs'
export default {
  // 获取部门结构
  getDepartmentAll (token) {
    return http.get('/service/v1/department/listAll', {headers: {'token': token}})
  },
  // GET /v1/user/list
  getAllAccount (token) {
    return http.get('/service/v1/user/list', {headers: {'token': token}})
  },
  // GET /v1/user/departmentId/{departmentId}/list
  getAccountByDepart (token, departmentId) {
    return http.get('/service/v1/user/departmentId/' + departmentId + '/list', {headers: {'token': token}})
  },
  addSaveAccount (token, data) {
    return http.post('/service/v1/user', qs.stringify(data), {headers: {'token': token}})
  },
  // PUT /v1/user/id/{id}
  modifySaveAccount (token, data, id) {
    return http.put('/service/v1/user/id/' + id, qs.stringify(data), {headers: {'token': token}})
  },

  // GET /v1/department/level/{level}
  getDepartmentTop (token, level) {
    return http.get('/service/v1/department/level/' + level, {headers: {'token': token}})
  },
  // GET /v1/department/id/{id}/children
  getDepartmentByLevel (token, id) {
    return http.get('/service/v1/department/id/' + id + '/children', {headers: {'token': token}})
  },
  // GET /v1/department/position/departmentId/{departmentId}
  getPositionById (token, id) {
    return http.get('/service/v1/department/position/departmentId/' + id, {headers: {'token': token}})
  },
  // GET /v1/user/id/{id}
  getAccountById (token, id) {
    return http.get('/service/v1/user/id/' + id, {headers: {'token': token}})
  },
  // DELETE /v1/user/id/{id}
  deleteAccount (token, id) {
    return http.delete('/service/v1/user/id/' + id, {headers: {'token': token}})
  }
}
