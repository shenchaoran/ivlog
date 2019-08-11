import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn'
Vue.prototype.$store = store
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()