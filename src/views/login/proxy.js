// https://www.easy-mock.com/mock/5adf1aee5cbcb66de34da660/api/login

import http from '@/api/index'
import qs from 'qs'
export default {
  // 登录
  loginByUsername (account, data) {
    return http.get('/service/v1/user/account/' + account + '/token', {params: data})
  },
  // PUT /v1/user/phone/{phone}/password
  resetPassword (phone, data) {
    return http.put('/service/v1/user/phone/' + phone + '/password', qs.stringify(data))
  },
  // GET /v1/verificationCode/message
  getVerifyCode (data) {
    return http.get('/service/v1/verificationCode/message', qs.stringify(data))
  }
}
