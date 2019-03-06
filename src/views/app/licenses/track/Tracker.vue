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
                >
                     <template slot="items" slot-scope="props">
                        <td>{{ props.item.task_id }}</td>
                        <td>{{ props.item.status }}</td>
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
    </v-layout>
</template>

<script>
export default {
    data(){
        return{
            isLoading:false,
            case_no: '',
            case_details:{
                activities:[]
            },
            headers:[
                {text:'Task'},
                {text: 'Status'},
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
                    console.log('CASE:' + JSON.stringify(this.case_details))
                }else{
                   this.$notifyError(result.data.errors) 
                }                
            })
            .catch(err=>{
                this.isLoading = false;
                console.log(err)
                this.$notifyError(err)
            })
        },
    }

}
</script>

<style>

</style>
