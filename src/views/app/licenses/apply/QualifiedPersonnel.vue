<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">
                Qualified Personnel                      
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
    </div>
</template>

<script>
export default {
    data(){
        return{
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
