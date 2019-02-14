<template>
  <v-layout align-center justify-center>
    <v-flex xs8 pa-3>
      <v-card>
        <!-- <v-card-title primary-title>
          Change Password
        </v-card-title> -->
        <v-toolbar dark color="primary">
          <span class="title font-weight-light">Change Password</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text transparent>
          <v-layout align-center justify-center>
            <v-flex xs8>                                    
          <v-text-field
          outline
            :append-icon="old_password ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="old_password ? 'text' : 'password'"
            name="input-10-2"
            label="Enter your Old Password"
            @click:append="old_password = !old_password"
            v-model="account.password"
          ></v-text-field>
          <v-text-field
          outline
            :append-icon="new_password ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="new_password ? 'text' : 'password'"
            label="Enter your New Password"
            hint="At least 8 characters"
            @click:append="new_password = !new_password"
            v-model="account.new_password"
          ></v-text-field>
          <v-text-field
          outline
            :append-icon="confirm_password ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.confirm_password]"
            :type="confirm_password ? 'text' : 'password'"
            label="Confirm Password"
            @click:append="confirm_password = !confirm_password"
            v-model="confirm"
          ></v-text-field>
          </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn     
            color="primary"
            class="font-weight-light"
            @click="submit()"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >Confirmation</v-card-title>
          <v-divider></v-divider>
          <v-card-text>Please enter your registered email address. Access the link in your mail to login with your new password.</v-card-text>
          <v-flex xs12 pa-2>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              prepend-icon="email"
              label="Enter your email address"
            ></v-text-field>
          </v-flex>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn block color="success" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      account:{},
      confirm:'',
      old_password: false,
      new_password: false,
      confirm_password: false,
      dialog: false,
      email: "",
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        confirm_password: value => value===this.account.new_password ||
          "The new password and confirm password you entered doesn't match",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      this.account = this.$store.state.user_session.user
    },
    submit() {
      // this.$router.push("/");
      this.$store.dispatch('CHANGE_PASSWORD', this.account)
      .then(result=>{
        this.$notify({message:'Password updated.' , color:'primary'})
        this.$store.dispatch('LOGOUT')
        this.$router.push('/')
      })
      .catch(err=>{
        console.log(err)
        this.$notifyError(err)
      })
    }
  }
};
</script>

<style>
</style>
