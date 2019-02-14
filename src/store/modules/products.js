
import ProductApi from '../../api/ProductApi';

const state = {
    productType: [],
    primaryActivity: [],
    secondaryActivity: [],
    additional: [],
    declared: []
}

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
}

var actions = {
    GET_PRODUCT_TYPE(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).productType((productType, err) => {
                if(!err){
                    context.commit('SET_PRODUCT_TYPE', productType)
                    resolve()
                }else{
                    reject(err)
                }
            })
        })
        
    },
    GET_PRIMARY_ACTIVITY(context, product) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).primary(product, (productType, err) => {
                if(!err){
                    context.commit('SET_PRIMARY_ACTIVITY', productType)
                    resolve()
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
            new ProductApi(context.rootState.user_session.token).additional(primaryActivity, (primaryActivity, err) => {
                if(!err){
                    context.commit('SET_ADDITIONAL', primaryActivity)
                    resolve();
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
                    resolve()
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
