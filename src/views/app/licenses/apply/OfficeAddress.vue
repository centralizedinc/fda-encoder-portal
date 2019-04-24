<template>
    <div>
        <v-card-title primary-title>
            <span class="headline font-weight-light primary--text">Office Address</span>
        </v-card-title> 
        <v-divider></v-divider>
        <v-card-text>
            <v-form >
                
            </v-form>
            <v-layout row wrap>
                <v-flex xs12 pa-1>
                    <v-textarea
                        rows="3"
                        outline
                        name="office_add"
                        label="Address"
                        id="office_add"
                        v-model="license.addresses.office.address"
                        :rules="[requiredRule]"
                    ></v-textarea>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        item-text="name"
                        item-value="_id"
                        :items="regions"
                        v-model="license.addresses.office.region"
                        label="Region"
                        :rules="[requiredRule]"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        item-text="name"
                        item-value="_id"
                        :items="province_filtered"
                        v-model="license.addresses.office.province"
                        label="Province"
                        :rules="[requiredRule]"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        item-text="name"
                        item-value="_id"
                        :items="cities_filtered"
                        v-model="license.addresses.office.city"
                        label="City"
                        :rules="[requiredRule]"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                        name="office_zipcode"
                        v-model="license.addresses.office.zipcode"
                        label="Zip Code"
                        id="office_zipcode"
                        :rules="[requiredRule]"
                    ></v-text-field>
                </v-flex>                                        
            </v-layout>
        </v-card-text>
    </div>
</template>

<script>
export default {
    props:{
        license:{required:true}
    },
    data(){
        return {
            regions:[],
            provinces:[],
            cities:[]
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.$store.dispatch('GET_ADDRESS_REFERENCE')
            .then(results =>{
                this.regions = results.regions
                this.provinces = results.provinces
                this.cities = results.cities
            })
        }
    },
    computed:{
        province_filtered:function(){
            var filtered=[];
            // this.license.addresses.office.province = null;
            if(this.license.addresses.office.region){
                this.provinces.forEach(province=>{
                    if(province.region === this.license.addresses.office.region){
                        filtered.push(province)
                    }                
                })
            }
            return filtered;
        },
        cities_filtered:function(){
            var filtered=[];
            // this.license.addresses.office.city = null;
            if(this.license.addresses.office.province){
                this.cities.forEach(city=>{
                    if(city.province === this.license.addresses.office.province){
                        filtered.push(city)
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
