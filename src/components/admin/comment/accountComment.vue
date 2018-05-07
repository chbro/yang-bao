<template>
    <div id="accountComment">
        <ve-histogram :data="commentChart" width="400px"></ve-histogram>
    </div>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram'

export default {
    components: {
        VeHistogram
    },

    created () {
        this.commentChart = {
            columns: ['类别', '数量'],
            rows: [
                {'类别': '非常满意', '数量': '52'},
                {'类别': '满意', '数量': '97'},
                {'类别': '一般', '数量': '44'},
                {'类别': '不满意', '数量': '26'},
                {'类别': '非常不满意', '数量': '12'}
            ]
        }
    }
}
</script>

<style lang="stylus">
#accountComment
    width 400px;
    margin 0 auto;
</style>
