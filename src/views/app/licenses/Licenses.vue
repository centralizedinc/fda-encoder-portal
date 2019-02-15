<template >
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>        
        <v-data-table :headers="headers" :items="licenses" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.licenses_no }}</td>
            <td>{{ getAppType(props.item.application_type) }}</td>
            <td>{{ getTask(props.item.current_task) ? getTask(props.item.current_task).name : '' }}</td>
            <td>{{ formatDate (props.item.date_created) }}</td>
            <td>{{ formatDate (props.item.date_variation) }}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="renewForm(props.item)"
                    >
                      <v-icon small>refresh</v-icon>
                    </v-btn>Renewal
                  </v-tooltip>
                </v-flex>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="variationForm(props.item)"
                    >
                      <v-icon small>edit</v-icon>
                    </v-btn>Variation
                  </v-tooltip>
                </v-flex>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="viewForm(props.item)">
                      <v-icon small>search</v-icon>
                    </v-btn>View Application
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>

    <v-layout column class="fab-container">
      <v-tooltip top>
        <v-btn slot="activator" fab color="fdaMed" @click="dialog=true">
          <v-icon large color="fdaSilver">add</v-icon>
        </v-btn>Create New
      </v-tooltip>
    </v-layout>
  </v-layout>
</template>

<script>
export default {  
  data() {
    return {
      dialog: false,
      dialogView: false,
      initial: false,
      renewal: false,
      // variation: false,
      form: {},
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "License No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Task", value: "current_task" },
        { text: "Application Date", value: "date_created" },
        { text: "Variation Date", value: "date_variation" },
        { text: "Actions", value: "" }
      ],
      licenses: [],
      tasks: []
    };
  },
  created() {
    console.log("WELCOME!!!!!!!!!!!!!");
    this.init();
  },
  methods: {
    init() {
      
      this.$store.dispatch("GET_LICENSES");
      var licenseData = this.$store.state.licenses.licenses;
      // this.licenses = this.$store.state.licenses.licenses;
      licenseData.forEach(element => {
        // var app_type = null;
        // if(element.application_type === "I"){
        //   app_type = "Initial"
        // } else if(element.application_type === "V"){
        //   app_type = "Variation"
        // } else if(element.application_type === "R"){
        //   app_type = "Renewal"
        // }
        // var data = {
        //   case_no: element.case_no,
        //   licenses_no: element.auto_id,
        //   application_type: app_type,
        //   current_task: element.current_task,
        //   date_created: element.date_created,
        //   date_variation: element.date_variation
        // }
        // this.licensesData.push(data);
        this.licenses.push(element);
      });
      // this.$store.dispatch("GET_TASKS").then(result =>{
      //   this.tasks = this.$store.state.tasks.tasks;
      // console.log("tasks data: " + JSON.stringify(this.tasks))
      // })
      
      console.log("####################License data: " + JSON.stringify(this.licenses))
    },
    viewForm(item) {
      console.log("$$$$$$$$$$$$$$$$$ view data: " + JSON.stringify(item));
      this.loadForm(item);
      // this.$store.commit("SET_FORM", item)
      this.$router.push("/app/licenses/view");
    },
    renewForm(item) {
      item.application_type = 2
      console.log("renew data: " + JSON.stringify(item.application_type));
      this.loadForm(item);
      // this.$store.commit("SET_FORM", item)
    },
    variationForm(item) {
      item.application_type = 1;
      console.log("variation data: " + JSON.stringify(item.application_type));
      this.loadForm(item);
      this.dialog = true;

      // this.$store.commit("SET_FORM", item)
    },
    loadForm(form) {
      // console.log("loadform data case number: " + case_no);
      // var index = this.licenses.findIndex(x => {
      //   return x.case_no === case_no;
      // })

      // this.$store.commit("SET_FORM", this.licenses[index])
      this.$store.commit("SET_FORM", form);
    },
    launchAppForm() {
      this.$router.push("/app/licenses/apply");
    }
  }
};
</script>

<style>
</style>
