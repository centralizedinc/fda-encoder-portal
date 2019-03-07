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
                        id="lname"
                        v-model="account.last_name"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="First Name"
                        id="fname"
                        v-model="account.first_name"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Middle Name"
                        id="mname"
                        v-model="account.middle_name"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Group"
                        id="group"
                        v-model="account.group"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Role"
                        id="role"
                        v-model="account.role"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Email"
                        id="email"
                        v-model="account.email"
                    ></v-text-field>
                    <!-- <v-text-field
                        outline
                        name="name"
                        label="Contact Number"
                        id="contact"
                        v-model="account.contactNumber"
                    ></v-text-field> -->
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
                    
                    </v-layout>
                <v-card-text>
                    
                    <v-text-field
                        outline
                        name="name"
                        label="Username"
                        id="username"
                        v-model="account.username"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="New Password"
                        id="new-password"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        outline
                        name="name"
                        label="Confirm Password"
                        id="confirm-password"
                        type="password"
                    ></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <fab-buttons 
            :buttons="[{label:'save', action:'action', icon:'save'}]"
            @save="save"></fab-buttons>
    </v-layout>
</template>

<script>
import FabButtons from '@/components/FabButtons'
export default {
    components:{
        FabButtons
    },
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
