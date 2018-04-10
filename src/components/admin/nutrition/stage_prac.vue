<template>
    <div class="admin-form">
        <p class="card-title">阶段营养实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <card v-for="(item, i) in cards" :key="i" :card.sync="item"></card>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.note"></el-input>
        </div>
        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import Submitter from '@/components/admin/submitter'
import BasicInfo from '@/components/admin/basic_info'
import Card from '@/components/admin/card'
import { checkForm, checkSubmit, getDryFeed, getConFeed } from '@/util/jskit'

export default {
    components: {
        Submitter, BasicInfo, Card
    },

    data () {
        let stages = [
            {value: '引种应激前期（引种前三天）', key: 0},
            {value: '引种应激后期（引种3—15天）', key: 1},
            {value: '非配种期公羊（后备种公羊）', key: 2},
            {value: '空怀期母羊（后备种母羊）', key: 3},
            {value: '配种期公羊', key: 4},
            {value: '配种期母羊', key: 5},
            {value: '怀孕前期（孕娠前三月）', key: 6},
            {value: '怀孕后期（孕娠后两月）', key: 7},
            {value: '哺乳期母羊', key: 8},
            {value: '羔羊诱导采食期（7—80日龄）', key: 9},
            {value: '育成羊（80—180日龄）', key: 10},
            {value: '预饲期（181—220日龄）', key: 11}
        ]
        let getStages = (q, cb) => {
            cb(stages)
        }

        return {
            items: [
                {label: '栋号', model: 'house_id'},
                {label: '使用日期', model: 'use_date', type: 'time'},
                {label: '羊数', model: 'lamb_num', type: 'number'},
                {label: '阶段', model: 'stage', type: 'select', fetchSuggestions: getStages},
                {label: '饮水', model: 'water'}
            ],
            models: {
                house_id: null,
                use_date: null,
                lamb_num: 1,
                stage: null,
                water: null
            },
            /* eslint-disable object-property-newline */
            cards: [
                {title: '精料配方（%）', items: [
                    {label: '添加剂', inputs: [{dose: '', day: ''}]},
                    {label: '精料', inputs: [{dose: '', day: ''}]},
                    {label: '其他', inputs: [{dose: '', day: ''}]}
                ]},
                {title: '精料用量（体重%）', items: [
                    {label: '精料', type: 'select', fetchSuggestions: getConFeed, inputs: [{dose: '', day: ''}]},
                    {label: '其他', inputs: [{dose: '', day: ''}]}
                ]},
                {title: '粗饲料配方（%）', items: [
                    {label: '青料', inputs: [{dose: '', day: ''}]},
                    {label: '干料', type: 'select', fetchSuggestions: getDryFeed, inputs: [{dose: '', day: ''}]},
                    {label: '其他', inputs: [{dose: '', day: ''}]}
                ]},
                {title: '粗饲料用量（体重%）', items: [
                    {label: '青料', inputs: [{dose: '', day: ''}]},
                    {label: '干料', type: 'select', fetchSuggestions: getDryFeed, inputs: [{dose: '', day: ''}]},
                    {label: '其他', inputs: [{dose: '', day: ''}]}
                ]},
                {title: '领料总量', items: [
                    {label: '精料', inputs: [{dose: '', day: ''}]},
                    {label: '粗料', inputs: [{dose: '', day: ''}]},
                    {label: '其他', inputs: [{dose: '', day: ''}]}
                ]}
            ],
            submitter: {}
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }
            if (!checkSubmit(this.submitter)) {
                return
            }
            console.log(this.models, this.submitter)
        }
    }
}
</script>
