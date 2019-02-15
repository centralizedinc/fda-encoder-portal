<template>
    <div>
        <v-card-title primary-title>
            <span class="title font-weight-light">General Information</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>            
            <v-layout row wrap>
                <v-flex xs12 md4 pa-1>
                    <v-select class="caption"
                    outline
                        :items="items"
                        v-model="value"
                        label="Type of Application"
                    ></v-select>
                </v-flex>                        
                <v-flex xs12 md4 pa-1>
                    <v-select
                        outline
                        :items="items"
                        v-model="value"
                        label="Product Type"
                        class="caption"
            ></v-select>
                </v-flex>
                <v-flex xs12 md4 pa-1>
                    <v-select
                    class="caption"
                        outline
                        :items="items"
                        v-model="value"
                        label="Primary Activity"
                    ></v-select>
                </v-flex>
            </v-layout>                                    
            <v-list column>
                <v-subheader>Supplemental Activies (Check all possible)</v-subheader>
                <v-divider></v-divider>
                <v-list-tile avatar>                            
                    <v-checkbox small class="caption" label="Importer of Raw Materials" v-model="value" value="value"></v-checkbox>
                    <v-checkbox small class="caption" label="Importer of Raw Materials" v-model="value" value="value"></v-checkbox>
                    <v-checkbox small class="caption" label="Importer of Raw Materials" v-model="value" value="value"></v-checkbox>
                </v-list-tile>
                <v-list-tile avatar>                            
                    <v-checkbox small class="caption" label="Importer of Raw Materials" v-model="value" value="value"></v-checkbox>
                    <v-checkbox small class="caption" label="Importer of Raw Materials" v-model="value" value="value"></v-checkbox>
                    <v-checkbox small class="caption" label="Importer of Raw Materials" v-model="value" value="value"></v-checkbox>
                </v-list-tile>
            </v-list>            
        </v-card-text>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
