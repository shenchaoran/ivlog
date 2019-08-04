import api from '@/api'
import http from '@/utils/http'

export default {
    state: {
        loading: true,
        error: null,
        list: [],
        item: {},
    },
    getters: {},
    actions: {
        getList: async ({commit, dispatch, state}, {_page, _limit}) => {
            try {
                state.loading = true
                let res = await api.getList({_page, _limit})
                state.list = res
                state.loading = false
                console.log(res)
            }
            catch(e) {
                console.error(e)
                return Promise.reject(e)
            }
        },
        getItem: async ({commit, dispatch, state}, id) => {
            try {
                state.loading = true
                let res = await api.getItem(id)
                state.item = res
                state.loading = false
            }
            catch(e) {
                console.error(e)
                return Promise.reject(e)
            }
        },
        upload: async ({commit, dispatch, state}, {}) => {
            try {
                
            }
            catch(e) {
                console.error(e)
                return Promise.reject(e)
            }
        }
    },
    mutations: {},
}