<template>
  <v-layout row wrap>
    <v-flex xs12 pa-3>
      <v-card v-if="step_curr === 1">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Verify Payment Details</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            outline
            name="case_no"
            label="Case Number/Reference No."
            id="case_no"
            v-model="case_details.case_no"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" :loading="isLoading" @click.native="verifycase">Next</v-btn> -->
          <v-btn color="primary" @click.native="verifyLicense">Next</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Review Payment Details -->
      <v-card v-if="step_curr === 2">
        <v-toolbar dark color="primary">
          <span class="headline font-weight-thin">Review Payment Details</span>
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
          <v-btn color="primary" @click.native="verifyDetails" :loading="isLoading">Close</v-btn>
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
      step_curr: 1,
      case_details: {},
      isLoading: false,
      formData: null,
      items: [
        {
          title: "Application Type:",
          label: "New License"
        },
        {
          title: "Case/Reference Number:",
          label: "123avc121"
        },
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
      ],
      fab: [
        { label: "back", action: "back", icon: "arrow_back" },
        { label: "next", action: "next", icon: "arrow_forward" },
        { label: "submit", action: "submit", icon: "send" }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isLoading = true;
      this.$store.dispatch("FIND_CASE").then(results => {
        console.log("###########CASE_NO_RESULTS: " + JSON.stringify(results));
      });
    },
    verifycase() {
      this.step_curr++;
    },
    verifyDetails() {
      this.step_curr++;
    },
    upload(data) {
      this.formData = data;
    },
    submit() {}
  },
  verifyLicense() {
    this.isLoading = true;
    this.$store
      .dispatch("FIND_LICENSE", this.case_details.case_no)
      .then(result => {
        this.isLoading = false;
        if (result.data.success) {
          this.case_details = result.data.model;
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
  }
  // next() {
  //   console.log("###########FIND:case_no: " + JSON.stringify(this.case_no));
  //   this.isLoading = true;
  //   this.$store
  //     .dispatch("FIND_CASE", this.case_no)
  //     .then(result => {
  //       console.log("###########CASE_NO: " + JSON.stringify(results));
  //       this.isLoading = false;
  //       if (result.data.success) {
  //         this.case_details = result.data.model;
  //       } else {
  //         console.log(JSON.stringify(result.data));
  //         this.$notifyError(result.data.errors);
  //       }
  //     })
  //     .catch(err => {
  //       this.isLoading = false;
  //       console.log(err);
  //       this.$notifyError(err);
  //     });
  // }
};
</script>

<style>
</style>
