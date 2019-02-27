import ReferenceAPI from "@/api/ReferenceAPI";

const state = {
    productType:[]
}

const mutations = {
    SET_PRODUCT_TYPE(state, data){
        state.productType = data;
    },
}


const actions = {
    // GET_PRODUCT_TYPE(context) {
    //     return new Promise((resolve, reject) => {
    //         ReferenceAPI.getProductTypes()
    //         .then(result =>{
    //             context.commit('SET_PRODUCT_TYPE', result.data)
    //             resolve(result.data)
    //         })
    //         .catch(err =>{
    //             reject(err)
    //         })
    //     })
        
    // },
}


export default {
    state,
    mutations,
    actions
}