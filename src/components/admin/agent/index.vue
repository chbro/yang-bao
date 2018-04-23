<template>
    <div class="admin-form">
        <p class="card-title">代理管理</p>
        <!-- <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="代理等级">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="总代理" value="0"></el-option>
                    <el-option label="省级代理" value="1"></el-option>
                    <el-option label="市级代理" value="2"></el-option>
                    <el-option label="县级代理" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="代理所属地域">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="上级代理">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">增加代理</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form> -->
        <basic-info :items="items" :models="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
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
    data () {
        let regions = [
            {value: '总代理', key: 0},
            {value: '省级代理', key: 1},
            {value: '市级代理', key: 2},
            {value: '县级代理', key: 3}
        ]
        let getRegin = (q, cb) => {
            cb(regions)
        }
        return {
            items: [ {
                label: '代理等级',
                model: 'region',
                type: 'select',
                fetchSuggestions: getRegin
            }, {
                label: '代理名称',
                model: 'name'
            }, {
                label: '代理所属地域',
                model: 'address',
                type: 'address'
            }, {
                label: '上级代理',
                model: 'preAgent'
            }],
            models: {},
            submitter: {}
        }
    }
}
</script>

<style lang="stylus">

</style>
