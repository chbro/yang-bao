<template>
    <div class="admin-form">
        <p class="card-title">操作流程审核</p>
		<basic-info :items="items" :models="models" :radio-index="2"></basic-info>

		<div class="check">
			<el-table
				:data="check"
				style="width: 100%">
				<el-table-column
					label="项目"
                    width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.project }}</span>
                    </template>
                </el-table-column> 
                    
				<el-table-column
					label="描述">
                    <template slot-scope="scope">
                        <span>{{ scope.row.discribeGood}}</span><br>
                        <span>{{ scope.row.discribeBad}}</span>
                    </template>
                </el-table-column>
                    
				<el-table-column
					label="达标"
					width="100">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.radio" label="1">达标</el-radio>
                    </template>
				</el-table-column>
				<el-table-column
					label="未达标"
					width="100">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.radio" label="0">未达标</el-radio>
                    </template>
				</el-table-column>
			</el-table>
		</div>

		<div class="admin-send">
            <el-button type="primary" @click="submit()">已审核，并提交</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'

export default {
	components: {
        BasicInfo
    },

    data() {

    	return {
    		items: [{
    			label: '公司名称',
    			model: 'companyName'
    		}, {
    			label: '公司ID',
    			model: 'companyID'
    		}, {
    			label: '审核人',
    			model: 'verifier'
    		}],
    		models: {
    			companyName: null,
    			companyID: null,
    			verifier: null
    		},

    		check: [{
    			project: '卫生与动物福利操作档案'
    		}, {
    			project: '消毒档案'
    		}, {
    			project: '免疫实施档案'
    		}, {
    			project: '驱虫实施档案'
    		}, {
    			project: '营养实施档案'
    		}, {
    			project: '配种产子实施档案'
    		}, {
    			project: '疾病防治实施档案'
    		}, {
    			project: '综合审核结果'
    		}]
    	}
    }

}
</script>
