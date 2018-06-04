<template>
    <div>
        <admin-table
            is-check
            hide-eartag-filter
            has-common-header
            has-common-tail-header
            modpath="review"
            :check-module="this.checkModule"
            :get-data="getData"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllWelfare, getAllBreeding, getAllDisinfects, getAllImmune, getAllAntiscolic, getAllStages, getAllPrevention } from '@/util/getdata'

let mapHeaders = {
    welfare: [ // 卫生与动物福利操作档案
        { label: '自检/主管上级检查时间', prop: 'checkTime' },
        { label: '圈舍内外是否合格', prop: 'colonyHouse' },
        { label: '饲料库房及加工车间是否合格', prop: 'warehouseWorkshop' },
        { label: '杀虫灭鼠是否合格', prop: 'killWormDeratization' },
        { label: '消毒制度是否执行', prop: 'sterilizingRoom' },
        { label: '是否赤手操作', prop: 'operation' },
        { label: '是否一羊一针头', prop: 'needleSheep' },
        { label: '疫苗及针头的消毒处理是否合格', prop: 'vaccine' },
        { label: '是否做到人员安全防护是否合格', prop: 'safetyProtection' },
        { label: '实验室垃圾与排水是否无害化处理', prop: 'rubbishWater' },
        { label: '是否遵守操作规范', prop: 'operationSpecification', },
        { label: '羊舍空气与温度是否合格', prop: 'airTemperature' },
        { label: '羊只运动与采光是否合格', prop: 'exerciseDaylighting' },
        { label: '车辆进出是否消毒', prop: 'carDisinfect' }
    ],
    'health/disinfect': [ // 消毒实施档案
        { label: '消毒时间', prop: 'disinfectTime', },
        { label: '消毒场所', prop: 'place' },
        { label: '消毒药名称', prop: 'disinfectName' },
        { label: '用药剂量', prop: 'dose' },
        { label: '消毒方法', prop: 'disinfectWay' }
    ],
    prevention: [
        {label: '日期', prop: 'diagnosisTime', width: '200'},
        {label: '栏/栋',prop: 'buildingNum'},
        {label: '商标耳牌号', prop: 'earTag'},
        {label: '观察检测分析症状',prop: 'symptom'},
        {label: '诊断结果', prop: 'diagnosisResult'},
        {label: '治疗方案及用药剂量', prop: 'diagnosisMethod'},
        {label: '总用药量',prop: 'dose'},
        {label: '治疗效果',prop: 'treatEffect'}
    ],
    'nutrition/breed': [
        {label: '配种时间', prop: 'breedingTime'},
        {label: '配种后移至栏/栋', prop: 'buildingAfterBreeding'},
        {label: '母羊商标耳牌', prop: 'ramSheepTrademark'},
        {label: '种公商标耳牌', prop: 'eweSheepTrademark'},
        {label: '管理批次(前后五天内配种，分批次管理)', prop: 'manageFlag'},
        {label: '批次平均分配配种日期', prop: 'manageAverageTime'},   
        {label: '执行妊娠前期营养标准(妊娠前三月)', prop: 'nutritionBeforePregnancy'},
        {label: '确定妊娠(配种后20天)', prop: 'isPregnancy'},                                                
        {label: '执行妊娠后期营养标准(妊娠后两月)', prop: 'nutritionAfterPregnancy'},
        {label: '产前免疫种类(产前10|20天)', prop: 'prenatalImmunityType'},
        {label: '产前免疫时间', prop: 'prenatalImmunityTime'},   
        {label: '移至待产栏/栋',  prop: 'buildingToBeRelocated'},                               
        {label: '执行产期营养标准(产前一周)', prop: 'nutritionBeforeLambing'}, 
        {label: '产羔时间', prop: 'lambingTime'},
        {label: '产羔数量', prop: 'lambingNumber'},                
        {label: '执行哺乳期营养标准(产后一周)', prop: 'nutritionBreastFeeding'},
        {label: '执行羔羊代乳料营养标准(羔羊一月龄)', prop: 'nutritionInsteadBreastFeeding'},       
        {label: '执行断奶前母羊营养标准(断奶前一周)', prop: 'nutritionBeforeCutBreastFeeding'},
        {label: '执行羔羊断奶期营养标准', prop: 'nutritionCutBreastFeeding'}, 
    ],
    'nutrition/stage': [
        {label: '栏/栋', prop: 'building'},
        {label: '使用日期', prop: 'nutritionT'},
        {label: '羊数', prop: 'quantity'},
        {label: '羊只均重/斤', prop: 'average'},
        {label: '阶段', prop: 'period'},
        {label: '精料配方预混料', prop: 'materialA'},
        {label: '精料配方精料', prop: 'materialM'},
        {label: '精料配方其他', prop: 'materialO'},
        {label: '精料用量精料', prop: 'materialWM'},
        {label: '精料用量其他', prop: 'materialWO'},
        {label: '粗饲料配方(%)青料', prop: 'roughageP'},
        {label: '粗饲料配方(%)干料', prop: 'roughageD'},
        {label: '粗饲料配方(%)其他', prop: 'roughageO'},
        {label: '粗饲料用量(体重%)青料', prop: 'roughageWP'},
        {label: '粗饲料用量(体重%)干料', prop: 'roughageWD'},
        {label: '粗饲料用量(体重%)其他', prop: 'roughageWO'},
        {label: '领料总量精料', prop: 'pickingM'},
        {label: '领料总量粗料', prop: 'pickingR'},
        {label: '领料总量其他', prop: 'pickingO'},
        {label: '饮水', prop: 'water'}

    ],
    'health/antiscolic': [
        {prop: 'crowdNum', label: '驱虫羊(群)'},
        // {prop: 'eartagFile', label: '耳牌附件号'},
        {prop: 'repellentTime', label: '驱虫时间', width: 200},
        {prop: 'repellentName', label: '药物名称', width: 160},
        {prop: 'repellentWay', label: '给药途径', width: '160'},
        {prop: 'dose', label: '给药剂量(ml)'}
    ],
    'health/immune': [
        {prop: 'crowdNum', label: '接种羊(群)', width: '180'},
        // {prop: 'eartagFile', label: '免疫耳牌附件号'},
        {prop: 'immuneTime', label: '接种时间', width: '180'},
        {prop: 'immuneKind', label: '疫苗种类'},
        {prop: 'immuneWay', label: '接种方法'},
        {prop: 'dose', label: '接种剂量(ml)'},
        {prop: 'immuneDuring', label: '免疫期', width: '160'}
    ]
}
Object.keys(mapHeaders).forEach(v => {
    mapHeaders[v].push({prop: 'remark', label: '备注', width: 200})
})
export default {
    props: {
        checkMod: {
            type: String
        }
    },

    watch: {
        checkMod (newMod) {
            this.checkModule = newMod
            this.getData = this.map[newMod]
            this.headers = mapHeaders[newMod]
        }
    },

    components: {
        AdminTable
    },

    data () {
        return {
            map: {
                welfare: getAllWelfare,
                prevention: getAllPrevention,
                'nutrition/breed': getAllBreeding,
                'nutrition/stage': getAllStages,
                'health/antiscolic': getAllAntiscolic,
                'health/disinfect': getAllDisinfects,
                'health/immune': getAllImmune
            },
            checkModule: 'welfare',

            getData: getAllWelfare,
            headers: mapHeaders['welfare']
        }
    }
}
</script>
