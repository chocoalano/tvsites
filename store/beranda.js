import $axios from './network'
import axios from 'axios'
const state = () => ({
    content: '',
    agent: [],
    carousel: [],
    img_service: [],
    formDaftar: {
        nama: "",
        alamat: "",
        tanggal: null,
        keluhan: "",
    },
})

const mutations = {
    SETCONTENT(state, payload) {
        state.content = payload
    },
    SETAGENT(state, payload) {
        state.agent = payload
    },
    SETCAROUSEL(state, payload) {
        state.carousel = payload
    },
    SETIMGSERVICE(state, payload) {
        state.img_service = payload
    },
    SETFORM(state, payload) {
        state.formDaftar = {
            nama : payload.nama,
            alamat : payload.alamat,
            tanggal : payload.tanggal,
            keluhan : payload.keluhan,
        }
    },
    CLEARFORM(state, payload) {
        state.formDaftar = {
            nama : '',
            alamat : '',
            tanggal : '',
            keluhan : '',
        }
    },
}

const actions = {
    getContent({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/contents?page=home`)
                .then((response) => {
                    resolve(response.status)
                    commit('SETCONTENT', response.data.content)
                })
        })
    },
    getAgent({commit}) {
        return new Promise((resolve, reject) => {
            axios.get(`https://ipapi.co/json/`)
                .then((data) => {
                    resolve(data.status)
                    commit('SETAGENT', data.data)
                })
        })
    },
    agentPost({commit,state}) {
        return new Promise((resolve, reject) => {
            $axios.post(`/client-agent`, state.agent)
                .then((data) => {
                    resolve(data.status)
                    commit('SETAGENT', data.data)
                })
        })
    },
    getCarousel({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/carousel`)
                .then((data) => {
                    resolve(data.status)
                    commit('SETCAROUSEL', data.data)
                })
        })
    },
    getImgService({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/service`)
                .then((data) => {
                    resolve(data.status)
                    commit('SETIMGSERVICE', data.data)
                })
        })
    },
    getSeo() {
        return new Promise((resolve, reject) => {
            $axios.get(`/seo/home`)
            .then((res) => {
                resolve(res)
            })
        })
    },
    submitForm({state}) {
        return new Promise((resolve, reject) => {
            $axios.post(`/userposted`,state.formDaftar)
                .then((data) => {
                    resolve(data.status)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}