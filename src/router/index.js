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
const ReleaseIndex = () => import('@/components/release')

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
const AuthRole = () => import('@/components/admin/auth/role')
const Account = () => import('@/components/admin/account/index')
// 系谱档案
const Genealogic = () => import('@/components/admin/genealogic/index')
const GenealogicList = () => import('@/components/admin/genealogic/list')
// 卫生疫控
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
const PreventionList = () => import('@/components/admin/prevention/prevention_list')
// 可视系统
const Diagnose = () => import('@/components/admin/visual/diagnose')
const DiagnoseList = () => import('@/components/admin/visual/diagnose_list')
const ProductionVisual = () => import('@/components/admin/visual/production')
// 有机养殖环境追溯
const TraceCharts = () => import('@/components/admin/trace/index')
// 动物福利
const Welfare = () => import('@/components/admin/welfare/index')
const WelfareList = () => import('@/components/admin/welfare/list')
const WelfarePlan = () => import('@/components/admin/welfare/plan')
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
// 短信平台
const Message = () => import('@/components/admin/message/index')
// 专家课堂视频发布
const ProfessorCourseVideo = () => import('@/components/admin/professorCourseVideo/index')

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
        // 集团
        {path: '/company', name: 'company', component: ReleaseIndex},
        // 产品
        {path: '/product', name: 'product', component: ReleaseIndex},
        // 有机
        {path: '/organic', name: 'organic', component: ReleaseIndex},
        // 效益
        {path: '/benefit', name: 'benefit', component: ReleaseIndex},
        // 加盟
        {path: '/league', name: 'league', component: ReleaseIndex},
        // 新闻
        {path: '/news', name: 'news', component: ReleaseIndex},
        // 联系我们
        {path: '/contact', name: 'contact', component: ReleaseIndex},

        // 管理员模块
        {path: '/admin', component: Admin, meta: {requireAuth: true}, children: [
            {path: '', name: 'userinfo', component: UserInfo},
            {path: 'message', name: 'message', component: Message},
            {path: 'passmod', name: 'passmod', component: PasswordModify},
            {path: 'review', name: 'review', component: Review},
            // 动物福利
            {path: 'welfare/prac', name: 'welfareprac', component: Welfare},
            {path: 'welfare/list', name: 'welfarelist', component: WelfareList},
            {path: 'welfare/plan', name: 'welfareplan', component: WelfarePlan},
            {path: 'auth/role', name: 'authrole', component: AuthRole},
            {path: 'genealogic/prac', name: 'genealogic', component: Genealogic},
            {path: 'genealogic/list', name: 'genealogiclist', component: GenealogicList},
            // 卫生疫控
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
            // 疾病防治
            {path: 'prevention/plan', name: 'preventionplan', component: PreventionPlan},
            {path: 'prevention', name: 'preventionprac', component: PreventionPrac},
            {path: 'prevention/list', name: 'preventionlist', component: PreventionList},
            // 可视系统
            {path: 'visual/diagnose', name: 'diagnose', component: Diagnose},
            {path: 'visual/diagnose/list', name: 'diagnose_list', component: DiagnoseList},
            {path: 'visual/production', name: 'production', component: ProductionVisual},
            // 追溯图表
            {path: 'trace', name: 'trace', component: TraceCharts},
            // 有机监管
            {path: 'supervise/nation', name: 'nation', component: Nation},
            {path: 'supervise/capture', name: 'capture', component: Capture},
            {path: 'supervise/audit', name: 'audit', component: Audit},
            {path: 'supervise/recovery_index', name: 'recovery_index', component: RecoveryIndex},
            // 代理，羊场，发布系统
            {path: 'agent', name: 'agent', component: Agent},
            {path: 'agent/list', name: 'agentlist', component: AgentList},
            {path: 'farm', name: 'farm', component: Farm},
            {path: 'farm/list', name: 'farmlist', component: FarmList},
            {path: 'release', name: 'release', component: Release},
            {path: 'release/list', name: 'releaselist', component: ReleaseList},
            // 专家课堂视频发布
            {path: 'professorCourseVideo', name: 'professorCourseVideo', component: ProfessorCourseVideo}
        ]},
        {path: '*', name: 'notfound', component: NotFound}
    ]
})
