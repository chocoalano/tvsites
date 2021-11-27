<template>
  <div>
    <h1 class="mb-5">Beranda</h1>
    <services class="mb-5" />
    <carousel class="mb-5" />
    <v-row>
      <v-col>
        <v-card class="rounded-xl" elevation="2" color="cardglobal">
          <v-card-text v-html="content"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import carousel from "@/components/carousel";
import services from "@/components/services";
import { mapState,mapActions } from "vuex";
export default {
  head() {
      return {
        title: this.meta.title,
        meta: [
          {
            hid: this.meta.hid,
            name: this.meta.name,
            content: this.meta.content
          }
        ]
      }
    },
  // head:this.head,
  data: () => ({
    selection: 1,
    meta:[]
  }),
  components: {
    carousel,
    services,
  },
  computed: {
    ...mapState("beranda", {
      content: (state) => state.content,
      agent: (state) => state.agent,
    }),
  },
  mounted(){
    this.getSeo().then((res)=>{
      this.meta=res.data
    }),
    this.getContent().then((res)=>{
      // console.log(res);
    }),
    this.getAgent().then((res)=>{
      if (res === 200) {
        this.agentPost()
      }
    })
  },
  methods:{
    ...mapActions('beranda', ['getContent','getAgent','agentPost','getSeo']),
  }
};
</script>
