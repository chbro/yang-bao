<template>
    <div class="admin-form">
        <p class="card-title">阶段营养实施档案</p>

        <div class="border-main">
            <div class="form-summary">
                <el-input size="small" v-model="models.house_id">
                    <template slot="prepend">栋号:</template>
                </el-input>
                <div class="time el-input-group">
                    <span class="time-span">使用日期:</span>
                    <el-date-picker
                        size="small"
                        v-model="models.use_date"
                        type="date">
                    </el-date-picker>
                </div>
                <div class="time el-input-group">
                    <span class="time-span">羊数:</span>
                    <el-input-number :min="1" size="small" v-model="models.lamb_num"></el-input-number>
                </div>

                <div class="time el-input-group select">
                    <span class="time-span">阶段:</span>
                    <el-autocomplete
                        size="small"
                        v-model="models.stage"
                        :fetch-suggestions="getStages"
                        @select="selectStage">
                    </el-autocomplete>
                </div>
                <el-input size="small" v-model="models.water">
                    <template slot="prepend">饮水:</template>
                </el-input>
            </div>

            <div class="card">
                <p class="card-title">精料配方</p>
                <div class="border-main">
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">青料:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加青料设置</span>
                    </div>
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">干料:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加干料设置</span>
                    </div>
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">其他:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加“其他”设置</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <p class="card-title">精料用量</p>
                <div class="border-main">
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">青料:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加青料设置</span>
                    </div>
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">干料:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加干料设置</span>
                    </div>
                    <div class="card-item">
                        <el-input size="small">
                            <template slot="prepend">其他:</template>
                        </el-input> , 用量
                        <el-input class="input-days" size="small"></el-input>%/天。
                        <span><i class="el-icon-caret-right"></i>增加“其他”设置</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <p class="card-title ta-l">备注:</p>
                <el-input type="textarea" v-model="models.note"></el-input>
            </div>
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

export default {
    components: {
        Submitter
    },

    data () {
        return {
            models: {
                house_id: null,
                use_date: null,
                lamb_num: 1,
                stage: null,
                water: null
            },
            submitter: {},
            selects: {
                stages: [
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
            }
        }
    },

    methods: {
        getStages (str, cb) {
            cb(this.selects.stages)
        },

        selectStage (item) {
            console.log(item)
        },

        submit () {
            console.log('sub')
        }
    }
}
</script>

<style lang="stylus">

</style>
