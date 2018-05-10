<template>
    <div class="xipu-search">
        <img src="../assets/imgs/index/logo-input.png" alt="云羊宝" class="logo">
        <div class="index_title">东骏（有机）养殖生产管理追溯系统管理平台</div>
        <div>
            <el-input placeholder="在此录入溯源码" size="medium" v-model="key"></el-input>
            <el-button size="medium" @click="search">搜索</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            key: null // 搜索关键词
        }
    },
    methods: {
        search () {
            if (!this.key) {
                this.$message({
                    message: '请先输入溯源码',
                    type: 'warning'
                })
                return
            }
            this.$router.push({name: 'search', query: { code: this.key }})
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/css/color'

.xipu-search
    background-color color-main
    text-align center
    padding-bottom 20px
    .logo
        margin-top 15px
    .index_title
        text-align center
        color #fff
        font-size 18px
        font-weight bold
        margin-bottom 20px
        margin-top -10px
    .el-input
        width 250px
        vertical-align top

    .el-button
        width 70px
        min-width 70px
        margin-left 10px
        margin-bottom 50px
        background-color color-green
        border-color color-green
        color #fff
</style>
