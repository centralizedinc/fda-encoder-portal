<template>
    <v-layout column class="fab-container-bottom">
        <v-tooltip top>
          <v-btn v-if="!hideDefault" small dark slot="activator" fab color="secondary" @click="home">
            <v-icon>dashboard</v-icon>
          </v-btn>Home
        </v-tooltip>
        <v-tooltip top v-for="button in buttons" :key="button.label">
          <v-btn small slot="activator" fab color="secondary" @click="submit(button.action)">
            <v-icon>{{button.icon}}</v-icon>
          </v-btn>{{button.label}}
        </v-tooltip>
      </v-layout>
</template>

<script>
export default {
    props:['buttons', 'hideDefault'],
    methods:{
        submit(action){
            this.$emit(action)
        },
        home(){
            this.$router.push('/app')
        }
    }
}
</script>

<style>

</style>
