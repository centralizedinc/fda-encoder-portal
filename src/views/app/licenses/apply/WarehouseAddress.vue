<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">
            Warehouse Address 
            </span>
            <!-- <v-spacer></v-spacer> -->
             <v-btn small icon color="primary" @click.native="addItem()">
                <v-icon>add</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="license.addresses.warehouse"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.address }}</td>
                <td>{{ getRegionName(props.item.region) }}</td>
                <td>{{ getProvinceName(props.item.province) }}</td>
                <td>{{ getCityName(props.item.city) }}</td>
                <td>
                   <v-btn flat icon color="error" @click="removeItem(props.item)">
                       <v-icon>close</v-icon>
                   </v-btn> 
                </td>                           
                </template>                           
            </v-data-table>                        
        </v-card-text>
        <v-dialog
            v-model="dialog"
            persistent
            transition="dialog-transition"
        >
        <v-card>
            <v-toolbar dark color="primary">
                <span class="title font-weight-light">Add Warehouse</span>
                <v-spacer></v-spacer>
                <v-btn flat icon color="white" @click="dialog=false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-form>
                 <v-card-text>
                     <v-textarea
                        rows="3"
                        outline
                        name="office_add"
                        label="Address"
                        id="office_add"
                        v-model="address.address"
                        :rules="[requiredRule]"
                    ></v-textarea>
                    <v-layout row wrap>
                        <v-flex xs12 md3 pa-2>
                            <v-select
                                outline
                                item-text="name"
                                item-value="_id"
                                :items="regions"
                                v-model="address.region"
                                label="Region"
                                :rules="[requiredRule]"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            <v-select
                                outline                        
                                item-text="name"
                                item-value="_id"
                                :items="province_filtered"
                                v-model="address.province"
                                label="Province"
                                :rules="[requiredRule]"
                            ></v-select>
                        </v-flex>
                         <v-flex xs12 md3 pa-2>
                            <v-select
                                outline
                                item-text="name"
                                item-value="_id"
                                :items="cities_filtered"
                                v-model="address.city"
                                label="City"
                                :rules="[requiredRule]"
                            ></v-select>
                        </v-flex>
                         <v-flex xs12 md3 pa-2>
                            <v-text-field
                                outline
                                name="office_zipcode"
                                v-model="address.zipcode"
                                label="Zip Code"
                                id="office_zipcode"
                                :rules="[requiredRule]"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outline color="secondary" @click="dialog=false">Cancel</v-btn>
                    <v-btn color="primary" @click="save()">Save</v-btn>
                </v-card-actions>
            </v-form>
           
        </v-card>
            
        </v-dialog>
    </div>
</template>

<script>
export default {
    props:{
        license:{require:false},
        
    },
    data(){
        return{
            headers:[
               { text: 'Address', value: 'type' },
               { text: 'Region', value: 'type' },
               { text: 'Province', value: 'type' },
               { text: 'City', value: 'type' },
                { text: 'Remove', value: 'remarks' },
           ],
            dialog:false,
            address:{},
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
                console.log('RESULTS: ' + JSON.stringify(results))
                this.regions = results.regions
                this.provinces = results.provinces
                this.cities = results.cities
            })
        },
        addItem(){
            this.address = {}
            this.dialog = true;
        },
        removeItem(item){
            const index = this.license.addresses.warehouse.indexOf(item)
            this.license.addresses.warehouse.splice(index, 1)
        },
        save(){
            var item = JSON.parse(JSON.stringify(this.address))
            this.license.addresses.warehouse.push(item);
            this.dialog=false;
        }
    },
    computed:{
        province_filtered(){
            var filtered=[];
            if(this.address.region){
                console.log("PROVINCES: " + JSON.stringify(this.provinces))
                this.provinces.forEach(province=>{
                    if(province.region === this.address.region){
                        filtered.push(province)
                    }                
                })
            }
            console.log('FILTERED'+ JSON.stringify(filtered))
            return filtered;
        },
        cities_filtered(){
            var filtered=[];
            if(this.address.province){
                this.cities.forEach(city=>{
                    if(city.province === this.address.province){
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
