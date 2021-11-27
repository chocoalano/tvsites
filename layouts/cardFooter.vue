<template>
  <div>
    <v-card flat tile class="rounded-xl text-center" color="drawer">
      <v-card-text>
        <v-btn v-for="icon in medsos" :key="icon.link" class="mx-4" icon :href="icon.link" target="_blank">
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="pt-0">
        <div v-html="content.footer"></div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>{{ content.sitename }}</strong>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
export default {
  name: 'cardFooter',
  computed: {
    ...mapState("template", {
      content: (state) => state.template,
      medsos: (state) => state.medsos,
    }),
    content: {
      get: function () {
        return this.$store.state.template.template;
      },
      set: function (value) {
        this.$store.commit("template/SETCONTENT", value);
      },
    },
    medsos: {
      get: function () {
        return this.$store.state.template.medsos;
      },
      set: function (value) {
        this.$store.commit("template/SETMEDSOS", value);
      },
    },
  },
  mounted() {
    this.getMedsos()
  },
  methods: {
    ...mapActions('template', ['getMedsos']),
  },
};
</script>