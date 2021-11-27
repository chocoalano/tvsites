import Vue from 'vue'
import Vuex from 'vuex'
import template from './template'
import term from './term'
import beranda from './beranda'
import contact from './contact'
import galeri from './galeri'
Vue.use(Vuex)
const store = {
    modules: {
        template,
        term,
        beranda,
        contact,
        galeri,
    },
    state: {
        counter: 0,
    },
    mutations: {
        increment(state) {
            state.counter++
        }
    }
}

export default store

