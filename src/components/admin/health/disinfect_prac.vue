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
                {label: '日期', model: 'disinfectTime', type: 'time'},
                {label: '免疫耳牌附件号', model: 'eartagFile', type: 'file'},
                {label: '消毒场所', model: 'place', mr: true},
                {label: '消毒药名称', model: 'disinfectName'},
                {label: '用药剂量', model: 'dose', placeholder: '请注明单位'},
            ],
            models: {
                eartagFile: null,
                disinfectName: "",
                dose: "",
                place: "",
                disinfectTime: "",
                disinfectWay: "",
                remark: ""
            }
        }
    }
}
</script>
