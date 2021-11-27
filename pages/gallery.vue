<template>
  <div>
    <h1 class="text-center mb-5">Galeri Pelayanan & Perbaikan</h1>
    <v-card class="rounded-xl mb-10" elevation="2" color="cardglobal">
      <v-card-text v-html="content"></v-card-text>
    </v-card>
    <v-row>
      <v-col v-for="(item, index) of items" :key="index" class="d-flex child-flex" cols="4">
        <v-img
          :src="`http://localhost:8000/storage/img/${item.photo}`"
          aspect-ratio="1"
          class="grey lighten-2 rounded-xl"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <infinite-loading v-if="items.length" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
  </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
import axios from "axios";
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
  data() {
    return {
      meta: [],
      page: 1,
      items: [],
    };
  },
  computed: {
    url() {
      return "http://localhost:8000/api/img?page=" + this.page;
    },
    ...mapState("galeri", {
      content: (state) => state.content,
      // img: (state) => state.img,
    })
  },
  created() {
    this.getPhot0s()
  },
  mounted(){
    this.getContent().then((res)=>{
      console.log(res);
    }),
    this.getSeo().then((res) => {
        this.meta = res.data;
      });
  },
  methods:{
    ...mapActions('galeri', ['getContent','getGaleri','getSeo']),
    async getPhot0s() {
      const resp = await axios.get(this.url);
      this.items = resp.data;
      //console.log(this.items)
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++; // next page
        axios.get(this.url).then(resp => {
                if (resp.data.length > 1) { // check if any left
                  resp.data.forEach(item => this.items.push(item)); // push it into the items array so we can display the data
                  $state.loaded();
                } else {
                  $state.complete();
                }
          })
          .catch(err => {
            console.log(err);
          });
      }, 500);
    },
  }
};
</script>