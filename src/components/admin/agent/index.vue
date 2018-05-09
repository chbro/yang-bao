<template>
    <div>
        <data-cur
            title="代理管理"
            modpath="agent"
            @update:models="v => models = v"
            :update-submitter="$route.query.edit > 0"
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

export default {
    components: {
        dataCur
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
                {label: '代理地域', model: 'agentArea'}
            ],
            models: {
                agentArea: null,
                agentRank: null,
                agentName: null,
                responsibleName: null
            }
        }
    }
}
</script>
