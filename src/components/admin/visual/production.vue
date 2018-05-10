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
        </div>
        <div class="production-view">
            <div class="production-content" v-for="(item, i) in proList" :key="i">
                <el-card>
                    <img @click="productionShow = true" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info">症状描述：{{ item.symptom }}</p>
                    <p class="production-info">解决方案：{{ item.solution }}</p>
                    <el-dialog
                      :visible.sync="productionShow"
                      width="50%"
                      center>
                        <!-- FIXME: video 标签兼容性处理 -->
                        <div class="show-detail">
                            <img @click="productionShow = true" class="production-image" :src="item.url" :onerror="defaultImg">
                            <video :src="item.url" class="production-video" controls="controls"></video>
                        </div>
                        <div class="show-list">
                            <ul>
                                <li>商标耳牌： {{ item.brand }}</li>
                                <li>检疫耳牌： {{ item.vaccine }}</li>
                                <li>畜牧性别： {{ item.sex }}</li>
                                <li>症状描述:  {{ item.symptom }}</li>
                                <li>解决方案： {{ item.solution }}</li>
                                <li>就诊专家： {{ item.expert }}</li>
                                <li>上传日期： {{ item.udate }}</li>
                            </ul>
                        </div>
                    </el-dialog>
                </el-card>
            </div>
        </div>

        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pageNumb"
          @current-change="getProList">
        </el-pagination>
    </div>
</template>

<script>
import { diaSearchAll, diaSearchByExpert, diaSearchByDate, diaSearchByBrand, diaSearchByVaccine, diaSearchBySymptom, diaSearchByUploader } from '@/util/getdata'
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
            defaultImg: 'this.src="//img1.mukewang.com/szimg/5a9dfab40001bf1005400300.jpg"',
            condition: 'all',
            time: [],
            keyWords: '',
            productionShow: false,
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
        change () {
            this.pageNumb = 1
        },
        getProList () {
            if(this.condition === 'all') { // 查询所有数据
                diaSearchAll({
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit
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
                            arr.push({
                                symptom: item.symptom,
                                solution: item.solution,
                                brand: item.brand,
                                vaccine: item.vaccine,
                                sex: item.sex,
                                expert: item.expert,
                                udate: item.udate,
                                url: `${baseUrl}/pic/${item.filename}`
                            })
                        })
                        this.proList = arr
                        this.total = res.data.size
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            }else if(this.condition === 'date') { // 按日期查询
                diaSearchByDate({
                    sdate: this.time[0] || null,
                    edate: this.time[1] || null,
                    pageNumb: this.pageNumb,
                    limit: this.limit
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
                            arr.push({
                                symptom: item.symptom,
                                solution: item.solution,
                                brand: item.brand,
                                vaccine: item.vaccine,
                                sex: item.sex,
                                expert: item.expert,
                                udate: item.udate,
                                url: `${baseUrl}/pic/${item.filename}`
                            })
                        })
                        this.proList = arr
                        this.total = res.data.size
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            } else { // 按相应条件查询
                this.diaSearch[this.condition]({
                    [this.condition]: this.keyWords,
                    pageNumb: this.pageNumb,
                    limit: this.limit
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
                            arr.push({
                                symptom: item.symptom,
                                solution: item.solution,
                                brand: item.brand,
                                vaccine: item.vaccine,
                                sex: item.sex,
                                expert: item.expert,
                                udate: item.udate,
                                url: `${baseUrl}/pic/${item.filename}`
                            })
                        })
                        this.proList = arr
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
            .production-image
                display block
                width 100%
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
            width 70%
            margin 0 auto 20px
            border 1px solid #ccc
        .show-list
            width 80%
            margin 0 auto
    .el-pagination
        text-align right
</style>
