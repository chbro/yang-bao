<template>
  <div class="mod_stageList">
    <admin-table
      modpath="nutrition/stage"
      hide-view
      has-common-tail-header
      has-common-header
      :headers="headers"
      :getData="getAllStages"
      :deleteData="deleteStage">
    </admin-table>
  </div>
</template>

<script>
  import AdminTable from '@/components/admin/table'
  import { getAllStages, deleteStage } from '@/util/getdata'

  export default {
    components: {
      AdminTable
    },

    data() {
      return {
        getAllStages,
        deleteStage,
        headers: [
          { label: '栏/栋', prop: 'building' },
          { label: '使用日期', prop: 'nutritionT', width: 200 },
          { label: '羊数', prop: 'quantity' },
          { label: '羊只均重/斤', prop: 'average' },
          { label: '阶段', prop: 'period' },
          { label: '精料配方(%)', children: [
            { label: '预混料', prop: 'materialA'},
            { label: '精料', prop: 'materialM'},
            { label: '其他', prop: 'materialO'}
          ]},
          { label: '精料用量(体重%)', children: [
            { label: '精料', prop: 'materialWM'},
            { label: '其他', prop: 'materialWO'}
          ]},
          { label: '粗饲料配方(%)', children: [
            { label: '青料', prop: 'roughageP'},
            { label: '干料', prop: 'roughageD'},
            { label: '其他', prop: 'roughageO'}
          ]},
          { label: '粗饲料用量(体重%)', children: [
            { label: '青料', prop: 'roughageWP'},
            { label: '干料', prop: 'roughageWD'},
            { label: '其他', prop: 'roughageWO' }
          ]},
          { label: '领料总量', children: [
            { label: '精料', prop: 'pickingM'},
            { label: '粗饲料', prop: 'pickingR'},
            { label: '其他', prop: 'pickingO' }
          ]},
          { label: '饮水', prop: 'water' },
          { label: '备注', prop: 'remark' }
        ]
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