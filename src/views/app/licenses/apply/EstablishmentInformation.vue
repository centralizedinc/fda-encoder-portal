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
                            class="caption font-weight-thin"
                            outline
                            name="name"
                            label="Name of Establishment"
                            id="id"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field
                        outline
                            name="name"
                            label="Business Tax Identification Number (TIN)"
                            id="id"
                            mask="###-###-###-###"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-text-field 
                        outline
                        name="name"
                        label="Establishment Owner"
                        id="id"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                            name="name"
                            label="Email Address"
                            id="id"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                    outline
                        name="name"
                        label="Landline"
                        id="id"
                        mask="(##) ###-####"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                            name="name"
                            label="Mobile"
                            id="id"
                            mask="(####) ### ####"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                        name="name"
                        label="Fax"
                        id="id"
                        mask="(##) ###-####"
                    ></v-text-field>
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
