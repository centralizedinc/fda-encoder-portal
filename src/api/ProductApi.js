import axios from 'axios';

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
// axios.defaults.headers.common['access_token'] = store.state.user

export default class ProductAPI {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }
    productType(cb) {
        axios.get('core/products')
        .then(result => {
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
    }

    primary(productType, cb) {
        axios.get("core/primary/products/"+ productType)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

    secondary(primary, cb) {
        axios.get("core/secondary/"+ primary)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

    additional(primary, cb) {
        axios.get("core/additional/additional"+primary)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

    declared(primary, cb) {
        axios.get("core/declared/declared"+ primary)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
}