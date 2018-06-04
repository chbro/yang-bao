<template>
    <div>
        <admin-table
            class="breed-table"
            modpath="nutrition/breed"
            :getData="getAllBreeding"
            :deleteData="deleteBreeding"
            :headers="headers">            
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import { getAllBreeding, deleteBreeding } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllBreeding,
            deleteBreeding,
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
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
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professorName', label: '技术审核'},
                {prop: 'supervisorName', label: '监督执行'},
                {prop: 'professorNotPassReason', label: '审核拒绝原因'},
                {prop: 'remark', label: '备注'}
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>

