<template>
  <v-layout row wrap>
    <!-- Progress -->
    <v-flex xs3 pa-3>
      <v-card>
        <v-toolbar dark color="primary">Progress</v-toolbar>

        <v-stepper v-model="step_curr" vertical>
          <v-stepper-step :complete="step_curr > 1" step="1">
            Case Number
            <small>Enter FDA Case Number</small>
          </v-stepper-step>

          <v-stepper-content step="1"></v-stepper-content>

          <v-stepper-step :complete="step_curr > 2" step="2">
            Details
            <small>Verify Application Details</small>
          </v-stepper-step>
          <v-stepper-content step="2"></v-stepper-content>

          <v-stepper-step :complete="step_curr > 3" step="3">
            Payment Details
            <small>Verify Payment</small>
          </v-stepper-step>
          <v-stepper-content step="3"></v-stepper-content>
        <v-stepper-step :complete="step_curr > 4" step="4">
            Accept Payment
            <small>Accept Payment</small>
          </v-stepper-step>
          <v-stepper-content step="4"></v-stepper-content>
        </v-stepper>
      </v-card>
    </v-flex>
    <v-flex xs9 pa-3>
      <v-card v-if="step_curr === 1">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Case Number</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            outline
            name="lic_no"
            label="Case Number"
            id="lic_no"
            v-model="license.case_no"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="isLoading" @click.native="search">Next</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Application Details -->
      <!-- <v-card v-if="page === 2"> -->
      <v-card v-if="step_curr === 2">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Review Payment Details</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card>
          <v-card-title primary-title class="headline">
            <span class="headline">Payments Details</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <span class="title">Client:</span>
                  <v-card-text class="subheading">{{case_details.client}}</v-card-text>
                  <span class="title">Application Type:</span>
                  <v-card-text class="subheading">{{case_details.application_id}}</v-card-text>
                  <span class="title">Case/Reference Number:</span>
                  <v-card-text class="subheading">{{ case_details.case_no }}</v-card-text>
                  <span class="title">Group:</span>
                  <v-card-text class="subheading">{{case_details.encoder_group}}</v-card-text>
                  <span class="title">Case Type:</span>
                  <v-card-text class="subheading">{{getAppType(case_details.case_type)}}</v-card-text>
                  <span class="title">Status:</span>
                  <v-card-text class="subheading">{{getActivityStatus(case_details.status)}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="viewpay">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
      <v-card v-if="step_curr === 3">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Review Payment Details</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card>
          <v-card-title primary-title class="headline">
            <span class="headline">Payments Details</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <span class="title">Application Fee:</span>
                  <v-card-text class="subheading">{{rate.fee}}</v-card-text>
                  <span class="title">LRF:</span>
                  <v-card-text class="subheading">{{rate.lrf}}</v-card-text>
                  <span class="title">Interest:</span>
                  <v-card-text class="subheading">{{rate.interest}}</v-card-text>
                  <span class="title">Surcharge:</span>
                  <v-card-text class="subheading">{{rate.surcharge}}</v-card-text>
                  <span class="title">Others:</span>
                  <v-card-text class="subheading">{{rate.others}}</v-card-text>
                  <span class="title">Total:</span>
                  <v-card-text class="subheading">{{rate.total}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" @click.native="payment" :loading="isLoading">Close</v-btn> -->
            <v-btn color="primary" @click="next">Proceed to Payment</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
<!-- payment -->
<v-card v-if="step_curr === 4">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Payment</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card>
          <v-card-title primary-title class="headline">
            <span class="headline">Cashier</span>
          </v-card-title>
      <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            outline
            name="pay"
            label="Payment"
            id="pay"
            v-model="amount_paid"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="isLoading" @click="payments">Pay</v-btn>
        </v-card-actions>

          <!-- </v-card-text>
          <v-divider></v-divider>
          <v-card-actions> -->
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn color="primary" @click.native="payment" :loading="isLoading">Close</v-btn> -->
            <!-- <v-btn color="primary" @click="payment">Proceed to Payment</v-btn> -->
          <!-- </v-card-actions> -->
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FabButtons from "@/components/FabButtons";
import Uploader from "@/components/Uploader";

export default {
  components: {
    Uploader,
    FabButtons
  },

  data() {
    return {
      text: "20,000",
      step_curr: 1,
      license: {},
      isLoading: false,
      formData: null,
      fab: [
        { label: "back", action: "back", icon: "arrow_back" },
        { label: "next", action: "next", icon: "arrow_forward" },
        { label: "submit", action: "submit", icon: "send" }
      ],
      headers: [
        {
          text: "Transaction",
          value: "transaction"
        },
        {
          text: "Details",
          value: "details"
        }
      ],

      //
      rate: [],
      items: [],
      license_details: {},
      amount_paid: 0,
      payment: 0
    };
  },
  case_details: {},
  created() {
    // this.init();
  },
  methods: {
    verifyLicense() {
      this.step_curr++;
    },
    verifyDetails() {
      this.step_curr++;
    },
    upload(data) {
      this.formData = data;
    },
    // submit() {
    //   this.step_curr++;
    // }
    search() {
      this.isLoading = true;
      this.$store
        .dispatch("FIND_CASE", this.license.case_no)
        .then(result => {
          this.isLoading = false;
          console.log("############### FIND CASE" + JSON.stringify(result));

          if (result.data.success) {
            console.log("##### GROUP " + JSON.stringify(result.data.model));
            this.case_details = result.data.model;
            console.log(
              "##### case details" + JSON.stringify(this.case_details)
            );

            this.step_curr++;
            console.log('this.case_details.application_id :', this.case_details.application_id);
            return this.$store.dispatch("FIND_LICENSE_BY_ID", this.case_details.application_id)
          } else {
            console.log('result.data.errors :', result.data.errors);
            this.$notifyError(result.data.errors);
          }

          // return this.$store.dispatch("RETRIEVE_RATES", this.case_details);
        })
        .then(result => {
          console.log("####### LAST RESULT ######" + JSON.stringify(result));
          this.license_details = result ? result.data.model : {};
        })

        .catch(err => {
          this.isLoading = false;
          console.log(err);
          this.$notifyError(err);
        });
    },
    viewpay() {
      this.isLoading = true;
      this.$store
        .dispatch("RETRIEVE_RATES", {
          appType: this.case_details.application_type,
          productType: this.license_details.general_info.product_type,
          primaryActivity: this.license_details.general_info.primary_activity,
          declaredCapital: this.license_details.general_info.declared_capital
        })
        .then(result => {
          this.isLoading = false;
          console.log("############### FIND CASE" + JSON.stringify(result));

          if (result.data.success) {
            console.log("##### GROUP " + JSON.stringify(result.data.model));
            this.rate = result.data.model;
            console.log("##### rates details" + JSON.stringify(this.rate));
            this.step_curr++;
          } else {
            console.log(JSON.stringify(result));
            this.$notifyError(result.data.errors);
          }

          // return this.$store.dispatch("RETRIEVE_RATES", this.case_details);
        })
        // .then(result => {
        //   console.log("####### LAST RESULT ######" + JSON.stringify(result));
        //   this.rates = this.result.data.model
        // })

        .catch(err => {
          this.isLoading = false;
          console.log(err);
          this.$notifyError(err);
        });
    },

    payments() {
      var payment = {
                payment_details:{
                    total_amount:this.amount_paid,
                    mode_of_payment:1
                },
                transaction_details:{
                    application_type:this.case_details.application_type,
                    application:this.case_details.application_id,
                    case_no:this.case_details.case_no,
                    case_id:this.case_details._id,
                    order_payment:{
                        fee:this.rate.fee,
                        lrf:this.rate.lrf?this.rate.lrf:0,
                        penalty:this.rate.penalty?this.rate.penalty:0,
                        total_amount:this.rate.total?this.rate.total:0,
                        remarks:this.remarks
                    }
                }
            }
      this.isLoading = true;
      console.log('object :'+ JSON.stringify(payment));
      this.$store
      .dispatch("SUBMIT_PAYMENT", payment)
      .then(result => {
        this.isLoading = false;
        console.log("############### SUBMIT PAYMENT" + JSON.stringify(result));
        if (result.success) {
         this.$notify({
                        message:'Success! Payment Reference No:' + result.model.transaction_id,
                        color:'primary'
                        })
        }else{
                    this.$notifyError(result.errors)
                }

        })
         .catch(err => {
          this.isLoading = false;
          console.log(err);
          this.$notifyError(err);
        });
    },
    next() {
      this.step_curr++;
    },
    // back() {
    //   this.step_curr--;
    // }
  }
};
</script>

<style>
</style>
