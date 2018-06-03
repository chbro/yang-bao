<template>
    <div class="breed_prac">
        <data-cur
            title="配种产子实施档案"
            modpath="nutrition/breed"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :get-data="getBreeding"
            :post-data="postBreeding"
            :update-data="updateBreeding"
            :checkFull="false">
        </data-cur>
        <p class="form-info">
            备注:配种产子实施档案由配种，产前营养标准，产子，产后营养实施等环节组成。操作员按生产顺序填写每一步操作记录，每次填写完毕提交。下次再继续输入信息时，到配种产子实施档案列表找到该条记录点击编辑按钮在弹出的页面中继续填写下一步操作记录，直至最后该记录内容填写完毕。
        </p>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getBreeding, postBreeding, updateBreeding } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getBreeding,
            postBreeding,
            updateBreeding,
            items: [
                {label: '配种时间', model: 'breedingTime', type: 'time_2'},
                {label: '配种后移至栏/栋', model: 'buildingAfterBreeding'},
                {label: '母羊商标耳牌', model: 'ramSheepTrademark'},
                {label: '种公商标耳牌', model: 'eweSheepTrademark'},
                {label: '管理批次(前后五天内配种，分批次管理)', model: 'manageFlag'},
                {label: '批次平均分配配种日期', model: 'manageAverageTime', type: 'time_2'},   
                {label: '执行妊娠前期营养标准(妊娠前三月)-序号', model: 'nutritionBeforePregnancy', type: 'time_2'},
                {label: '确定妊娠(配种后20天)', model: 'isPregnancy'},                                                
                {label: '执行妊娠后期营养标准(妊娠后两月)-序号', model: 'nutritionAfterPregnancy',type: 'time_2'},
                {label: '产前免疫种类(产前10|20天)', model: 'prenatalImmunityType', type: "add", index: 0},
                {label: '产前免疫时间', model: 'prenatalImmunityTime', type: 'addTime', index: 0},   
                {label: '移至待产栏/栋', model: 'buildingToBeRelocated'},                               
                {label: '执行产期营养标准(产前一周)-序号', model: 'nutritionBeforeLambing', type: 'time_2'}, 
                {label: '产羔时间', model: 'lambingTime', type: 'time_2'},
                {label: '产羔数量', model: 'lambingNumber', type: 'number'},                
                {label: '执行哺乳期营养标准(产后一周)-序号', model: 'nutritionBreastFeeding', type: 'time_2'},
                {label: '执行羔羊代乳料营养标准(羔羊一月龄)-序号', model: 'nutritionInsteadBreastFeeding', type: 'time_2'},
                {label: '执行断奶前母羊营养标准(断奶前一周)-序号', model: 'nutritionBeforeCutBreastFeeding', type: 'time_2'},
                {label: '执行羔羊断奶期营养标准-序号', model: 'nutritionCutBreastFeeding', type: 'time_2'},
            ],
            models: {
                breedingTime: null,
                buildingAfterBreeding: null,
                ramSheepTrademark: 'M',
                eweSheepTrademark: 'G',
                manageFlag: null,
                manageAverageTime: null,
                nutritionBeforePregnancy: null,
                isPregnancy: null,
                nutritionAfterPregnancy: null,
                prenatalImmunityType: [],
                prenatalImmunityTime: [],
                buildingToBeRelocated: null,
                nutritionBeforeLambing: null,
                lambingTime: null,
                lambingNumber: null,
                nutritionBreastFeeding: null,
                nutritionInsteadBreastFeeding: null,
                nutritionBeforeCutBreastFeeding: null,
                nutritionCutBreastFeeding: null,
            }
        }
    }
}
</script>

<style lang="stylus">
.form-summary
    height: 730px !important
.breed_prac
    position relative
    .form-info 
        position: absolute;
        width: 47%;
        right: 3%;
        bottom: 268px;
    .form-summary
        height: 485px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    .el-input-group
        width: 445px !important;
    .time 
        display: flex;
    .admin-form .time 
        .time-span
            width: auto; 
            padding-right: 20px; 
        .el-input
            width: auto;         
            flex-grow: 1;
</style>
