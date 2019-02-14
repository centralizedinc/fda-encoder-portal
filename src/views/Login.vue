<template>
  <v-layout align-center justify-center>
    <v-flex xs4 pa-2 mt-4>
      <v-card pa-5>
        <v-toolbar
        dark
          color="primary"
          style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
        >
          <span class="font-weight-light title">Login</span>
          <v-spacer></v-spacer>
          <!-- <v-btn flat color="white">REGISTER</v-btn> -->
        </v-toolbar>
        <v-divider></v-divider>
        <v-form class="mt-4 login" @submit.prevent="login">  
        <v-card-text>
          
                                
          <v-text-field 
          outline
            name="name" 
            label="Email/Username" 
            @keypress.enter="login" id="id"
            v-model="credentials.username"
            color="primary"></v-text-field>
          <v-text-field
          outline
            name="name"
            label="Enter your password"
            min="8"
            @keypress.enter="login"
            :append-icon="value ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            v-model="credentials.password"
            color="primary"
          ></v-text-field>
          
          <!-- <v-divider></v-divider> -->
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              outline 
              color="secondary" 
              class="caption font-weight-light"
              @click="signup()">Sign-up</v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              type="submit"
              class="caption font-weight-light">Login</v-btn>              
          </v-card-actions>  
          <v-divider></v-divider>    
          <v-btn 
            flat 
            block 
            color="primary" 
            class="caption font-weight-light"
            @click.native="dialog =true">Forgot Password?</v-btn>
            </v-form>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <span class="title font-weight-light">Forgot Password</span>
          <v-spacer></v-spacer>
          <v-btn flat icon @click.native="dialog=false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <span class="subheading font-weight-thin">Enter your email address to recover your account.</span>
          <v-text-field
          class="font-weight-thin"
          outline
          v-model="email"
            name="name"
            label="Email Address"
            id="id"
          ></v-text-field>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline color="secondary" class="caption font-weight-light" @click.native="dialog =false">Cancel</v-btn>
          <v-btn color="primary" class="caption font-weight-light" :loading="loading2" @click="forgot_password">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      credentials:{},
      loading:false,
      loading2:false,
      dialog:false,
      email:""
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store.dispatch('LOGIN', this.credentials)
        .then((res)=>{          
          this.loading = false;
          if(res.isMatch){
            console.log("RESULT: " + JSON.stringify(res))
            if(res.user.status === 2){
              this.$notify({message:'Welcome ' + res.user.username + "!", color:'success', icon:'error_outline'})
            }else{
              this.$notify({message:'Welcome ' + res.user.username + "! You have limited access since your account is not yet activated.", color:'warning', icon:'error_outline'})
            }
            this.$router.push("/app");                        
          }else{
            this.credentials.password = "";
            this.$notify({message:'Invalid User Credentials', color:'warning', icon:'error_outline'})
          }
          
        })
        .catch((err)=>{
          this.loading = false;
          this.$notify({message:'Oops! Something went wrong. Please try again.', color:'error', icon:'error_outline'})
        })
    },
    signup(){
      this.$router.push("/signup")
    },
    forgot_password(){
      this.loading2 = true;
      this.$store.dispatch('FORGOT_PASSWORD', this.email)
      .then(res=>{
        this.loading2 = false;
        this.dialog = false
        this.$notify({
        message:"We have received your request for account recovery. Please check your email ("+this.email+") in order to proceed.", color:"success"})
      })
      .catch(err=>{
        this.loading2 = false;
        this.dialog = false
        this.$notify({
        message:"Could not associate your email ("+this.email+ ") to any user account.", color:"error"})
      })
      
      
    }
  }
};
</script>

<style>
</style>
