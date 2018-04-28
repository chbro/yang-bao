import Vue from 'vue'
import Router from 'vue-router'

// 用户模块
import Index from '@/components/index'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import FindPass from '@/components/login/findpass'
import Genea from '@/components/genea/genealogic'
import GeneaDetail from '@/components/genea/genea_detail'
import Course from '@/components/course'
import Chat from '@/components/chat/chat'
import ProChat from '@/components/chat/prochat'
const SearchRes = () => import('@/components/search_res')

// 管理员模块
const Admin = () => import('@/components/admin/index')
// 个人信息
const UserInfo = () => import('@/components/admin/user/user')
const PasswordModify = () => import('@/components/admin/user/pass')
// 审核
const Review = () => import('@/components/admin/review/index')
// 留言管理
const Comment = () => import('@/components/admin/comment/index')
// 用户权限
const Auth = () => import('@/components/admin/auth/auth')
const AuthRole = () => import('@/components/admin/auth/role')
const Account = () => import('@/components/admin/account/index')
// 专家课堂
const Consult = () => import('@/components/admin/consult')
// 系谱档案
const Genealogic = () => import('@/components/admin/genealogic/index')
const GenealogicList = () => import('@/components/admin/genealogic/list')
// 卫生疫控
const DisinfectPlan = () => import('@/components/admin/health/disinfect_plan')
const DisinfectPrac = () => import('@/components/admin/health/disinfect_prac')
const DisinfectList = () => import('@/components/admin/health/disinfect_list')
const ImmunePlan = () => import('@/components/admin/health/immune_plan')
const ImmunePrac = () => import('@/components/admin/health/immune_prac')
const ImmuneList = () => import('@/components/admin/health/immune_list')
const AntiscolicPlan = () => import('@/components/admin/health/antiscolic_plan')
const AntiscolicPrac = () => import('@/components/admin/health/antiscolic_prac')
const AntiscolicList = () => import('@/components/admin/health/antiscolic_list')
// 营养生产
const StagePlan = () => import('@/components/admin/nutrition/stage_plan')
const StagePrac = () => import('@/components/admin/nutrition/stage_prac')
const StageList = () => import('@/components/admin/nutrition/stage_list')
const BreedPlan = () => import('@/components/admin/nutrition/breed_plan')
const BreedPrac = () => import('@/components/admin/nutrition/breed_prac')
const BreedList = () => import('@/components/admin/nutrition/breed_list')
// 疫病防治
const PreventionPlan = () => import('@/components/admin/prevention/prevention_plan')
const PreventionPrac = () => import('@/components/admin/prevention/prevention_prac')
// 可视系统
const DiagnoseVisual = () => import('@/components/admin/visual/diagnose')
const ProductionVisual = () => import('@/components/admin/visual/production')
// 有机养殖环境追溯
const TraceCharts = () => import('@/components/admin/trace/index')
// 动物福利
const Welfare = () => import('@/components/admin/welfare/index')
// 有机监管
const Nation = () => import('@/components/admin/supervise/nation')
const Audit = () => import('@/components/admin/supervise/audit')
const Capture = () => import('@/components/admin/supervise/capture')
const RecoveryIndex = () => import('@/components/admin/supervise/recovery_index')
// 羊场管理
const Farm = () => import('@/components/admin/farm/index')
const FarmList = () => import('@/components/admin/farm/list')
// 代理管理
const Agent = () => import('@/components/admin/agent/index')
const AgentList = () => import('@/components/admin/agent/list')
// 发布系统
const Release = () => import('@/components/admin/release/index')
const ReleaseList = () => import('@/components/admin/release/list')

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
        {path: '/genea', name: 'genea', component: Genea},
        {path: '/geneadetail/:id', name: 'geneadetail', component: GeneaDetail},
        {path: '/course', name: 'course', component: Course},
        {path: '/chat', name: 'chat', component: Chat},
        {path: '/prochat', name: 'prochat', component: ProChat},
        {path: '/search', name: 'search', component: SearchRes},

        // 管理员模块
        {path: '/admin', component: Admin, meta: {requireAuth: true}, children: [
            {path: '', name: 'auth', component: Auth},
            {path: 'userinfo', name: 'userinfo', component: UserInfo},
            {path: 'passmod', name: 'passmod', component: PasswordModify},
            {path: 'review', name: 'review', component: Review},
            {path: 'welfare', name: 'welfare', component: Welfare},
            {path: 'auth/role', name: 'authrole', component: AuthRole},
            {path: 'consult', name: 'consult', component: Consult},
            {path: 'genealogic', name: 'genealogic', component: Genealogic},
            {path: 'genealogic/list', name: 'genealogiclist', component: GenealogicList},
            // 卫生疫控
            {path: 'health/disinfect/plan', name: 'disinfectplan', component: DisinfectPlan},
            {path: 'health/disinfect/prac', name: 'disinfectprac', component: DisinfectPrac},
            {path: 'health/disinfect/list', name: 'disinfectlist', component: DisinfectList},
            {path: 'health/immune/plan', name: 'immuneplan', component: ImmunePlan},
            {path: 'health/immune/prac', name: 'immuneprac', component: ImmunePrac},
            {path: 'health/immune/list', name: 'immunelist', component: ImmuneList},
            {path: 'health/antiscolic/plan', name: 'antiscolicplan', component: AntiscolicPlan},
            {path: 'health/antiscolic/prac', name: 'antiscolicprac', component: AntiscolicPrac},
            {path: 'health/antiscolic/list', name: 'antiscoliclist', component: AntiscolicList},
            // 营养生产
            {path: 'nutrition/breed/plan', name: 'breedplan', component: BreedPlan},
            {path: 'nutrition/breed/prac', name: 'breedprac', component: BreedPrac},
            {path: 'nutrition/breed/list', name: 'breedlist', component: BreedList},
            {path: 'nutrition/stage/plan', name: 'stageplan', component: StagePlan},
            {path: 'nutrition/stage/prac', name: 'stageprac', component: StagePrac},
            {path: 'nutrition/stage/list', name: 'stagelist', component: StageList},
            // auth, comment, account
            {path: 'comment', name: 'comment', component: Comment},
            {path: 'account', name: 'account', component: Account},

            {path: 'prevention/preventionplan', name: 'preventionplan', component: PreventionPlan},
            {path: 'prevention/preventionprac', name: 'preventionprac', component: PreventionPrac},
            {path: 'visual/diagnose', name: 'diagnose', component: DiagnoseVisual},
            {path: 'visual/production', name: 'production', component: ProductionVisual},
            {path: 'trace', name: 'trace', component: TraceCharts},
            {path: 'supervise/nation', name: 'nation', component: Nation},
            {path: 'supervise/capture', name: 'capture', component: Capture},
            {path: 'supervise/audit', name: 'audit', component: Audit},
            {path: 'supervise/recovery_index', name: 'recovery_index', component: RecoveryIndex},
            {path: 'farm', name: 'farm', component: Farm},
            {path: 'farm/list', name: 'farmlist', component: FarmList},
            {path: 'agent', name: 'agent', component: Agent},
            {path: 'agentlist', name: 'agentlist', component: AgentList},
            {path: 'release', name: 'release', component: Release},
            {path: 'release/list', name: 'releaselist', component: ReleaseList}
        ]},
        {path: '*', component: NotFound}
    ]
})
