<template>
    <v-layout row wrap>
        <v-flex xs12 p1-2>
           <v-card>
                <v-data-table
                    :headers="headers"
                    :items="payment"
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.case_no }}</td>
                    <td>{{ props.item.case_no }}</td>
                    <td>{{ props.item.application_type }}</td>
                    <td>{{ props.item.current_task }}</td>
                    <td>{{ props.item.date_created }}</td>
                    <td>{{ props.item.date_variation }}</td>
                    <td>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-btn flat icon color="primary" @click="pay">
                                    <v-icon small>payment</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </td>
                    </template>
                </v-data-table>
           </v-card>
        </v-flex>
        
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Case No', value: 'case_no'},
          { text: 'License No', value: 'case_no' },
          { text: 'Type', value: 'application_type' },
          { text: 'Task', value: 'current_task' },
          { text: 'Application Date', value: 'date_created' },
          { text: 'Variation Date', value: 'date_variation' },
          { text: 'Actions', value: '' }
        ],
        payment: [{    
        case_no: "00",
        application_type: "sample application",
        current_task: "sample task",
        date_created: "01/01/2019",
        date_variation: "01/01/2019"    
    }]
      }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$store.dispatch('SET_LICENSES');
        },
        pay(){
            this.$router.push('/app/payments/summary')
        }
    }
  }
</script>

<style>

</style>
