import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    // getLicenses(cb) {
    //     axios.get('lto-api/').then((result) => {
    //         console.log('get licenses: ' + JSON.stringify(result));

    //         if (result.data.success) {
    //             cb(result.data.model)
    //         } else {
    //             cb(null, result.data.errors)
    //         }
    //     }).catch(err => {
    //         console.log('##########error: ' + JSON.stringify(err))
    //         cb(null, err)
    //     })
    // }

    // uploadLicenses(licenses, cb) {
    //     axios.post('lto-api/upload/', licenses).then((result) => {
    //         console.log("post licenses: " + JSON.stringify(result.data));
    //         cb(result.data.model)
    //     }).catch(err => {
    //         console.log('##########error save uploadLicenses: ' + JSON.stringify(err))
    //         cb(null, err)
    //     })
    // }

    saveLicenses(data) {
        var saved_license = {};
        var lic_case = {}
        var url = data.initial ? 'lto-api/encoded' : 'lto-api/encoded/renew';
        return new Promise((resolve, reject) => {
            axios.post(url, data.license)
                .then(result1 => {
                    console.log("RESULT SAVING LICENSE: " + JSON.stringify(result1.data))
                    if (result1.data.success) {
                        lic_case = result1.data;
                        saved_license = result1.data.model.license;
                        return axios.post('documents/uploads?account_id=' + saved_license.case_no, data.upload)
                    } else {
                        resolve(result1.data)
                    }
                })
                .then(result2 => {
                    console.log("RESULT UPLOADING FILES: " + JSON.stringify(result2.data))
                    var files = result2.data.model
                    saved_license.uploaded_files = files;
                    if (result2.data.success) {
                        return axios.post('lto-api/' + saved_license._id, saved_license)
                    } else {
                        resolve(result2.data)
                    }

                })
                .then(result3 => {
                    console.log("RESULT UPDATING LICENSE: " + JSON.stringify(result3.data))
                    lic_case.license = result3.data.model;
                    resolve(lic_case)

                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    /**
     * 
     * @param {String} license_no 
     * @returns {Promise}
     */
    findLicense(license_no) {
        return axios.get('lto-api/license_no/' + license_no)
    }

    findLicenseByID(license_id) {
        return axios.get('lto-api/' + license_id)
    }

    // modifyLicenses(licenses, cb) {
    //     console.log('actions save modify licenses: ' + JSON.stringify(licenses))
    //     axios.post('lto-api/claim', licenses).then((result) => {
    //         console.log("post  claim licenses: " + JSON.stringify(result.data.model));
    //         cb(result.data.model)
    //     }).catch(err => {
    //         console.log('##########error save modifyLicenses: ' + JSON.stringify(err))
    //         cb(null, err)
    //     })
    // }
}

// module.exports = LicenseAPI
// export default {
//     getLicenses(cb) {
//         axios.get('lto-api/').then(result => {
//             console.log(JSON.stringify(result.data));
//             if (result.data.success) {
//                 cb(result.data.model)
//             } else {
//                 cb()
//             }
//         });
//     }
// }