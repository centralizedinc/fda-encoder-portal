import axios from 'axios';

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';

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