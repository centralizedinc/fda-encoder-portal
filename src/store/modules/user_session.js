// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')

import RegistrationAPI from "@/api/RegistrationAPI";
import UserAPI from "@/api/UserAPI";

const state = {
  isAuthenticated: false,
  token: null,
  user: {},
  task: {},
  registration_details: {},
};

const mutations = {
  LOGIN: function (state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    state.isAuthenticated = payload.isMatch;
    new UserAPI(payload.token);
    console.log("PAYLOAD: " + JSON.stringify(payload))
  },
  LOGOUT: function (state) {
    state.user = {};
    state.token = false;
    state.isAuthenticated = false;
  },
  CURRENT_TASK: function (state, payload) {
    state.task = payload;
  },
  REGISTER: (state, payload) => {
    state.registration_details = payload;
  }
};

var actions = {

  /**
   * @description check if the user session is valid or activated
   */
  CHECK_SESSION: (context, username) => {
    return new Promise((resolve, reject) => {
      UserAPI.verifyStatus(username, (result, err) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  /**
   * @description invoke Registration API
   */
  REGISTER: (context, account) => {
    return new Promise((resolve, reject) => {
      RegistrationAPI.register(account, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      });
    })
  },

  /**
   * @description email confirmation
   */
  CONFIRM: (context, key) => {
    return new Promise((resolve, reject) => {
      RegistrationAPI.confirm(key, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  /**
   * @description invoke LOGIN API
   */
  LOGIN: (context, credentials) => {
    return new Promise((resolve, reject) => {
      UserAPI.login(credentials, (res, err) => {
        if (!err) {
          context.commit('LOGIN', res);
          resolve(res)
        } else {
          console.log(JSON.stringify(err));
          reject(err)
        }
      })
    })
  },

  /**
   * @description remove user session and breadcrumbs history stored in cache
   */
  LOGOUT: (context) => {
    context.commit('LOGOUT')
    context.commit('PICKUP_BREADCRUMBS')
  },

  /**
   * @description send account recovery
   */
  FORGOT_PASSWORD: (context, email) => {
    return new Promise((resolve, reject) => {
      UserAPI.forgotPassword(email, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          console.log(JSON.stringify(err));
          reject(err)
        }
      })
    })
  },

  CONFIRM_ACCOUNT_RECOVERY: (context, key) => {
    return new Promise((resolve, reject) => {
      UserAPI.confirmAccountRecovery(key, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  /**
   * @description change user password
   */
  CHANGE_PASSWORD: function (context, account) {
    return new Promise((resolve, reject) => {
      console.log('Calling Change Password!')
      UserAPI.changePassword(account, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },


  UPDATE_ACCOUNT: (context, account) => {
    return new Promise((resolve, reject) => {
      UserAPI.updateAccount(account, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })

  }
};

export default {
  state,
  mutations,
  actions
};