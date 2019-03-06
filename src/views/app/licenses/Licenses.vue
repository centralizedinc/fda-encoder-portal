<template >
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>        
        <v-data-table :headers="headers" :items="licenses" class="elevation-1" :loading="isLoading">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.case_no }}</td>
            <td>{{ getAppType(props.item.application_type) }}</td>
            <td>{{ getTask(props.item.current_task)}}</td>
            <td>{{ formatDate (props.item.date_created) }}</td>
            <td>
              <v-menu offset-y>
                <a @click="viewEncoder(props.item.encoder)" slot="activator">
                  {{ props.item.encoder }}
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
            <td>
              <v-btn flat icon color="primary">
                <v-icon>search</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <fab-buttons></fab-buttons>
  </v-layout>
</template>

<script>
import FabButtons from "@/components/FabButtons"

export default {  
  components: {
    FabButtons
  },
  data() {
    return {
      isLoading:false,
      user:{},
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "Application Type", value: "application_type" },
        { text: "Current Task", value: "current_task" },
        { text: "Application Date", value: "date_created" },
        { text: "Encoded By", value: "encoder" },
        { text: "Actions", value: "" }
      ],
      licenses: []
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isLoading = true;
      this.$store.dispatch('GET_TASKS')
      .then(tasks=>{
          return this.$store.dispatch('FIND_ENCODED_CASE', {
                encoder_group:this.$store.state.user_session.user.group[0],
                application_type: this.$route.params.app_type})
      })      
      .then(_cases=>{
        this.isLoading = false;
        this.licenses = _cases.data.model;
      })
      .catch(err=>{
        this.isLoading = false;
        console.log(err)
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
};
</script>

<style>
</style>
