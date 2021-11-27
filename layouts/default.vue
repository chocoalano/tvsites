<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      color="drawer"
      floating
    >
      <v-list rounded>
        <v-list-item class="d-flex justify-center">
          <h1>{{content.sitename}}</h1>
        </v-list-item>
        <v-divider class="mb-5"></v-divider>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-card
              class="rounded-xl"
              elevation="2"
              outlined
              color="cardglobal"
            >
              <v-card-text>
                <v-img
                  width="100%"
                  :src="
                    require(`~/assets/svg/Customer service_Monochromatic.svg`)
                  "
                ></v-img>
              </v-card-text>
              <v-card-title class="d-flex justify-center">
                {{content.zargon}}
              </v-card-title>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app flat color="header">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-switch
        v-model="Theme"
        @change="toggle_dark_mode"
        inset
        class="mt-6 ml-5"
      ></v-switch>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-newspaper-variant-outline </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="drawer">
      <v-container>
        <Nuxt />
      </v-container>
      <v-container>
        <card-footer />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      fixed
      app
      color="drawer"
      floating
    >
      <v-list rounded dense>
        <v-list-item class="d-flex justify-center">
          <h3>Servis TV Sekarang.</h3>
        </v-list-item>
        <v-divider class="mb-5"></v-divider>
        <form-apps></form-apps>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState,mapActions } from "vuex";
import CardFooter from "./cardFooter.vue";
import FormApps from "./Form.vue";
export default {
  name: 'default',
  components: {
    CardFooter,
    FormApps,
  },
  computed: {
    ...mapState("template", {
      content: (state) => state.template,
    }),
    content: {
      get: function () {
        return this.$store.state.template.template
      },
      set: function (value) {
        this.$store.commit('template/SETCONTENT', value)
      },
    },
  },
  data() {
    return {
      Theme: null,
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Beranda",
          to: "/",
        },
        {
          icon: "mdi-information-outline",
          title: "Syarat & Ketentuan",
          to: "/termcondition",
        },
        {
          icon: "mdi-cellphone-marker",
          title: "Kontak",
          to: "/contact",
        },
        {
          icon: "mdi-view-gallery",
          title: "Galeri",
          to: "/gallery",
        },
      ],
      rightDrawer: false,
    };
  },
  mounted() {
    this.Themes()
    this.getConfig().then((res)=>{
      console.log(res);
    })
  },
  methods: {
    ...mapActions('template', ['getConfig']),
    Themes: function () {
      this.Theme = localStorage.getItem("dark_theme");
      const theme=this.Theme;
      if (theme === true) {
        this.$vuetify.theme.dark = true;
      } else if(theme === false) {
        this.$vuetify.theme.dark = false;
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      }
    },
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark);
    },
  },
};
</script>
