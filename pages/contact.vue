<template>
  <div>
    <h1 class="text-center mb-5">Kontak & Lokasi Kami</h1>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4009620714937!2d106.5652087344419!3d-6.21073023030606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fe6eb77cd4c7%3A0x39828c290fbfa177!2sJl.%20Gatot%20Subroto%2C%20RT.001%2FRW.002%2C%20Manis%20Jaya%2C%20Kec.%20Jatiuwung%2C%20Kota%20Tangerang%2C%20Banten%2015136!5e0!3m2!1sid!2sid!4v1637292896344!5m2!1sid!2sid"
      width="980"
      height="350"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      class="rounded-xl"
      elevation="7"
    ></iframe>
    <v-card class="rounded-xl mt-5" color="cardglobal">
      <v-card-text v-html="content"></v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content,
        },
      ],
    };
  },
  data: () => ({
    meta: [],
  }),
  computed: {
    ...mapState("contact", {
      content: (state) => state.content,
    }),
  },
  mounted() {
    this.getContent().then((res) => {
      console.log(res);
    }),
      this.getSeo().then((res) => {
        this.meta = res.data;
      });
  },
  methods: {
    ...mapActions("contact", ["getContent", "getSeo"]),
  },
};
</script>