<template>
    <div class="admin-form">
        <p class="card-title">诊断可视</p>

        <div class="diagnose-upload">
            <p>请选择上传文件:</p>
            <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="">上传</Button>
                <Button>删除</Button>
            </Upload>
        </div>
        <form>
            <div class="diagonse-form">
                <span class="demonstration">畜生性别:</span>
                <el-cascader
                    :options="sex"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
            <div class="diagonse-form">
                <span>商标耳牌:</span>
                <el-input v-model="input" placeholder="请输入十五位商标耳牌"></el-input>
            </div>
            <div class="diagonse-form">
                <span>检疫耳牌:</span>
                <el-input v-model="input" placeholder="请输入八位检疫耳牌"></el-input>
            </div>
            <div class="diagonse-form">
                <span class="demonstration">就诊专家:</span>
                <el-cascader
                    :options="expert"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
            <div class="diagonse-form">
                <span>症状描述:</span>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请详细描述症状以供专家诊断"
                    v-model="textarea1">
                </el-input>
            </div>
            <div class="diagonse-form">
                <span>诊断结果:</span>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入诊断结果"
                    v-model="textarea2">
                </el-input>
            </div>
            <div class="diagonse-form">
                <span>解决方案:</span>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入解决方案"
                    v-model="textarea3">
                </el-input>
            </div>

            <input type="submit" name="提交">     
        </form>

        <!-- <div class="diagnose-show">
            <div class="diagnose-detail">图片详情或播放视频</div>
            <div class="diagonse-list">
                <ul>
                    <li>商标耳牌：</li>
                    <li>检疫耳牌：</li>
                    <li>畜牧性别：</li>
                    <li>症状描述</li>
                    <li>解决方案：</li>
                    <li>就诊专家：</li>
                    <li>上传日期：</li>
                </ul>
            </div>
        </div> -->            

        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>

    </div>
</template>

<script>
import Submitter from '@/components/admin/submitter'

export default {
    components: {
        Submitter
    },

    props: {
        submitter: {
            type: Object,
            default () {
                return {
                    operator: '',
                    reviewer: '',
                    executor: ''
                }
            }
        }
    },

    data () {
        return {
            sex:[{
                value:'',
                label:'雌',
            },{
                value:'',
                label:'雄',
            }],
            expert:[{
                value:'',
                label:'a',
            },{
                value:'',
                label:'b',
            },{
                value:'',
                label:'c',
            }]
        }
    }
}
</script>

<style lang="stylus">
.diagnose-upload
    display:relative;
    p
        display:inline-block;
    #diagnose-upcont
        width: 400px;
    #diagnose-up
        position:absulote;
        opacity:0;
        left:0px;
        top:0px;

form
    width:80%;
    margin:0 auto;
    .diagonse-form
        width:60%;
        margin: 20px auto;
        .el-input,.el-textarea
            width:60%;

.diagnose-show
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-around;
    margin:20px; 
    .diagnose-detail
        width:600px;
        height:300px;
        background:lightgreen;
</style>
