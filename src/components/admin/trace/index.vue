<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="水质">
                <water-tap></water-tap>
            </el-tab-pane>
            <el-tab-pane label="空气">
                <soli-tap></soli-tap>
            </el-tab-pane>
            <el-tab-pane label="土壤">
                <soli-tap></soli-tap>
            </el-tab-pane>
            <el-tab-pane label="舍内温湿度">舍内温湿度</el-tab-pane>
            <el-tab-pane label="排泄物处理监测">排泄物处理监测</el-tab-pane>            
        </el-tabs>
    </div>
</template>

<script>
import WaterTap from './water_tap.vue'
import SoliTap from './soli_tap.vue'


export default {
    components: {
        WaterTap, SoliTap
    },

    created () {

    },

    data () {
        return {
            
        }
    },

    methods: {
        
    }
}
</script>

<style lang="stylus">

</style>
