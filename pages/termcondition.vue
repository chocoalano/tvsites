<template>
  <div>
    <h1 class="text-center mb-5">Syarat & Ketentuan</h1>
    <div v-html="content"></div>
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
    ...mapState("term", {
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
    ...mapActions("term", ["getContent", "getSeo"]),
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
