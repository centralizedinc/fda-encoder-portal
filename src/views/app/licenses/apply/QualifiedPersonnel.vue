<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">
                Qualified Personnel                      
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
                    :items="license.qualified_personnel"
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.lastname }}</td>
                    <td>{{ props.item.firstname }}</td>
                    <td>{{ props.item.middlename }}</td>
                    <td>{{ props.item.designation }}</td>
                    <!-- <td>{{ props.item.birthday }}</td> -->
                    
                    <td>{{ props.item.tin }}</td>  
                    <td>{{ props.item.email }}</td> 
                    <!-- <td>{{ props.item.id_type }}</td>                            
                    <td>{{ props.item.id_no }}</td>   
                    <td>{{ props.item.id_expiry }}</td>    -->
                    <td>
                        <v-btn flat icon color="error" @click="removeItem(props.item)">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </td>
                    </template>                           
                </v-data-table>
        </v-card-text>
        <v-dialog v-model="dialog">
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="title font-weight-light">Add Personnel</span>
                    <v-spacer></v-spacer>
                    <v-btn dark flat icon  @click="dialog=false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-form>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 md4 pa-1>
                                <v-text-field
                                    outline
                                    name="q_lname"
                                    label="Last Name"
                                    id="q_lname"
                                    v-model="personnel.lastname"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4 pa-1>
                                <v-text-field
                                    outline
                                    name="q_fname"
                                    label="First Name"
                                    id="q_fname"
                                    v-model="personnel.firstname"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4 pa-1>
                                <v-text-field
                                    outline
                                    name="q_mname"
                                    label="Middle Name"
                                    id="q_mname"
                                    v-model="personnel.middlename"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md3 pa-1>
                                <v-select
                                    outline
                                    :items="designation"
                                    v-model="personnel.designation"
                                    label="Designation"
                                    
                                ></v-select>                            
                            </v-flex>
                            <v-flex xs12 md3 pa-1>
                                <v-text-field
                                    outline
                                    name="q_tin"
                                    label="TIN"
                                    id="q_TIN"
                                    mask="###-###-###-###"
                                    v-model="personnel.tin"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md3 pa-1>
                                <v-text-field
                                    outline
                                    name="q_email"
                                    label="Email"
                                    id="q_email"
                                    v-model="personnel.email"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md3 pa-1>
                                <v-text-field
                                    outline
                                    name="q_bday"
                                    label="Birthday"
                                    id="q_bday"
                                    append-icon="event"
                                    v-model="personnel.birthday"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4 pa-1>
                                <v-select
                                    outline
                                    :items="id_type"
                                    v-model="personnel.id_type"
                                    label="Government Issued Id"
                                    
                                ></v-select> 
                            </v-flex>
                            <v-flex xs12 md4 pa-1>
                                 <v-text-field
                                    outline
                                    name="id_no"
                                    label="Id Number"
                                    id="id_no"
                                    v-model="personnel.id_no"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4 pa-1>
                                <v-text-field
                                    outline
                                    name="q_exp"
                                    label="Expiry"
                                    id="q_exp"
                                    append-icon="event"
                                    v-model="personnel.id_expiry"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn outline color="primary" @click="dialog=false">Cancel</v-btn>
                        <v-btn color="primary" @click="save()">Add</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
            
        </v-dialog>
    </div>
</template>

<script>
export default {
  props: {
    license: { required: true }
  },
  data() {
    return {
      headers: [
        { text: "Last Name", value: "type" },
        { text: "First Name", value: "type" },
        { text: "Middle Name", value: "type" },
        { text: "Designation", value: "type" },
        { text: "TIN", value: "type" },
        { text: "Email", value: "type" },
        //    { text: 'ID Type', value: 'type' },
        //    { text: 'ID Number', value: 'type' },
        //    { text: 'Expiry', value: 'type' },
        { text: "Remove", value: "remarks" }
      ],
      personnel: {},
      dialog: false,
      designation: [
        "Company Pharmacist",
        "Pharmacy Assistant",
        "Production Manager/Head",
        "Quality Assurance Manager/Head"
      ],
      id_type: [
        "Professional Regulatory Commission",
        "Social Security System",
        "Government Service Insurance System (GSIS)",
        "Commission on Elections (Voter's)",
        "Land Transportation Office (Driver's)",
        "Philippine Passport",
        "Bureau of Immigration (Alien Registration)"
      ]
    };
  },
  methods: {
    addItem() {
      this.personnel = {};
      this.dialog = true;
    },
    removeItem(item) {
      const index = this.license.qualified_personnel.indexOf(item);
      this.license.qualified_personnel.splice(index, 1);
    },
    save() {
      var item = JSON.parse(JSON.stringify(this.personnel));
      this.license.qualified_personnel.push(item);
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
