import axios from 'axios';

axios.defaults.baseURL = axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;

export default class ReferenceAPI{


    static getProductTypes(token){
        return  axios.get('core/products');
    }

    static getRegions(){
        return axios.get('core/regions')
    }

    static getProvinces(){
        return axios.get('core/provinces')
    }

    static getCities(){
        return axios.get('core/city')
    }
}