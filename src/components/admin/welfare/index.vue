<template>
    <div class="admin-form">
        <p class="card-title">卫生与动物福利</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">场内外环境卫生</p>
            <basic-info :items="place" :models="models"></basic-info>
        </div>
        <div class="card">
            <p class="card-title">操作人员卫生与安全</p>
            <basic-info :items="person" :models="models"></basic-info>
        </div>
        <div class="card">
            <p class="card-title">实验室卫生与安全</p>
            <basic-info :items="experiment" :models="models"></basic-info>
        </div>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, checkSubmit } from '@/util/jskit'

export default {
    components: {
        BasicInfo
    },

    data () {
        let radios = ['是', '否']

        return {
            items: [
                {type: 'radio', radios, label: '羊舍空气与温度', model: 'immuneEartag'},
                {type: 'radio', radios, label: '羊只运动与采光', model: 'nativeEartag'},
                {radios, label: '自检/主管上级检查时间', model: 'nativeEartag', type: 'time', mr: true},
                {type: 'radio', radios, label: '车辆进出消毒', model: 'nativeEartag'}
            ],

            place: [
                {type: 'radio', radios, label: '圈舍内外', model: 'immuneEartag'},
                {type: 'radio', radios, label: '饲料库房及加工车间', model: 'immuneEartag'},
                {type: 'radio', radios, label: '杀虫灭鼠', model: 'immuneEartag', mr: true}
            ],
            person: [
                {type: 'radio', radios, label: '消毒制度是否执行', model: 'immuneEartag'},
                {type: 'radio', radios, label: '是否赤手操作', model: 'immuneEartag'},
                {type: 'radio', radios, label: '疫苗及针头的消毒处理', model: 'immuneEartag', mr: true}
            ],
            experiment: [
                {type: 'radio', radios, label: '是否做到人员安全防护', model: 'immuneEartag'},
                {type: 'radio', radios, label: '实验室垃圾与排水是否无害化处理', model: 'immuneEartag'},
                {type: 'radio', radios, label: '是否遵守操作规范', model: 'immuneEartag', mr: true}
            ],

            models: {
                immuneEartag: null,
                nativeEartag: null,
                remark: null
            }
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }
            if (!checkSubmit(this.submitter)) {
                return
            }
            console.log(11)
        }
    }
}
</script>
