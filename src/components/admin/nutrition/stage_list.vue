<template>
  <div class="mod_stageList">
    <el-table
      ref="table"
      tooltip-effect="light"
      :data="tableData3"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="栋号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="使用日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="羊数">
      </el-table-column>
      <el-table-column
        prop="name"
        label="阶段">
      </el-table-column>
      <el-table-column
        prop="name"
        label="饮水">
      </el-table-column>
      <el-table-column label="精料配方" align="center">
        <el-table-column
          prop="name"
          label="预混料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="精料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="精料用量" align="center">
        <el-table-column
          prop="name"
          label="精料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="粗饲料配方(%)" align="center">
        <el-table-column
          prop="name"
          label="青料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="干料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="粗饲料用量(体重%)" align="center">
        <el-table-column
          prop="name"
          label="青料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="干料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column label="领料总量" align="center">
        <el-table-column
          prop="name"
          label="精料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="粗料">
        </el-table-column>
        <el-table-column
          prop="name"
          label="其他">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="name"
        label="备注">
      </el-table-column>
      <el-table-column
        class="action"
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <div class="opr">
            <span>查看</span>
            <template>
              <span>编辑</span>
              <span>删除</span>
            </template>
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
.mod_stageList
  .el-table th
    border-left none
    color #fff
    background-color color-main
  .el-table thead.is-group th
    background color-main
</style>