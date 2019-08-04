import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import video from './video'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
        user,
        video,
    }
})
