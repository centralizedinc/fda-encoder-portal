<template>
    <div>
        <v-card-title primary-title>
                <span class="title font-weight-light">
                Authorized Officer                      
            </span>
            <v-spacer></v-spacer>
            <v-btn fab icon color="primary" disabled>
                <v-icon>edit</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        name="name"
                        label="Last Name"
                        id="id"
                    ></v-text-field>                            
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        name="name"
                        label="FirstName"
                        id="id"
                    ></v-text-field>                            
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        name="name"
                        label="Middle Name"
                        id="id"
                    ></v-text-field>                            
                </v-flex>
                    <v-flex xs12 md6 pa-1>
                    <v-select
                    outline
                        :items="items"
                        v-model="value"
                        label="Designation"
                    ></v-select>                         
                </v-flex>
                <v-flex xs12 md6 pa-1>
                    <v-text-field
                    outline
                        name="name"
                        label="Tax Identification Number (TIN)"
                        id="id"
                        mask="###-###-###-###"
                    ></v-text-field>                        
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-select
                        outline
                        :items="items"
                        v-model="value"
                        label="Id Type"
                    ></v-select>                       
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                        outline
                        name="name"
                        label="Id Number"
                        id="id"
                        mask="###-###-###-###"
                    ></v-text-field>                      
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                    outline
                        label="Expiry Date"
                        v-model="dateValue"
                        append-icon="event"                                
                        @click:append="dialogValue=true"

                    ></v-text-field>
                <v-dialog
                    ref="dialogRef"
                    persistent
                    v-model="dialogValue"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="date"
                >
                    
                    <v-date-picker v-model="dateValue" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dialogValue = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogRef.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
                </v-flex>
                <v-flex xs12 pa-1>
                    <v-textarea
                    outline
                        name="name"
                        label="Address"
                        id="id"
                    ></v-textarea>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="name"
                        label="Region"
                        id="id"
                    ></v-select>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="name"
                        label="Province"
                        id="id"
                    ></v-select>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="name"
                        label="City"
                        id="id"
                    ></v-select>                        
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                    outline
                        name="name"
                        label="Zip Code"
                        id="id"
                    ></v-select>                        
                </v-flex>
            </v-layout>
        </v-card-text>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
