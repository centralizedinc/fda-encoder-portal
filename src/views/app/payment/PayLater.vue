<template>
  <!-- Pending Transaction -->
  <v-container grid-list-md text-xs-left v-show="!paymentDialog">
    <v-layout row wrap>
      <v-flex xs3>
        <span class="headline font-weight-bold">Case Number:</span>
      </v-flex>
      <v-flex xs9>
        <span class="headline font-weight-bold">1425226272</span>
      </v-flex>
      <v-flex xs12>
        To process your application, please pay the amount of
        <b class="font-weight-bold">PHP XXXX.XX</b> to your selected accredited payment channels. To avoid late charges/ penalties, we encourage you to pay on or before the payment due date.
      </v-flex>
      <v-layout row wrap>
        <v-flex xs4 mt-2 ml-3>
          <span class="body-2">Application Status</span>
        </v-flex>
        <v-flex xs4 mr-5>
          <v-chip class="font-weight-bold" label color="fdaYellow" text-color="black">PENDING</v-chip>
        </v-flex>
        <v-flex xs4 mt-2 ml-3>
          <span class="body-2">Due Date</span>
        </v-flex>
        <v-flex xs4 mr-5 ml-2>MM DD, YYYY HH:MM:SS AM/PM</v-flex>
      </v-layout>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-btn flat block color="error" @click="Home">Close</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["form"],
  methods: {
    Home() {
      this.$router.push("/app");
    }
  }
};
</script>

<style>
</style>
