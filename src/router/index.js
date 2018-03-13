import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Admin from '@/components/admin'
import Xipu from '@/components/xipu'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'index', component: Index},
        {path: '/admin', name: 'admin', component: Admin},
        {path: '/xipu', name: 'xipu', component: Xipu}
    ]
})
