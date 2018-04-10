<template>
    <div class="card">
        <p class="card-title" v-text="card.title"></p>
        <div class="border-main">
            <div v-for="(item, i) in card.items" :key="i" class="card-item">
                <template v-for="(input, j) in item.inputs">
                    <el-input :key="j" v-if="item.type === undefined || item.type === 'text'" size="small" v-model="input.dose">
                        <template slot="prepend">{{ item.label }}:</template>
                    </el-input>
                    <div :key="j" v-else-if="item.type === 'select'" class="time el-input-group select">
                        <span class="time-span" v-text="item.label + ':'"></span>
                        <el-autocomplete
                            size="small"
                            v-model="input.dose"
                            :fetch-suggestions="item.fetchSuggestions"
                            @select="item.onSelect">
                        </el-autocomplete>
                    </div>
                    , 用量<el-input :key="j + 'el-input'" v-model="input.day" class="input-days" size="small"></el-input>%/天。
                </template>

                <span class="cursor-p" @click="addItem(i)"><i class="el-icon-caret-right"></i>增加{{ item.label }}设置</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default () {
                return {
                    title: '标题',
                    items: []
                }
            }
        }
    },

    methods: {
        addItem (index) {
            let item = this.card.items[index]
            item.inputs.push({})
        }
    }
}
</script>
