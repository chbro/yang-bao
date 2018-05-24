<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-histogram :data="chartData" :settings="chartSettings" width="500px" height="500px"></ve-histogram>
            </div>
        </div>
		<state-info :data="chartData.rows[0].quality" :state="state.quality"  label="质量"></state-info>
		<state-info :data="chartData.rows[0].ph" :state="state.ph"  label="PH值"></state-info>		
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
			prop="quality"
			label="质量"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			prop="ph"
			label="PH值"
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
				columns: ['date', 'quality', 'ph'],
				rows: [
					{ date: '2018-01-03 21:33', ph:5.0, quality: 503, state: 0 },
					{ date: '2018-01-03 21:31', ph:6.0, quality: 123, state: 1},
					{ date: '2018-01-03 21:29', ph:8.0, quality: 2123, state: 1},
					{ date: '2018-01-03 21:27', ph:6.0, quality: 4123, state: 1},
					{ date: '2018-01-03 21:25', ph:7.0, quality: 3123, state: 1},
					{ date: '2018-01-03 21:23', ph:7.0, quality: 7123, state: 1}
				]
			},

			state: {
				quality: {
					normal: [100, 200],
					warn: [200, 500],
				},
				ph: {
					normal: [6.0, 8.0],
					warn: [8.0, 9.0],					
				}
			},

			chartSettings: {
				axisSite: {
					right: ['ph']
				},
				labelMap: {
					quality: '质量',
					ph: 'PH值'
				},
				
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
