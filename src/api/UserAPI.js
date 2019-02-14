import axios from "axios";

axios.defaults.baseURL = "https://fda-services.herokuapp.com/v1.0";
// axios.defaults.baseURL = "http://localhost:4000";

export default class UserAPI {
  constructor(token) {
    this.token = token;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common['access_token'] = token;
  }

  /**
   * @description log in authentication
   * @param {Object} credentials 
   * @param {Function} cb 
   */
  static login(credentials, cb) {
    axios
      .post(
        "public/accounts/auth", {}, {
          auth: {
            username: credentials.username,
            password: credentials.password
          }
        }
      )
      .then(result => {
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        console.log("err... " + err);
        cb(null, err);
      });
  }


  /**
   * @description Check whether the account is already active
   * @param {String} username 
   * @param {Function} cb 
   */
  static verifyStatus(username, cb) {
    axios.get("public/accounts/auth/active?username=" + username)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      }).catch(err => {
        console.log("err... " + err);
        cb(null, err);
      })
  }


  /**
   * @description Sends a request for account recovery
   * @param {String} email 
   * @param {Function} cb 
   */
  static forgotPassword(email, cb) {
    axios.post("public/accounts/auth/recovery", {
        email
      })
      .then(result => {
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        console.log("err... " + err);
        cb(null, err);
      })
  }

  /**
   * 
   * @param {String} key 
   * @param {Function} cb 
   */
  static confirmAccountRecovery(key, cb) {
    axios.get('public/accounts/auth/recovery/confirmation?key=' + key)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        console.log("err... " + err);
        cb(null, err);
      })
  }

  /**
   * 
   * @param {AccountModel} account 
   * @param {Function} cb 
   */
  static changePassword(account, cb) {
    console.log("calling changePassword...")
    axios.post('public/accounts/auth/recovery/password', account)
      .then(result => {
        console.log("RESULT: " + JSON.stringify(result))
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        console.log("err... " + err);
        cb(null, err);
      })
  }

  /**
   * @description
   * @param {AccountsModel} account 
   * @param {Function} cb 
   */
  static updateAccount(account, cb) {
    axios.post('secured/accounts/' + account._id, account)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        console.log("err... " + err);
        cb(null, err);
      })
  }

}