<template>
    <div>
        <v-card-title primary-title>
            <span class="headline font-weight-light primary--text">General Information</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text> 
            <v-form ref="form" v-model="valid">                                       
            <v-layout row wrap>
                <v-flex xs12 md3 pa-1>
                    <v-select 
                        disabled
                        outline
                        :items="application_type"
                        item-text="label"
                        item-value="value"
                        v-model="license.application_type"
                        label="Type of Application"
                        :rules="[requiredRule]"
                    ></v-select>
                </v-flex>                        
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        item-text="name"
                        item-value="_id"
                        :items="product_types"
                        label="Product Type"
                        v-model="license.general_info.product_type"
                        :rules="[requiredRule]"
            ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    :disabled="filtered_primary.length === 0"
                        outline
                        item-text="name"
                        item-value="_id"
                        :items="filtered_primary"
                        label="Primary Activity"
                        v-model="license.general_info.primary_activity"
                        :rules="[requiredRule]"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    :disabled="filtered_declared.length === 0"
                        item-text="name"
                        item-value="_id"
                        outline
                        :items="filtered_declared"
                        label="Declared Capital"
                        v-model="license.general_info.declared_capital"                        
                    ></v-select>
                </v-flex>
            </v-layout>                                    
            <v-list column v-if="filtered_additional.length >0">
                <v-subheader>Supplemental Activies (Check all possible)</v-subheader>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex v-for="act in filtered_additional" :key="act.name">
                        <v-checkbox color="primary" v-model="license.general_info.addtl_activity" small class="caption" :label="act.name" :value="act._id"></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-list> 
            </v-form>           
        </v-card-text>
    </div>
</template>

<script>
export default {
    props:{
        license:{required: true}
    },
    data(){
        return{
            valid:"true",
            application_type:[
                {label:'Initial', value:'0'},
                {label:'Variation', value:'1'},
                {label:'Renewal', value:'2'},
                
            ],
            product_types:[],
            primary_activities:[],
            declared_capitals:[],
            additional_activities:[]
        }
    },
    created(){
        this.$store.dispatch('GET_ALL_PRODUCT_REFERENCE')
        .then(reference=>{
            this.product_types = reference.products
            this.primary_activities = reference.primary
            this.declared_capitals = reference.declared
            this.additional_activities = reference.additional
            
        })
    },
    methods:{
        validateForm(){
            this.$refs.form.validate()
        }
    },
    computed:{
        filtered_primary(){
            var filtered=[];
            var primary = [];
            if(this.license.general_info.product_type){
                for(var i=0; i<this.product_types.length; i++ ){
                    if (this.product_types[i]._id ===this.license.general_info.product_type){
                        primary = this.product_types[i].primary_activity
                        break;
                    }
                }
                //find list
                primary.forEach(prim=>{
                    for(var i=0; i<this.primary_activities.length; i++ ){
                        if(this.primary_activities[i]._id === prim){
                            filtered.push(this.primary_activities[i])
                            break;
                        }
                    }
                })
            }
            return filtered;
        },

        filtered_additional(){
            var filtered=[];
            var add = [];
            if(this.license.general_info.primary_activity){
                for(var i=0; i<this.primary_activities.length; i++ ){
                    if (this.primary_activities[i]._id ===this.license.general_info.primary_activity){
                        add = this.primary_activities[i].additional_activities
                        break;
                    }
                }
                //find list
                add.forEach(rec=>{
                    for(var i=0; i<this.additional_activities.length; i++ ){
                        if(this.additional_activities[i]._id === rec){
                            filtered.push(this.additional_activities[i])
                            break;
                        }
                    }
                })
            }
            return filtered;
        },

        filtered_declared(){
            var filtered=[];
            var dec = [];
            if(this.license.general_info.primary_activity){
                for(var i=0; i<this.primary_activities.length; i++ ){
                    if (this.primary_activities[i]._id ===this.license.general_info.primary_activity){
                        dec = this.primary_activities[i].declared_capital
                        break;
                    }
                }
                //find list
                dec.forEach(rec=>{
                    for(var i=0; i<this.declared_capitals.length; i++ ){
                        if(this.declared_capitals[i]._id === rec){
                            filtered.push(this.declared_capitals[i])
                            break;
                        }
                    }
                })
            }
            return filtered;
        }
    }
    


}
</script>

<style>

</style>
