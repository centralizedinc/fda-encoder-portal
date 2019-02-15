<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">Office Address</span>
        </v-card-title> 
        <v-divider></v-divider>
        <v-card-text>
            <v-layout row wrap>
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
                        :items="items"
                        v-model="value"
                        label="Region"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        :items="items"
                        v-model="value"
                        label="Province"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-select
                        outline
                        :items="items"
                        v-model="value"
                        label="City"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md3 pa-1>
                    <v-text-field
                        outline
                        name="name"
                        label="Zip Code"
                        id="id"
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
