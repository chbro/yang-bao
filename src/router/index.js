import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Admin from '@/components/admin'
import Xipu from '@/components/xipu/xipu'
import XipuDetail from '@/components/xipu/xipu_detail'
import Register from '@/components/login/register'
import Login from '@/components/login/login'
import Broadcast from '@/components/broadcast'
import Chat from '@/components/chat/chat'
import ProChat from '@/components/chat/prochat'

Vue.use(Router)

/* eslint-disable object-property-newline */
export default new Router({
    routes: [
        {path: '/', name: 'index', component: Index},
        {path: '/admin', name: 'admin', component: Admin},
        {path: '/xipu', name: 'xipu', component: Xipu},
        {path: '/xipu_detail/:id', name: 'xipu_detail', component: XipuDetail},
        {path: '/register', name: 'register', component: Register},
        {path: '/broadcast', name: 'broadcast', component: Broadcast},
        {path: '/login', name: 'login', component: Login},
        {path: '/chat', name: 'chat', component: Chat},
        {path: '/prochat', name: 'prochat', component: ProChat}
    ]
})
