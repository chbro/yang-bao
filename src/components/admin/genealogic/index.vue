<template>
    <div class="admin-form">
        <data-cur
            title="系谱档案"
            modpath="genealogic"
            :models.sync="models"
            :items="items"
            :get-data="getGeneaRec"
            :post-data="postGeneaRec"
            :update-data="updateGeneaRec">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getGeneaRec, postGeneaRec, updateGeneaRec } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getGeneaRec,
            postGeneaRec,
            updateGeneaRec,
            items: [
                {label: '免疫耳牌', model: 'immuneEartag'},
                {label: '原耳牌', model: 'nativeEartag'},
                {label: '商标耳牌', model: 'tradeMarkEartag', mr: true, trade: true},
                {label: '品种名', model: 'typeName'},
                // {label: '品种名', model: 'typeName', type: 'select', fetchSuggestions: getType},
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
                sex: 0,
                remark: ''
            }
        }
    }
}
</script>
