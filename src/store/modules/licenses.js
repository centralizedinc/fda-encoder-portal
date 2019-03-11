// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '@/api/LicenseApi';
import {
    resolve
} from 'url';

const initialState = {
    LicenseAPI: null,
    licenses: [],
    form: null,
    uploaded: null,
    case: null,
    license: null
}

const state = initialState;

const mutations = {
    SET_LICENSE(state, data) {
        state.license = data.license;
        state.case = data.case_details
    },
    SET_LICENSES(state, licenses) {
        state.licenses = null;
        state.licenses = licenses;
    },
    SET_FORM(state, form) {
        state.form = null;
        state.form = form;
        console.log("set form store mutation: " + JSON.stringify(state.form))
    },
    UPLOADED_DATA(state, form) {
        state.uploaded = form
    },
    CLEAR(state) {
        Object.assign(state, initialState);
    }
}

var actions = {
    // GET_UNASSIGNED(context) {
    //     if(context.rootState.user_session.token){
    //         return new Promise((resolve, reject) => {

    //         })
    //     }
    // },
    GET_LICENSES(context) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).getLicenses((licenses, err) => {
                if (!err) {
                    console.log('license: ' + JSON.stringify(licenses));

                    context.commit('SET_LICENSES', licenses)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    SAVE_LICENSE(context, license) {
        return new LicenseAPI(context.rootState.user_session.token).saveLicenses(license);
    },
    FIND_LICENSE(context, license) {
        return new LicenseAPI(context.rootState.user_session.token).findLicense(license)
    },
    FIND_LICENSE_BY_ID(context, license) {
        return new LicenseAPI(context.rootState.user_session.token).findLicenseByID(license)
    },
    SAVE_MODIFY_LICENSES(context, license) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).modifyLicenses(license, (licenses, err) => {
                if (!err) {
                    console.log('actions save modify licenses: ' + JSON.stringify(licenses))
                    resolve()
                } else {
                    console.log("actions save modify licenses error: " + JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    UPLOAD_LICENSES(context, uploadData) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).uploadLicenses(uploadData, (uploadedData, err) => {
                if (!err) {
                    context.commit('UPLOADED_DATA', uploadedData)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    }

}

export default {
    state,
    mutations,
    actions
}