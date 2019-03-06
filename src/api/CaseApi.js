
import axios from 'axios';

export default class CaseApi {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    findCase(case_no){
        return axios.get('lto-api/case/search?case_no=' + case_no);
    }
}

