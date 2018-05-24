<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-line :data="chartData" :settings="chartSettings" width="500px" height="500px"></ve-line>
            </div>
        </div>
		<state-info :data="chartData.rows[0]['pm']" :state="state.pm"  label="质量"></state-info>	
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
			prop="pm"
			label="PM2.5"
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
				columns: ['date', 'pm'],
				rows: [
					{ date: '2018-01-03 21:33', 'pm':123, state: 0 },
					{ date: '2018-01-03 21:31', 'pm':173, state: 1},
					{ date: '2018-01-03 21:29', 'pm':153, state: 1},
					{ date: '2018-01-03 21:27', 'pm':153, state: 1},
					{ date: '2018-01-03 21:25', 'pm':163, state: 1},
					{ date: '2018-01-03 21:23', 'pm':153, state: 1}
				]
			},

			state: {
				pm: {
					normal: [100, 200],
					warn: [200, 500],
				},
			},

			chartSettings: {
				legendName: {
					pm: 'PM2.5'
				},
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
