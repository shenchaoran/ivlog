import http from '../utils/http'

http.interceptor.request = cfg => {
    // if (process.env.NODE_ENV === 'development') {
    //     cfg.baseUrl = 'http://10.66.146.106:1111/ivlog/api/'
    // }
    // else {
        cfg.baseUrl = 'http://129.204.14.178:3000/ivlog/api/'
    // }
}

http.interceptor.response = res => res

export default {
    login: ({username, password}) => {
        return http.post('login', {username,password})
    },
    logout: () => {

    },
    resetPwd: () => {

    },
    getList: ({_page, _limit}) => {
        return http.get('videos', { 
            _page, _limit, 
            _sort: 'up,id', 
            _order: 'desc,asc'
        })
    },
    getItem: id => {
        return http.get('videos', {id})
    },
	uploadFile: (url, data) => {
		return http.post(url, data)
	},
	getMusicList: (url) => {
		return http.get(url)
	}
}