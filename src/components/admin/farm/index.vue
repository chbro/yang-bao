<template>
    <div class="admin-form">
        <!-- <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="羊场编号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="羊场名称">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <span>羊场地理位置</span>
            <el-cascader
                expand-trigger="hover"
                :options="farmAddress"
                v-model="farmSelect"
                @change="handleChange">
            </el-cascader>
            <el-form-item label="羊场负责人">
                <el-select v-model="form.admin" placeholder="请选择">
                    <el-option label="aaa,111" value="0"></el-option>
                    <el-option label="bbb,222" value="1"></el-option>
                    <el-option label="ccc,333" value="2"></el-option>
                    <el-option label="ddd,444" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item label="消毒场所">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item label="上级代理">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <span>上传时间</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form> -->
        <basic-info :items="items" :models="models"></basic-info>
        <area-select type="text" :level="2" v-model="area" :data="pcaa" @change="getFactories"></area-select>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { AreaSelect } from 'vue-area-linkage'
import pcaa from 'area-data/pcaa'
import 'vue-area-linkage/dist/index.css'

export default {
    components: {
        BasicInfo, AreaSelect
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
.el-input-group
    width 40%
    margin 10px
</style>
