import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/users'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    currentUser: {
      id: undefined,
      name: '',
      email: '',
      image: '',
      isAdmin: false

    },
    isAuthenticated: false
  },
  // use commit call mutations
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  // use dispatch call actions
  actions: {
    async fetchCurrentUser () {
      try {
        const { data, statusText } = await userAPI.getCurrentUser()
        if (statusText !== 'OK') throw new Error(data)
        // call mutation event
        this.commit('setCurrentUser', data)
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    }

  },
  modules: {
  }
})
