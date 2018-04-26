<template>
    <div class="admin-form">
        <p class="card-title">系谱档案</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="remark"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, isReqSuccessful, postJump, patchJump } from '@/util/jskit'
import { getGeneaRec, postGeneaRec, getSheepTypes, updateGeneaRec } from '@/util/getdata'

export default {
    components: {
        BasicInfo
    },

    mounted () {
        getSheepTypes().then(res => {
            if (isReqSuccessful(res)) {
                let type = res.data.type
                type.forEach(v => {
                    v.value = v.typename
                    delete v.typename
                })
                this.types = type
            }
        }).catch(_ => {
            this.$message.error('获取山羊品种失败')
        })

        this.edit = this.$route.query.edit
        if (this.edit) {
            getGeneaRec(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.data
                    Object.keys(this.models).forEach(v => {
                        this.models[v] = data[v]
                    })
                    this.remark = data.remark
                }
            }).catch(_ => {
                this.$message.error('获取山羊信息失败')
            })
        }
    },

    data () {
        let getType = (q, cb) => {
            cb(this.types)
        }

        return {
            edit: false,
            items: [
                {label: '免疫耳牌', model: 'immuneEartag'},
                {label: '原耳牌', model: 'nativeEartag'},
                {label: '商标耳牌', model: 'tradeMarkEartag', mr: true, trade: true},
                {label: '品种名', model: 'typeName', type: 'select', fetchSuggestions: getType},
                {label: '种羊基地', model: 'breedingSheepBase'},
                {label: '初登时间', model: 'birthTime', type: 'time'},
                {label: '初登体重', model: 'birthWeight'},
                {label: '颜色', model: 'color', mr: true},
                {label: '父号', model: 'eartagOfFather'},
                {label: '母号', model: 'eartagOfMother'},
                {label: '父父号', model: 'eartagOfFathersFather', mr: true},
                {label: '父母号', model: 'eartagOfFathersMother'},
                {label: '母父号', model: 'eartagOfMothersFather'},
                {label: '母母号', model: 'eartagOfMothersMother', mr: true},
                {label: '性别', model: 'sex', type: 'radio', radios: ['公羊', '母羊']}
            ],
            // 用于检查字段值是否填写，所以均初始化为null
            models: {
                factoryNum: 1,
                factoryName: '老嫖猪场',
                immuneEartag: null,
                nativeEartag: null,
                tradeMarkEartag: null,
                typeName: null,
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
                sex: 0
            },
            remark: '',
            types: []
        }
    },

    methods: {
        submit () {
            if (!checkForm(this.models)) {
                return
            }

            this.models.operatorName = '嫖'
            this.models.operatorId = 1

            if (this.edit) {
                updateGeneaRec(this.edit, this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump('genealogic')
                    }
                }).catch(_ => {
                    this.$message.error('修改失败')
                })
            } else {
                postGeneaRec(this.models).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump('genealogic')
                    }
                }).catch(_ => {
                    this.$message.error('录入失败')
                })
            }
        }
    }
}
</script>
