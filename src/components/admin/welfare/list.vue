<template>
  <div class="mod_welfareList">
    <el-table
      ref="table"
      tooltip-effect="light"
      :data="tableData3"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="自检、主管上级检查时间"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column label="场内外环境卫生" align="center">
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="圈舍内外">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="饲料库房及加工车间">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="杀虫灭鼠">
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作人员卫生与安全" align="center">
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="消毒室制度执行">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="是否赤手操作">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="是否一羊一针头">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="疫苗及针头的消毒处理">
        </el-table-column>
      </el-table-column>
      <el-table-column label="实验室卫生与安全" align="center">
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="是否做到人员安全防护">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="实验室垃圾与排水是否无害化处理">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          align='center'
          label="是否遵守操作规范">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="羊舍空气与温度">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="羊只运动与采光">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="车辆进出消毒">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="操作人员">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="技术审核">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="监督执行">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        align='center'
        label="备注">
      </el-table-column>
      <el-table-column
        class="action"
        fixed="right"
        label="操作"
        align='center'
        width="160">
        <template slot-scope="scope">
          <!-- <div class="opr">
            <span v-if="!hideView" @click="edit(scope.$index, 1)">查看</span>
            <template v-if="!checkData.length">
              <span @click="edit(scope.$index)">编辑</span>
              <span @click="deleteItem(scope.$index)">删除</span>
            </template>
          </div> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="fetchData"
      :current-page.sync="page">
    </el-pagination> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        load: true,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
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
