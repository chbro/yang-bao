<template>
    <div>
        <el-button>添加角色</el-button>
        <el-button @click="addUser = true">添加用户</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="addUser"
            :model="rules"
            width="50%"
            center>
            <div class="rules" v-for="(item, i) in items" :key="i">
                <span>免疫实施档案:</span>
                <span v-text="item.text"></span>
                <el-checkbox-group v-model="rules">
                    <el-checkbox :label="i + '-' + 0">增加</el-checkbox>
                    <el-checkbox :label="i + '-' + 1">删除</el-checkbox>
                    <el-checkbox :label="i + '-' + 2">查询</el-checkbox>
                    <el-checkbox :label="i + '-' + 3">修改</el-checkbox>
                    <template v-if="item.supervise">
                        <el-checkbox :label="i + '-' + 4">监督</el-checkbox>
                        <el-checkbox :label="i + '-' + 5">审核</el-checkbox>
                    </template>
                    <el-checkbox :label="i + '-' + 6"></el-checkbox>
                </el-checkbox-group>
            </div>
             <div class="rules">
                <span>阶段营养档案:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
                <el-checkbox v-model="rule">监督</el-checkbox>
                <el-checkbox v-model="rule">审核</el-checkbox>
            </div>
            <!-- <div class="rules">
                <span>卫生动物福利档案:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
                <el-checkbox v-model="rule">监督</el-checkbox>
                <el-checkbox v-model="rule">审核</el-checkbox>
            </div>
            <div class="rules">
                <span>方案:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>代理:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>客户:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>专家评价:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
                <el-checkbox v-model="rule">查看总评分</el-checkbox>
            </div>
            <div class="rules">
                <span>直播:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">禁止</el-checkbox>
            </div>
            <div class="rules">
                <span>社区活动:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>信息发布:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>系谱档案:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>视频:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>图片:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>用户:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>专家:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>技术员:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>管理员:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>
            <div class="rules">
                <span>拓展模块信息查询:</span>
                <el-checkbox v-model="rule">增加</el-checkbox>
                <el-checkbox v-model="rule">删除</el-checkbox>
                <el-checkbox v-model="rule">查询</el-checkbox>
                <el-checkbox v-model="rule">修改</el-checkbox>
            </div>            -->
            <span>rules:{{ rules }}</span>
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-dialog>
    </div>
    <!-- <div>
        <el-button>添加角色</el-button>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="代理等级">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="总代理" value="0"></el-option>
                    <el-option label="省级代理" value="1"></el-option>
                    <el-option label="市级代理" value="2"></el-option>
                    <el-option label="县级代理" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="代理所属地域">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="上级代理">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div> -->
    <!-- <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="羊场编号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="羊场名称">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <span>羊场地理位置</span>
            <el-cascader
                expand-trigger="hover"
                :options="farmAddress"
                v-model="farmSelect"
                @change="handleChange">
            </el-cascader>
            <el-form-item label="羊场负责人">
                <el-select v-model="form.admin" placeholder="请选择">
                    <el-option label="aaa,111" value="0"></el-option>
                    <el-option label="bbb,222" value="1"></el-option>
                    <el-option label="ccc,333" value="2"></el-option>
                    <el-option label="ddd,444" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item label="消毒场所">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item label="上级代理">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <span>上传时间</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div> -->
</template>

<script>
export default {
    data () {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: 'xxxx'
            }],
            addUser: false,
            items: [
                {text: '免疫实施档案', supervise: 1}
            ],
            rules: [],
            form: {
                region: '',
                name: '',
                address: '',
                pre: ''
            },
            // farmAddress: {
            //     value: 'beijing',
            //     label: '北京市',
            //     children: [{
            //         value: 'beijing',
            //         label: '北京市',
            //         children: [{
            //             value: 'chaoyang',
            //             label: '朝阳区'
            //         },{
            //             value: 'haidian',
            //             label: '海淀区'
            //         }]
            //     }]
            // },
            value: '',
            method: {
                handleChange (value) {
                    console.log(value)
                }
            }
        }
    }
}
</script>

<style lang="stylus">
.rules
    margin 10px
</style>
