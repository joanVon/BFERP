import http from '@/api/index'
import qs from 'qs'
export default {
  // 获取部门结构
  getDepartmentAll (token) {
    return http.get('/service/v1/department/listAll', {headers: {'token': token}})
  },
  // GET /v1/department/level/{level}
  getDepartmentTop (token, level) {
    return http.get('/service/v1/department/level/' + level, {headers: {'token': token}})
  },
  // GET /v1/department/id/{id}/children
  getDepartmentByLevel (token, id) {
    return http.get('/service/v1/department/id/' + id + '/children', {headers: {'token': token}})
  },
  // GET /v1/department/id/{id}
  getDepartmentDet (token, id) {
    return http.get('/service/v1/department/id/' + id, {headers: {'token': token}})
  },
  // PUT /v1/department/id/{id}
  modifySaveDepart (token, data, id) {
    return http.put('/service/v1/department/id/' + id, qs.stringify(data), {headers: {'token': token}})
  },
  // POST /v1/department
  addSaveDepartment (token, data) {
    return http.post('/service/v1/department', qs.stringify(data), {headers: {'token': token}})
  },
  // DELETE /v1/department/id/{id}
  deleteDepartment (token, id) {
    return http.delete('/service/v1/department/id/' + id, {headers: {'token': token}})
  }
}
