<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" width="400px" height="400px"></ve-histogram>
            </div>
        </div>
		<state-info :data="chartData.rows[0].quality.value" :state="state.quality"  label="温度"></state-info>
		<state-info :data="chartData.rows[0].ph.value" :state="state.ph"  label="PH值"></state-info>		
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
			prop="quality.value"
			label="温度"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			label="温度状态"
			align="center"			
			>
				<template slot-scope="scope">
					<el-tag :type="stateInfo( scope.row.quality.state )">{{scope.row.quality.info}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			prop="ph.value"
			label="PH值"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			label="ph值状态"
			align="center"			
			>
				<template slot-scope="scope">
					<el-tag :type="stateInfo( scope.row.ph.state )">{{scope.row.ph.info}}</el-tag>
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
					{ date: '2018-01-03 21:33', ph:5.0, quality: 503},
					{ date: '2018-01-03 21:31', ph:6.0, quality: 123},
					{ date: '2018-01-03 21:29', ph:8.0, quality: 2123},
					{ date: '2018-01-03 21:27', ph:6.0, quality: 4123},
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
					quality: '温度',
					ph: 'PH值'
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
					// console.log( key )														
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
		// console.log( this.chartData.rows )
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
