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
        <v-card>
          <v-card-title primary-title class="headline">
            <span class="headline">Payments Details</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <span class="title">Application Type:</span>
                  <v-card-text
                    class="subheading"
                  >{{getApplicationTypeName(case_details.application_id)}}</v-card-text>
                  <span class="title">Case/Reference Number:</span>
                  <v-card-text class="subheading">{{ case_details.case_no }}</v-card-text>
                  <span class="title">Fee:</span>
                  <v-card-text class="subheading">{{case_details.current_task}}</v-card-text>
                  <span class="title">LRF:</span>
                  <v-card-text class="subheading">{{case_details.encoder_group}}</v-card-text>
                  <span class="title">Status:</span>
                  <v-card-text class="subheading">{{getStatus(case_details.status)}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="close" :loading="isLoading">Close</v-btn>
          </v-card-actions>
        </v-card>
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
      case_no: {},
      isLoading: false,
      formData: null,
      status: [
        { value: "0", label: "Paid" },
        { value: "1", label: "Not Paid" }
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
          this.isLoading = false;
          console.log("###########CASE_NO_RESULTS: " + JSON.stringify(result));
          if (result.data.success) {
            this.case_details = result.data.model;
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
    // verifyDetails() {
    //   this.page++;
    // },
    close() {
      this.$router.push("/app");
    }
  }
};
</script>

<style>
</style>
