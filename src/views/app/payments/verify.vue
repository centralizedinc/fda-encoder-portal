<template>
  <v-layout row wrap>
    <v-flex xs12 pa-3>
      <v-card v-if="page === 1">
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
          <v-btn color="primary" @click.native="verifycase">Next</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Review Payment Details -->
      <v-card v-if="page === 2">
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
                  <v-list-tile-title v-text="item.value"></v-list-tile-title>
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

export default {
  components: {
    FabButtons
  },

  data() {
    return {
      page: 1,
      case_details: {},
      isLoading: false,
      formData: null,
      items: [
        {
          title: "Application Type:",
          value: "New License"
        },
        {
          title: "Case/Reference Number:",
          value: "123avc121"
        },
        {
          title: "Fee:",
          value: "1000"
        },
        {
          title: "LRF:",
          value: "1000"
        },
        {
          title: "Penalty:",
          value: "1000"
        },
        {
          title: "Total Amount:",
          value: "1000"
        },
        {
          title: "Status:",
          value: "Paid"
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
      this.isLoading = true;
      this.$store
        .dispatch("FIND_CASE", this.case_details.case_no)
        .then(result => {
          console.log("###########CASE_NO_RESULTS: " + JSON.stringify(case_no));
          this.isLoading = false;
          if (result.data.success) {
            this.case_details = result.data.model.case_no;
            this.page++;
            this.$notify({
              message: "Case Details found."
            });
          } else {
            this.$notify({
              message: "Case Number not found!"
            });
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$notifyError(err);
        });
    },
    verifyDetails() {
      this.page++;
    },
    submit() {}
  }
};
</script>

<style>
</style>
