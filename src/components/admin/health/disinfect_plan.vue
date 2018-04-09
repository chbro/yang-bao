<template>
    <div>
        <div class="summary">
            <div>
                <el-input value="请选择文件" class="select-file" disabled @click.native="$refs.erpai.click()">
                    <template slot="prepend">免疫耳牌号</template>
                </el-input>
                <input type="file" hidden ref="erpai">
            </div>

            <div>
                <div class="input-item">
                    <span>接种时间</span><el-date-picker class="item-time" v-model="time"></el-date-picker>
                </div>
                <el-autocomplete v-model="type" :fetch-suggestions="querySearch"><template slot="prepend">疫苗种类</template></el-autocomplete>
                <el-input><template slot="prepend">接种接种方法</template></el-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            time: '',
            type: '',
            yimiao: [
                {value: '你好啊', label: '你好啊'}
            ]
        }
    },

    methods: {
        querySearch (queryString, cb) {
            cb(this.yimiao)
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

.el-input.is-disabled .el-input__inner
    background-color #fff
    color #ddd
    border-color color-main
    cursor pointer

.input-item
    margin-top 10px
    display inline-block
    margin-right 20px
    >span
        box-sizing border-box
        display inline-block
        width 140px
        padding-left 20px
        vertical-align middle
        height h=40px
        line-height h
        color #fff
        background-color color-main
    .el-date-editor
        width 160px
</style>
