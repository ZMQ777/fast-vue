import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    a: 1
  },
  getters: {},
  mutations: {
    edit(state) {
      state.a++
    }
  },
  actions: {},
  plugins: [createPersistedState()]
})

export default store
