<template>
	<div class="trace-area-select">
		<span>省/市/县:</span>
		<area-select type="text" :level="2" v-model="area" :data="pcaa" @change="getFactories"></area-select>
		<el-select v-model="fac" size="small" placeholder="单位">
			<el-option :value="item.value" :label="item.label" v-for="(item, i) in facs" :key="i"></el-option>
		</el-select>
	</div>
</template>

<script>

import { AreaSelect } from 'vue-area-linkage'
import pcaa from 'area-data/pcaa'
import 'vue-area-linkage/dist/index.css'

export default {
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
        getFactories() {
            
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
</style>
