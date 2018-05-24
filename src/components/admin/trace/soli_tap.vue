<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-histogram :data="chartData" :settings="chartSettings" width="500px" height="500px"></ve-histogram>
            </div>
        </div>
		<state-info :data="chartData.rows[0].temp" :state="state.temp"  label="温度"></state-info>
		<state-info :data="chartData.rows[0].damp" :state="state.damp"  label="湿度"></state-info>	
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
			prop="temp"
			label="温度"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			prop="damp"
			label="湿度"
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
import VeHistogram from 'v-charts/lib/histogram'
import AreaSelect from './area_select'
import StateInfo from './state_info'



export default {
    components: {
        VeHistogram, AreaSelect, StateInfo 
	},
	
	data () {
		return {
			chartData: {
				columns: ['date', 'temp', 'damp'],
				rows: [
					{ date: '2018-01-03 21:33', temp:25, damp: 83, state: 0 },
					{ date: '2018-01-03 21:31', temp:28, damp: 50, state: 1},
					{ date: '2018-01-03 21:29', temp:26, damp: 60, state: 1},
					{ date: '2018-01-03 21:27', temp:20, damp: 70, state: 1},
					{ date: '2018-01-03 21:25', temp:23, damp: 80, state: 1},
					{ date: '2018-01-03 21:23', temp:27, damp: 83, state: 1}
				]
			},

			state: {
				temp: {
					normal: [20, 30],
					warn: [30, 50],
				},
				damp: {
					normal: [60, 80],
					warn: [80, 90],					
				}
			},

			chartSettings: {
				axisSite: {
					right: ['damp']
				},
				labelMap: {
					temp: '温度',
					damp: '湿度'
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

