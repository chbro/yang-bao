<template>
    <div class="user-info admin-form">
        <!-- <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input size="small" v-model="form.userTelephone"></el-input>
            </el-form-item>

            <el-form-item label="密码提示问题1">
                <el-select size="small" class="select-q" v-model="form.question_1" placeholder="请选择密码提示问题">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码问题答案1" prop="answer_1">
                <el-input size="small" v-model.number="form.answer_1"></el-input>
            </el-form-item>
            <el-form-item label="密码提示问题2">
                <el-select size="small" class="select-q" v-model="form.question_1" placeholder="请选择密码提示问题">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码问题答案2" prop="answer_2">
                <el-input size="small" v-model.number="form.answer_2"></el-input>
            </el-form-item>
            <el-form-item label="密码提示问题3">
                <el-select size="small" class="select-q" v-model="form.question_1" placeholder="请选择密码提示问题">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码问题答案3" prop="answer_3">
                <el-input size="small" v-model.number="form.answer_3"></el-input>
            </el-form-item>
        </el-form> -->
        <p class="card-title">个人中心</p>
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

    data () {
        return {
            form: {
                name: '',
                userTelephone: '',
                question_1: '',
                question_2: '',
                question_3: '',
                answer_1: '',
                answer_2: '',
                answer_3: ''
            },
            options: [
                {label: 'hello', value: 1}
            ],

            items: [
                {label: '用户名', model: 'region'},
                {label: '用户密码', model: 'region'},
                {label: '员工编号', model: 'region'},
                {label: '照片信息', model: 'region'},
                {label: '真实姓名', model: 'region'},
                {label: '家庭住址', model: 'region'},
                {label: '个人手机', model: 'region'},
                {label: '备注信息', model: 'region'},
                {label: '用户所在单位', model: 'region'},
                {label: '用户角色', model: 'region'},
                {label: '是否具有扩展权限', model: 'region'},
                {label: '代理/羊场', model: 'region'},
                {label: '代理名称', model: 'name'},
                {label: '找回密码问题1', model: 'name'},
                {label: '找回密码问题2', model: 'name'},
                {label: '找回密码问题3', model: 'name'},
                {label: '找回密码答案1', model: 'name'},
                {label: '找回密码答案2', model: 'name'},
                {label: '找回密码答案3', model: 'name'},
                {label: '邮箱', model: 'name'},
                {label: '微信', model: 'name'},
                {label: 'qq', model: 'name'},
                {label: '办公电话', model: 'name'},
                {label: '家庭电话', model: 'name'}
            ],
            models: {
                name: null
            }
        }
    },

    methods: {
        submit () {
            console.log(1)
        }
    }
}
</script>

<style lang="stylus">
.user-info
    .form-summary
        color red
        >.el-input:nth-child(3n)
            margin-right 0
    .el-form
        .el-input
            width 20%
            min-width 180px
    .el-button
        display block
        margin 0 auto
</style>
