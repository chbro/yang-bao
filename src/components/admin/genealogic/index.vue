<template>
    <div class="admin-form">
        <data-cur
            title="系谱档案"
            modpath="genealogic"
            :radio-sex="true"
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
import { getTypeName } from '@/util/dataselect'
import { getGeneaRec, postGeneaRec, updateGeneaRec } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    watch: {
        'models.sex': {
            handler (newV) {
                this.models.tradeMarkEartag = newV ? 'M' : 'G'
            },
            immediate: true
        }
    },

    mounted() {
        this.models.eartagOfFather = 'G';
        this.models.eartagOfMother = 'M';
        this.models.eartagOfFathersFather = 'G';        
        this.models.eartagOfFathersMother = 'M';        
        this.models.eartagOfMothersFather = 'G';  
        this.models.eartagOfMothersMother = 'M';                                                      
    },

    data () {
        return {
            getGeneaRec,
            postGeneaRec,
            updateGeneaRec,
            items: [
                {label: '性别', model: 'sex', type: 'radio'},
                {label: '原耳牌', model: 'nativeEartag'},
                {label: '免疫耳牌', model: 'immuneEartag', mr: 1},
                {label: '商标耳牌', model: 'tradeMarkEartag', trade: true},
                {label: '种羊基地', model: 'breedingSheepBase'},
                {label: '初登时间', model: 'birthTime', type: 'time', mr: 1},
                {label: '初登体重(kg)', model: 'birthWeight'},
                {label: '颜色', model: 'color'},
                {label: '父号', model: 'eartagOfFather', mr: 1},
                {label: '母号', model: 'eartagOfMother'},
                {label: '父父号', model: 'eartagOfFathersFather'},
                {label: '父母号', model: 'eartagOfFathersMother', mr: 1},
                {label: '母父号', model: 'eartagOfMothersFather'},
                {label: '母母号', model: 'eartagOfMothersMother'},
                {label: '品种名', model: 'typeName', type: 'select', fetchSuggestions: getTypeName, mr: 1}
            ],
            // 用于检查字段值是否填写，所以均初始化为null
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
                remark: '',
                typeName: null
            }
        }
    }
}
</script>
