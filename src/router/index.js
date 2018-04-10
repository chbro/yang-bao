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
import Admin from '@/components/admin/index'

// 系谱档案
import Genealogic from '@/components/admin/genealogic/index'

// 卫生疫控
import DisinfectPlan from '@/components/admin/health/disinfect_plan'
import DisinfectPrac from '@/components/admin/health/disinfect_prac'
import ImmunePlan from '@/components/admin/health/immune_plan'
import ImmunePrac from '@/components/admin/health/immune_prac'
import AntiscolicPlan from '@/components/admin/health/antiscolic_plan'
import AntiscolicPrac from '@/components/admin/health/antiscolic_prac'

// 可视系统
import DiagnoseVisual from '@/components/admin/visual/diagnose'
import ProductionVisual from '@/components/admin/visual/production'

import Consult from '@/components/admin/consult'

// 用户权限
import Auth from '@/components/admin/auth/auth'
import AuthUser from '@/components/admin/auth/user'
import AuthRole from '@/components/admin/auth/role'

// 营养生产
import StagePlan from '@/components/admin/nutrition/stage_plan'
import StagePrac from '@/components/admin/nutrition/stage_prac'
import BreedPlan from '@/components/admin/nutrition/breed_plan'
import BreedPrac from '@/components/admin/nutrition/breed_prac'

// 有机养殖环境追溯
import Charts from '@/components/admin/trace/charts'

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

            {path: 'genealogic', name: 'genealogic', component: Genealogic},

            {path: 'health/disinfectplan', name: 'disinfectplan', component: DisinfectPlan},
            {path: 'health/disinfectprac', name: 'disinfectprac', component: DisinfectPrac},
            {path: 'health/immuneplan', name: 'immuneplan', component: ImmunePlan},
            {path: 'health/immuneprac', name: 'immuneprac', component: ImmunePrac},
            {path: 'health/antiscolicplan', name: 'antiscolicplan', component: AntiscolicPlan},
            {path: 'health/antiscolicprac', name: 'antiscolicprac', component: AntiscolicPrac},

            {path: 'auth', name: 'auth', component: Auth},
            {path: 'auth/user', name: 'authuser', component: AuthUser},
            {path: 'auth/role', name: 'authrole', component: AuthRole},
            {path: 'consult', name: 'consult', component: Consult},

            {path: 'trace/charts', name: 'charts', component: Charts},

            {path: 'visual/diagnose', name: 'diagnose', component: DiagnoseVisual},
            {path: 'visual/production', name: 'production', component: ProductionVisual},

            {path: 'nutrition/breedplan', name: 'breedplan', component: BreedPlan},
            {path: 'nutrition/breedprac', name: 'breedprac', component: BreedPrac},
            {path: 'nutrition/stageplan', name: 'stageplan', component: StagePlan},
            {path: 'nutrition/stageprac', name: 'stageprac', component: StagePrac}
        ]}
    ]
})
