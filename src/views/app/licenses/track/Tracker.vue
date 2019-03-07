<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-toolbar dark color="primary">
                   <span class="headline font-weight-thin">License Application Tracker</span>
                </v-toolbar>
                <v-card-text>
                    <v-form @submit.prevent="search">
                         <v-text-field                    
                                    outline
                                    name="case_no"
                                    label="Case Number"
                                    id="case_no"
                                    v-model="case_no"
                                    append-icon="search"
                                    @click:append="search"
                                ></v-text-field>
                        <!-- <v-layout row wrap>
                            <v-flex xs12 md10 pa-2>
                                <v-text-field                    
                                    outline
                                    name="case_no"
                                    label="Case Number"
                                    id="case_no"
                                    v-model="case_no"
                                    append-icon="search"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 pa-2>
                                <v-spacer></v-spacer>
                                <v-btn large
                                color="primary"
                                :loading="isLoading"
                                type="submit">Search</v-btn>
                            </v-flex>
                        </v-layout> -->
                        
                        
                    </v-form>
                
                
           
                </v-card-text>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="case_details.activities"
                    class="elevation-1"
                    :loading="isLoading"
                >
                     <template slot="items" slot-scope="props">
                        <td>{{ getTask(props.item.task_id) }}</td>
                        <td>{{ getActivityStatus(props.item.status) }}</td>
                        <td>
                            <v-menu offset-y>
                                <a @click="viewEncoder(props.item.assigned_user)" slot="activator">
                                {{ props.item.assigned_user }}
                                </a>
                                <v-card>
                                <v-card-text v-if="!isLoading">
                                    <p class="font-weight-thin">Username: {{user.username}}</p>
                                    <p class="font-weight-thin">First Name: {{user.first_name}}</p>
                                    <p class="font-weight-thin">Last Name: {{user.last_name}}</p>
                                    <p class="font-weight-thin">Email: {{user.email}}</p>
                                </v-card-text>
                                <v-card-text v-else>
                                    <v-layout align-center justify-center>
                                    <v-flex xs12>
                                        <v-progress-circular  color="primary" indeterminate></v-progress-circular>
                                    </v-flex>                      
                                    </v-layout>                    
                                </v-card-text>                  
                                </v-card>
                            </v-menu> 
                        </td>
                        <td>{{ formatDate(props.item.date_completed) }}</td>
                        <td>{{ props.item.remarks }}</td>
                    </template>
                    
                </v-data-table>
            </v-card-text>
             <!-- <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="search">Search</v-btn>
            </v-card-actions> -->
            </v-card>
            
        </v-flex>
        <fab-buttons></fab-buttons>
    </v-layout>
</template>

<script>
import FabButtons from "@/components/FabButtons"
export default {
    components:{
        FabButtons
    },
    data(){
        return{
            isLoading:false,
            case_no: '',
            user:{},
            case_details:{
                activities:[]
            },
            headers:[
                {text:'Task'},
                {text: 'Status'},
                {text: 'Processed By'},
                {text: 'Date Completed'},
                {text: 'Remarks'}
            ]
        }
    },
    methods:{
        search(){
            this.isLoading = true;
            this.$store.dispatch('FIND_CASE',this.case_no)
            .then(result=>{
                this.isLoading = false;
                if(result.data.success){
                    this.case_details = result.data.model;
                }else{
                    console.log(JSON.stringify(result.data))
                   this.$notifyError(result.data.errors) 
                }                
            })
            .catch(err=>{
                this.isLoading = false;
                console.log(err)
                this.$notifyError(err)
            })
        },
        viewEncoder(id){
            this.isLoading = true;
            this.$store.dispatch('FIND_ACCOUNT', id)
            .then(account=>{
                this.user = account.data.model;
                this.isLoading = false;
            })
            .catch(err=>{
                console.log(err)
                this.isLoading = true;
                this.$notifyError(err)
            })
        }
    }

}
</script>

<style>

</style>
