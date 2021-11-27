<template>
  <div>
    <v-text-field
      label="Nama..."
      outlined
      dense
      prepend-inner-icon="mdi-account-circle"
      v-model="form.nama"
    ></v-text-field>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="form.tanggal"
          label="Tanggal..."
          prepend-inner-icon="mdi-calendar"
          readonly
          outlined
          dense
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="form.tanggal"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    <v-textarea outlined v-model="form.alamat" label="Alamat"></v-textarea>
    <v-textarea outlined v-model="form.keluhan" label="Keluhan"></v-textarea>
    <div class="text-center mb-5">
      <v-btn class="ma-2" outlined @click="submit()"> Submit </v-btn>
    </div>
    <v-alert dense text type="success" v-model="alert">
      Pengajuan service anda berhasil terkirim, <strong>success</strong> 
      pihak kami akan segera memferivikasi pengajuan perbaikan anda,
      <strong>terimakasih.</strong>
    </v-alert>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Form",
  data() {
    return {
      form: {
        nama: "",
        alamat: "",
        tanggal: null,
        keluhan: "",
      },
      activePicker: null,
      menu: false,
      alert: false,
    };
  },
  computed: {
    ...mapState("beranda", {
      formDaftar: (state) => state.formDaftar,
    }),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    ...mapActions("beranda", ["submitForm"]),
    save(date) {
      this.$refs.menu.save(date);
    },
    submit() {
      this.$store.commit("beranda/SETFORM", this.form);
      this.submitForm().then((res) => {
        if (res === 200) {
          this.alert = true;
          this.$store.commit("beranda/CLEARFORM");
          this.form = {
            nama: "",
            alamat: "",
            tanggal: null,
            keluhan: "",
          };
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }
      });
    },
  },
};
</script>