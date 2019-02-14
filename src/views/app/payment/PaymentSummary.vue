<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title class="font-weight-light headline">Payment Summary</v-card-title>
        <form-layout>
          <v-container slot="content-step-1" grid-list-xl>
            <v-card flat>
              <v-layout row wrap mt-2 pl-5>
                <v-flex xs6>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading">Application Fee:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading"># of year/s applied:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading">Surcharge:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading">Legal Research Fund (LRF):</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading" color="error">Total Payment Due:</label>
                  </v-flex>
                </v-flex>

                <v-flex xs4>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">Php {{rates.fee}}</label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">1</label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">
                      <v-icon medium color="error">close</v-icon>
                    </label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">Php {{rates.lrf}}</label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">Php 5,050.00</label>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
        </form-layout>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="generatePDF">FDA Cashier/Bank</v-btn>
          </v-flex>
          <!-- <v-flex>
            <v-btn class="font-weight-light" color="success">VFS Payment</v-btn>
          </v-flex>-->
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="creditCard">Credit Card</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="ecPay">ECPay</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-light" color="success" @click="payLater">Pay Later</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-layout row wrap>
      <v-dialog
        v-model="cashierPayment"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="500"
      >
        <v-card>
          <v-toolbar
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">FDA Cashier/Bank</span>

            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="cashierPayment =false">
                <i class="fas fa-times-circle"></i>
              </v-btn>Close
            </v-tooltip>
          </v-toolbar>

          <v-divider></v-divider>
          <v-card-text>
            <v-flex xs12>
              <p class="body-2">Order of Payment has been downloaded.</p>
              <p>General Guidelines:</p>
              <ol>
                <li>Print the system generated Order of Payment</li>
                <li>Proceed to any Landbank of the Philippines branch or nearest FDA Action Center and present the Order of Payment</li>
                <li>*Upload the receipt/confirmation in the Application Summary*</li>
              </ol>
              <div></div>
              <p
                class="caption mt-2"
                style="color: grey; font-family:courier"
              >Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
            </v-flex>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat block color="error" @click="finalStep =false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row wrap>
      <v-dialog
        v-model="ecPayDialog"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="500"
      >
        <v-card>
          <v-toolbar
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">ECPay</span>

            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="ecPayDialog =false">
                <i class="fas fa-times-circle"></i>
              </v-btn>Close
            </v-tooltip>
          </v-toolbar>

          <v-divider></v-divider>
          <v-card-text>
            <v-flex xs12>
              <p class="body-2">Your Reference Number has been downloaded.</p>
              <p>General Guidelines:</p>
              <ol>
                <li>Print the system generated Reference Number</li>
                <li>Reference number can only be used once. If you made a short payment by mistake, do not try to correct it by making another bills payment with the same reference number.</li>
                <li>Amount is inclusive of convenience fee/ If you are paying for multiple reference numbers, pay separaely for each reference number. Only one (1) transaction per reference number.</li>
              </ol>
              <div></div>
              <p
                class="caption mt-2"
                style="color: grey; font-family:courier"
              >Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
            </v-flex>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat block color="error" @click="ecPayDialog =false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- <v-layout row wrap>
      <v-dialog
        v-model="bancnetDialog"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="400"
      >
        <v-card>
          <v-card-title primary-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="bancnetDialog =false">
                <i class="fas fa-times-circle"></i>
              </v-btn>Close
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 ml-1>
                <v-text-field box name="name" label="Enter OR/Transaction Number" id="id"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-btn class="ml-1" color="success">Upload Payment receipt</v-btn>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn block flat color="success">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>-->
  </v-layout>
</template>

<script>
import * as OrderOfPaymentGenerator from "./OrderOfPaymentGenerator";

export default {
  props: ["form"],
  data() {
    return {
      rates: {
        fee: 5000,
        lrf: 50
      },
      cashierPayment: false,
      ecPayDialog: false
      // bancnetDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("Welcome to payment summary");
    },
    generatePDF() {
      this.cashierPayment = true;
      OrderOfPaymentGenerator.generateOrderOfPayment(this.form, this.rates);
    },
    creditCard() {
      this.$router.push("/app/payments/creditcard");
    },
    payLater() {
      this.$router.push("/app/payments/paylater");
    },
    ecPay() {
      this.ecPayDialog = true;
      OrderOfPaymentGenerator.generateOrderOfPayment(this.form, this.rates);
    }
  }
};
</script>

<style>
</style>
