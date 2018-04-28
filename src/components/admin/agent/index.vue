<template>
    <div class="admin-form">
        <p class="card-title">代理管理</p>
        <!-- <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="代理等级">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="总代理" value="0"></el-option>
                    <el-option label="省级代理" value="1"></el-option>
                    <el-option label="市级代理" value="2"></el-option>
                    <el-option label="县级代理" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="代理所属地域">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="上级代理">
                <el-input v-model="form.pre"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">增加代理</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form> -->
        <basic-info :items="items" :models="models"></basic-info>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'

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
        let regions = [
            {value: '总代理'},
            {value: '省级代理'},
            {value: '市级代理'},
            {value: '县级代理'}
        ]
        let getRegin = (q, cb) => {
            cb(regions)
        }
        return {
            items: [ {
                label: '代理等级',
                model: 'level',
                type: 'select',
                fetchSuggestions: getRegin
            }, {
                label: '代理名称',
                model: 'name'
            }, {
                label: '上级代理',
                model: 'preAgent',
                mr: 1
            }],
            models: {
                address: []
            }
        }
    }
}
</script>

<style lang="stylus">

</style>
