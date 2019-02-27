<template>
    <v-layout  justify-center>
        <v-flex xs5 pa-4 d-flex>
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="title font-weight-thin">User Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>                    
                    <v-text-field
                        outline
                        name="name"
                        label="Last Name"
                        id="id"
                        v-model="account.last_name"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="First Name"
                        id="id"
                        v-model="account.first_name"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Middle Name"
                        id="id"
                        v-model="account.middle_name"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Email"
                        id="id"
                        v-model="account.email"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Contact Number"
                        id="id"
                        v-model="account.lastname"
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs5 pa-4 d-flex>
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="title font-weight-thin">User Account</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-layout align-center justify-center pa-3>
                    <input
                            name="avatar"
                            type="file"
                            style="display: none"
                            ref="image"
                            @change="onFilePicked"
                            accept="image/*"
                        >
                        <!-- <v-btn icon slot="activator"> -->
                            <a @click="$refs.image.click()">
                        <v-avatar size="150">
                            <v-img :src="check_avatar(account.avatar.location)" alt="alt">
                                <v-layout
                                    slot="placeholder"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                            </v-img>
                        </v-avatar>
                            </a>
                        <!-- </v-btn> -->
                        <!-- <v-btn icon slot="activator">
                           <v-avatar
                                size="150"
                            >
                                <img src="http://i.pravatar.cc/200" alt="alt">
                            </v-avatar>
                        </v-btn> -->
                    
                    </v-layout>
                <v-card-text>
                    
                    <v-text-field
                        outline
                        name="name"
                        label="Username"
                        id="id"
                        v-model="account.username"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="New Password"
                        id="id"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Confirm Password"
                        id="id"
                        type="password"
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
      <v-layout column class="fab-container-bottom">
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
            account:{},
            avatar:null,
            formData:null
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.account = this.$store.state.user_session.user
        },
        onFilePicked(event){
            console.log(event.target.files[0])
            this.formData = new FormData();
            this.formData.append(event.target.name, event.target.files[0], event.target.files[0].name)
             this.account.avatar.location = URL.createObjectURL(event.target.files[0])
        },        
        save(){
            console.log('PROFILE: ' + JSON.stringify(this.account))
            this.$store.dispatch('UPDATE_ACCOUNT', {account:this.account, avatar:this.formData})
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
