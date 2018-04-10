<template>
    <div class="admin-form">
        <card :card.sync="card"></card>

        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import Submitter from '@/components/admin/submitter'
import Card from '@/components/admin/card'

export default {
    components: {
        Submitter, Card
    },

    data () {
        return {
            /* eslint-disable object-property-newline */
            card: {
                title: '粗饲料配方',
                items: [
                    {label: '青料', type: 'text', inputs: [{dose: 1, day: 1}]},
                    {label: '干料', type: 'text', inputs: [{dose: 1, day: 1}]},
                    {label: '其他', type: 'text', inputs: [{dose: 1, day: 1}]}
                ]
            },
            submitter: {},
            summary: [
                {label: '栋号:', model: 'house_id'},
                {label: '使用日期:', model: 'date'},
                {label: '羊数:', model: 'num'},
                {label: '阶段:', model: 'stage'},
                {label: '饮水:', model: 'water'}
            ],
            summaryModel: {
                house_id: null,
                date: null,
                num: null,
                stage: null,
                water: null
            }
        }
    },

    methods: {
        submit () {
            console.log(this.card)
        }
    }
}
</script>
