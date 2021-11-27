import $axios from './network'
const state = () => ({
    content: ''
})

const mutations = {
    SETCONTENT(state, payload) {
        state.content = payload
    },
}

const actions = {
    getContent({commit}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/contents?page=contact`)
                .then((response) => {
                    resolve(response.status)
                    commit('SETCONTENT', response.data.content)
                })
        })
    },
    getSeo() {
        return new Promise((resolve, reject) => {
            $axios.get(`/seo/contact`)
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