<template>
    <div>
        <admin-table
            is-check
            hide-eartag-filter
            modpath="review"
            :check-module="this.checkModule"
            :get-data="getData"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getAllWelfare, getAllBreeding, getAllDisinfects, getAllImmune, getAllAntiscolic, getAllStages, getAllPrevention } from '@/util/getdata'

export default {
    props: {
        checkMod: {
            type: String
        }
    },

    watch: {
        checkMod (newMod) {
            this.checkModule = newMod
            this.getData = this.map[newMod]
        }
    },

    components: {
        AdminTable
    },

    data () {
        return {
            map: {
                welfare: getAllWelfare,
                prevention: getAllPrevention,
                'nutrition/breed': getAllBreeding,
                'nutrition/stage': getAllStages,
                'health/antiscolic': getAllAntiscolic,
                'health/disinfect': getAllDisinfects,
                'health/immune': getAllImmune
            },
            checkModule: 'welfare',

            getData: getAllWelfare,
            headers: [
                {prop: 'ispassCheck', label: '审核状态'},
                {prop: 'factoryName', label: '工厂名', width: 200},
                {prop: 'building', label: '提交人', width: 180},
                {prop: 'gmtCreate', label: '提交时间', width: 200},
                {prop: 'mEtB', label: '文件', width: 200}
            ]
        }
    }
}
</script>
