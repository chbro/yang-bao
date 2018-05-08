<template>
  <div class="mod_professorCourseVideo">
    <el-upload
      class="professorCourseVideo_upload"
      ref="upload"
      :action="url"
      :data="data"
      name="file"
      :disabled="disabled"
      :limit="1"
      accept="video/*"
      :on-exceed="exceed"
      :before-upload="checkFile"
      :on-success="success"
      :on-error="error"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取课堂视频</el-button>
      <el-button style="margin-left: 10px;" :disabled="disabled" size="small" type="success" @click="submitUpload">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过500M</div>
    </el-upload>

    <el-table
      ref="table"
      tooltip-effect="light"
      :data="tableData3"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="上传日期"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="date"
        label="专家姓名"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="date"
        label="视频名称"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="date"
        label="视频链接"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        class="action"
        label="操作"
        align='center'
        width="160">
        <template slot-scope="scope">
          <div class="opr">
            <span class="opr_delete" @click="edit(scope.$index, 1)">删除</span>
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
  import { baseUrl } from '@/util/fetch.js'
  import { isReqSuccessful } from '@/util/jskit'
  export default {
    data() {
      return {
        // 上传 URL
        url: `${baseUrl}/video/upload`,
        // 上传视频参数
        data: {},
        disabled: false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    created () {
      this.data = {
        professorId: '16',
        professorName: '狗哥'
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit()
        this.disabled = true
      },
      exceed () {
        this.$message.warning('每次只能上传一个视频')
      },
      checkFile (file) {
        const type = file.name.substring(file.name.indexOf('.') + 1)      
        const isExceed = file.size / 1024 / 1024 <= 500
        if(type !== 'mp3' && type !== 'mp4') {
          this.$message.warning('只能上传mp3或者mp4文件')
          return false
        }
        if(!isExceed) {
          this.$message.warning('视频文件大小不能超过500M')
          return isExceed
        }
        return true
      },
      success (response) {
        if(isReqSuccessful(response)) {
          this.disabled = false
          this.$message.success('视频上传成功')
        }
      },
      error () {
        this.$message.error('视频上传失败，请重新上传')
      }
    }
  }
</script>

<style lang="stylus">
@import '~@/assets/css/color'
  .mod_professorCourseVideo
    .el-table th
      border-left none
      color #fff
      background-color color-main
    .professorCourseVideo_upload
      margin-bottom 15px
    .opr_delete
      cursor pointer
    .el-pagination
      margin: 10px 0 0 0
      text-align right 
</style>
