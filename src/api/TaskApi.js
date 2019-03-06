import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
// axios.defaults.headers.common['access_token'] = store.state.user

export default class TaskApi {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }

    getTask(cb) {
        console.log("API")
        axios.get('/core/tasks').then((result) => {
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            console.log('##########error: ' + JSON.stringify(err))
            cb(null, err)
        })
    }
}