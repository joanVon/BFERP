// https://www.easy-mock.com/mock/5adf1aee5cbcb66de34da660/api/login

import http from '@/api/index'
export default {
  // 登录
  loginByUsername (data) {
    return http.post('/api/login', data)
  }
}
