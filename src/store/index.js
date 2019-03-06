import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()]
  // plugins: [createPersistedState({
  //   key:'fda-client',
  //   storage: {
  //     getItem: key =>  Cookies.getJSON(key),
  //     setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
  //     removeItem: key => Cookies.remove(key)
  //   }
  // })]
})
