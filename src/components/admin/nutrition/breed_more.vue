<template>
    <div class="breed_more">
        <el-table
            ref="table"
            tooltip-effect="dark"
            class="admin-table"
            :data="tableData"
            @cell-click="cellClick"
            @header-click="headerClick"
            >
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="100"
            >
            </el-table-column>
        </el-table>
        <p class="table-title">阶段营养配方</p>
        <el-table
            ref="table_2"
            tooltip-effect="dark"
            class="admin-table-2"
            :data="tableData_2"
            >
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers_2"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="100"
            >
            </el-table-column>
        </el-table>
        <el-button type="primary"  @click="$router.back()">返回</el-button>
    </div>
</template>

<script>
import { getBreeding, findNutrition, getUserById } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import Bus from '@/components/bus.js'

export default {

    data () {
        return {
			tableData: [

			],
            tableData_2: [

            ],
            user: {

            },
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
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注'}
            ],
            headers_2: [
                { label: '栏/栋', prop: 'building' },
                { label: '使用日期(序号)', prop: 'nutritionT', width: 200 },
                { label: '羊数', prop: 'quantity' },
                { label: '羊只均重/斤', prop: 'average' },
                { label: '阶段', prop: 'period' },
                { label: '精料配方(%)', children: [
                    { label: '预混料', prop: 'materialA'},
                    { label: '精料', prop: 'materialM'},
                    { label: '其他', prop: 'materialO'}
                ]},
                { label: '精料用量(体重%)', children: [
                    { label: '精料', prop: 'materialWM'},
                    { label: '其他', prop: 'materialWO'}
                ]},
                { label: '粗饲料配方(%)', children: [
                    { label: '青料', prop: 'roughageP'},
                    { label: '干料', prop: 'roughageD'},
                    { label: '其他', prop: 'roughageO'}
                ]},
                { label: '粗饲料用量(体重%)', children: [
                    { label: '青料', prop: 'roughageWP'},
                    { label: '干料', prop: 'roughageWD'},
                    { label: '其他', prop: 'roughageWO' }
                ]},
                { label: '领料总量', children: [
                    { label: '精料', prop: 'pickingM'},
                    { label: '粗饲料', prop: 'pickingR'},
                    { label: '其他', prop: 'pickingO' }
                ]},
                { label: '饮水', prop: 'water' },
                { label: '备注', prop: 'remark' }
            ]
        }
	},

    methods: {
        cellClick( row, column, cell ) {
            let text = cell.innerText         
            findNutrition({
                time: text,
                factoryNumber: this.tableData[0].factoryNumber
            }).then(res => {
                if (isReqSuccessful(res)) {
                   if ( res.data.List.length == 0 ) {
                        this.$message.info('未找到对应的数据');
                   } else {
                       this.tableData_2 = res.data.List;
                   }    
                } else {
                    this.$message.error(res.data.errMessage[0].defaultMessage)
                }
            });
        },
        headerClick( column, event) {
            console.log( column)
        }
    },
    
	mounted() {	
        let id = this.$route.query.more
        getBreeding(id).then(res => {
            if (isReqSuccessful(res)) {
                this.tableData.push( res.data.model );
            }
        });
    },

    created () {
        
    },
}
</script>

<style lang="stylus">
.breed_more
    .table-title
        text-align center
        margin-top 50px
    .admin-table-2 
        margin-top 20px
    .el-button
        display: block;
        margin: 20px auto;    
    .el-table
        .cell
            cursor pointer
</style>