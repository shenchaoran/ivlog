import http from '../utils/http'

http.interceptor.request = cfg => {
    if (process.env.NODE_ENV === 'development') {
        cfg.baseUrl = 'http://localhost:1111/api/'
    }
    else {
        cfg.baseUrl = 'http://129.211.60.18/ivlog/api/'
    }
}

http.interceptor.response = res => res

export default {
    login: () => {
        http.post('login', {}, {})
    },
    logout: () => {

    },
    resetPwd: () => {

    },
    getList: () => {

    },
    getItem: () => {

    },
}