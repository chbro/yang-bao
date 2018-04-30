<template>
    <div class="admin-form">
        <p class="card-title">代理管理</p>
        <basic-info :items="items" :models="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { getRegion } from '@/util/dataselect'

export default {
    components: {
        BasicInfo
    },

    watch: {
        'models.level' (newV, oldV) {
            if (newV) {
                let last = this.items[this.items.length - 1]
                if (['address', 'addressText'].includes(last.model)) {
                    this.items.pop()
                }

                let item = {label: '代理所属地域', type: 'address', model: 'address'}
                if (newV === '省级代理') {
                    item.type = 'address-select'
                } else if (newV === '市级代理') {
                    item.level = 0
                } else if (newV === '县级代理') {
                    item.level = 1
                } else if (newV === '总代理') {
                    item.type = 'text'
                    item.model = 'addressText'
                }
                this.$nextTick(() => {
                    this.items.push(item)
                })
            }
        }
    },

    data () {
        return {
            items: [
                {label: '代理等级', model: 'level', type: 'select', fetchSuggestions: getRegion},
                {label: '代理名称', model: 'name'},
                {label: '上级代理', model: 'preAgent', mr: 1}
            ],
            models: {
                address: []
            }
        }
    }
}
</script>
