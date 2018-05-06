// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
import { tokenStr } from './util/fetch'
import vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
Vue.use(vuex)

/* eslint-disable no-new */

// login interceptors
// cooperate with another interceptor in util/fetch.js
router.beforeEach((to, from, next) => {
    if (to.matched.some(v => v.meta.requireAuth)) {
        if (localStorage.getItem(tokenStr)) {
            next()
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
})

let store = new vuex.Store({
    state: {
        user: {}
    },

    mutations: {
        storeUserInfo (state, user) {
            state.user = user
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
