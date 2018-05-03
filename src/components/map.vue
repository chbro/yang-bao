<template>
	<div ref="bmap" class="mod_map"></div>
</template>

<script>
export default {
	props: {
		address: {
			type: String,
			default: "北京市"
		}
	},
	data() {
		return {
			city: ""
		}
	},
	mounted() {
		var map = new window.BMap.Map(this.$refs.bmap) // 创建Map实例
		map.centerAndZoom(this.getCity(this.address), 11) // 用城市名设置地图中心点
		map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
	},
	methods: {
		getCity(address) {
			if (!address) {
				return "北京市"
			} else if (~this.address.indexOf("区") || ~this.address.indexOf("县")) {
				return ~this.address.indexOf("区") ?
					this.address.substring(0, this.address.indexOf("区") + 1) :
					this.address.substring(0, this.address.indexOf("县") + 1)
			} else if (~this.address.indexOf("市")) {
				return this.address.substring(0, this.address.indexOf("市") + 1)
			} else if (~this.address.indexOf("省")) {
				return this.address.substring(0, this.address.indexOf("省") + 1)
			} else {
				this.$message({
					message: "地址无法解析",
					type: "warning"
				})
				return "北京市"
			}
		}
	}
}
</script>

<style lang="stylus">
.mod_map
	width 100%
	height 200px
</style>
