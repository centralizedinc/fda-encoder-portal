<template>
  <v-layout row wrap>
    <v-form @submit.prevent="submit">
      <v-flex xs12 pa-3>                          
            <v-card>
                <general-information :license="license"></general-information>
                <establishment-information :license="license"></establishment-information>
                <product-line :license="license"></product-line>
                <office-address :license="license"></office-address>
                <warehouse-address :license="license"></warehouse-address>  
                <authorized-officer :license="license"></authorized-officer>              
                <qualified-personnel :license="license"></qualified-personnel>
                <scanned-documents :license="license" @upload="upload"></scanned-documents> 
                <v-card-actions>
                  
                  <v-btn large color="primary">Save</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn large color="primary"  @click="submit()">Submit</v-btn>
                </v-card-actions>
            </v-card>      
      </v-flex>
       <fab-buttons :buttons="[{label:'submit', action:'submit', icon:'send'}]" @submit="submit"></fab-buttons>
    </v-form>   
  </v-layout>
</template>

<script>
import FabButtons from "@/components/FabButtons"
import GeneralInformation from "./GeneralInformation";
import EstablishmentInformation from "./EstablishmentInformation";
import ProductLine from "./ProductLine";
import OfficeAddress from "./OfficeAddress";
import WarehouseAddress from "./WarehouseAddress";
import AuthorizedOfficer from "./AuthorizedOfficer";
import QualifiedPersonnel from "./QualifiedPersonnel";
import ScannedDocuments from "./ScannedDocuments";

export default {
  components: {
    FabButtons,
    GeneralInformation,
    EstablishmentInformation,
    ProductLine,
    OfficeAddress,
    WarehouseAddress,
    AuthorizedOfficer,
    QualifiedPersonnel,
    ScannedDocuments
  },
  data() {
    return {
      formData:null,
      license:{
        general_info:{
          addtl_activity:[]
        },
        estab_details:{
          products:[]
        },
        addresses:{
          office:{},
          warehouse:[],
          plant:[]
        },
        auth_officer:{
          mail_add:{}
        },
        qualified_personnel:[]
      }
    };
  },
  created(){
    this.init();
  },
  methods: {
    init(){     
        this.license.application_type = '0'
        this.license.created_by= this.$store.state.user_session.user.username
        this.license.encoder= this.$store.state.user_session.user._id,
        this.license.encoder_group=this.$store.state.user_session.user.group?this.$store.state.user_session.user.group[0]:null
    },
    home(){
      this.$router.push('/app')
    },
    upload(formData){
      this.formData = formData;
    },
    submit() {
      this.$store.dispatch('SAVE_LICENSE', {initial:true, license:this.license, upload: this.formData})
      .then(result=>{
        if(result.success){
          this.$notify({message:'Sucess! CASE#: ' + result.model.case_details.case_no, color:'primary'})
          this.$store.commit('SET_LICENSE', result.model)
          this.$router.push('/app/payments');
        }else{
           this.$notifyError(result.errors)
        }
      })
      .catch(err=>{
        console.log('ERROR: '+ err)
        this.$notifyError(err)        
      })
    }
  }
};
</script>

<style>
</style>
