<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">
                Establishment Information
            </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                            outline
                            name="est_name"
                            label="Name of Establishment"
                            id="est_name"
                            v-model="license.estab_details.establishment_name"
                            :rules="[requiredRule]"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                        outline
                            name="est_tin"
                            label="Business Tax Identification Number (TIN)"
                            id="est_tin"
                            v-model="license.estab_details.tin"
                            mask="###-###-###-###"
                            :rules="[requiredRule]"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field 
                        outline
                        name="est_owner"
                        label="Establishment Owner"
                        id="est_owner"
                        v-model="license.estab_details.establishment_owner"
                        :rules="[requiredRule]"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                            name="est_email"
                            label="Email Address"
                            id="est_email"
                            v-model="license.estab_details.email"
                            :rules="[requiredRule, emailRule]"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                    outline
                        name="est_landline"
                        label="Landline"
                        id="est_landline"
                        v-model="license.estab_details.landline"
                        :rules="[requiredRule]"
                        mask="(##) ###-####"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                            name="est_mobile"
                            label="Mobile"
                            id="est_mobile"
                            v-model="license.estab_details.mobile"
                            mask="(####) ### ####"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                        name="est_fax"
                        label="Fax"
                        id="est_fax"
                        v-model="license.estab_details.fax"
                        mask="(##) ###-####"
                    ></v-text-field>
                </v-flex>                            
            </v-layout>   
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
            //############ rules ###############

        }
    }

}
</script>

<style>

</style>
