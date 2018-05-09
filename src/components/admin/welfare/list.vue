<template>
  <div class="mod_welfareList">
    <el-table
      ref="table"
      tooltip-effect="light"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="checkTime"
        label="自检、主管上级检查时间"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column label="场内外环境卫生" align="center">
        <el-table-column
          prop="colonyHouse"
          width="150"
          align='center'
          label="圈舍内外">
        </el-table-column>
        <el-table-column
          prop="warehouseWorkshop"
          width="150"
          align='center'
          label="饲料库房及加工车间">
        </el-table-column>
        <el-table-column
          prop="killWormDeratization"
          width="150"
          align='center'
          label="杀虫灭鼠">
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作人员卫生与安全" align="center">
        <el-table-column
          prop="sterilizingRoom"
          width="150"
          align='center'
          label="消毒室制度执行">
        </el-table-column>
        <el-table-column
          prop="operation"
          width="150"
          align='center'
          label="是否赤手操作">
        </el-table-column>
        <el-table-column
          prop="needleSheep"
          width="150"
          align='center'
          label="是否一羊一针头">
        </el-table-column>
        <el-table-column
          prop="vaccine"
          width="150"
          align='center'
          label="疫苗及针头的消毒处理">
        </el-table-column>
      </el-table-column>
      <el-table-column label="实验室卫生与安全" align="center">
        <el-table-column
          prop="safetyProtection"
          width="150"
          align='center'
          label="是否做到人员安全防护">
        </el-table-column>
        <el-table-column
          prop="rubbishWater"
          width="150"
          align='center'
          label="实验室垃圾与排水是否无害化处理">
        </el-table-column>
        <el-table-column
          prop="operationSpecification"
          width="150"
          align='center'
          label="是否遵守操作规范">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="airTemperature"
        width="150"
        align='center'
        label="羊舍空气与温度">
      </el-table-column>
      <el-table-column
        prop="exerciseDaylighting"
        width="150"
        align='center'
        label="羊只运动与采光">
      </el-table-column>
      <el-table-column
        prop="carDisinfect"
        width="150"
        align='center'
        label="车辆进出消毒">
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
        width="150"
        align='center'
        label="监督执行">
      </el-table-column>
      <el-table-column
        class="action"
        fixed="right"
        label="操作"
        align='center'
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
      layout="prev, pager, next"
      :total="total"
      @current-change="fetchData"
      :current-page.sync="page">
    </el-pagination>
  </div>
</template>

<script>
  import { getAllWelfare, deleteWelfare, getUserById } from '@/util/getdata'
  import { isReqSuccessful } from '@/util/jskit'

  export default {
    props: {
      user: {
        type: Object
      }
    },

    watch: {
      user: {
        deep: true,
        handler (newV) {
          this.user = newV
          if (Object.keys(newV).length) {
            this.fetchData()
          }
        }
      }
    },

    mounted () {
      if (Object.keys(this.user).length) {
        this.fetchData()
      }
    },

    data() {
      return {
        load: true,

        page: 1,
        total: 1,
        tableData: []
      }
    },

    methods: {
      async fetchData () {
        let res = await getAllWelfare(this.user.userFactory, {page: this.page - 1})
        res.data.List.forEach(v => {
          Object.keys(v).forEach(v2 => {
            if (v[v2] === 0) {
              v[v2] = '否'
            } else if (v[v2] === 1) {
              v[v2] = '是'
            }
          })
        })
        this.tableData = res.data.List
      },

      edit (idx) {
        let id = this.tableData[idx].id
        this.$router.push({name: 'welfareprac', query: {edit: id}})
      },

      deleteItem (idx) {
        this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let id = this.tableData[idx].id
          deleteWelfare(id).then(res => {
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
.mod_welfareList
  .el-table th
    border-left none
    color #fff
    background-color color-main
  .el-table thead.is-group th
    background color-main
</style>
