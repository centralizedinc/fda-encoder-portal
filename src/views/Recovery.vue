<template>
    <v-layout row wrap v-if="success_confirm">        
         <v-flex xs12 pa-1>
            <span class="display-2 font-weight-bold">Hi {{account.username }}! </span>                         
        </v-flex>
        <v-flex xs12 pa-1>
        <span class="headline font-weight-thin">Forgot your password? Dont worry, we'll get you a new one.</span>         
        </v-flex>
        <v-flex xs12 pa-4>
            <v-layout align-center justify-center>
                <v-flex xs6>                                    
            <v-form @submit.prevent="changePassword()">
                <v-card>
                    <v-toolbar dark color="primary">
                        <span class="title font-weight-light">New Password</span>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                        outline
                            name="name"
                            label="Enter your new password"
                            :append-icon="value ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                            v-model="account.password"
                        ></v-text-field>
                        <v-text-field
                        outline
                            name="name"
                            label="Confirm your password"
                            :append-icon="value2 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (value2 = !value2)"
                            :type="value2 ? 'password' : 'text'"
                            v-model="confirm"
                        ></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" :loader="loading">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
            </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
        <v-flex xs12 pa-4>
            <span class="display-2 font-weight-bold">Sorry! </span>                         
        </v-flex>
        <v-flex xs12 pa-4>
        <span class="headline font-weight-thin">We cannot proceed in recovering your account this time. It's seems that the confirmation email is already expired.</span>                       
        </v-flex>
         <v-flex xs12 pa-4>
        <v-btn class="font-weight-light" color="primary" @click="home()">Home</v-btn>
        </v-flex>       
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            dialog:false,
            success_confirm: true,
            account_name:"",
            email:"",
            account:"",
            value:true,
            value2:true,
            confirm:'',
            loading:false,
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.$store.dispatch('LOGOUT')
            this.$store.dispatch('CONFIRM_ACCOUNT_RECOVERY', this.$route.query.key)
            .then(result=>{
                this.account = result;
                this.success_confirm = true;
            })
            .catch(err=>{
                this.success_confirm = false;
            })
        },
        home(){
            this.$router.push("/")
        },
        changePassword(){
            this.loading = true;
            this.$store.dispatch('CHANGE_PASSWORD', this.account)
            .then(result=>{
                console.log("RESULT: " + JSON.stringify(result))
                this.loading = false;
                this.$notify({message: 'You have successfully changed your password!' , color:'primary'})
                this.$router.push("/")
            })
            .catch(error=>{
                this.loading = false;
                console.log("ERROR: " + JSON.stringify(error))
                this.$notify({message: 'Error' , color:'error'})
            })
            
        }

    }
}
</script>

<style>

</style>
