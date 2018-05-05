<template>
  <div class="mod_table">
    <h3 class="table_title">{{ title }}</h3>
    <ul v-if="type === 'table'" class="table_body">
      <li class="item" :class="{'item_large': item.size === 'large'}" v-for="item in data">
        <span class="item_name" :style="{width: getNameWidth(item.fieldNameWidth, item.size)}">{{ item.fieldName }}：</span>
        <span v-if="item.type === 'radio'" class="item_value" :style="{width: `calc(100% - ${getNameWidth(item.fieldNameWidth, item.size)})`}">
          <el-radio-group v-model="item.fieldValue" disabled>
            <el-radio :label="1">{{ item.label ? item.label[0] : '是' }}</el-radio>
            <el-radio :label="0">{{ item.label ? item.label[1] : '否' }}</el-radio>
          </el-radio-group>
        </span>
        <span v-else class="item_value" :style="{width: `calc(100% - ${getNameWidth(item.fieldNameWidth, item.size)})`}">{{ item.fieldValue }}</span>
      </li>
    </ul>
    <ul v-else-if="type === 'grid'" class="table_grid">
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
      <li><img class="grid_img" src="//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525432634333&di=56a587a615bcc4956589aa66650e5a15&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db9c8ebb8ae0f4bfb98dd96176b261285%2Ffaedab64034f78f0ccfc1ed473310a55b3191c25.jpg" alt=""></li>
    </ul>
    <div class="table_footer">
      <span class="footer_item">操作员：</span>
      <span class="footer_item">技术审核：</span>
      <span class="footer_item">监督执行：</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    getNameWidth (width, size) {
      if(width) {
        return size && size === 'large' ? (parseInt(width)/2) + '%' : width
      } else {
        return size && size === 'large' ? '20%' : '40%'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color'

.mod_table
  width 100%
  .table_title
    margin 0
    line-height 70px
    border-bottom 1px solid color-green
    font-size 25px
    font-weight normal
    color color-green
    text-align center
  .table_body
    display flex
    flex-wrap wrap
    box-sizing border-box
    margin 10px 0
    width 100%
    border-left 1px solid #ddd
    border-top 1px solid #ddd
    list-style none
    font-size 14px
    .item
      display flex
      box-sizing border-box
      width 50%
      line-height 23px
      .item_name
        box-sizing border-box
        padding 8px 15px
        // width 30%
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
      .item_value
        box-sizing border-box
        padding 8px 15px
        // width 70%
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
        text-align left
    .item_large
      width 100%
      .item_name
        // width 15%
      .item_value
        // width 85%
  .table_grid
    display flex
    flex-wrap wrap
    justify-content space-between
    box-sizing border-box
    margin 10px 0
    width 100%
    list-style none
    font-size 14px
    li
      margin-bottom 20px
      width 160px
      .grid_img
        width 100%
        height 100%
  .table_footer
    line-height 50px
    .footer_item
      margin-right 30px
</style>
