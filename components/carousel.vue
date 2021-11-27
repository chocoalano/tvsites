<template>
  <div>
    <v-carousel class="rounded-xl" height="300">
      <v-carousel-item
        v-for="(item, i) in carousel"
        :key="i"
        :src="'http://localhost:8000/storage/img/slider/'+item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("beranda", {
      carousel: (state) => state.carousel,
    }),
    carousel: {
      get: function () {
        return this.$store.state.beranda.carousel;
      },
      set: function (value) {
        this.$store.commit("beranda/SETCAROUSEL", value);
      },
    },
  },
  mounted() {
    this.getCarousel();
  },
  methods: {
    ...mapActions("beranda", ["getCarousel"]),
  },
};
</script>