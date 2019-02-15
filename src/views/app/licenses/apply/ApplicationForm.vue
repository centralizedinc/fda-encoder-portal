<template>
    <v-layout row wrap>
        <v-flex xs12 pa-3>                    
        <v-form>
            <v-card>
                <general-information></general-information>
                <establishment-information></establishment-information>
                <product-line></product-line>
                <office-address></office-address>
                <warehouse-address></warehouse-address>                
                <qualified-personnel></qualified-personnel>
                


                

                <v-card-title primary-title>
                     <span class="title font-weight-light">
                    Scanned Documents                     
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn small fab icon color="primary">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.calories }}</td>
                            <td class="text-xs-right">{{ props.item.fat }}</td>
                            <td class="text-xs-right">{{ props.item.carbs }}</td>
                            <td class="text-xs-right">{{ props.item.protein }}</td>
                            <td class="text-xs-right">{{ props.item.iron }}</td>                            
                            </template>                           
                        </v-data-table>
                </v-card-text>
                
                 
            </v-card>
        </v-form>
        </v-flex>
    <v-layout column class="fab-container">
      <v-tooltip top>
        <v-btn dark slot="activator" fab color="secondary" @click="dialog=true">
          <v-icon large>save</v-icon>
        </v-btn>Save
      </v-tooltip>
      <v-tooltip top>
        <v-btn dark slot="activator" fab color="primary" @click="dialog=true">
          <v-icon large>send</v-icon>
        </v-btn>Submit
      </v-tooltip>
      <!-- <v-speed-dial>
      <v-btn
        slot="activator"
        v-model="fab"
        color="primary"
        dark
        fab
      >
        <v-icon>menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial> -->
    </v-layout>
  </v-layout>
</template>

<script>
import GeneralInformation from './GeneralInformation'
import EstablishmentInformation from './EstablishmentInformation'
import ProductLine from './ProductLine'
import OfficeAddress from './OfficeAddress'
import WarehouseAddress from './WarehouseAddress'
import QualifiedPersonnel from './QualifiedPersonnel'

export default {
    components:{
        GeneralInformation,
        EstablishmentInformation,
        ProductLine,
        OfficeAddress,
        WarehouseAddress,
        QualifiedPersonnel
        },
    data(){
        return{
            fab:false,
            dialogValue:false,
            dateValue:null,
           headers:[
               { text: 'Product Type', value: 'type' },
                { text: 'Remarks', value: 'remarks' },
           ]
        }
    }

}
</script>

<style>

</style>
