import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'

import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn'
Vue.prototype.$store = store
Vue.prototype.$api = api

Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()