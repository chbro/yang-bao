<template>
    <div>
        <admin-table
            modpath="agent"
            :has-sup="false"
            :has-unpass="false"
            :is-agent="true"
            :no-prac="true"
            :hide-filter="true"
            :hide-view="true"
            :getData="getAgents"
            :deleteData="deleteAgent"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAgents, deleteAgent } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAgents,
            deleteAgent,
            headers: [
                {prop: 'agentRank', label: '代理等级'},
                {prop: 'agentName', label: '代理名称', width: 300},
                {prop: 'agentArea', label: '代理区域', width: 200},
                {prop: 'responsibleName', label: '代理负责人'},
                {prop: 'agentFather', label: '上级代理'}
            ]
        }
    }
}
</script>
