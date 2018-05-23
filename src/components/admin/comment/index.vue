<template>
    <div class="admin-form mod_comment">
        <p class="card-title">留言查询</p>
        <div class="border-main">
            <el-input class="comment_search" v-model="commentMessage" placeholder="请输入留言关键词">
                <template slot="prepend">留言关键词</template>
            </el-input>
            <el-button type="primary" @click="searchComment">搜索</el-button>
            <div class="comment_message">
                <span class="message_title">购买意向:</span>
                <el-radio-group v-model="commentIntention">
                    <el-radio label="1">有</el-radio>
                    <el-radio label="2">无</el-radio>
                </el-radio-group>
            </div>
            <div class="comment_message">
                <span class="message_title">用户态度:</span>
                <el-radio-group v-model="commentAttitude">
                    <el-radio label="1">非常不满意</el-radio>
                    <el-radio label="2">不满意</el-radio>
                    <el-radio label="3">一般</el-radio>
                    <el-radio label="4">满意</el-radio>
                    <el-radio label="5">非常满意</el-radio>
                </el-radio-group>
            </div>
            <div class="comment_message">
                <span class="message_title">留言时间:</span>
                    <el-date-picker
                        v-model="commentTime"
                        size="small"
                        type="daterange"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
            </div>
        </div>

        <el-table
            :data="commentData"
            tooltip-effect="dark"
            class="admin-table comment_table"
            style="width: 100%">
            <el-table-column
                prop="username"
                align="center"
                label="用户名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="contact"
                label="联系方式"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="message"
                label="留言内容"
                align="center"
                width="300">
            </el-table-column>
            <el-table-column
                prop="inserttime"
                label="留言时间"
                align="center"
                width="200">
            </el-table-column>
            <el-table-column
                prop="intention"
                label="有无购买意向"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="attitude"
                label="用户态度"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="160">
                <template slot-scope="scope">
                    <span class="table_delete" @click="deleteComment(scope.$index)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="searchComment"
          :current-page.sync="pageNumb">
        </el-pagination>
    </div>
</template>

<script>
import { Comment, deleteComment } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data () {
        return {
            commentMessage: '',
            commentIntention: '',
            commentAttitude: '',
            commentTime: [],
            intention: {
                1: '有',
                2: '无'
            },
            map: {
                1: '非常不满意',
                2: '不满意',
                3: '一般',
                4: '满意',
                5: '非常满意'
            },
            commentData: [],
            total: 1,
            pageNumb: 1,
            limit: 10
        }
    },

    mounted () {
        this.searchComment()
    },

    methods: {
        searchComment () {
            Comment({
                message: this.commentMessage,
                intention: this.commentIntention,
                attitude: this.commentAttitude,
                sTime: this.commentTime.length ? this.commentTime.join(',') : null,
                pageNumb: this.pageNumb - 1,
                limit: this.limit
            }).then(res => {
                if (isReqSuccessful(res)) {
                    this.commentData = []
                    res.data.List.forEach((item) => {
                        this.commentData.push({
                            id: item.id,
                            username: item.username,
                            contact: item.contact,
                            message: item.message,
                            inserttime: item.inserttime,
                            intention: this.intention[item.intention],
                            attitude: this.map[item.attitude]
                        })
                    })
                    this.total = res.data.Size
                }
            }).catch(_ => {
                this.$message.error('查询失败')
            })
        },
        deleteComment (index) {
            this.$confirm('此操作将永久删除该条评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteComment({
                    id: this.commentData[index].id
                }).then(res => {
                    if(isReqSuccessful(res)) {
                        this.$message.success('该条评论删除成功')
                        this.searchComment()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.mod_comment
    font-size 15px
    .comment_search
        margin-bottom 10px
    .el-input-group
        width 500px
    .comment_message
        padding-left 5px
        line-height 35px
        .message_title
            margin-right 10px
    .comment_table
        margin-top 10px
        .table_delete
            cursor pointer
</style>
