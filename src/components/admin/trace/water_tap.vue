<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <ve-line :data="chartData" :settings="chartSettings" width="500px" height="500px"></ve-line>
            </div>
            <!-- <div>
                <div>空气</div>
                <ve-histogram :data="chartData2" width="400px"></ve-histogram>
            </div>
            <div>
                <div>土壤</div>
                <ve-pie :data="chartData3" width="400px" :settings="chartSettings"></ve-pie>
            </div>
            <div>
                <div>舍内温湿度</div>
                <ve-pie :data="chartData3" width="400px" :settings="chartSettings"></ve-pie>
            </div>
            <div>
                <div>排泄物处理监测</div>
                <ve-pie :data="chartData3" width="400px" :settings="chartSettings"></ve-pie>
            </div> -->
        </div>
		<div class="state-info">
			<div>
				<el-tag>当前值</el-tag>{{chartData.rows[0]['质量']}}
				<!-- <el-tag :type="checkState( chartData.rows[0]['质量'] )">{{info}}</el-tag> -->
			</div>		
			<div>
				<el-tag>正常范围</el-tag>{{state.normal[0]}} -- {{state.normal[1]}}
				<i class="state-icon" :class="{ 'state-icon-1': chartData.rows[0].state === 0  }"></i>
			</div>
			<div>			
				<el-tag>报警范围</el-tag>{{state.warn[0]}} -- {{state.warn[1]}}
				<i class="state-icon" :class="{ 'state-icon-2': chartData.rows[0].state === 1  }"></i>		
			</div>
			<div>
				<el-tag>异常范围</el-tag>{{state.warn[0]}} -- {{state.warn[1]}}
				<i class="state-icon" :class="{ 'state-icon-3': chartData.rows[0].state === 2  }"></i>	
			</div>		
		</div>
		 <el-table
			:data="chartData.rows"
			:stripe="true"
			>
			<el-table-column
			prop="日期"
			label="日期"
			align="center"
			>
			</el-table-column>
			<el-table-column
			prop="质量"
			label="质量"
			align="center"			
			>
			</el-table-column>
			<el-table-column
			prop="state"
			label="状态"
			align="center"			
			>
				<template slot-scope="scope">
					<el-tag :type="stateInfo( scope.row.state )">{{info}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
    </div>
</template>

<script>
import VeLine from 'v-charts/lib/line'
import VeHistogram from 'v-charts/lib/histogram'
import VePie from 'v-charts/lib/pie'
import AreaSelect from './area_select'



export default {
    components: {
        VeLine,AreaSelect
	},
	
	data () {
		return {
			chartData: {
				columns: ['日期', '质量'],
				rows: [
					{ '日期': '2018-01-03 21:33', '质量': 123, state: 0 },
					{ '日期': '2018-01-03 21:31', '质量': 1223, state: 1},
					{ '日期': '2018-01-03 21:29', '质量': 2123, state: 1},
					{ '日期': '2018-01-03 21:27', '质量': 4123, state: 1},
					{ '日期': '2018-01-03 21:25', '质量': 3123, state: 1},
					{ '日期': '2018-01-03 21:23', '质量': 7123, state: 1}
				]
			},

			state: {
				normal: [100, 200],
				warn: [200, 500],
			},

			chartSettings: {
				
			},

			info: '',
		}
	},

    created () {

        // this.chartData2 = {
        //     columns: ['日期', '成本', '利润', '占比', '其他'],
        //     rows: [
        //         { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
        //         { '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100 },
        //         { '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100 },
        //         { '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100 }
        //     ]
        // }

        // this.chartData3 = {
        //     columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
        //     rows: [
        //         { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        //         { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
        //         { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
        //         { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
        //         { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        //         { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
        //     ]
        // }
        // this.chartSettings = {
        //     dimension: '日期',
        //     metrics: '销售额-1季度',
        //     dataType: 'KMB',
        //     selectedMode: 'single',
        //     hoverAnimation: false,
        //     radius: 100,
        //     offsetY: 200
        // }
    },  

    methods: {
		checkState( data ) {
			let normal = this.state.normal
			if ( data >= normal[0] && data <= normal[1] ) {
				this.info = "正常状态"
				return 'success'
			} else {
				this.info = "警告状态"				
				return 'warning'				
			}
		},
		stateInfo( data ) {
			if ( data === 0 ) {
				this.info = "正常状态"
				return 'success'
			} else {
				this.info = "警告状态"				
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
.state-info
	display inline-block
	margin-left 80px
	>div
		margin-bottom 10px
		.el-tag
			margin-left 12px
			margin-right 12px
	.state-icon
		width: 24px
		height: 24px
		background: #666666a6
		border-radius: 12px
		display: inline-block
		vertical-align: middle
		margin-left: 20px	
	.state-icon-1	
		background:#67C23A
	.state-icon-2
		background:#E6A23C
	.state-icon-3
		background:#F56C6C	

.el-table 
	margin 0 auto	
	width 90%	
</style>
