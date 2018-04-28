<template>
    <div class="admin-form">
        <p class="card-title">修改密码</p>
        <basic-info :items="items" :models="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'

export default {
    components: {
        BasicInfo
    },

    watch: {
        'models.way' (newV, oldV) {
            console.log(newV, oldV)
        }
    },

    data () {
        let findWays = [
            {value: '原密码'},
            {value: '密保问题'},
            {value: '短信验证'}
        ]
        let getFindWays = (q, cb) => {
            cb(findWays)
        }

        return {
            items: [
                {label: '找回方式', type: 'select', fetchSuggestions: getFindWays, model: 'way', block: 1},
                {label: '新密码', model: 'newpass'},
                {label: '确认密码', model: 'repeat'}
            ],
            models: {

            }
        }
    }
}
</script>

<style lang="stylus">

</style>
