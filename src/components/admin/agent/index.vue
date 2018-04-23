<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
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
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                region: '',
                name: '',
                address: '',
                pre: ''
            }
        }
    }
}
</script>

<style lang="stylus">

</style>
