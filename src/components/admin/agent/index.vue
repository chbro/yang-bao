<template>
    <div>
        <data-cur
            title="代理管理"
            modpath="agent"
            @updateLevel="updateLevel"
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

    watch: {
        'models.agentRank' (newV, oldV) {
            if (newV) {
                let item = this.items[3]
                if (newV === '省级代理') {
                    item.type = 'address-select'
                } else if (newV === '市级代理') {
                    item.level = 0
                    item.type = 'address'
                } else if (newV === '县级代理') {
                    item.level = 1
                    item.type = 'address'
                }
                console.log(item)
                this.$nextTick(() => {
                    this.items.push()
                })
            }
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
                {label: '代理所属地域', model: 'agentArea', type: 'address', level: 1}
            ],
            models: {
                agentArea: [],
                agentRank: null,
                agentName: null,
                responsibleName: null
            }
        }
    },

    methods: {
        updateLevel (lv) {
            let item = this.items[3]
            item.level = lv
            if (lv === 1) {
                item.type = 'address-select'
            } else {
                item.type = 'address'
            }
        }
    }
}
</script>
