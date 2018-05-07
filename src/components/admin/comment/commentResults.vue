<template>
    <div class="admin-form">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="expertName"
                label="专家姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="单位">
            </el-table-column>
            <el-table-column
                prop="levelA"
                label="非常满意/数"
                width="120">
            </el-table-column>
            <el-table-column
                prop="levelB"
                label="满意/数"
                width="120">
            </el-table-column>
            <el-table-column
                prop="levelC"
                label="一般/数"
                width="120">
            </el-table-column>
            <el-table-column
                prop="levelD"
                label="不满意/数"
                width="120">
            </el-table-column>
            <el-table-column
                prop="levelE"
                label="非常不满意/数"
                width="120">
            </el-table-column>
        </el-table>
        <!-- <admin-table
            :getData="getUsers"
            :deleteData="deleteUser"
            :headers.sync="headers">
        </admin-table> -->
    </div>
</template>

<script>
// import AdminTable from '@/components/admin/table'

export default {
    // components: {
    //     AdminTable
    // },
    data () {
        return {
            expertName: '',
            companyName: '',
            levelA: '',
            levelB: '',
            levelC: '',
            levelD: '',
            levelE: ''
        }
    }
}
</script>

<style lang="stylus">
</style>
