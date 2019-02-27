<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">
            Product Line 
            </span>
            <!-- <v-spacer></v-spacer> -->
            <v-btn small icon color="primary" @click="addItem()">
                <v-icon>add</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="license.estab_details.products"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td>                    
                    <v-select
                    outline
                        :items="items"
                        v-model="value"
                        label="Product Type"
                    ></v-select>
                </td>
                <td>
                    
                    <v-select
                    outline
                        :items="items"
                        v-model="value"
                        label="Product Line"
                    ></v-select>
                </td>
                <td>
                    <v-textarea
                    rows="2"
                        outline
                        label="Remarks"
                        v-model="props.item.remarks"
                    ></v-textarea>
                </td>
                <td>
                    <v-btn flat icon color="error" @click="removeItem(props.item)">
                        <v-icon>close</v-icon>
                    </v-btn>
                    </td>                          
                </template>                           
            </v-data-table>                        
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
            headers:[
               { text: 'Product Type', value: 'type' },
               { text: 'Product Line', value: 'type' },
                { text: 'Remarks', value: 'remarks' },
                { text: 'Remove', value: 'remove' },
           ],
           product_types:[]
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){

        },
        addItem(){
            this.license.estab_details.products.push({prod_line:'', remarks:''})
        },
        removeItem(item){            
            const index = this.license.estab_details.products.indexOf(item)
            this.license.estab_details.products.splice(index, 1)
        }
    }
}
</script>

<style>

</style>
