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
            Payment
            <small>Accept Payment</small>
          </v-stepper-step>
          <v-stepper-content step="3"></v-stepper-content>
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
          <v-btn color="primary" :loading="isLoading" @click.native="verifyLicense">Next</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Application Details -->
      <v-card v-if="step_curr === 2">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Application Details</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="title font-weight-thin primary--text">Summary of payment</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-flex xs12 sm6 offset-sm3>
          <v-data-table :headers="headers" :items="transactions" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.transaction }}</td>
              <td class="text-xs-right">{{ props.item.details }}</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.native="verifyDetails" :loading="isLoading">Next</v-btn>
        </v-card-actions>
      </v-card>

      <!-- payment -->
      <v-card v-if="step_curr === 3">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Payments</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-list>
              <v-list-tile v-for="item in items" :key="item.title">
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.label"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Proceed to Payment</v-btn>
        </v-card-actions>
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
          text: "Application Type",
          value: "transaction"
        },
        {
          text: "Case/Reference Number",
          value: "details"
        }
      ],
      transactions: [
        {
          transaction: "New License",
          details: "123ABC121"
        },
        {
          transaction: "Certifictae",
          details: "ABC3214"
        }
      ],
      items: [
        {
          title: "Fee:",
          label: "1000"
        },
        {
          title: "LRF:",
          label: "1000"
        },
        {
          title: "Penalty:",
          label: "1000"
        },
        {
          title: "Total Amount:",
          label: "1000"
        },
        {
          title: "Status:",
          label: "Paid"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
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
    search(){
            this.isLoading = true;
            this.$store.dispatch('FIND_ENCODED_CASE',this.case_no)
            .then(result=>{
                this.isLoading = false;
                if(result.data.success){
                    this.case_details = result.data.model;
                }else{
                    console.log(JSON.stringify(result.data))
                   this.$notifyError(result.data.errors) 
                }                
            })
            .catch(err=>{
                this.isLoading = false;
                console.log(err)
                this.$notifyError(err)
            })
        },
  }
};
</script>

<style>
</style>
