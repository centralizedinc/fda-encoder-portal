
import store from '../index'
import CaseAPI from '@/api/CaseApi';

const initialState =  {
        case_details:{},
        case_api:null
    }

const state = initialState;

const mutations = {
    INIT(state, payload){
        
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
            CaseAPI.findCase(data)
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

    FIND_ENCODED_CASE(context,data){
        return CaseAPI.findCaseByEncoder(data.encoder_group, data.application_type)

        // return context.state.case_api.findCaseByEncoder(data.encoder_group, data.application_type)
    }

}

export default {
    state,
    mutations,
    actions
}