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
const SearchRes = () => import('@/components/search_res')

// 管理员模块
const Admin = () => import('@/components/admin/index')
// 用户权限
const Auth = () => import('@/components/admin/auth/auth')
const AuthUser = () => import('@/components/admin/auth/user')
const AuthRole = () => import('@/components/admin/auth/role')
// 专家课堂
const Consult = () => import('@/components/admin/consult')
// 系谱档案
const Genealogic = () => import('@/components/admin/genealogic/index')
// 卫生疫控
const DisinfectPlan = () => import('@/components/admin/health/disinfect_plan')
const DisinfectPrac = () => import('@/components/admin/health/disinfect_prac')
const ImmunePlan = () => import('@/components/admin/health/immune_plan')
const ImmunePrac = () => import('@/components/admin/health/immune_prac')
const AntiscolicPlan = () => import('@/components/admin/health/antiscolic_plan')
const AntiscolicPrac = () => import('@/components/admin/health/antiscolic_prac')
// 营养生产
const StagePlan = () => import('@/components/admin/nutrition/stage_plan')
const StagePrac = () => import('@/components/admin/nutrition/stage_prac')
const BreedPlan = () => import('@/components/admin/nutrition/breed_plan')
const BreedPrac = () => import('@/components/admin/nutrition/breed_prac')
// 疫病防治
const PreventionPlan = () => import('@/components/admin/prevention/prevention_plan')
const PreventionPrac = () => import('@/components/admin/prevention/prevention_prac')
// 可视系统
const DiagnoseVisual = () => import('@/components/admin/visual/diagnose')
const ProductionVisual = () => import('@/components/admin/visual/production')
// 有机养殖环境追溯
const TraceCharts = () => import('@/components/admin/trace/charts')
// 动物福利
const Welfare = () => import('@/components/admin/welfare/index')
// 有机监管
const Nation = () => import('@/components/admin/supervise/nation')
const Audit = () => import('@/components/admin/supervise/audit')
const Capture = () => import('@/components/admin/supervise/capture')
const RecoveryIndex = () => import('@/components/admin/supervise/recovery_index')

const NotFound = () => import('@/components/not_found')

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
        {path: '/search', name: 'search', component: SearchRes},

        // 管理员模块
        {path: '/admin', component: Admin, children: [
            {path: '', name: 'auth', component: Auth},

            {path: 'welfare', name: 'welfare', component: Welfare},

            {path: 'auth/user', name: 'authuser', component: AuthUser},
            {path: 'auth/role', name: 'authrole', component: AuthRole},

            {path: 'consult', name: 'consult', component: Consult},

            {path: 'genealogic', name: 'genealogic', component: Genealogic},

            {path: 'health/disinfectplan', name: 'disinfectplan', component: DisinfectPlan},
            {path: 'health/disinfectprac', name: 'disinfectprac', component: DisinfectPrac},
            {path: 'health/immuneplan', name: 'immuneplan', component: ImmunePlan},
            {path: 'health/immuneprac', name: 'immuneprac', component: ImmunePrac},
            {path: 'health/antiscolicplan', name: 'antiscolicplan', component: AntiscolicPlan},
            {path: 'health/antiscolicprac', name: 'antiscolicprac', component: AntiscolicPrac},

            {path: 'nutrition/breedplan', name: 'breedplan', component: BreedPlan},
            {path: 'nutrition/breedprac', name: 'breedprac', component: BreedPrac},
            {path: 'nutrition/stageplan', name: 'stageplan', component: StagePlan},
            {path: 'nutrition/stageprac', name: 'stageprac', component: StagePrac},

            {path: 'prevention/preventionplan', name: 'preventionplan', component: PreventionPlan},
            {path: 'prevention/preventionprac', name: 'preventionprac', component: PreventionPrac},

            {path: 'visual/diagnose', name: 'diagnose', component: DiagnoseVisual},
            {path: 'visual/production', name: 'production', component: ProductionVisual},

            {path: 'trace/charts', name: 'charts', component: TraceCharts},

            {path: 'supervise/nation', name: 'nation', component: Nation},
            {path: 'supervise/capture', name: 'capture', component: Capture},
            {path: 'supervise/audit', name: 'audit', component: Audit},
            {path: 'supervise/recovery_index', name: 'recovery_index', component: RecoveryIndex}
        ]},
        {path: '*', component: NotFound}
    ]
})
