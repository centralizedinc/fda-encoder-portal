<template>
    <div>
        <v-card-title primary-title>
                <span class="title font-weight-light">
                Authorized Officer                      
            </span>
            <!-- <v-spacer></v-spacer>
            <v-btn fab icon color="primary" disabled>
                <v-icon>edit</v-icon>
            </v-btn> -->
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        name="a_lname"
                        label="Last Name"
                        id="a_lname"
                        v-model="license.auth_officer.lastname"
                    ></v-text-field>                            
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        name="a_fname"
                        label="First Name"
                        id="a_fname"
                        v-model="license.auth_officer.firstname"
                    ></v-text-field>                            
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        name="a_mname"
                        label="Middle Name"
                        id="a_mname"
                        v-model="license.auth_officer.middlename"
                    ></v-text-field>                            
                </v-flex>
                    <v-flex xs12 md4 pa-1>
                    <v-select
                    outline
                        :items="designation"
                        v-model="license.auth_officer.middlename"
                        label="Designation"
                    ></v-select>                         
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                        outline
                        name="a_tin"
                        label="Tax Identification Number (TIN)"
                        id="a_tin"
                        v-model="license.auth_officer.tin"
                        mask="###-###-###-###"
                    ></v-text-field>                        
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                        outline
                        name="a_email"
                        label="Email"
                        id="a_email"
                        v-model="license.auth_officer.email"
                    ></v-text-field>                        
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-select
                        outline
                        :items="id_type"
                        v-model="license.auth_officer.id_type"
                        label="Govenment Issued Id"
                    ></v-select>                       
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                        outline
                        name="a_id_no"
                        label="Id Number"
                        id="a_id_no"
                        v-model="license.auth_officer.id_no"
                    ></v-text-field>                      
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        label="Expiry Date"
                        v-model="license.auth_officer.id_expiry"
                        append-icon="event"                                
                        @click:append="dialogValue=true"

                    ></v-text-field>
                <v-dialog
                    ref="dialogRef"
                    persistent
                    v-model="dialogValue"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="date"
                >
                    
                    <v-date-picker v-model="license.auth_officer.id_expiry" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dialogValue = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogRef.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
                </v-flex>
                <v-flex xs12 pa-1>
                    <v-textarea
                    outline
                        name="a_mail_add"
                        label="Address"
                        id="a_mail_add"
                        v-model="license.auth_officer.mail_add.address"
                    ></v-textarea>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        item-text="name"
                        item-value="_id"
                        :items="regions"
                        name="a_mail_reg"
                        label="Region"
                        id="a_mail_reg"
                        v-model="license.auth_officer.mail_add.region"
                    ></v-select>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="a_mail_prov"
                        label="Province"
                        id="a_mail_prov"
                        v-model="license.auth_officer.mail_add.province"
                    ></v-select>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="a_mail_city"
                        label="City"
                        id="a_mail_city"
                        v-model="license.auth_officer.mail_add.city"
                    ></v-select>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="a_mail_zip"
                        label="Zip Code"
                        id="a_mail_zip"
                        v-model="license.auth_officer.mail_add.zipcode"
                    ></v-select>                        
                </v-flex>
            </v-layout>
        </v-card-text>
    </div>
</template>

<script>
export default {
  props: {
    license: { required: true }
  },
  data() {
    return {
      regions: [],
      provinces: [],
      cities: [],
      designation: [
        "Company Pharmacist",
        "Pharmacy Assistant",
        "Production Manager/Head",
        "Quality Assurance Manager/Head"
      ],
      id_type: [
        "Professional Regulatory Commission",
        "Social Security System",
        "Government Service Insurance System (GSIS)",
        "Commission on Elections (Voter's)",
        "Land Transportation Office (Driver's)",
        "Philippine Passport",
        "Bureau of Immigration (Alien Registration)"
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("GET_ADDRESS_REFERENCE").then(results => {
        this.regions = results.regions;
        this.provinces = results.provinces;
        this.cities = results.cities;
      });
    }
  },
  computed: {
    province_filtered: function() {
      var filtered = [];
      if (this.license.addresses.office.region) {
        this.provinces.forEach(province => {
          if (province.region === this.license.addresses.office.region) {
            filtered.push(province);
          }
        });
      }
      console.log("FILTERED: " + JSON.stringify(filtered));
      return filtered;
    },
    cities_filtered: function() {
      var filtered = [];
      // this.license.addresses.office.city = null;
      if (this.license.addresses.office.province) {
        this.cities.forEach(city => {
          if (city.province === this.license.addresses.office.province) {
            filtered.push(city);
          }
        });
      }
      console.log("FILTERED_CITIES: " + JSON.stringify(filtered));
      return filtered;
    }
  }
};
</script>

<style>
</style>
