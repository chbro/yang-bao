<template>
    <div class="admin-form">
        <p class="card-title">系谱档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.note"></el-input>
        </div>
        <submitter :submitter.sync="submitter"></submitter>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import Submitter from '@/components/admin/submitter'
import { checkForm, checkSubmit } from '@/util/jskit'

export default {
    components: {
        BasicInfo, Submitter
    },

    data () {
        return {
            items: [
                {label: '免疫耳牌', model: 'immune'},
                {label: '原耳牌', model: 'eartag'},
                {label: '商标耳牌', model: 'brand'},
                {label: '种羊基地', model: 'base'},
                {label: '初登时间', model: 'birthtime'},
                {label: '初登体重', model: 'birthweight'},
                {label: '颜色', model: 'color'},
                {label: '父号', model: 'father'},
                {label: '母号', model: 'mother'},
                {label: '父父号', model: 'fa_father'},
                {label: '父母号', model: 'fa_mother'},
                {label: '母父号', model: 'mo_father'},
                {label: '母母号', model: 'mo_mother'},
                {label: '性别', model: 'sex', type: 'radio'}
            ],
            models: {
                immune: null,
                eartag: null,
                brand: null,
                base: null,
                birthtime: null,
                birthweight: null,
                color: null,
                father: null,
                mother: null,
                fa_father: null,
                fa_mother: null,
                mo_father: null,
                mo_mothe: null,
                sex: null,
                note: null
            },
            submitter: {}
        }
    },

    methods: {
        submit () {
            console.log(this.models, this.submitter)
            if (!checkForm(this.models)) {
                return
            }
            if (!checkSubmit(this.submitter)) {
                return
            }
            console.log(1)
        }
    }
}
</script>
