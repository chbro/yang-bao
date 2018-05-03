<template>
    <div>
        <formdata-cur
            title="卫生消毒实施档案"
            modpath="health/disinfect"
            apiurl="df"
            @update:models="v => models = v"
            :is-disinfect="true"
            :models.sync="models"
            :items="items"
            :get-data="getDisinfect">
        </formdata-cur>
    </div>
</template>

<script>
import formdataCur from '@/components/admin/common/formdataCUR'
import { getDisinfect } from '@/util/getdata'

export default {
    components: {
        formdataCur
    },

    data () {
        return {
            getDisinfect,
            items: [
                {model: 'eartagFile', type: 'file'},
                {label: '消毒药名称', model: 'disinfectName'},
                {label: '用药剂量', model: 'dose', mr: 1, placeholder: '请注明单位'},
                {label: '消毒场所', model: 'place'},
                {label: '消毒时间', model: 'disinfectTime', type: 'time'}
            ],
            models: {
                eartagFile: null,
                disinfectName: null,
                dose: null,
                place: null,
                disinfectTime: null,
                disinfectWay: null,
                remark: null
            }
        }
    }
}
</script>
