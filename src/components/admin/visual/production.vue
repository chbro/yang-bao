<template>
    <div class="admin-form">
        <p class="card-title">生产环节可视</p>
        
        <div class="production-search">
            <p>按条件进行搜索</p>
            <select name="condition">
                <option>用户名</option>
                <option>xxx</option>
                <option>yyy</option>
            </select>
            <input type="text" name="search" id="pro-search">
            <input type="submit" value="搜索" id="pro-button">
        </div>
        <div class="production-view">
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
            <div class="production-content">
                <div class="production-image"></div>
                <p>症状描述：</p>
                <p>解决方案：</p>
            </div>
        </div>

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

    data () {
        return {

        }
    }
}
</script>

<style lang="stylus">
.production-search
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    input,select,p
        height:30px;
        align-self:center;
    p
        display:inline-block;
    #pro-search
        width:400px;
    #pro-button
        width:60px;
    

.production-view
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-around;
    .production-content
        font-size:15px;
        margin: 10px 50px;
        .production-image
            width:200px;
            height:100px;
            border:1px solid #ccc;
</style>
