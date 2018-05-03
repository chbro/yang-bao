<template>
  <div class="mod_table">
    <h3 class="table_title">卫生疫控免疫实施档案</h3>
    <ul class="table_body">
      <li class="item">
        <span class="item_name">性别：</span>
        <span class="item_value">男</span>
      </li>
      <li class="item">
        <span class="item_name">性别：</span>
        <span class="item_value">男</span>
      </li>
      <li class="item">
        <span class="item_name">性别：</span>
        <span class="item_value">男</span>
      </li>
      <li class="item">
        <span class="item_name">性别：</span>
        <span class="item_value">男</span>
      </li>
    </ul>
    <div class="table_footer">
      <span class="footer_item">操作员：</span>
      <span class="footer_item">技术审核：</span>
      <span class="footer_item">监督执行：</span>
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color'

.mod_table
  width 100%
  .table_title
    margin 0
    line-height 60px
    border-bottom 1px solid color-green
    font-size 25px
    font-weight normal
    color color-green
    text-align center
  .table_body
    overflow hidden
    box-sizing border-box
    margin 10px 0
    width 100%
    border-left 1px solid #ddd
    border-top 1px solid #ddd
    list-style none
    .item
      overflow hidden
      box-sizing border-box
      float left
      width 50%
      line-height 23px
      .item_name
        float left
        box-sizing border-box
        padding 8px 0
        width 30%
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
        text-align center
      .item_value
        float left
        box-sizing border-box
        padding 8px 10px
        width 70%
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
        text-align left
  .table_footer
    line-height 50px
    .footer_item
      margin-right 30px
</style>
