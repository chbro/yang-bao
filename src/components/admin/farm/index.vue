<template>
    <div class="admin-form">
        <p class="card-title">羊场管理</p>
        <basic-info :items="items" :models="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { AreaCascader } from 'vue-area-linkage'
import pcaa from 'area-data/pcaa'
import 'vue-area-linkage/dist/index.css'

export default {
    components: {
        BasicInfo, AreaCascader
    },

    data () {
        let principals = [
            {value: 'aaa', key: 0},
            {value: 'bbb', key: 1}
        ]
        let getPrincipal = (q, cb) => {
            cb(principals)
        }
        return {
            area: [],
            pcaa,
            items: [ {
                label: '羊场编号',
                model: 'number'
            }, {
                label: '羊场名称',
                model: 'name'
            }, {
                label: '羊场地理位置',
                model: 'address',
                type: 'address'
            }, {
                label: '羊场负责人',
                model: 'principal',
                type: 'select',
                fetchSuggestions: getPrincipal
            }, {
                label: '备注',
                model: 'comment'
            }, {
                label: '消毒场所',
                model: 'workplace'
            }, {
                label: '上级代理',
                model: 'preAgent'
            }, {
                label: '加入时间',
                model: 'time',
                type: 'time'
            }],
            models: {
                number: null,
                name: null,
                address: null,
                principal: null,
                comment: null,
                workplace: null,
                preAgent: null,
                time: null
            }
        }
    }
}
</script>

<style lang="stylus">

</style>
