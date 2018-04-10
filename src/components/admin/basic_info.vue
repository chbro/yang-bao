<template>
    <div class="border-main">
        <div class="form-summary">
            <template v-for="(item, i) in items">
                <el-input :key="i" v-if="item.type === undefined || item.type === 'text'" size="small" v-model="models[item.model]">
                    <template slot="prepend">{{ item.label }}:</template>
                </el-input>

                <div :key="i" v-else-if="item.type === 'time'" class="time el-input-group" :class="{'double-width': item.doubleWidth}">
                    <span class="time-span" v-text="item.label + ':'"></span>
                    <el-date-picker
                        v-model="models[item.model]"
                        size="small"
                        type="date">
                    </el-date-picker>
                </div>

                <div :key="i" v-else-if="item.type === 'number'" class="time el-input-group">
                    <span class="time-span" v-text="item.label + ':'"></span>
                    <el-input-number :min="1" size="small" v-model="models[item.model]"></el-input-number>
                </div>

                <div :key="i" v-else-if="item.type === 'select'" class="time el-input-group select">
                    <span class="time-span" v-text="item.label + ':'"></span>
                    <el-autocomplete
                        size="small"
                        v-model="models[item.model]"
                        :fetch-suggestions="fetchSuggestions"
                        @select="onSelect">
                    </el-autocomplete>
                </div>

                <div :key="i" v-else-if="item.type === 'radio'" class="time el-input-group radio">
                    <span v-text="item.label + ':'"></span>
                    <el-radio v-model="models[item.model]" label="公羊">公羊</el-radio>
                    <el-radio v-model="models[item.model]" label="母羊">母羊</el-radio>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default () {
                return []
            }
        },
        models: {
            type: Object,
            dafault () {
                return {}
            }
        },
        fetchSuggestions: {
            type: Function,
            default () {
                return () => {}
            }
        },
        onSelect: {
            type: Function,
            default () {
                return () => {}
            }
        }
    }
}
</script>
