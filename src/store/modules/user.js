import loginProxy from '../../views/login/proxy'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: '',
    sidebar: []
  },

  mutations: {
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
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      // const username = userInfo.userName
      return new Promise((resolve, reject) => {
        loginProxy.loginByUsername(userInfo).then(response => {
          // const data = response.data
          commit('SET_SIDEBAR', response.data.sideBarMenu)
          // setSidebar(response.data.sideBarMenu)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
