import Account from './index'
import ModifyAccount from './modifyAccount'

export default [
  {
    path: '/account',
    name: 'Account',
    component: Account
  }, {
    path: '/account/:id',
    name: 'ModifyAccount',
    component: ModifyAccount
  }
]
