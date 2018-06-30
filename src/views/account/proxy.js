import http from '@/api/index'
export default {
  // 获取部门结构
  getDepartmentAll (token) {
    return http.get('/service/v1/department/listAll', {headers: {'token': token}})
  },

  // GET /v1/user/list
  getAllAccount (token) {
    return http.get('/service/v1/user/list', {headers: {'token': token}})
  }
}
