<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="headline">Overview</div>
    </v-flex>

    <v-flex xs12 md6 lg3 pa-2>
      <v-card>
        <v-tooltip top>
          <v-btn
            slot="activator"
            color="success"
            dark
            absolute
            top
            right
            fab
            small
            @click="$router.push('/app/licenses')"
          >
            <v-icon small>call_made</v-icon>
          </v-btn>Go to Licenses
        </v-tooltip>

        <dashboard-card
          class="dcard"
          icon="fas fa-file-contract"
          title="Licenses"
          description="Count"
          details="1"
          color="primary"
        ></dashboard-card>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg3 pa-2>
      <v-card>
        <v-tooltip top>
          <v-btn
            slot="activator"
            color="success"
            dark
            absolute
            top
            right
            fab
            small
            @click="$router.push('/app/certificates')"
          >
            <v-icon>call_made</v-icon>
          </v-btn>Go to Certificates
        </v-tooltip>
        <dashboard-card
          class="dcard"
          icon="fas fa-certificate"
          title="Certificates"
          description="Count"
          details="9"
          color="fdaGold"
        ></dashboard-card>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg3 pa-2>
      <v-card>
        <v-tooltip top>
          <v-btn
            slot="activator"
            color="success"
            dark
            absolute
            top
            right
            fab
            small
            @click="$router.push('/app/notification')"
          >
            <v-icon>call_made</v-icon>
          </v-btn>Go to Product Notification
        </v-tooltip>
        <dashboard-card
          class="dcard"
          icon="fas fa-file-invoice"
          title="Notification"
          description="Count"
          details="2"
          color="fdaOrange"
        ></dashboard-card>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg3 pa-2>
      <v-card>
        <v-tooltip top>
          <v-btn
            slot="activator"
            color="success"
            dark
            absolute
            top
            right
            fab
            small
            @click="$router.push('/app/payments')"
          >
            <v-icon>call_made</v-icon>
          </v-btn>Go to Payments
        </v-tooltip>
        <dashboard-card
          class="dcard"
          icon="fas fa-credit-card fa-xs"
          title="Payments"
          description="Count"
          details="0"
          color="fdaBlueGreen"
        ></dashboard-card>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12 md6 lg4 pa-2>
      <v-card>
        <v-toolbar dark color="#00bfa5">
          <span class="subheadline font-weight-light">License Applications</span>
          <v-btn color="success" dark absolute bottom right fab small>
            <v-icon>call_made</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list two-line subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4 pa-2>
      <v-card>
        <v-toolbar dark color="#ff6e40">
          <span class="subheadline font-weight-light">Certificates Applications</span>
          <v-btn color="warning" dark absolute bottom right fab small>
            <v-icon>call_made</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list two-line subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4 pa-2>
      <v-card>
        <v-toolbar
          extended
          style="background:url('https://pixinvent.com/free-materialize-material-design-admin-template/images/gallary/12.png') no-repeat center"
        >
          <v-btn color="error" dark absolute bottom right fab small>
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn dark absolute bottom left fab color="white">
            <v-avatar>
              <img src="http://i.pravatar.cc/400" alt="alt" size="400">
            </v-avatar>
          </v-btn>
        </v-toolbar>
      
        <v-card-text>
          <v-layout row wrap mt-4>
            <v-flex xs12>
              <span class="title font-width-light">Ariel Balita</span>
            </v-flex>
            <v-flex xs12 pa-1>
              <v-icon small>email</v-icon>
              <span class="subheader font-width-light">ariel.a.balita@gmail.com</span>
            </v-flex>
            <v-flex xs12 pa-1>
              <v-icon small>phone</v-icon>
              <span class="subheader font-width-light">+63 917 709 4930</span>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>-->
    <v-flex xs12 mt-5>
      <div class="headline">Reference</div>
    </v-flex>
    <!-- Calendar -->
    <v-layout row wrap>
      <v-flex ml-2 class="my-3">
        <v-card class="dcard" width="calc(100% - 10px)">
          <v-date-picker
            width="calc(100% - 10px)"
            v-model="calendar"
            :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
            :events="functionEvents"
          ></v-date-picker>
        </v-card>
      </v-flex>
      <!-- USer Activity -->
      <v-flex mt-3 ml-2>
        <v-card width="calc(100% - 10px)" class="dcard" height="410">
          <v-toolbar
            width="calc(100% - 10px)"
            style="background: linear-gradient(45deg, #e0c71c 0%, #e9d758 100%);"
          >
            <v-toolbar-title>User Activity</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line width>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
              <v-list-tile v-else avatar :key="index">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat block color="success">view more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import DashboardCard from "@/components/DashboardCards";
export default {
  components: { DashboardCard },
  data: () => ({
    date2: new Date().toISOString().substr(0, 10),
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Authorized Officer",
        subtitle:
          "<span class='text--primary'>Chz Quiocho</span> &mdash; Applied Certificate for Food"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Cashier ",
        subtitle:
          "<span class='text--primary'>Godfrey Rivera</span> &mdash; accepted License Application "
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Authorized Officer",
        subtitle:
          "<span class='text--primary'>Chz Quiocho</span> &mdash; Renewed License 0001111"
      }
    ]
  }),
  methods: {
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    }
  }
};
</script>


<style>
.dcard {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
}
.v-picker__title__btn:not(.v-picker__title__btn--active) {
  font-size: 50px;
}
</style>

// .primary {
//   background: linear-gradient(45deg, #e0c71c 0%, #e9d758 100%);
//   /* border-color: #104b2a !important; */
// }