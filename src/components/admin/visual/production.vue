<template>
    <div class="admin-form mod_production">
        <div class="production-search">
            <el-select v-model="condition" @change="change">
                <el-option
                  v-for="con in conditions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-if="condition === 'date'"
                class="search-input"
                v-model="time"
                type="daterange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-input v-else-if="condition !== 'all'" v-model="keyWords" placeholder="请输入查询关键字" class="search-input"></el-input>
            <el-button type="primary" @click="getProList()">搜索</el-button>

            <el-button @click="getProList(0)">图片</el-button>
            <el-button @click="getProList(1)">视频</el-button>
        </div>
        <div class="production-view">
            <div class="production-content" v-for="(item, i) in proList" :key="i">
                <el-card>
                    <i v-if="item.filetype === 1" class="el-icon-caret-right video-icon "></i>
                    <img @click="showPop(i)" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info">症状描述：{{ item.symptom }}</p>
                    <p class="production-info">解决方案：{{ item.solution }}</p>
                    <el-dialog
                      :visible.sync="productionShow[i]"
                      width="50%"
                      center>
                        <!-- FIXME: video 标签兼容性处理 -->
                        <div class="show-detail">
                            <video v-if="item.filetype === 1" :src="item.url" class="production-video" controls="controls"></video>
                            <img v-else class="production-image-detail" :src="item.url" :onerror="defaultImg">
                        </div>
                        <div class="show-list">
                            <ul>
                                <li><el-tag>商标耳牌</el-tag> {{ item.brand }}</li>
                                <li><el-tag>检疫耳牌</el-tag> {{ item.vaccine }}</li>
                                <li><el-tag>畜牧性别</el-tag> {{ item.sex }}</li>
                                <li><el-tag type="warning">症状描述</el-tag> {{ item.symptom }}</li>
                                <li><el-tag type="danger">解决方案</el-tag> {{ item.solution }}</li>
                                <li><el-tag type="success">就诊专家</el-tag> {{ item.expert }}</li>
                                <li><el-tag>上传日期</el-tag> {{ item.udate }}</li>
                            </ul>
                        </div>
                        <div slot="footer">
                            <el-button size="small" type="primary" @click="deleteItem(item, i)">删除</el-button>
                        </div>
                    </el-dialog>
                </el-card>
            </div>
        </div>

        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="12"
          :current-page.sync="pageNumb"
          @current-change="getProList">
        </el-pagination>
    </div>
</template>

<script>
import { diaSearchAll, diaSearchByExpert, diaSearchByDate, diaSearchByBrand, diaSearchByVaccine, diaSearchBySymptom, diaSearchByUploader, deleteDiagnose } from '@/util/getdata'
import { baseUrl } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data () {
        return {
            conditions: [
                {value: 'all', label: '所有数据'},
                {value: 'expert', label: '专家名'},
                {value: 'date', label: '日期'},
                {value: 'brand', label: '商标耳牌'},
                {value: 'vaccine', label: '检疫耳牌'},
                {value: 'symptom', label: '症状'},
                {value: 'uploader', label: '上传人'},
            ],
            diaSearch: { // 查询接口对象
                expert: diaSearchByExpert,
                date: diaSearchByDate,
                brand: diaSearchByBrand,
                vaccine: diaSearchByVaccine,
                symptom: diaSearchBySymptom,
                uploader: diaSearchByUploader
            },
            // 设置出错图片
            defaultImg: 'this.src="//otxtxlg3e.bkt.clouddn.com/FA4EA1F6F081AAC90EA490C18481189C.jpg"',
            condition: 'all',
            time: [],
            keyWords: '',
            productionShow: [],
            proList: [],
            pageNumb: 1,
            total: 0,
            limit: 12
        }
    },

    mounted () {
        this.getProList()
    },

    methods: {
        deleteItem (item, index) {
            deleteDiagnose(item.id).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('删除成功')
                    this.$set(this.productionShow, index, true)
                    this.getProList()
                }
            })
        },

        showPop (i) {
            this.$set(this.productionShow, i, true);
        },
        change () {
            this.pageNumb = 1
        },

        // 0 只获取图片
        // 1 只获取视频
        // 2 获取全部（默认值）
        getProList (isImg = 2) {
            if(this.condition === 'all') { // 查询所有数据
                diaSearchAll({
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit,
                    filetype: isImg
                }).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = `${baseUrl}/pic/${item.filename}`
                        })
                        //     arr.push({
                        //         symptom: item.symptom,
                        //         solution: item.solution,
                        //         brand: item.brand,
                        //         vaccine: item.vaccine,
                        //         sex: item.sex,
                        //         expert: item.expert,
                        //         udate: item.udate,
                        //         url: `${baseUrl}/pic/${item.filename}`,
                        //         filetype: item.filetype
                        //     })
                        // })
                        this.proList = res.data.List
                        this.total = res.data.size
                        this.productionShow = new Array(arr.length).fill(false);
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            }else if(this.condition === 'date') { // 按日期查询
                diaSearchByDate({
                    sdate: this.time[0] || null,
                    edate: this.time[1] || null,
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit,
                    filetype: isImg
                }).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = `${baseUrl}/pic/${item.filename}`
                        })
                        //     arr.push({
                        //         symptom: item.symptom,
                        //         solution: item.solution,
                        //         brand: item.brand,
                        //         vaccine: item.vaccine,
                        //         sex: item.sex,
                        //         expert: item.expert,
                        //         udate: item.udate,
                        //         url: `${baseUrl}/pic/${item.filename}`,
                        //         filetype: item.filetype
                        //     })
                        // })
                        this.proList = res.data.List
                        this.total = res.data.size
                        this.productionShow = new Array(arr.length).fill(false);
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            } else { // 按相应条件查询
                this.diaSearch[this.condition]({
                    [this.condition]: this.keyWords,
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit,
                    filetype: isImg
                }).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = `${baseUrl}/pic/${item.filename}`
                        })
                        //     arr.push({
                        //         symptom: item.symptom,
                        //         solution: item.solution,
                        //         brand: item.brand,
                        //         vaccine: item.vaccine,
                        //         sex: item.sex,
                        //         expert: item.expert,
                        //         udate: item.udate,
                        //         url: `${baseUrl}/pic/${item.filename}`,
                        //         filetype: item.filetype
                        //     })
                        // })
                        this.proList = res.data.List
                        this.total = res.data.size
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
.mod_production
    .el-card__body
        padding 10px
        position: relative
    .el-dialog__close
        font-size: 25px
    .el-dialog__body
        padding-top: 40px    
    .production-search
        margin 10px auto 15px
        .search-input
            width 400px
    .production-view
        overflow hidden
        .production-content
            float left
            width calc((100% - 30px)/4)
            font-size 15px
            margin 0 10px 10px 0
            &:nth-of-type(4n)
                margin-right 0
            .video-icon 
                font-size: 100px
                color: #f5f7facf
                position: absolute
                top: 30px
                left: 90px
                cursor: pointer 
                pointer-events:none    
            .production-image
                display block
                width 100%
                height 160px
                cursor pointer
            .production-video
                width 100%
            .production-info
                overflow hidden
                margin 0
                width 100%
                line-height 30px
                white-space nowrap
                text-overflow ellipsis
        .show-detail
            width 95%
            margin 0 auto 20px
            border 1px solid #ccc
            .production-image-detail
                display block
                width 100%
                cursor pointer
        .show-list
            width 90%
            margin 0 auto
            li
                margin-top 10px
            .el-tag
                margin-right: 10px
                font-size: 14px
    .el-pagination
        text-align right
</style>
