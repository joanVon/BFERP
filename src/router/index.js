import Vue from 'vue'
import Router from 'vue-router'
// import Guide from '@/views/guide/router'
import Login from '@/views/login/router'
import Intent from '@/views/intent/router'
import Account from '@/views/account/router'
import Department from '@/views/department/router'

Vue.use(Router)

export default new Router({
  mode: '',
  base: '/dist',
  routes: [
    ...Intent, ...Login, ...Account, ...Department
  ]
})
