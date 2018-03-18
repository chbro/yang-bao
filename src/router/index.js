import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Admin from '@/components/admin'
import Xipu from '@/components/xipu/xipu'
import XipuDetail from '@/components/xipu/xipu_detail'
import Register from '@/components/login/register'
import Login from '@/components/login/login'

Vue.use(Router)

/* eslint-disable object-property-newline */
export default new Router({
    routes: [
        {path: '/', name: 'index', component: Index},
        {path: '/admin', name: 'admin', component: Admin},
        {path: '/xipu', name: 'xipu', component: Xipu},
        {path: '/xipu_detail/:id', name: 'xipu_detail', component: XipuDetail},
        {path: '/register', name: 'register', component: Register},
        {path: '/login', name: 'login', component: Login}
    ]
})
