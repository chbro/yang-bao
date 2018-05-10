<template>
  <div class="mod_stageList">
    <el-table
      ref="table"
      class="admin-table"
      tooltip-effect="light"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="building"
        width="150"
        align="center"
        label="栏/栋">
      </el-table-column>
      <el-table-column
        prop="nutritionT"
        label="使用日期"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="quantity"
        width="150"
        align="center"
        label="羊数">
      </el-table-column>
      <el-table-column
        prop="average"
        width="150"
        align="center"
        label="羊只均重/斤">
      </el-table-column>
      <el-table-column
        prop="period"
        width="150"
        align="center"
        label="阶段">
      </el-table-column>
      <el-table-column label="精料配方" align="center">
        <el-table-column
          prop="materialA"
          width="150"
          align="center"
          label="预混料">
        </el-table-column>
        <el-table-column
          prop="materialM"
          width="150"
          align="center"
          label="精料">
        </el-table-column>
        <el-table-column
          prop="materialO"
          width="150"
          align="center"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="精料用量" align="center">
        <el-table-column
          prop="name"
          width="materialWM"
          align="center"
          label="精料">
        </el-table-column>
        <el-table-column
          prop="materialWO"
          width="150"
          align="center"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="粗饲料配方(%)" align="center">
        <el-table-column
          prop="roughageP"
          width="150"
          align="center"
          label="青料">
        </el-table-column>
        <el-table-column
          prop="roughageD"
          width="150"
          align="center"
          label="干料">
        </el-table-column>
        <el-table-column
          prop="roughageO"
          width="150"
          align="center"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="粗饲料用量(体重%)" align="center">
        <el-table-column
          prop="roughageWP"
          width="150"
          align="center"
          label="青料">
        </el-table-column>
        <el-table-column
          prop="roughageWD"
          width="150"
          align="center"
          label="干料">
        </el-table-column>
        <el-table-column
          prop="roughageWO"
          width="150"
          align="center"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="领料总量" align="center">
        <el-table-column
          prop="pickingM"
          width="150"
          align="center"
          label="精料">
        </el-table-column>
        <el-table-column
          prop="pickingR"
          width="150"
          align="center"
          label="粗料">
        </el-table-column>
        <el-table-column
          prop="pickingO"
          width="150"
          align="center"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="water"
        width="150"
        align="center"
        label="饮水">
      </el-table-column>
      <el-table-column
        prop="operatorName"
        width="150"
        align='center'
        label="操作人员">
      </el-table-column>
      <el-table-column
        prop="professorName"
        width="150"
        align='center'
        label="技术审核">
      </el-table-column>
      <el-table-column
        prop="supervisorName"
        align='center'
        label="监督执行">
      </el-table-column>
      <el-table-column
        prop="remark"
        width="200"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        class="action"
        fixed="right"
        align="center"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <div class="opr">
            <span @click="edit(scope.$index)">编辑</span>
            <span @click="deleteItem(scope.$index)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      layout="prev, pager, next"
      :total="total"
      @current-change="fetchData"
      :current-page.sync="page">
    </el-pagination>
  </div>
</template>

<script>
  import { isReqSuccessful } from '@/util/jskit'
  import { getUserById, getAllStages, deleteStage } from '@/util/getdata'

  export default {
    data() {
      return {
        load: true,
        tableData: [],
        page: 1,
        total: 1
      }
    },

    mounted () {
      let id = this.$route.params.id
      getUserById(id).then(res => {
        if (isReqSuccessful(res)) {
          this.user = res.data.model
        }
      }).then(this.fetchData)
    },

    methods: {
      async fetchData () {
        let res = await getAllStages(this.user.userFactory, {page: this.page - 1})
        this.tableData = res.data.List
        this.total = res.data.size
      },

      edit (index) {
        let id = this.tableData[index].id
        this.$router.push({name: 'stageprac', query: {edit: id}})
      },

      deleteItem (index) {
        this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let id = this.tableData[index].id
          deleteStage(id).then(res => {
            if (isReqSuccessful(res)) {
              this.fetchData()
              this.$message.success('删除成功!')
            }
          })
        }).catch(() => {
          return false
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.mod_stageList
  .el-table th
    border-left none
    color #fff
    background-color color-main
  .el-table thead.is-group th
    background color-main
  .page
    text-align right
</style>