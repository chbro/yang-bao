<template>
    <div>
        <el-table
            ref="table"
            tooltip-effect="dark"
            class="admin-table"
            :data="tableData"
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
    </div>
</template>

<script>
import { getAllBreeding, deleteBreeding } from '@/util/getdata'
import Bus from '@/components/bus.js'

export default {

    data () {
        return {
			tableData: [
				
			],
            headers: [
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
                {label: '配种时间', prop: 'breedingT'},
                {label: '配种后移至栏/栋', prop: 'building'},
                {label: '母羊商标耳牌', prop: 'mEtB'},
                {label: '种公商标耳牌', prop: 'fEtB'},
                {label: '管理批次(前后五天内配种，分批次管理)', prop: 'manage'},
                {label: '批次平均分配配种日期', prop: 'manage'},   
                {label: '执行妊娠前期营养标准(妊娠前三月)', prop: 'eNutritionT'},
                {label: '确定妊娠(配种后20天)', prop: 'manage'},                                                
                {label: '执行妊娠后期营养标准(妊娠后两月)', prop: 'manage'},
                {label: '产前免疫种类(产前10|20天)', prop: 'manage'},
                {label: '产前免疫时间', prop: 'manage'},   
                {label: '移至待产栏/栋',  prop: 'manage'},                               
                {label: '执行产期营养标准(产前一周)', prop: 'manage'}, 
                {label: '产羔时间', prop: 'manage'},
                {label: '产羔数量', prop: 'manage'},                
                {label: '执行哺乳期营养标准(产后一周)', prop: 'manage'},
                {label: '执行羔羊代乳料营养标准(羔羊一月龄)', prop: 'manage'},       
                {label: '执行断奶前母羊营养标准(断奶前一周)', prop: 'manage'},
                {label: '执行羔羊断奶期营养标准', prop: 'manage'},          
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professor', label: '技术审核'},
                {prop: 'supervisor', label: '监督执行'},
                {prop: 'remark', label: '备注'}
            ]
        }
	},

	
	mounted() {				
		Bus.$once('getTableData', tableDat => {
			console.log( tableDat )
			this.tableData.push( tableDat );
		});		
	}
}
</script>

<style lang="stylus" scoped>

</style>