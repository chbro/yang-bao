<template>
	<div class="admin-form">
		<p class="card-title">生产环节可视</p>
		
		<div class="production-search">
			<span>按条件进行搜索</span>
			<el-cascader
				:options="condition"
				v-model="selectedOptions"
				@change="handleChange">
			</el-cascader>
			<el-input v-model="input" placeholder="请输入内容" class="search-input"></el-input>
			<el-button type="primary" @click="onSubmit">搜索</el-button>
		</div>
		<div class="production-view">
			<el-card class="production-content">
        		<el-button type="text" @click="productionShow0 = true">
        			<div class="production-image"></div>
        		</el-button>
				<p>症状描述：</p>
				<p>解决方案：</p>
        	</el-card>
        	<el-dialog
			  :visible.sync="productionShow0"
			  width="50%"
			  center>
			    <div class="show-detail">图片详情或播放视频</div>
                <div class="show-list">
	                <ul>
	                    <li>商标耳牌：aaa</li>
	                    <li>检疫耳牌：</li>
	                    <li>畜牧性别：</li>
	                    <li>症状描述</li>
	                    <li>解决方案：</li>
	                    <li>就诊专家：</li>
	                    <li>上传日期：</li>
	                </ul>
                </div>
			</el-dialog>

            <el-card class="production-content">
        		<el-button type="text" @click="productionShow1 = true">
        			<div class="production-image"></div>
        		</el-button>
				<p>症状描述：</p>
				<p>解决方案：</p>
        	</el-card>
        	<el-dialog
			  :visible.sync="productionShow1"
			  width="50%"
			  center>
			    <div class="show-detail">图片详情或播放视频</div>
                <div class="show-list">
	                <ul>
	                    <li>商标耳牌：bbb</li>
	                    <li>检疫耳牌：</li>
	                    <li>畜牧性别：</li>
	                    <li>症状描述</li>
	                    <li>解决方案：</li>
	                    <li>就诊专家：</li>
	                    <li>上传日期：</li>
	                </ul>
                </div>
			</el-dialog>

			<el-card class="production-content">
        		<div class="production-image"></div>
				<p>症状描述：</p>
				<p>解决方案：</p>
        	</el-card>
			<el-card class="production-content">
        		<div class="production-image"></div>
				<p>症状描述：</p>
				<p>解决方案：</p>
        	</el-card>
		</div>

		<div class="comment-manage">
			<span>留言关键词</span>
			<el-input v-model="input" placeholder="请输入内容" class="search-input"></el-input>
		    <el-button type="primary" @click="onSubmit">搜索</el-button>
		</div>
		<div class="comment-manage">
			<span>购买意向:</span>
			<el-radio v-model="buy" label="1">有</el-radio>
			<el-radio v-model="buy" label="2">无</el-radio>
		</div>
		<div class="comment-manage">
			<span>用户态度:</span>
			<el-radio v-model="altitude" label="1">非常不满意</el-radio>
			<el-radio v-model="altitude" label="2">不满意</el-radio>
			<el-radio v-model="altitude" label="3">一般</el-radio>
			<el-radio v-model="altitude" label="4">满意</el-radio>
			<el-radio v-model="altitude" label="5">非常满意</el-radio>
		</div>
		<div class="comment-manage">
			<span>留言时间:</span>
			<el-radio v-model="time" label="1">三天内</el-radio>
			<el-radio v-model="time" label="2">一周以内</el-radio>
			<el-radio v-model="time" label="3">一个月以内</el-radio>
		</div>
		<div class="comment-content">
			<div class="comment-message">
				<p>用户名:</p>
				<p>联系方式:</p>
			</div>
			<div class="comment-detail">
				<p>留言内容：</p>
				<p>留言时间:</p>
				<p>有无购买意向:</p>
				<p>用户态度:</p>
			</div>
		</div>
		<div class="comment-content">
			<div class="comment-message">
				<p>用户名:</p>
				<p>联系方式:</p>
			</div>
			<div class="comment-detail">
				<p>留言内容：</p>
				<p>留言时间:</p>
				<p>有无购买意向:</p>
				<p>用户态度:</p>
			</div>
		</div>
		<div class="comment-content">
			<div class="comment-message">
				<p>用户名:</p>
				<p>联系方式:</p>
			</div>
			<div class="comment-detail">
				<p>留言内容：</p>
				<p>留言时间:</p>
				<p>有无购买意向:</p>
				<p>用户态度:</p>
			</div>
		</div>
		<el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>

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
			condition:[{
				value:'',
				label:'用户名'
			},{
				value:'',
				label:'xxx'
			},{
				value:'',
				label:'yyy'
			}],

			buy:[{
				radio:'1',
			},{
				radio:'2',
			}],
			altitude:[{
				radio:'1',
			},{
				radio:'2',
			},{
				radio:'3',
			},{
				radio:'4',
			},{
				radio:'5',
			}],
			time:[{
				radio:'1',
			},{
				radio:'2',
			}],

			productionShow0: false,
			productionShow1: false,
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
	flex-direction row
	justify-content space-around

.el-pagination
   text-align right
</style>