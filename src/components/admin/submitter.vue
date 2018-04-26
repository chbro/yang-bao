<template>
    <div class="admin-submit">
<!--         <el-input v-model="submitter.operator_name" size="small">
            <template slot="prepend">操作员:</template>
        </el-input>
        <el-input v-model="submitter.reviewer" size="small" :disabled="!isReviewer">
            <template slot="prepend">技术审核:</template>
        </el-input>
        <el-input v-model="submitter.executor" size="small" :disabled="!isExecutor">
            <template slot="prepend">监督执行:</template>
        </el-input> -->
    </div>
</template>

<script>
export default {
    props: {
        submitter: {
            type: Object
        },
        isReviewer: {
            type: Boolean,
            default: false
        },
        isExecutor: {
            type: Boolean,
            default: false
        }
    }
}
</script>
