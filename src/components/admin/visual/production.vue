<template>
    <div class="admin-form">
        <p class="card-title">生产环节可视</p>

        <div class="production-search">
            <span>按条件进行搜索</span>
            <el-select v-model="condition">
                <el-option
                  v-for="con in conditions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value">
                </el-option>
            </el-select>
            <el-input v-model="input" placeholder="请输入内容" class="search-input"></el-input>
            <el-button type="primary" @click="onSubmit()">搜索</el-button>
        </div>
        <div class="production-view">
            <div class="production-content" v-for="(item, i) in items" :key="i">
                <el-card>
                    <el-button type="text" @click="productionShow = true">
                        <div class="production-image"></div>
                    </el-button>
                    <p>症状描述：{{ item.describe }}</p>
                    <p>解决方案：{{ item.solve }}</p>
                    <el-dialog
                      :visible.sync="productionShow"
                      width="50%"
                      center>
                        <div class="show-detail">图片详情或播放视频</div>
                        <div class="show-list">
                            <ul>
                                <li>商标耳牌： {{ item.brand }}</li>
                                <li>检疫耳牌： {{ item.check }}</li>
                                <li>畜牧性别： {{ item.sex }}</li>
                                <li>症状描述:  {{ item.symptom }}</li>
                                <li>解决方案： {{ item.detailSolve }}</li>
                                <li>就诊专家： {{ item.expert }}</li>
                                <li>上传日期： {{ item.time }}</li>
                            </ul>
                        </div>
                    </el-dialog>
                </el-card>
            </div>
        </div>

        <el-pagination
          layout="prev, pager, next"
          :total="1000"
          :current-page.sync="pageNumb">
        </el-pagination>
    </div>
</template>

<script>
import { diaSearchExpert } from '@/util/getdata'

export default {
    data () {
        return {
            conditions: [
                {value: '1', label: '专家名'},
                {value: '2', label: '日期'},
                {value: '3', label: '商标耳牌'},
                {value: '4', label: '检疫耳牌'},
                {value: '5', label: '症状'}
            ],
            condition: '',
            // search: {
            //     input: '',
            //     pageNumb: '1',
            //     limit: '8'
            // },
            input: '',
            productionShow: false,
            items: [
                // {solve: '0', brand: '0'},
                // {solve: '1', brand: '1'},
                // {solve: '2', brand: '2'},
                // {solve: '3', brand: '3'},
                // {solve: '4', brand: '4'},
                // {solve: '5', brand: '5'},
                // {solve: '6', brand: '6'},
                // {solve: '7', brand: '7'}
            ],
            pageNumb: 1,
        }
    },

    methods : {
        onSubmit () {
            console.log(this.condition)
            if(this.condition === '1') {
                diaSearchExpert({
                    expert: this.input,
                    pageNumb: this.pageNumb,
                    // 
                }).then(res => {
                    if(isReqSuccessful(res)) {
                        this.items = res.data
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            }
        } 
    }
}
</script>

<style lang="stylus">
.production-search
    width 80%
    margin 10px auto
    span
        line-heigt 100%
    .search-input
        width 50%

.production-view
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    .production-content
        font-size 15px
        margin 10px 10px
        .production-image
            width 200px
            height 100px
            border 1px solid #ccc

.el-dialog__wrapper
    .show-detail
        width 50%
        height 250px
        margin 0 auto
        margin-bottom 5%
        border 1px solid #ccc
    .show-list
        width 80%
        margin 0 auto

.el-pagination
   text-align right
</style>
