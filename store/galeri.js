import $axios from './network'
const state = () => ({
    content: '',
    img: [],
})

const mutations = {
    SETCONTENT(state, payload) {
        state.content = payload
    },
    SETIMG(state, payload) {
        state.img = payload
    },
}

const actions = {
    getContent({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/contents?page=gallery`)
                .then((response) => {
                    resolve(response.status)
                    commit('SETCONTENT', response.data.content)
                })
        })
    },
    getGaleri({commit},payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/img?page=${payload}`)
                .then((response) => {
                    resolve(response.status)
                    commit('SETIMG', response.data)
                })
        })
    },
    getSeo() {
        return new Promise((resolve, reject) => {
            $axios.get(`/seo/gallery`)
            .then((res) => {
                resolve(res)
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