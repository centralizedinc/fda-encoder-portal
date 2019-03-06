
import store from '../index'
import CaseAPI from '@/api/CaseApi';

const initialState =  {
        case_details:{},
        case_api:null
    }

const state = initialState;

const mutations = {
    INIT(state, payload){
        state.case_api = new CaseAPI(payload);
    },
    SET_DETAILS(state, data){
        state.case_details = data;
    },
    CLEAR(state){
        Object.assign(state, initialState);
    }
}

const actions = {
    FIND_CASE(context, data){
        return new Promise((resolve, reject)=>{
            context.state.case_api.findCase(data)
            .then(case_details=>{
                if(case_details.data.success){
                    context.commit('SET_DETAILS', case_details.data.model)
                }
                resolve(case_details);                
            })
            .catch(err =>{
                reject(err)
            })
        }) 
        
    },

}

export default {
    state,
    mutations,
    actions
}