<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend"  width="400px" height="400px"></ve-histogram>
            </div>
        </div>
		<state-info :data="chartData.rows[0].temp.value" :state="state.temp"  label="温度"></state-info>
		<state-info :data="chartData.rows[0].damp.value" :state="state.damp"  label="湿度"></state-info>	
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
			prop="temp.value"
			label="温度"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			label="温度状态"
			align="center"			
			>
				<template slot-scope="scope">
					<el-tag :type="stateInfo( scope.row.temp.state )">{{scope.row.temp.info}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			prop="damp.value"
			label="湿度"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			label="湿度状态"
			align="center"			
			>
				<template slot-scope="scope">
					<el-tag :type="stateInfo( scope.row.damp.state )">{{scope.row.damp.info}}</el-tag>
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
					{ date: '2018-01-03 21:33', temp:25, damp: 83},
					{ date: '2018-01-03 21:31', temp:28, damp: 50},
					{ date: '2018-01-03 21:29', temp:26, damp: 60},
					{ date: '2018-01-03 21:27', temp:20, damp: 70},
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

			chartExtend : {
				series (v) {
					v.forEach(i => {
						i.barWidth = 20
					})
					return v
				}
			}
		}
	},

    created () {
		let state = this.state	
		this.chartData.rows.forEach( val => {	
			for ( let key in val ) {
				if ( key !== 'date' ) {
					let normal = state[key].normal;
					let warn = state[key].warn;
					let vaule = val[key];
					val[key] = {};
					this.$set(val[key], "value", vaule);
					 console.log( normal[0] )														
					if ( vaule >= normal[0] && vaule <= normal[1] ) {
						this.$set( val[key], "state", 1);					
						this.$set( val[key], "info", '正常状态');
					} else if ( vaule >= warn[0] && vaule <= warn[1] ) {	
						this.$set( val[key], "state", 2);					
						this.$set( val[key], "info", '警告状态');							
					} else {
						this.$set( val[key], "state", 3);					
						this.$set( val[key], "info", '异常状态');
					}	
				}
			}
		});
    },  

    methods: {
		stateInfo( data ) {
			if ( data === 1 ) {
				return 'success'
			} else {	
				return 'warning'				
			}
		}
    }
}
</script>

<style lang="stylus" scoped>
.trace-charts
	display inline-block
	margin-left 50px
	margin-right 10px
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

