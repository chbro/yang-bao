<template>
  <div class="mod_professorCourseVideo">
    <el-upload
      class="professorCourseVideo_upload"
      ref="upload"
      :action="url"
      :data="data"
      name="file"
      :file-list="fileList"
      :disabled="disabled"
      :limit="1"
      accept="video/*"
      :on-exceed="exceed"
      :before-upload="checkFile"
      :on-change="change"
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
      class="admin-table"
      :data="videoList"
      style="width: 100%">
      <el-table-column
        prop="gmtCreate"
        label="上传日期"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="professorName"
        label="专家姓名"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="视频名称"
        align='center'>
      </el-table-column>
      <el-table-column
        class="action"
        label="操作"
        align='center'
        fixed="right"
        width="160">
        <template slot-scope="scope">
          <div class="opr">
            <a class="opr_download" :href="downloadLink(scope.$index)" download>下载</a>
            <span class="opr_delete" @click="deleteVideo(scope.$index)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="getVideoList"
      :current-page.sync="page">
    </el-pagination>
  </div>
</template>

<script>
  import { baseUrl } from '@/util/fetch.js'
  import { getVideo, deleteVideo, getUserById } from '@/util/getdata.js'
  import { isReqSuccessful } from '@/util/jskit'
  export default {
    data() {
      return {
        // 上传 URL
        url: `${baseUrl}/video/upload`,
        fileList: [],
        // 上传视频参数
        data: {},
        disabled: false,
        videoList: [],
        // 数据总数
        total: 0,
        // 当前页数
        page: 1
      }
    },
    created () {
      let id = this.$route.params.id
      getUserById(id).then(res => {
        if (isReqSuccessful(res)) {
          this.data = {
            professorId: id,
            professorName: res.data.pkUserid
          }
        }
      })
      this.getVideoList()
    },
    methods: {
      submitUpload() {
        if(!this.fileList.length) {
          this.$message.warning('请选取视频文件')
          return false
        }
        this.$refs.upload.submit()
        this.disabled = true
      },
      exceed () {
        this.$message.warning('每次只能上传一个视频')
      },
      checkFile (file) {
        const type = file.name.substring(file.name.indexOf('.') + 1)      
        const isExceed = file.size / 1024 / 1024 <= 500
        if(!isExceed) {
          this.$message.warning('视频文件大小不能超过500M')
          return isExceed
        }
        return true
      },
      change (file) {
        if(file.status === 'ready') { // 添加文件时更新文件列表
          this.fileList.push(file)
        }
      },
      success (response) {
        if(isReqSuccessful(response)) {
          // 清空文件上传列表
          this.$refs.upload.clearFiles()
          this.fileList = []
          this.disabled = false
          this.$message.success('视频上传成功')
        }
      },
      error () {
        // 清空文件上传列表
        this.$refs.upload.clearFiles()
        this.fileList = []
        this.disabled = false
        this.$message.error('视频上传失败，请重新上传')
      },
      // 获取视频文件列表
      getVideoList () {
        getVideo({
          page: this.page - 1
        }).then(res => {
          this.videoList = []
          if(isReqSuccessful(res)) {
            this.total = res.data.size || 0
            res.data.List.forEach((item) => {
              this.videoList.push({
                id: item.id,
                gmtCreate: item.gmtCreate,
                professorName: item.professorName,
                fileName: item.fileName,

              })
            })
          }
        })
      },
      downloadLink (index) {
        return `${baseUrl}/movie/${this.videoList[index].fileName}`
      },
      // 删除视频
      deleteVideo (index) {
        this.$confirm('此操作将永久删除该视频文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteVideo(this.videoList[index].id).then(res => {
            if(isReqSuccessful(res)) {
              this.$message.success('该条视频删除成功')
              this.getVideoList()
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
  .mod_professorCourseVideo
    .professorCourseVideo_upload
      margin 0 0 15px 10px
    .opr_download
      color #606266
    .opr_delete
      cursor pointer
    .el-pagination
      margin: 10px 0 0 0
      text-align right 
</style>
