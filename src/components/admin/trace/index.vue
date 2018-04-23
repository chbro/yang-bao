<template>
    <div>
        <div class="trace-area-select">
            <span>省/市/县:</span>
            <area-select type="text" :level="2" v-model="area" :data="pcaa" @change="getFactories"></area-select>
            <el-select v-model="fac" size="small" placeholder="单位">
                <el-option :value="item.value" :label="item.label" v-for="(item, i) in facs" :key="i"></el-option>
            </el-select>
        </div>

        <div class="trace-charts">
            <div>
                <div>水质</div>
                <ve-line :data="chartData" width="400px"></ve-line>
            </div>
            <div>
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
            </div>
        </div>
    </div>
</template>

<script>
import VeLine from 'v-charts/lib/line'
import VeHistogram from 'v-charts/lib/histogram'
import VePie from 'v-charts/lib/pie'
import { AreaSelect } from 'vue-area-linkage'
import pcaa from 'area-data/pcaa'
import 'vue-area-linkage/dist/index.css'

export default {
    components: {
        VeLine, VeHistogram, VePie, AreaSelect
    },

    created () {
        // this.pcaa = pcaa
        // console.log(this.pcaa)
        this.chartData = {
            columns: ['日期', '销售量'],
            rows: [
                { '日期': '1月1日', '销售量': 123 },
                { '日期': '1月2日', '销售量': 1223 },
                { '日期': '1月3日', '销售量': 2123 },
                { '日期': '1月4日', '销售量': 4123 },
                { '日期': '1月5日', '销售量': 3123 },
                { '日期': '1月6日', '销售量': 7123 }
            ]
        }

        this.chartData2 = {
            columns: ['日期', '成本', '利润', '占比', '其他'],
            rows: [
                { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100 },
                { '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100 },
                { '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100 }
            ]
        }

        this.chartData3 = {
            columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
            rows: [
                { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
                { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
                { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
                { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
            ]
        }
        this.chartSettings = {
            dimension: '日期',
            metrics: '销售额-1季度',
            dataType: 'KMB',
            selectedMode: 'single',
            hoverAnimation: false,
            radius: 100,
            offsetY: 200
        }
    },

    data () {
        return {
            area: [],
            pcaa,
            fac: '',
            facs: [
                {label: 'hehe', value: 1010}
            ]
        }
    },

    methods: {
        getFactories (area) {
            console.log(area)
        }
    }
}
</script>

<style lang="stylus">
.trace-area-select
    .el-select
        margin 10px
        margin-bottom 30px
    .area-select-wrap
        display inline-block
        vertical-align middle
    span
        margin-left 15px
        color #000

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
