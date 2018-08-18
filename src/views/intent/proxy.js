import http from '@/api/index'
// import qs from 'qs'
export default {
  // 获取意向工程表格
  getIntentTable () {
    return http.get('/v1/project/intent/list')
  }
}
