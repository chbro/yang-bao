<template>
    <div class="admin-form">
        <div class="comment-manage">
            <span>留言关键词</span>
            <el-input v-model="comment.message" placeholder="请输入内容" class="search-input"></el-input>
            <el-button type="primary" @click="onSubmit()">搜索</el-button>
        </div>
        <div class="comment-manage">
            <span>购买意向:</span>
            <el-radio-group v-model="comment.buy">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
            </el-radio-group>
        </div>
        <div class="comment-manage">
            <span>用户态度:</span>
            <el-radio-group v-model="comment.attitude">
                <el-radio label="1">非常不满意</el-radio>
                <el-radio label="2">不满意</el-radio>
                <el-radio label="3">一般</el-radio>
                <el-radio label="4">满意</el-radio>
                <el-radio label="5">非常满意</el-radio>
            </el-radio-group>
        </div>
        <div class="comment-manage">
            <span>留言时间:</span>
            <el-radio-group v-model="comment.time">
                <el-radio label="1">三天内</el-radio>
                <el-radio label="2">一周以内</el-radio>
                <el-radio label="3">一个月以内</el-radio>
            </el-radio-group>
        </div>

        <div class="comment-content" v-for="(item, i) in items" :key="i">
            <div class="comment-message" >
                <p>用户名: {{ item.username}}</p>
                <p>联系方式:  {{ item.contact}}</p>
            </div>
            <div class="comment-detail">
                <p>留言内容：{{ item.inserttime}}</p>
                <p>留言时间: {{ item.time}}</p>
                <p>有无购买意向: {{ item.check}}</p>
                <p>用户态度: {{ map[item.attitude]}}</p>
            </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="limit"
          @current-change="fetchData"
          :current-page.sync="pageNumb">
        </el-pagination>
    </div>
</template>

<script>
import { Comment } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data () {
        return {
            comment: {
                message: '',
                buy: '',
                attitude: '',
                time: ''
            },

            buy: [
                {radio: '1'},
                {radio: '2'}
            ],
            attitude: [
                {radio: '1'},
                {radio: '2'},
                {radio: '3'},
                {radio: '4'},
                {radio: '5'}
            ],
            time: [
                {radio: '1'},
                {radio: '2'}
            ],
            items: [
                {}
            ],
            map: {
                1: '非常不满意',
                2: '不满意',
                3: '一般',
                4: '满意',
                5: '非常满意'
            },
            pageNumb: 1,
            limit: 10
        }
    },

    methods: {
        onSubmit () {
            Comment(this.comment).then(res => {
                if (isReqSuccessful(res)) {
                    this.items = res.data.data
                    this.$router.push({name: 'comment'})
                }
            }).catch(_ => {
                this.$message.error('查询失败')
            })
        }
    }
}
</script>

<style lang="stylus">
.comment-manage
    width 60%
    margin 10px auto
    .search-input
       width 30%

.comment-content
    border 1px solid #ccc
    width 80%
    margin 20px auto
    display flex
    .comment-message
        width 35%
        margin-left 8%
    .comment-detail
        margin-right 8%
</style>
