<template>
    <v-layout row wrap>
        <v-flex xs12 md6 pa-3>
            <v-card>
                <v-toolbar dark color="primary">
                    Payment Details
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        outline
                        name="app_fee"
                        label="Application Fee"
                        id="app_fee"
                        :value="formatCurrency(payment_details.fee)"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="lrf"
                        label="Legal Research Fee (LRF)"
                        id="lrf"
                        :value="formatCurrency(payment_details.lrf)"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="penalty"
                        label="Penalty/Surcharge"
                        id="penalty"
                        :value="formatCurrency(payment_details.surcharge)"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="amount"
                        label="Total Amount Due"
                        id="amount"
                        :value="formatCurrency(payment_details.total)"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="payment"
                        label="Total Payment"
                        id="payment"
                        v-model="amount_paid"
                    ></v-text-field>
                    <v-menu
                        v-model="date1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                        <v-text-field
                        outline
                        slot="activator"
                        v-model="date_of_payment"
                        label="Date of Payment"
                        append-icon="event"
                        readonly
                        ></v-text-field>
                        <v-date-picker v-model="date_of_payment" @input="date1 = false"></v-date-picker>
                    </v-menu>
                    
                    <!-- <v-text-field
                        outline
                        name="payment"
                        label="Date of Payment"
                        id="payment"
                        append-icon="event"
                        v-model="date_of_payment"
                    ></v-text-field> -->
                    <v-textarea
                    rows="2"
                        outline
                        name="remarks"
                        label="Remarks"
                        id="remarks"
                        v-model="remarks"
                    ></v-textarea>                    
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn large color="primary" @click="submit">Submit</v-btn>
                </v-card-actions>
            </v-card>         
        </v-flex>
        <v-flex xs12 md6 pa-3>
            <v-card>
                <v-toolbar dark color="primary">
                    Application Details
                </v-toolbar>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12 pa-1>
                            <v-text-field
                                outline
                                name="case_number"
                                label="Case Number"
                                id="case_number"
                                v-model="license.case_no"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 pa-1>
                            <v-text-field
                                outline
                                name="est_name"
                                label="Establishment Name"
                                id="est_name"
                                 v-model="license.estab_details.establishment_name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 pa-1>
                            <v-text-field
                            outline
                                name="app_type"
                                label="Application Type"
                                id="app_type"
                                :value="getApplicationTypeName(license.application_type)"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 pa-1>
                            <v-text-field
                            outline
                                name="prod_type"
                                label="Product Type"
                                id="prod_type"
                                v-model="license.general_info.product_type"
                            ></v-text-field>
                        </v-flex>
                         <v-flex xs12 md6 pa-1>
                            <v-text-field
                            outline
                                name="pri_act"
                                label="Primary Activity"
                                id="pri_act"
                                v-model="license.general_info.primary_activity"
                            ></v-text-field>
                        </v-flex>
                         <v-flex xs12 md6 pa-1>
                            <v-text-field
                            outline
                                name="dec_cap"
                                label="Declared Capital"
                                id="dec_cap"
                                v-model="license.general_info.primary_capital"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>                    
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn large color="primary">View Details</v-btn>
                </v-card-actions>
            </v-card>         
        </v-flex>
        
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            license:{},
            case:{},
            payment_details:{},
            amount_paid:0,
            date_of_payment: null,
            date1: false,
            remarks:""
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            console.log('LIC: ' + JSON.stringify(this.$store.state.licenses.license))
            console.log('CASE: ' + JSON.stringify(this.$store.state.licenses.case))
            this.license = this.$store.state.licenses.license;
            this.case = this.$store.state.licenses.case;            
            this.$store.dispatch('RETRIEVE_RATES', {
                appType:this.license.application_type,
                productType:this.license.general_info.product_type,
                primaryActivity:this.license.general_info.primary_activity,
                declaredCapital:this.license.general_info.declared_capital,
                // date_expiry:this.license.
            })
            .then(rates=>{
                console.log('RATES: ' + JSON.stringify(rates))
                this.payment_details = rates.data.model;
            })
            .catch(err =>{
                console.log('RATES: ' + err)
                this.$notifyError(err)
            })

        },
        submit(){
            console.log('submitting payment')
            //construct payment
            var payment = {
                payment_details:{
                    total_amount:this.amount_paid,
                    mode_of_payment:1
                },
                transaction_details:{
                    application_type:this.license.application_type,
                    application:this.license._id,
                    case_no:this.license.case_no,
                    case_id:this.case._id,
                    order_payment:{
                        fee:this.payment_details.fee,
                        lrf:this.payment_details.lrf?this.payment_details.lrf:0,
                        penalty:this.payment_details.penalty?this.payment_details.penalty:0,
                        total_amount:this.payment_details.total?this.payment_details.total:0,
                        remarks:this.remarks
                    }
                }
            }
            this.$store.dispatch('SUBMIT_PAYMENT', payment)
            .then(result=>{
                console.log('RESULT: ' + JSON.stringify(result))
                if(result.success){                    
                    this.$notify({
                        message:'Success! Payment Reference No:' + result.model.transaction_id,
                        color:'primary'
                        })
                }else{
                    this.$notifyError(result.errors)
                }
            })
            .catch(err=>{
                console.log('ERROR: ' + err)
                this.$notifyError(err)
            })
        }
    }
}
</script>

<style>

</style>
