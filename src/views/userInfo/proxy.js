import http from '@/api/index'
// import qs from 'qs'
export default {
  // GET /v1/user/account/{account}
  getUserInfo (token, account) {
    return http.get('/service/v1/user/account/' + account, {headers: {'token': token}})
  }
}
