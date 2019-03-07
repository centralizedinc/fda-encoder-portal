<template>
  <v-layout row wrap>
    <v-flex xs12 pa-3>
      <v-card v-if="step_curr === 1">
        <v-card-title primary-title>
          <span class="headline font-weight-thin primary--text">Verify Payment Details</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            outline
            name="lic_no"
            label="Case Number/Reference No."
            id="lic_no"
            v-model="license.license_no"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="isLoading" @click.native="verifyLicense">Next</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Lincense Details -->
      <v-card v-if="step_curr === 2">
        <v-card-title primary-title>
          <span class="headline font-weight-thin primary--text">Review Payment Details</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-list>
              <v-list-tile v-for="item in items" :key="item.title">
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
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

      <!-- Scanned Upload -->
      <!-- <v-card v-if="step_curr === 3">
        <v-card-title primary-title>
          <span class="headline font-weight-thin primary--text">Test Validate</span>
        </v-card-title>
       <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="title font-weight-thin primary--text">Test Validate display</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Close</v-btn>
        </v-card-actions>
      </v-card>-->
      <!-- <cashier v-if="step_curr === 4"></cashier> -->
    </v-flex>
    <!-- <fab-buttons :buttons="fab" @submit="submit"></fab-buttons> -->
  </v-layout>
</template>

<script>
import FabButtons from "@/components/FabButtons";
import Uploader from "@/components/Uploader";
// import Cashier from "@/views/app/payments/Cashier";

export default {
  components: {
    Uploader,
    // Cashier,
    FabButtons
  },

  data() {
    return {
      step_curr: 1,
      license: {},
      isLoading: false,
      formData: null,
      items: [
        {
          title: "Application Type:",
          label: "New License"
        },
        {
          title: "Case Number:",
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
          title: "Mode of Payment:",
          label: "1000"
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
    submit() {}
  }
};
</script>

<style>
</style>
