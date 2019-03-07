<template>
  <v-layout row wrap>    
    <v-flex xs12 pa-3>
      <span class="title">Licenses</span>
      <v-divider></v-divider>
    </v-flex>
    
    <v-flex xs3 pa-3>
      <v-card  dark style="background:linear-gradient(360deg, #0F901A 0%, #97C76E 100%); box-shadow:0 6px 20px 0 rgba(38, 198, 218, 0.5)">       
        <v-card-title primary-title>
                    
          <v-layout row wrap>
            <v-flex xs3>
               <v-avatar size="50" color="transparent">
                <v-icon large>fas fa-file-contract</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs9 mt-2>
              <span class="headline font-weight-regular">New License</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="subheading">Initial License Application</p>
          <p>1. Fill-up application form</p>
          <p>2. Upload appliation requirements</p>
          <p>3. Receive payment</p>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline icon @click="goTo('/app/licenses/0')">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn outline icon @click="goTo('/app/licenses/new')">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs3 pa-3>
      <v-card dark style="background: linear-gradient(360deg, 	#95A523 0%, #B5C25A  100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)">       
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex xs3>
               <v-avatar size="50" color="transparent">
                <v-icon large>fas fa-redo</v-icon>
              </v-avatar>
            </v-flex>                   
            <v-flex xs9 mt-2>
              <span class="headline font-weight-regular">License Renewal</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="subheading">Renew expired license</p>
          <p>1. Input License Number to be renew</p>
          <p>2. Verify license details</p>
          <p>3. Upload supporting documents</p>
          <p>4. Accept payment for renewal fee</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline icon @click="goTo('/app/licenses/2')">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn outline icon @click="goTo('/app/licenses/renew')">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs3 pa-3>
      <v-card dark style="background:linear-gradient(3600deg, #297373 0%, #5FA391 100%); box-shadow: 0 6px 20px 0 rgba(244, 143, 177, 0.5);">       
        <v-card-title primary-title>
                    
          <v-layout row wrap>
            <v-flex xs3>
               <v-avatar size="50" color="transparent">
                <v-icon large>far fa-edit</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs9 mt-2>
              <span class="headline font-weight-regular">License Variation</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="subheading">Ammendment on the  existing/active license</p>
          <p>1. Choose license details to be modified</p>
          <p>2. Enter new license details</p>
          <p>3. Upload supporting documents</p>
          <p>4. Accept payments</p>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline icon @click="goTo('/app/licenses/1')">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn outline icon @click="goTo('/app/licenses/new')">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs3 pa-3>
      <v-card dark style="background: linear-gradient(360deg, #F1961D 0%, #F58555  100%); box-shadow: 0 6px 20px 0 rgba(255, 111, 0, 0.3)">       
        <v-card-title primary-title>
                    
          <v-layout row wrap>
            <v-flex xs3>
               <v-avatar size="50" color="transparent">
                <v-icon large>fas fa-search</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs9 mt-2>
              <span class="headline font-weight-regular">License Search</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="subheading">Search for license by case number</p>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline icon @click="goTo('/app/licenses/search')">
            <v-icon>search</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 pa-3>
      <span class="title">Payments</span>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs4 pa-3>
      <v-card dark style="background:linear-gradient(360deg, #0F901A 0%, #97C76E 100%); box-shadow:0 6px 20px 0 rgba(38, 198, 218, 0.5)">       
        <v-card-title primary-title>
                    
          <v-layout row wrap>
            <v-flex xs3>
               <v-avatar size="50" color="transparent">
                <v-icon large>fas fa-cash-register</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs9 mt-2>
              <span class="headline font-weight-regular">Accept Payments</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="subheading">Pay for Application Fees</p>
          <p>1. Search for Case Number</p>
          <p>2. Verify Application details</p>
          <p>3. Accept payment</p>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline icon @click="goTo('/app/payments/Accept')">
            <v-icon>search</v-icon>
          </v-btn>
          <!-- <v-btn outline icon @click="goTo('/app/licenses/new')">
            <v-icon>edit</v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs4 pa-3>
      <v-card dark style="background: linear-gradient(360deg, 	#95A523 0%, #B5C25A  100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)">       
        <v-card-title primary-title>
                    
          <v-layout row wrap>
            <v-flex xs3>
               <v-avatar size="50" color="transparent">
                <v-icon large>fas fa-credit-card</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs9 mt-2>
              <span class="headline font-weight-regular">Payment Verification</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="subheading">Verify Payment Details</p>
          <p>1. Search for Payment Reference Number or Case Number</p>
          <p>2. Review Payment Details</p>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline icon @click="goTo('/app/payments/verify')">
            <v-icon>search</v-icon>
          </v-btn>
          <!-- <v-btn outline icon @click="goTo('/app/payments/verify')">
            <v-icon>edit</v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  data: () => ({
    
  }),
  methods: {
    goTo(nav){
      this.$router.push(nav)
    }
  }
};
</script>


<style>
</style>