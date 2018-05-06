<template>
    <div>
        <data-cur
            title="代理管理"
            modpath="agent"
            @update:models="v => models = v"
            :is-agent="true"
            :has-remark="false"
            :models.sync="models"
            :items="items"
            :get-data="getAgent"
            :post-data="postAgent"
            :update-data="updateAgent">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { postAgent, updateAgent, getAgent } from '@/util/getdata'
import { getRegion } from '@/util/dataselect'
import { addressToArray, isReqSuccessful } from '@/util/jskit'

export default {
    components: {
        dataCur
    },

    mounted () {
        this.edit = this.$route.query.edit
        if (this.edit) {
            getAgent(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.model
                    let obj = {}
                    Object.keys(this.models).forEach(v => {
                        obj[v] = data[v]
                    })
                    let area = addressToArray(obj.agentArea)
                    let len = this.items.length
                    if (area.length === 1) {
                        this.items[len - 1] = {label: '代理所属地域', type: 'address-select', model: 'agentArea'}
                    } else {
                        this.items[len - 1] = {label: '代理所属地域', type: 'address', level: area.length - 2, model: 'agentArea'}
                    }
                    obj.agentArea = area
                    obj.agentRank = String(obj.agentRank)
                    this.models = obj
                }
            }).catch(_ => {
                this.$message.error('获取代理失败')
            })
        }
    },

    data () {
        return {
            getAgent,
            postAgent,
            updateAgent,
            items: [
                {label: '代理等级', model: 'agentRank', type: 'select', fetchSuggestions: getRegion},
                {label: '代理名称', model: 'agentName'},
                {label: '代理负责人', model: 'responsibleName', mr: 1},
                {label: '代理所属地域', model: 'agentArea', type: 'address', level: 1},
                {label: '上级代理', model: 'agentFather'}
            ],
            models: {
                agentArea: [],
                agentRank: null,
                agentName: null,
                responsibleName: null,
                agentFather: null
            }
        }
    }
}
</script>
