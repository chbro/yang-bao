import Vue from 'vue'
import Router from 'vue-router'

// 用户模块
import Index from '@/components/index'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import FindPass from '@/components/login/findpass'

import Xipu from '@/components/xipu/xipu'
import XipuDetail from '@/components/xipu/xipu_detail'
import Broadcast from '@/components/broadcast'
import Chat from '@/components/chat/chat'
import ProChat from '@/components/chat/prochat'

// 管理员模块
import Admin from '@/components/admin/admin'
import AdminIndex from '@/components/admin/index'
import AdminUser from '@/components/admin/user'
import AdminRole from '@/components/admin/role'
import AdminAuth from '@/components/admin/auth'

Vue.use(Router)

/* eslint-disable object-property-newline */
export default new Router({
    routes: [
        // 用户模块
        {path: '/', name: 'index', component: Index},
        {path: '/login', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/findpass', name: 'findpass', component: FindPass},
        {path: '/xipu', name: 'xipu', component: Xipu},
        {path: '/xipu_detail/:id', name: 'xipu_detail', component: XipuDetail},
        {path: '/broadcast', name: 'broadcast', component: Broadcast},
        {path: '/chat', name: 'chat', component: Chat},
        {path: '/prochat', name: 'prochat', component: ProChat},

        // 管理员模块
        {path: '/admin', component: Admin, children: [
            {path: '', name: 'admin_index', component: AdminIndex},
            {path: 'user', name: 'admin_user', component: AdminUser},
            {path: 'role', name: 'admin_role', component: AdminRole},
            {path: 'auth', name: 'admin_auth', component: AdminAuth}
        ]}
    ]
})
