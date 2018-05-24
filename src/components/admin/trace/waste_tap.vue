<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-line :data="chartData" :settings="chartSettings" width="500px" height="500px"></ve-line>
            </div>
        </div>
		<state-info :data="chartData.rows[0]['氨气浓度']" :state="state['氨气浓度']"  label="氨气浓度"></state-info>	
		 <el-table
			:data="chartData.rows"
			:stripe="true"
			>
			<el-table-column
			prop="date"
			label="日期"
			align="center"
			>
			</el-table-column>
			<el-table-column
			prop="氨气浓度"
			label="氨气浓度"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			prop="state"
			label="状态"
			align="center"			
			>
				<template slot-scope="scope">
					<el-tag :type="stateInfo( scope.row )">{{scope.row.info}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
    </div>
</template>

<script>
import VeLine from  'v-charts/lib/line'
import AreaSelect from './area_select'
import StateInfo from './state_info'



export default {
    components: {
        VeLine, AreaSelect, StateInfo 
	},
	
	data () {
		return {
			chartData: {
				columns: ['date', '氨气浓度'],
				rows: [
					{ date: '2018-01-03 21:33', '氨气浓度':123, state: 0 },
					{ date: '2018-01-03 21:31', '氨气浓度':173, state: 1},
					{ date: '2018-01-03 21:29', '氨气浓度':153, state: 1},
					{ date: '2018-01-03 21:27', '氨气浓度':153, state: 1},
					{ date: '2018-01-03 21:25', '氨气浓度':163, state: 1},
					{ date: '2018-01-03 21:23', '氨气浓度':153, state: 1}
				]
			},

			state: {
				"氨气浓度": {
					normal: [100, 200],
					warn: [200, 500],
				},
			},

			chartSettings: {
				label: {
					normal: {
						show: true
					}
				}
			},
		}
	},

    created () {
		this.chartData.rows.forEach( val => {
			this.$set( val, "info", '正常状态');
		});
    },  

    methods: {
		stateInfo( data ) {
			if ( data.state === 0 ) {
				data.info = "正常状态"
				return 'success'
			} else {
				data.info = "警告状态"		
				return 'warning'				
			}
		}
    }
}
</script>

<style lang="stylus" scoped>
.trace-charts
	display inline-block
	margin-left 80px
	font-size 0
	>div
		display inline-block
		width 50%
		font-size 14px
		>*
			display inline-block
			vertical-align middle

.el-table 
	margin 0 auto	
	width 90%	
</style>
