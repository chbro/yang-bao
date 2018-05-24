<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="水质">
                <water-tap></water-tap>
            </el-tab-pane>
            <el-tab-pane label="空气">
                <air-tap></air-tap>
            </el-tab-pane>
            <el-tab-pane label="土壤">
                <soli-tap></soli-tap>
            </el-tab-pane>
            <el-tab-pane label="舍内温湿度">
                <indoor-tap></indoor-tap>
            </el-tab-pane>
            <el-tab-pane label="排泄物处理监测">
                <waste-tap></waste-tap>    
            </el-tab-pane>            
        </el-tabs>
    </div>
</template>

<script>
import WaterTap from './water_tap.vue'
import SoliTap from './soli_tap.vue'
import IndoorTap from './indoor_tap.vue'
import AirTap from './air_tap.vue'
import WasteTap from './waste_tap.vue'



export default {
    components: {
        WaterTap, SoliTap, IndoorTap, AirTap, WasteTap
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
