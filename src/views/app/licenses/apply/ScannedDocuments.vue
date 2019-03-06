<template>
    <div>        
        <v-card-title primary-title>
            <span class="headline font-weight-light primary--text">
            Scanned Documents                     
            </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <uploader @upload="upload"></uploader>
        </v-card-text>
    </div>
</template>

<script>

import Uploader from '@/components/Uploader'

export default {
    components:{
        Uploader
    },
    data(){
        return {
            
        }
    },
    methods:{
        upload(formData){
            this.$emit('upload', formData)
        }
    }

}
</script>

<style>

</style>
