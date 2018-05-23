<template>
    <div>    
		<area-select></area-select>
        <div class="trace-charts">
            <div>
                <div>土壤</div>
                <ve-line :data="chartData" width="400px"></ve-line>
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

    created () {
        this.chartData = {
            columns: ['日期', '成本', '利润', '占比', '其他'],
            rows: [
                { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100 },
                { '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100 },
                { '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100 }
            ]
        }

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
        
    }
}
</script>

<style lang="stylus" scoped>


.trace-charts
    font-size 0
    >div
        display inline-block
        width 50%
        font-size 14px
        >*
            display inline-block
            vertical-align middle

</style>
