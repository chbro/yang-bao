<template>
    <div class="admin-form">
        <p class="card-title">系谱档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
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
import { checkForm, checkSubmit, isReqSuccessful } from '@/util/jskit'
import { postGeneaRec } from '@/util/getdata'

export default {
    components: {
        BasicInfo, Submitter
    },

    data () {
        return {
            items: [
                {label: '免疫耳牌', model: 'immuneEartag'},
                {label: '原耳牌', model: 'nativeEartag'},
                {label: '商标耳牌', model: 'tradeMarkEartag', mr: true},
                {label: '种羊基地', model: 'breedingSheepBase'},
                {label: '初登时间', model: 'birthTime', type: 'time'},
                {label: '初登体重', model: 'birthWeight', mr: true},
                {label: '颜色', model: 'color'},
                {label: '父号', model: 'eartagOfFather'},
                {label: '母号', model: 'eartagOfMother', mr: true},
                {label: '父父号', model: 'eartagOfFathersFather'},
                {label: '父母号', model: 'eartagOfFathersMother'},
                {label: '母父号', model: 'eartagOfMothersFather', mr: true},
                {label: '母母号', model: 'eartagOfMothersMother'},
                {label: '性别', model: 'sex', type: 'radio', radios: ['公羊', '母羊']}
            ],
            models: {
                immuneEartag: null,
                nativeEartag: null,
                tradeMarkEartag: null,
                breedingSheepBase: null,
                birthTime: null,
                birthWeight: null,
                color: null,
                eartagOfFather: null,
                eartagOfMother: null,
                eartagOfFathersFather: null,
                eartagOfFathersMother: null,
                eartagOfMothersFather: null,
                eartagOfMothersMother: null,
                sex: 0,
                remark: null
            },
            submitter: {}
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

            postGeneaRec(this.models).then(res => {
                if (isReqSuccessful(res)) {
                    console.log(this.models, this.submitter)
                }
            })
        }
    }
}
</script>
