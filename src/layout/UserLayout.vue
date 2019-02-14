<template>
  <v-app>
    <notification></notification>
    <v-navigation-drawer app :mini-variant="mini || $vuetify.breakpoint.mdAndDown" width="250">
      <v-toolbar
        dark
        style="height: 100px; background: linear-gradient(45deg, #38c73c 0%, #b5c25a 100%)"
      >
        <v-list class="pa-0">
          <v-list-tile
            class="pa-1"
            avatar
            style=" height: 100px; background:url('https://i.postimg.cc/YCbD5mHP/image.png') repeat center center"
          >
            <v-list-tile-avatar class="mt-4">
              <img src="http://i.pravatar.cc/300">
            </v-list-tile-avatar>
            <v-spacer></v-spacer>
            <v-list-tile-content class="mt-4">
              <v-list-tile-title class="body-2">{{user.username}}</v-list-tile-title>
              <v-list-tile-sub-title class="caption">Last Logged in:</v-list-tile-sub-title>
              <v-list-tile-sub-title class="caption">{{formatDate(user.last_login)}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <template v-if="user.status === 2">
          <v-list-tile @click="goTo('/app')" class="ma-1" :style="activeRoute('Dashboard')">
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon>
                  <v-icon color="fdaBlueGreen">dashboard</v-icon>
                </v-btn>Dashboard
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="goTo('/app/licenses')" class="ma-1" :style="activeRoute('Licenses')">
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon>
                  <v-icon color="fdaBlueGreen">fas fa-file-contract</v-icon>
                </v-btn>Licenses
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Licenses</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="goTo('/app/certificates')"
            class="ma-1"
            :style="activeRoute('Certificates')"
          >
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon>
                  <v-icon color="fdaBlueGreen">fas fa-certificate</v-icon>
                </v-btn>Certificates
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Certificates</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="goTo('/app/notification')"
            class="ma-1"
            :style="activeRoute('Notifications')"
          >
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon>
                  <v-icon color="fdaBlueGreen">fas fa-file-invoice</v-icon>
                </v-btn>Product Notification
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Product Notification</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="goTo('/app/payments')" class="ma-1" :style="activeRoute('Payments')">
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon>
                  <v-icon color="fdaBlueGreen">far fa-credit-card</v-icon>
                </v-btn>Payments
              </v-tooltip>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Payments</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
        </template>
        <v-list-tile
          @click="goTo('/app/profile')"
          class="ma-1"
          :style="activeRoute('Notifications')"
        >
          <v-list-tile-action>
            <v-tooltip top>
              <v-btn slot="activator" icon>
                <v-icon color="fdaBlueGreen">far fa-user-circle</v-icon>
              </v-btn>My Profile
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="goTo('/app/password')"
          class="ma-1"
          :style="activeRoute('Notifications')"
        >
          <v-list-tile-action>
            <v-tooltip top>
              <v-btn slot="activator" icon>
                <v-icon color="fdaBlueGreen">fas fa-key</v-icon>
              </v-btn>Password Settings
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Password Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showLogout()" class="ma-1" :style="activeRoute('Logout')">
          <v-list-tile-action>
            <v-tooltip top>
              <v-btn slot="activator" icon>
                <v-icon color="fdaBlueGreen">fas fa-sign-out-alt</v-icon>
              </v-btn>Logout
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
    >
      <v-btn icon color="transparent" @click.stop="mini = !mini">
        <v-icon color="fdaGold" v-if="mini">menu</v-icon>
        <v-icon color="fdaGold" v-else>chevron_left</v-icon>
      </v-btn>
      <span class="headline font-weight-light">FDA Client Portal</span>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon small>far fa-bell</v-icon>
        </v-btn>
        <v-list two-line subheader>
          <v-subheader>Notifications</v-subheader>
          <v-divider></v-divider>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">
                <v-icon color="success" small right>check</v-icon>Account Activation
              </v-list-tile-title>
              <v-list-tile-sub-title
                class="caption font-weight-thin"
              >02/06/2019 3:26PM - Your account was activated</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-avatar size="40">
            <img src="http://i.pravatar.cc/200" alt="alt">
          </v-avatar>
        </v-btn>
        <v-list two-line subheader>
          <v-list-tile avatar @click="goTo('/app/profile')">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">My Profile</v-list-tile-title>
              <v-list-tile-sub-title class="caption font-weight-thin">Change your account details</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile avatar @click="goTo('/app/password')">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">Password Settings</v-list-tile-title>
              <v-list-tile-sub-title
                class="caption font-weight-thin"
              >Change Password and Security Settings</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile avatar @click="showLogout">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">Logout</v-list-tile-title>
              <v-list-tile-sub-title class="caption font-weight-thin">Sing out of FDA Portal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon small>fas fa-indent</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- <v-content> -->
    <v-container fluid>
      <!-- <v-card class="mt-3 mx-auto">
      <v-layout row wrap ml-3>-->
      <v-sheet
        class="v-sheet--offset pa-2 mt-3 pt-3"
        color="fdaSilver"
        elevation="5"
        width="calc(100% - 5px)"
        height="80"
      >
        <span class="title font-weight-light">{{page_name}}</span>
        <v-breadcrumbs divider="/">
          <v-breadcrumbs-item
            v-for="(item, index) in breadcrumbs"
            :key="index"
            @click="goTo(item.href)"
          >
            <v-icon color="fdaGreen">{{item.icon}}</v-icon>
            <span class="caption font-weight-light">{{item.name}}</span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-sheet>
      <v-spacer></v-spacer>
      <router-view></router-view>
      <!-- </v-layout> -->
      <!-- </v-card> -->
      <!-- <v-divider></v-divider> -->
      <!-- <transition name="fade"> -->
      <!-- <router-view></router-view> -->
      <!-- </transition> -->
      <v-dialog v-model="show_logout" persistent max-width="300" transition="dialog-transition">
        <v-card>
          <v-toolbar dark color="fdaGreen">
            <span class="title font-weight-thin">Logout</span>
          </v-toolbar>
          <v-card-text>
            <span class="font-weight-light">Are you sure you want to logout?</span>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline color="secondary" dark @click.native="show_logout = false">No</v-btn>
            <v-btn color="fdaGreen" @click="confirmLogout()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <!-- </v-content> -->
    <v-footer
      app
      dark
      class="pa-1"
      style="background: linear-gradient(5deg, #b5c25a 0%, #104b2a 100%)"
    >
      <span class="caption">Copyright © 2019 FDA All rights reserved.</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drug Administration of the Philippines</span>
    </v-footer>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
  components: { notification },
  //#########################
  // variables
  //#########################
  data() {
    return {
      mini: false,
      route_name: "",
      user: {},
      show_logout: false
    };
  },
  //#########################
  // init
  //#########################
  created() {
    this.init();
  },
  //#########################
  // methods
  //#########################
  methods: {
    init() {
      this.user = this.$store.state.user_session.user;
    },
    goTo(router) {
      this.$router.push(router);
    },
    showLogout(){
      this.show_logout = true;
    },
    confirmLogout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    },
    activeRoute(route) {
      if (this.$route.name === route) {
        return "background-color: rgb(202,208,160); color:white";
      } else {
        return;
      }
    }
  },
  //#########################
  // computed
  //#########################
  computed: {
    page_name() {
      return this.$route.name;
    },
    breadcrumbs() {
      return this.$store.state.breadcrumbs.navigation;
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
  border-radius: 2px 20px;
  /* transform: skew(-10deg) !important; */
}
</style>
