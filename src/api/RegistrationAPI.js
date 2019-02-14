import axios from "axios";

axios.defaults.baseURL = "https://fda-services.herokuapp.com/v1.0";
// axios.defaults.headers.common['access_token'] = store.state.user

export default class RegistrationAPI {

  /**
   * 
   * @param {UserModel} user 
   * @param {Function} cb 
   */
  static register(user, cb) {
    axios
      .post("public/accounts/register", user)
      .then(result => {
        console.log("REGISTRATION RESULT: " + JSON.stringify(result.data))
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        cb(null, err);
      });
  };

  /**
   * 
   * @param {String} key 
   * @param {Function} cb 
   */
  static confirm(key, cb){
    axios
    .get("public/accounts/register/confirm?key=" + key)
    .then(result => {
      if(result.data.success){
        cb(result.data.model)
      }else{
        cb(null, result.data.errors)
      }      
    })
    .catch(err =>{
      cb(null, err)
    })
  }

}
