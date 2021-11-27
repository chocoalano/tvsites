import $axios from './network'
const state = () => ({
    template:[],
    medsos:[]
})

const mutations = {
    SETCONTENT(state, payload) {
        state.template = payload
    },
    SETMEDSOS(state, payload) {
        state.medsos = payload
    },
}

const actions = {
    getConfig({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/template`)
                .then((response) => {
                    resolve(response.status)
                    commit('SETCONTENT', response.data)
                })
        })
    },
    getMedsos({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/medsos`)
                .then((response) => {
                    resolve(response.status)
                    commit('SETMEDSOS', response.data)
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