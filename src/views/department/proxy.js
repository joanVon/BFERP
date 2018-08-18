import http from '@/api/index'
import qs from 'qs'
export default {
  // 获取部门结构
  getDepartmentAll () {
    return http.get('/service/v1/department/listAll')
  },
  // GET /v1/department/level/{level}
  getDepartmentTop (level) {
    return http.get('/service/v1/department/level/' + level)
  },
  // GET /v1/department/id/{id}/children
  getDepartmentByLevel (id) {
    return http.get('/service/v1/department/id/' + id + '/children')
  },
  // GET /v1/department/id/{id}
  getDepartmentDet (id) {
    return http.get('/service/v1/department/id/' + id)
  },
  // PUT /v1/department/id/{id}
  modifySaveDepart (data, id) {
    return http.put('/service/v1/department/id/' + id, qs.stringify(data))
  },
  // POST /v1/department
  addSaveDepartment (data) {
    return http.post('/service/v1/department', qs.stringify(data))
  },
  // DELETE /v1/department/id/{id}
  deleteDepartment (id) {
    return http.delete('/service/v1/department/id/' + id)
  }
}
