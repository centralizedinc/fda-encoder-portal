
import axios from 'axios';
import store from "@/store"

export default class CaseApi {
    static init(){
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = store.state.user_session.token;
    }

    static findCase(case_no){
        this.init();
        return axios.get('lto-api/case/search?case_no=' + case_no);
    }

    static findCaseByEncoder(group, app_type){
        this.init();
        return axios.get('lto-api/case/search/encoder?encoder_group=' + group +"&application_type="+app_type)
    }   
}

