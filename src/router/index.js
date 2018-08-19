import Vue from 'vue'
import Router from 'vue-router'
// import Guide from '@/views/guide/router'
import Login from '@/views/login/router'
import Intent from '@/views/intent/router'
import Order from '@/views/order/router'
import LostSheet from '@/views/lostSheet/router'
import Account from '@/views/account/router'
import Department from '@/views/department/router'
import UserInfo from '@/views/userInfo/router'

Vue.use(Router)

export default new Router({
  mode: '',
  base: '/erp',
  routes: [
    ...Intent, ...Order, ...LostSheet, ...Login, ...Account, ...Department, ...UserInfo
  ]
})
