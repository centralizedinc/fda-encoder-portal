import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class PaymentAPI {
    constructor(token) {
        axios.defaults.baseURL = axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }

    creditCard(creditCardNumber, cb){
        axios.post('payments/creditcard/validate/card', {
            cardNumber: creditCardNumber
          }).then((result) => {
           cb(result.data.model)
        }).catch(err => {
            console.log('##########error save creditCard: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    cvv(cvvNumber, cb){
        axios.post('payments/creditcard/validate/cvv', {
            cvv: cvvNumber
          }).then((result) => {
           cb(result.data.model)
        }).catch(err => {
            console.log('##########error save cvv: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    expirationDate(expiryDate, cb){
        axios.post('payments/creditcard/validate/expiry', {
            expiry: expiryDate
          }).then((result) => {
           cb(result.data.model)
        }).catch(err => {
            console.log('##########error save expirationDate: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    savePayment(fullDetails, cb){
        console.log("save payments details: " + JSON.stringify(fullDetails))
        axios.post('payments/',{
            card_details: fullDetails.card_details,
            payment_details: fullDetails.payment_details,
            transaction_details: fullDetails.transaction_details} ).then((result) => {
                console.log("post save payment details: " + JSON.stringify(result.data.model))
            cb(result.data.model)
         }).catch(err => {
             console.log('##########error save savePayment: ' + JSON.stringify(err))
             cb(null, err)
         })
    }

    retrieveRates(app_details){
        console.log('DETAILS: ' + JSON.stringify(app_details))
        return axios.post('payments/rates/compute', app_details)
    }

    submitPayment(payment){
        console.log('PAYMENTS: '+JSON.stringify(payment))
        var payment_details = {};
        return new Promise((resolve, reject)=>{
            axios.post('payments/cashier', payment)
            .then(result1=>{
                console.log('PAYMENT_RESULT: ' + JSON.stringify(result1.data))
                if(result1.data.success){
                    payment_details = result1.data;
                    var details = {
                        case_id: payment.transaction_details.case_id,
                        status:0,
                        remarks: payment.transaction_details.order_payment.remarks
                    }
                    console.log('DETAILS ###: '+JSON.stringify(details))
                    return axios.post('lto-api/case/', details)
                }else{
                    resolve(result1.data)
                }
            })
            .then(result2=>{
                if(result2.data.success){
                    resolve(payment_details)
                }
                resolve(result2.data)
            })
            .catch(err=>{
                console.log('ERROR: ' + err)
                reject(err)
            })
        })
        
    }


}