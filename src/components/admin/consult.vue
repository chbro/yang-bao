<template>
    <div>
        consult
        <el-table
            :data="tableData">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="name"
                label="编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="form"
                label="问题来源"
                width="180">
            </el-table-column>
            <el-table-column
                prop="feedback"
                label="专家反馈"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <span>查看</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [

            ]
        }
    }
}
</script>

<style lang="stylus">

</style>
