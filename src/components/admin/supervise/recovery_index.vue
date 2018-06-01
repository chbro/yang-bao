<template>
	<div class="admin-form">
		<p class="card-title">回收化验指标</p>
		<basic-info :items="items" :models="models" :radio-index="2"></basic-info>

		<div class="check">
			<el-table
				:data="check"
				style="width: 100%">
				<el-table-column
					label="项目"
                    width="80">
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
					width="80">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.radio" label="1">达标</el-radio>
                    </template>
				</el-table-column>
				<el-table-column
					label="未达标"
					width="80">
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
    	let sheeps = [
    		{value: '种羊'},
    		{value: '商品羊'}
    	]
    	let getSheep = (q, cb) => {
    		cb(sheeps)
    	}

    	return {
    		items: [ {
    			label: '公司名称',
    			model: 'companyName'
    		}, {
    			label: '公司ID',
    			model: 'companyID'
    		}, {
    			label: '审核人',
    			model: 'verifier'
    		}, {
    			label: '羊群类别',
    			model: 'sheep',
    			type: 'radio',
    			fetchSuggestions: getSheep
    		}],
    		models: {
    			companyName: null,
    			companyID: null,
    			verifier: null,
    			sheep: null
    		},

            check: [{
                project: '总体',
                discribeGood: '良好特征：体型近似长方形，后躯比前躯高，体格结实，体格发育匀称，光亮。',
                discribeBad: '不良特征：品种品种特征不明显，发育不良，过于粗糙和纤细，性征不明显，皮毛稀粗乱、无光。',
                radio: ''
            }, {
                project: '头颈',
                discribeGood: '良好特征：符合品种要求，头清秀较宽，颈粗细适中较圆。',
                discribeBad: '不良特征：无品种典型性，过大过小，眼无神',
                radio: ''
            }, {
                project: '前躯',
                discribeGood: '良好特征：肩部宽深，胸部结实',
                discribeBad: '不良特征：胸狭窄而浅',
                radio: ''
            }, {
                project: '中躯',
                discribeGood: '良好特征：背腰平直，腹部匀称',
                discribeBad: '不良特征：背腰宽窄、下陷，体侧多皱，腹大拖地，发育畸形。',
                radio: ''
            }, {
                project: '后躯',
                discribeGood: '良好特征：尻斜，大腿宽厚充实，羊外生殖器官发育良好。',
                discribeBad: '不良特征：臀部减削、倾斜，大腿瘦削多皱，外生殖器官发育不好。'
            }, {
                project: '四肢',
                discribeGood: '良好特征：四肢坚实、开张，肢势端正，行动稳健。',
                discribeBad: '不良特征：四肢粗糙、纤细无力、肢势不正、步履不稳。',
                radio: ''
            }, {
                project: '系谱档案',
                radio: ''
            }, {
                project: '布病检疫',
                radio: ''
            }, {
                project: '小反抗体检测',
                radio: ''
            }, {
                project: '口蹄疫病抗体检测',
                radio: ''
            }, {
                project: '抗生素残留检测',
                radio: ''
            }, {
                project: '激素残留检测',
                radio: ''
            }, {
                project: '总体',
                radio: ''
            }],
            radio: []
    	}
    }

}
</script>

<style lang="stylus">

</style>
