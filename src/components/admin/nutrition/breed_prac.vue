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
            :post-data="postBreeding1"
            :update-data="updateBreeding">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getBreeding, postBreeding1, postBreeding2, updateBreeding } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getBreeding,
            postBreeding1,
            updateBreeding,
            items: [
                {label: '配种时间', model: 'breedingT', type: 'time'},
                {label: '配种后移至栏/栋', model: 'building'},
                {label: '母羊商标耳牌', model: 'mEtB'},
                {label: '种公商标耳牌', model: 'fEtB'},
                {label: '管理批次(前后五天内配种，分批次管理)', model: 'manage'},
                {label: '批次平均分配配种日期', model: 'manage', type: 'time'},   
                {label: '是否执行妊娠前期营养标准(妊娠前三月)', model: 'manage', type:'selectYN'},
                {label: '确定妊娠(配种后20天)', model: 'manage'},                                                
                {label: '是否执行妊娠后期营养标准(妊娠后两月)', model: 'manage', type:'selectYN'},
                {label: '产前免疫种类(产前10|20天)', model: 'manage'},
                {label: '产前免疫时间', model: 'manage', type: 'time'},   
                {label: '移至待产栏/栋', model: 'building'},                               
                {label: '是否执行产期营养标准(产前一周)', model: 'manage', type:'selectYN'}, 
                {label: '产羔时间', model: 'manage', type: 'time'},
                {label: '产羔数量', model: 'manage', type: 'number'},                
                {label: '是否执行哺乳期营养标准(产后一周)', model: 'manage', type:'selectYN'},
                {label: '是否执行羔羊代乳料营养标准(羔羊一月龄)', model: 'manage', type:'selectYN'},       
                {label: '是否执行断奶前母羊营养标准(断奶前一周)', model: 'manage', type:'selectYN'},
                {label: '是否执行羔羊断奶期营养标准', model: 'manage', type:'selectYN'},
            ],
            models: {
                building: null,
                mEtB: null,
                fEtB: null,
                breedingT: null,
                gestationT: null,
                prenatalTP: null,                
                prenatalIT: null,
            }
        }
    }
}
</script>

<style lang="stylus">
.breed_prac
    .data-cur-2 
        margin-top: 30px;
        margin-bottom: 10px;
    .el-input-group
        width: calc((100% - 60px) / 2) !important    
    .admin-form .time .time-span+.el-input
        width: 255px !important   
</style>
