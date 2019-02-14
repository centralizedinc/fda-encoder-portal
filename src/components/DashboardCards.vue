<template>
  <!-- <v-layout row wrap>
  <v-flex xs12 sm12 md6 lg3>-->
  <v-card dark :style="style">
    <v-card-title primary-title>
      <v-avatar size="50" color="transparent">
        <v-icon large>{{icon}}</v-icon>
      </v-avatar>
      <v-spacer></v-spacer>
      <v-layout row wrap>
        <v-flex xs12>
          <h3
            class="font-weight-light pb-1 mt-3"
            style="font-family:Georgia !important; font-size:100vw;"
          >{{title}}</h3>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs6>
          <h4 class="subheading">{{description}}</h4>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs6 style="text-align: right" mt-2>
          <span class="subheading">{{details}}</span>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
  <!-- </v-flex>
  </v-layout>-->
</template>

<script>
export default {
  props: ["icon", "title", "description", "details", "color"],
  computed: {
    style() {
      if (this.color === "fdaBlueGreen") {
        return "background:linear-gradient(3600deg, #297373 0%, #5FA391 100%); box-shadow: 0 6px 20px 0 rgba(244, 143, 177, 0.5); ";
      } else if (this.color === "fdaOrange") {
        return "background: linear-gradient(360deg, #F1961D 0%, #F58555  100%); box-shadow: 0 6px 20px 0 rgba(255, 111, 0, 0.3) ";
      } else if (this.color === "fdaGold") {
        return "background: linear-gradient(360deg, 	#95A523 0%, #B5C25A  100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)";
      } else {
        return "background:linear-gradient(360deg, #0F901A 0%, #97C76E 100%); box-shadow:0 6px 20px 0 rgba(38, 198, 218, 0.5)";
      }
    }
  }
};
</script>

<style>
</style>
