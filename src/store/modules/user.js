import loginProxy from '../../views/login/proxy'
import { getToken, setToken, removeToken } from '@/api/auth'

const user = {
  state: {
    name: '',
    status: '',
    code: '',
    token: getToken(),
    sidebar: []
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_SIDEBAR: (state, sidebar) => {
      state.sidebar = sidebar
      // let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
      // state.sidebar = loginInfo.sideBarMenu
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      removeToken()
      return new Promise((resolve, reject) => {
        loginProxy.loginByUsername(userInfo.account, userInfo).then(response => {
          // const data = response.data
          let loginUserInfo = response.data
          loginUserInfo.account = userInfo.account
          sessionStorage.setItem('loginInfo', JSON.stringify(loginUserInfo))
          // sessionStorage.setItem('token', JSON.stringify(response.data))
          commit('SET_SIDEBAR', response.data.sideBarMenu)
          commit('SET_TOKEN', response.data.token)

          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出  { commit, state }
    LoginOut () {
      return new Promise((resolve, reject) => {
        removeToken()
        /* logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        }) */
      })
    }
  }
}

export default user
