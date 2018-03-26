<template>
    <div>
        user
    </div>
</template>

<script>
import { getPermission } from '@/util/getdata'

export default {
    data () {
        return {

        }
    },

    mounted () {
        getPermission().then(res => {
            if (res.meta.code === 0) {
                console.log(res.data)
            } else {
                this.$message.error(res.meta.errorMsg || '查询失败')
            }
        }, _ => {
            this.$message.error('查询失败')
        })
    }
}
</script>

<style lang="stylus">

</style>
