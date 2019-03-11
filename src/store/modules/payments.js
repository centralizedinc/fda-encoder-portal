import PaymentAPI from '../../api/PaymentApi';

const initialState = {
    credit_card: null,
    cvv: null,
    expiry: null
}

const state = initialState

const mutations = {
    CREDIT_CARD(state, form){
        state.credit_card = form
    },
    CVV(state, form){
        state.cvv = form
    },
    EXPIRY(state, form){
        state.expiry = form
    },
    CLEAR(state){
        Object.assign(state, initialState);    
    }
}

var actions = {
    VALIDATE_CREDIT_CARD(context, creditCard){
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).creditCard(creditCard,(credit, err) =>{
                if(!err){
                    context.commit('CREDIT_CARD', credit)
                    resolve()
                }else{
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    VALIDATE_CVV(context, cvv){
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).cvv(cvv,(credit, err) =>{
                if(!err){
                    context.commit('CVV', credit)
                    resolve()
                }else{
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    VALIDATE_EXPIRATION_DATE(context, expirationDate){
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).expirationDate(expirationDate,(credit, err) =>{
                if(!err){
                    context.commit('EXPIRY', credit)
                    resolve()
                }else{
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    SAVE_PAYMENT(context, fullDetails){
        console.log("save payment store actions" + JSON.stringify(fullDetails))
        new PaymentAPI(context.rootState.user_session.token).savePayment(fullDetails,(details, err) => {
            if(!err){
                console.log('actions save licenses: ' + JSON.stringify(details))
            }else{
                console.log("actions save licenses error: " + JSON.stringify(err))
            }          
        })
    },

    RETRIEVE_RATES(context, app_details){
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token)
                    .retrieveRates(app_details).then((result) => {
                        console.log('result :', result);
                        resolve(result)
                    }).catch((err) => {
                        console.log('err :', err);
                        reject(err)
                    });
        })
    },

    SUBMIT_PAYMENT(context, payment){
        console.log('payment :', JSON.stringify(payment));
        return new PaymentAPI(context.rootState.user_session.token)
                    .submitPayment(payment);
    }
    
}

export default {
    state,
    mutations,
    actions
}
