import api from '@/api'
import http from '@/utils/http'
import * as _ from 'lodash'

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
                let {data: {code, msg, data}} = await api.getList({_page, _limit})
                state.list = _.concat(state.list, data)
                state.loading = false
                console.log(code, msg)
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
        },
        navigateToNext: ({commit, dispatch, state}, id) => {

        },
    },
    mutations: {
        refresh: (state, obj) => {
            state.list = []
            state.loading = true
        },
        setLoading: (state, obj) => {
            state.loading = true
        }
    },
}