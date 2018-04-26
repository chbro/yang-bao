<template>
    <div class="user-info">
        <el-form ref="form" :model="form" label-width="120px">
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
        </el-form>

        <el-button size="small" type="primary" @click="submit()">提交</el-button>
    </div>
</template>

<script>
export default {
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
            ]
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
    .el-form
        width 320px
        margin 0 auto
        .el-input
            width 20%
            min-width 180px
    .el-button
        display block
        margin 0 auto
</style>
