import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth/store'
import employee from './modules/employee/store'
import review from './modules/review/store'
import request from './modules/request/store'

import SecureLS from "secure-ls";


import createPersistedState from 'vuex-persistedstate';


const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  plugins: [createPersistedState({
    key: 'paypay_review_task',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })],
  modules: {
    auth,
    employee,
    review,
    request
  }
})
