import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  // plugins: [createPersistedState()]
  plugins: [
    createPersistedState({
      key:'fda-encoder-reference',
      paths:['address','breadcrumbs','cases', 'licenses', 'notifications', 'payments', 'products', 'reference', 'tasks']
    }),
  //store user session in cookies
  createPersistedState({
    key:'fda-encoder-session',
    paths:['user_session'],
    storage: {
      getItem: key =>  Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, {expires:1, secure:false}),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
