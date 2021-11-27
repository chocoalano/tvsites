<template>
  <v-row>
    <v-col :md="col(img_service.length)" sm="12" v-for="n in img_service" :key="n.icon">
      <v-card elevation="2" class="rounded-xl" color="cardglobal">
        <v-card-text>
          <v-img width="100%" :src="'http://localhost:8000/storage/img/service/'+n.icon"></v-img>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          {{ n.title }}
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("beranda", {
      img_service: (state) => state.img_service,
    }),
    img_service: {
      get: function () {
        return this.$store.state.beranda.img_service;
      },
      set: function (value) {
        this.$store.commit("beranda/SETIMGSERVICE", value);
      },
    },
  },
  mounted() {
    this.getImgService();
  },
  methods: {
    ...mapActions("beranda", ["getImgService"]),
    col(e){
      let num = parseInt(e);
      if (num === 1) {
        return 12;
      } else if (num === 2) {
        return 6;
      } else if (num === 3) {
        return 4;
      } else if (num === 4) {
        return 3;
      } else if (num === 5) {
        return 2;
      } else if (num === 6) {
        return 2;
      } else {
        return 2;
      }
    }
  },
};
</script>