import ReferenceAPI from '@/api/ReferenceAPI'

const initialState = {
    regions:[],
    provinces:[],
    cities:[]
}
const state = initialState;

const mutations = {
    SET_REGIONS: function(state, payload){
        state.regions = payload
    },
    SET_PROVINCES: function(state, payload){
        state.provinces = payload
    },
    SET_CITIES: function(state, payload){
        state.cities = payload
    },
    CLEAR(state){
        Object.assign(state, initialState);
    }
}

const actions = {

    /**
     * @description find all reference data for address
     *              - regions
     *              - provinces
     *              - cities
     * @param {*} context 
     */
    GET_ADDRESS_REFERENCE(context){
    
        return new Promise((resolve, reject)=>{
            if(context.state.regions.length === 0 || context.state.cities.length === 0 || context.state.provinces.length === 0){
                ReferenceAPI.getRegions()
                .then(regions => {
                    context.commit('SET_REGIONS', regions.data.model)
                    return ReferenceAPI.getProvinces()
                })
                .then(provinces =>{                    
                    context.commit('SET_PROVINCES', provinces.data.model)
                    return ReferenceAPI.getCities()
                })
                .then(cities =>{
                    context.commit('SET_CITIES', cities.data.model)
                    resolve({
                        regions:context.state.regions,
                        provinces:context.state.provinces,
                        cities:context.state.cities,
                    })
                })
                .catch(err=>{
                    reject(err)
                })
            }else {
                resolve({
                    regions:context.state.regions,
                    provinces:context.state.provinces,
                    cities:context.state.cities,
                })
            }
        })

        
    },


    GET_REGIONS(context){
        return new Promise((resolve, reject)=>{
            ReferenceAPI.getRegions()
            .then(result=>{
                context.commit('SET_REGIONS', result.data.model)
                resolve(result.data.model)
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    GET_PROVINCES(context){
        return new Promise((resolve, reject)=>{
            ReferenceAPI.getProvinces()
            .then(result=>{
                context.commit('SET_PROVINCES', result.data.model)
                resolve(result.data.model)
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    GET_CITIES(context){
        return new Promise((resolve, reject)=>{
            ReferenceAPI.getCities()
            .then(result=>{
                context.commit('SET_CITIES', result.data.model)
                resolve(result.data.model)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}