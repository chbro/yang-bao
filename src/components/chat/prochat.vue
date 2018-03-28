<template>
    <div id="pro_wrapper">
        <el-container>
                <!-- <el-menu :default-active="activeIndex2" class="el-menu-demo chat-menu" mode="horizontal" @select="handleSelect" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">邀请对话</el-menu-item>
                    <el-menu-item index="2">直接对话</el-menu-item>
                    <el-menu-item index="3">自定义对话</el-menu-item>
                    <el-menu-item index="4">设置名片</el-menu-item>
                </el-menu> -->
            <el-header height="20%">
                <el-menu :default-active="activeIndex2" class="el-menu-demo chat-menu" mode="horizontal" @select="handleSelect" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">邀请对话</el-menu-item>
                    <el-menu-item index="2">直接对话</el-menu-item>
                    <el-menu-item index="3">自定义对话</el-menu-item>
                    <el-menu-item index="4">设置名片</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside class="aside1">aside1</el-aside>
                <el-aside class="aside2">aside2</el-aside>
                <el-main>main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style lang="stylus">
@import '../../assets/css/color'

#pro_wrapper
    height auto
    .el-menu--horizontal
        background-color color-main
        width 100%
    .el-aside
        height 850px
        background-color #666666
    .aside2
        background-color #999999
    .el-main
        background-color #111111
</style>
