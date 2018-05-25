<template>
  <div class="mod_welfareList">
    <admin-table
      modpath="welfare"
      has-common-header
      has-common-tail-header
      :headers="headers"
      :getData="getAllWelfare"
      :deleteData="deleteWelfare">
    </admin-table>
  </div>
</template>

<script>
  import AdminTable from '@/components/admin/table'
  import { getAllWelfare, deleteWelfare } from '@/util/getdata'

  export default {
    components: {
      AdminTable
    },

    data () {
      return {
        getAllWelfare,
        deleteWelfare,
        headers: [
          { label: '自检/主管上级检查时间', prop: 'checkTime', },
          { label: '场内外环境卫生', children: [
            { label: '圈舍内外', prop: 'colonyHouse' },
            { label: '饲料库房及加工车间', prop: 'warehouseWorkshop' },
            { label: '杀虫灭鼠', prop: 'killWormDeratization' }
          ]},
          { label: '操作人员卫生与安全', children: [
            { label: '消毒制度是否执行', prop: 'sterilizingRoom' },
            { label: '是否赤手操作', prop: 'operation' },
            { label: '是否一羊一针头', prop: 'needleSheep' },
            { label: '疫苗及针头的消毒处理', prop: 'vaccine' }
          ]},
          { label: '实验室卫生与安全', children: [
            { label: '是否做到人员安全防护', prop: 'safetyProtection' },
            { label: '实验室垃圾与排水是否无害化处理', prop: 'rubbishWater' },
            { label: '是否遵守操作规范', prop: 'operationSpecification' }
          ]},
          { label: '羊舍空气与温度', prop: 'airTemperature' },
          { label: '羊只运动与采光', prop: 'exerciseDaylighting' },
          { label: '车辆进出是否消毒', prop: 'carDisinfect' },
          { prop: 'remark', label: '备注' }
        ]
      }
    }
  }
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.mod_welfareList
  .el-table th
    border-left none
  .el-table thead.is-group th
    background color-main
  .page
    text-align right
</style>
