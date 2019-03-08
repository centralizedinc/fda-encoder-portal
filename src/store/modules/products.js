
import ProductApi from '../../api/ProductApi';

const initialState = {
    productType: [],
    primaryActivity: [],
    secondaryActivity: [],
    additional: [],
    declared: []
}
const state = initialState

const mutations = {
    SET_PRODUCT_TYPE(state, licenses){
        state.productType = licenses;
    },
    SET_PRIMARY_ACTIVITY(state, productType){
        state.primaryActivity = productType;
    },
    SET_SECONDARY_ACTIVITY(state, primaryActivity){
        state.secondaryActivity = primaryActivity;
    },
    SET_ADDITIONAL(state, primaryActivity){
        state.additional = primaryActivity;
    },
    SET_DECLARED(state, primaryActivity){
        state.declared = primaryActivity;
    },
    CLEAR(state){
        Object.assign(state, initialState);    
    }
}

var actions = {

    GET_ALL_PRODUCT_REFERENCE(context){
        
        if(context.state.productType 
                && context.state.primaryActivity
                && context.state.additional
                && context.state.declared){
            console.log('returning reference...')
            return new Promise((resolve, reject)=>{
                resolve({
                        products:context.state.productType,
                        primary:context.state.primaryActivity,
                        additional:context.state.additional,
                        declared:context.state.declared
                    })
            })
        }else{ 
            console.log('getting reference ...') 
            var prodAPI = new ProductApi(context.rootState.user_session.token);
            var reference = {}      
            return new Promise((resolve, reject) => {            
                prodAPI.productType()
                .then(products=>{
                    reference.products = products.data.model;
                    context.commit('SET_PRODUCT_TYPE', products.data.model)
                    return prodAPI.getAllPrimary();
                })
                .then(primary=>{
                    reference.primary = primary.data.model;
                    context.commit('SET_PRIMARY_ACTIVITY', primary.data.model)
                    return prodAPI.getAllAdditional();
                })
                .then(additional=>{
                    reference.additional = additional.data.model;
                    context.commit('SET_ADDITIONAL', additional.data.model)
                    return prodAPI.getAllDeclared();
                })
                .then(declared=>{
                    reference.declared = declared.data.model;
                    context.commit('SET_DECLARED', declared.data.model)
                    resolve(reference)
                })
                .catch(err =>{
                    reject(err)
                })
            })
        }
    },

    GET_PRODUCT_TYPE(context) {
        return new ProductApi(context.rootState.user_session.token).productType()        
    },

    GET_PRIMARY_ACTIVITY(context, product) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).primary(product, (productType, err) => {
                if(!err){
                    context.commit('SET_PRIMARY_ACTIVITY', productType)
                    resolve(productType)
                }else{
                    reject(err)
                }
            })
        })
    },
    GET_SECONDARY_ACTIVITY(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).secondary(primaryActivity, (primaryActivity, err) => {
                if(!err){
                    context.commit('SET_SECONDARY_ACTIVITY', primaryActivity)
                    resolve();
                }else{
                    reject();
                }
            })
        })
    },
    GET_ADDITIONAL(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).additional(primaryActivity, (activities, err) => {
                if(!err){
                    context.commit('SET_ADDITIONAL', activities)
                    resolve(activities);
                }else{
                    reject()
                }
            })
        })
    },
    GET_DECLARED(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).declared(primaryActivity, (primaryActivity, err) => {
                if(!err){
                    context.commit('SET_DECLARED', primaryActivity)
                    resolve(primaryActivity)
                }else{
                    reject()
                }
            })
        })
    },
    
}

export default {
    state,
    mutations,
    actions
}
