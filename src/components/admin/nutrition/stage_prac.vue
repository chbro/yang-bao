<template>
    <div class="admin-form">
        <p class="card-title">阶段营养实施档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card" v-for="(card, index) in cards" :key="index">
            <p class="card-title" v-text="card.title"></p>

            <div class="border-main">
                <div v-for="(item, i) in card.items" :key="i" class="card-item">
                    <template v-for="(input, j) in item.inputs">
                        <el-input :value="input" placeholder="名称和百分比" :key="j" v-if="item.type === undefined || item.type === 'text'" size="small" :ref="item.model + '-' + j">
                            <template slot="prepend">{{ item.label }}:</template>
                        </el-input>
                        <div :key="j" v-else-if="item.type === 'select'" class="time el-input-group select">
                            <span class="time-span" v-text="item.label + ':'"></span>
                            <!-- v-model="models[item.model]" -->
                            <el-autocomplete
                                :value="input"
                                :ref="item.model + '-' + j"
                                placeholder="名称和百分比"
                                size="small"
                                @select="() => {}"
                                :fetch-suggestions="item.fetchSuggestions">
                            </el-autocomplete>
                        </div>
                    </template>
                    <span class="cursor-p" @click="addItem(index, i)"><i class="el-icon-caret-right"></i>增加{{ item.label }}设置</span>
                </div>
            </div>
        </div>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="admin-send" v-if="canModify">
            <el-button type="primary" v-if="!check && !view" :disabled="disableBtn" @click="submit()">提交/更新</el-button>
            <template v-else-if="!view">
                <el-button type="primary" :disabled="disableBtn" @click="Spv(true)">通过</el-button>
                <el-button type="primary" :disabled="disableBtn" @click="Spv()">拒绝</el-button>
            </template>
            <el-button type="primary" v-else :disabled="disableBtn" @click="$router.back()">返回</el-button>
        </div>
        <div class="admin-send" v-else>已审核</div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { isReqSuccessful, checkForm, postJump, patchJump } from '@/util/jskit'
import { getStages, getDryFeed, getConFeed } from '@/util/dataselect'
import { postStage, getStage, updateStage } from '@/util/getdata'
import { retrieveUid, retrieveName, retrieveFacName, retrieveFacNum } from '@/util/store'

export default {
    components: {
        BasicInfo
    },

    data () {
        return {
            items: [
                {label: '栏/栋', model: 'building'},
                {label: '使用日期', model: 'nutritionT', type: 'time'},
                {label: '羊数', model: 'quantity', type: 'number', mr: true},
                {label: '羊只均重/斤',model: 'average',type: 'number'},
                {label: '阶段', model: 'period', type: 'select', fetchSuggestions: getStages},
                {label: '饮水', model: 'water',mr: 1}
            ],
            models: {
                building: null,
                nutritionT: null,
                quantity: 1,
                period: null,
                average:null,
                water: null,
                remark: null
            },
            form: {
                materialA: null,
                materialM: null,
                materialO: null,
                materialWM: null,
                materialWO: null,
                roughageP: null,
                roughageD: null,
                roughageO: null,
                roughageWP: null,
                roughageWD: null,
                roughageWO: null,
                pickingM: null,
                pickingR: null,
                pickingO: null
            },
            /* eslint-disable object-property-newline */
            cards: [
                // 商品名， 厂家，%
                // 原材料，%
                // 临时添加，%
                {title: '精料配方（%）', items: [
                    {label: '添加剂', model: 'materialA', inputs: ['']},
                    {label: '精料', model: 'materialM', inputs: ['']},
                    {label: '其他', model: 'materialO', inputs: ['']}
                ]},
                {title: '精料用量（体重%）', items: [
                    {label: '精料', model: 'materialWM', type: 'select', fetchSuggestions: getConFeed, inputs: ['']},
                    {label: '其他', model: 'materialWO', inputs: ['']}
                ]},
                {title: '粗饲料配方（%）', items: [
                    {label: '青料', model: 'roughageP', inputs: ['']},
                    {label: '干料', model: 'roughageD', type: 'select', fetchSuggestions: getDryFeed, inputs: ['']},
                    {label: '其他', model: 'roughageO', inputs: ['']}
                ]},
                {title: '粗饲料用量（体重%）', items: [
                    {label: '青料', model: 'roughageWP', inputs: ['']},
                    {label: '干料', model: 'roughageWD', type: 'select', fetchSuggestions: getDryFeed, inputs: ['']},
                    {label: '其他', model: 'roughageWO', inputs: ['']}
                ]},
                {title: '领料总量', items: [
                    {label: '精料', model: 'pickingM', inputs: ['']},
                    {label: '粗料', model: 'pickingR', inputs: ['']},
                    {label: '其他', model: 'pickingO', inputs: ['']}
                ]}
            ],
            disableBtn: false,
            canModify: true,

            edit: false,
            check: false,
            supervise: false,
            view: false
        }
    },

    watch: {
        '$route' (newV, oldV) {
            // from edit to post
            if (oldV.query.edit && !newV.query.edit) {
                this.edit = false
            }
        }
    },

    mounted () {
        this.edit = this.$route.query.edit || this.$route.query.check || this.$route.query.supervise || this.view
        if (this.edit) {
            getStage(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.model
                    let obj = {}
                    Object.keys(this.models).forEach(v => {
                        obj[v] = data[v]
                    })
                    // make form items
                    Object.keys(this.form).forEach(v => {
                        for (let v2 of this.cards) {
                            let card = v2.items.find(v3 => v3.model === v)
                            if (card) {
                                card.inputs = data[v] && JSON.parse(data[v])
                                break
                            }
                        }
                    })
                    this.models = obj
                    console.log(this.models, this.cards)
                }
            })
        }
    },

    methods: {
        addItem (cardIndex, itemIndex) {
            this.cards[cardIndex].items[itemIndex].inputs.push('')
        },

        submit () {
            Object.keys(this.$refs).forEach(v => {
                let key = v.substr(0, v.indexOf('-'))
                // when catch error reset this.form[key]
                if (Array.isArray(this.form[key])) {
                    this.form[key].push(this.$refs[v][0].$el.querySelector('input').value)
                } else {
                    this.form[key] = [this.$refs[v][0].$el.querySelector('input').value]
                }
            })

            console.log(this.models)
            Object.keys(this.form).forEach(v => {
                this.models[v] = JSON.stringify(this.form[v])
            })
            if (!checkForm(this.models)) {
                return
            }
            this.models.factoryNum = retrieveFacNum()
            this.models.factoryName = retrieveFacName()
            this.models.operatorId = retrieveUid()
            this.models.operatorName = retrieveName()

            this.disableBtn = true
            if (this.edit) {
                updateStage(this.edit, this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump('nutrition/stage')
                    }
                    this.disableBtn = false
                }, _ => {
                    this.disableBtn = false
                    this.$message.error('修改失败')
                })
            } else {
                postStage(this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump('nutrition/stage')
                    }
                    this.disableBtn = false
                }, _ => {
                    this.disableBtn = false
                    this.$message.error('录入失败')
                })
            }
        }
    }
}
</script>
