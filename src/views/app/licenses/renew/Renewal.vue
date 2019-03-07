<template>
    <v-layout row wrap>
        <!-- Progress -->
        <v-flex xs3 pa-3>
            <v-card>
                <v-toolbar dark color="primary">
                    Progress
                </v-toolbar>
            
                    <v-stepper v-model="step_curr" vertical>
                    <v-stepper-step :complete="step_curr > 1" step="1">
                    License Number
                    <small>Enter FDA License Number</small>
                    </v-stepper-step>

                    <v-stepper-content step="1">
                    </v-stepper-content>

                    <v-stepper-step :complete="step_curr > 2" step="2">
                        License Details
                        <small>Verify License Details</small>
                    </v-stepper-step>
                    <v-stepper-content step="2">
                    </v-stepper-content>

                    <v-stepper-step :complete="step_curr > 3" step="3">
                        Supporting Documents
                        <small>Upload Scanned Copies</small>
                    </v-stepper-step>
                    <v-stepper-content step="3">
                    </v-stepper-content>

                    <v-stepper-step :complete="step_curr > 4" step="4">
                        Renewal Fees
                        <small>Renewal Fee Payment</small>
                    </v-stepper-step>

                    <v-stepper-content step="4">
                    </v-stepper-content>
                </v-stepper>
        </v-card >
        </v-flex>
        <v-flex xs9 pa-3>
            <v-card v-if="step_curr === 1">
            <v-card-title primary-title>
                <span class="headline font-weight-thin primary--text">
                    License Number
                </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                outline
                    name="lic_no"
                    label="License Number"
                    id="lic_no"
                    v-model="license.license_no"
                ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color="primary" 
                    :loading="isLoading"
                    @click.native="verifyLicense">Next</v-btn>
            </v-card-actions>
        </v-card>

        <!-- Lincense Details -->
        <v-card v-if="step_curr === 2">
            <v-card-title primary-title>
                <span class="headline font-weight-thin primary--text">
                    License Details
                </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                    outline
                    disabled
                    name="lic_no"
                    label="License Number"
                    id="lic_no"
                    :value="license.license_no"
                ></v-text-field>
                <v-text-field
                    outline
                    disabled
                    name="lic_no"
                    label="Date Issued"
                    id="lic_no"
                    :value="formatDate(license.date_issued)"
                ></v-text-field>
                <v-text-field
                    outline
                    disabled
                    name="lic_no"
                    label="Date Expired"
                    id="lic_no"
                    :value="formatDate(license.date_expiry)"
                ></v-text-field>
            </v-card-text>
            <v-card-title primary-title>
                <span class="title font-weight-thin primary--text">
                    Establishment Details
                </span>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    outline
                    disabled
                    name="lic_no"
                    label="Establishment Name"
                    id="lic_no"
                    :value="license.estab_details.establishment_name"
                ></v-text-field>
                <v-text-field
                    outline
                    disabled
                    name="lic_no"
                    label="Establishment Owner"
                    id="lic_no"
                    :value="license.estab_details.establishment_owner"
                ></v-text-field>
                <v-text-field
                    outline
                    disabled
                    name="lic_no"
                    label="Tax Identification Number"
                    id="lic_no"
                    :value="license.estab_details.tin"
                ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color="primary" 
                    @click.native="verifyDetails"
                    :loading="isLoading">Next</v-btn>
            </v-card-actions>
        </v-card>

        <!-- Scanned Upload -->
        <v-card v-if="step_curr === 3">
            <v-card-title primary-title>
                <span class="headline font-weight-thin primary--text">
                    Supporting Documents
                </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <uploader></uploader>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Next</v-btn>
            </v-card-actions>
        </v-card>
        <cashier v-if="step_curr === 4"></cashier>
        </v-flex>
        <fab-buttons :buttons="fab" @submit="submit" @back="back" @next="next"></fab-buttons>
    </v-layout>
</template>

<script>
import FabButtons from "@/components/FabButtons"
import Uploader from "@/components/Uploader";
import Cashier from "@/views/app/payments/Cashier"

export default {
  components: {
    Uploader,
    Cashier,
    FabButtons
  },

  data() {
    return {
      step_curr: 1,
      license: {},
      isLoading: false,
      formData: null,
      fab:[
          {label:"back", action:"back", icon:"arrow_back"},
          {label:"next", action:"next", icon:"arrow_forward"},
          {label:"submit", action:"submit", icon:"save"}
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
    //   this.license.application_type = "0";
    //   this.license.created_by = this.$store.state.user_session.user._id;
    //   this.license.encoder = this.$store.state.user_session.user._id;
    },
    verifyLicense() {
      this.isLoading = true;
      this.$store
        .dispatch("FIND_LICENSE", this.license.license_no)
        .then(result => {
          this.isLoading = false;
          if (result.data.success) {
            this.license = result.data.model;
            this.step_curr++;
            this.$notify({
              message: "License Details found."
            });
          } else {
            this.$notify({
              message: "License Number not found!"
            });
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$notifyError(err);
        });
    },
    verifyDetails() {
      this.step_curr++;
    },
    upload(data) {
      this.formData = data;
    },
    next(){
        this.step_curr++;
    }, 
    back(){
        this.step_curr--;
    },
    submit() {
        this.isLoading = true;
      //initialized license renewal
      var lic_renew = {
          application_type:2,
          general_info: this.license.general_info,
          estab_details: this.license.estab_details,
          addresses: this.license.addresses,
          auth_officer: this.license.auth_officer,
          qualified: this.license.qualified,
          isEncoded:true,
          base_license:this.license.license_no,
          encoder:this.$store.state.user_session.user._id,
          created_by:this.$store.state.user_session.user._id
      }

      this.$store
        .dispatch("SAVE_LICENSE", {
          initial: false,
          license: lic_renew,
          upload: this.formData
        })
        .then(result => {
            this.isLoading = false;
          if (result.success) {
            this.$notify({
              message: "Sucess! CASE#: " + result.model.case_details.case_no,
              color: "primary"
            });
            this.$store.commit("SET_LICENSE", result.model);
            // this.$router.push("/app/payments");
            this.step_curr++;
          } else {
            this.$notifyError(result.errors);
          }
        })
        .catch(err => {
            this.isLoading = false;
          console.log("ERROR: " + err);
          this.$notifyError(err);
        });
    }
  }
};
</script>

<style>
</style>
