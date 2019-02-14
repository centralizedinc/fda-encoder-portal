<template>
    <v-layout row wrap>
        
        <v-flex xs12 md4 pa-2>
            <v-card>
                <!-- <v-card-title primary-title>
                    Company
                </v-card-title> -->
                <v-toolbar dark color="primary">
                    <span class="title font-weight-thin">Company Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field
                        name="name"
                        label="Name of Establishment"
                        v-model="account.company.name"
                        :disabled="true"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Establishment Owner"
                        v-model="account.company.owner"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="TIN"
                        v-model="account.company.tin"
                        id="id"
                        mask="###-###-###-###"
                    ></v-text-field>
                    <v-textarea
                        name="name"
                        label="Office Address"
                        v-model="account.company.address.address"
                        id="id"
                    ></v-textarea>
                    <v-select
                        :items="items"
                        v-model="account.company.address.region"
                        label="Region"
                    ></v-select>
                     <v-select
                        :items="items"
                        v-model="account.company.address.province"
                        label="Province"
                    ></v-select>
                     <v-select
                        :items="items"
                        v-model="account.company.address.city"
                        label="City/Town"
                    ></v-select>
                    <v-text-field
                        name="name"
                        label="Zip code"
                        v-model="account.company.address.zipCode"
                        id="id"
                    ></v-text-field>
                </v-card-text>
            </v-card>            
        </v-flex>

        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="title font-weight-thin">User Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field
                        name="name"
                        label="Last Name"
                        v-model="account.name.last"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="First Name"
                        v-model="account.name.first"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Middle Name"
                        v-model="account.name.middle"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="TIN"
                        v-model="account.tin"
                        id="id"
                        mask="###-###-###-###"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Email Address"
                        v-model="account.email"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Phone Number"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Mobile Number"
                        id="id"
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="title font-weight-thin">User Account</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout align-center justify-center>
                    <v-avatar
                        size="100"
                    >
                        <img src="http://i.pravatar.cc/200" alt="alt">
                    </v-avatar>
                    </v-layout>
                    <v-text-field
                        name="name"
                        label="Username"
                        id="id"
                        v-model="account.username"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Password"
                        id="id"
                        type="password"
                        :disabled="true"
                        value="12345678"
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <!-- <v-spacer></v-spacer>
        <v-btn style="bottom: 40px"
        color="blue darken-2"
        dark
        fab
        bottom
        right
        absolute
      >
        <v-icon>save</v-icon>
      </v-btn> -->
      <v-layout column class="fab-container">
          <v-tooltip top>
              <v-btn slot="activator" fab color="primary" @click="save()">
                <v-icon>save</v-icon>
            </v-btn>
            Save Changes
          </v-tooltip>
      
    </v-layout>
    </v-layout>
</template>

<script>
export default {
    data(){
        return{
            account:{}
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.account = this.$store.state.user_session.user
        },
        save(){
            this.$store.dispatch('UPDATE_ACCOUNT', this.account)
            .then(result=>{
                this.$notify({message:'Your account has been updated!', color: 'primary'})
                // this.$store.dispatch('LOGOUT')
                // this.$router.push('/')
            })
            .catch(error=>{
                 this.$notifyError(error)
            })
        }
    }

}
</script>

<style>

</style>
