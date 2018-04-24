<template>
    <div class="border-main">
        <div class="form-summary">
            <template v-for="(item, i) in items">
                <el-input :placeholder="item.placeholder" :minlength="item.trade ? 15 : 1" :maxlength="item.trade ? 15 : 100" :class="{block: item.block, mr: item.mr}" :key="i" v-if="item.type === undefined || item.type === 'text'" size="small" v-model="models[item.model]">
                    <template slot="prepend">{{ item.label }}:</template>
                </el-input>

                <el-input :placeholder="item.placeholder" :class="{block: item.block, mr: item.mr}" :key="i" v-else-if="item.type === 'file'" :value="holder" class="select-file" size="small" disabled @click.native="$refs.erpai[0].click()">
                    <template slot="prepend">免疫耳牌号文件:<input type="file" @change="selectFile(item)" hidden ref="erpai"></template>
                </el-input>

                <div :key="i" v-else-if="item.type === 'time'" class="time el-input-group" :class="{'double-width': item.doubleWidth, mr: item.mr}">
                    <span class="time-span ellipse" :title="item.label" v-text="item.label + ':'"></span>
                    <el-date-picker
                        v-model="models[item.model]"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        type="datetime">
                    </el-date-picker>
                </div>

                <div :class="{mr: item.mr}" :key="i" v-else-if="item.type === 'number'" class="time el-input-group">
                    <span class="time-span ellipse" :title="item.label" v-text="item.label + ':'"></span>
                    <el-input-number :min="1" size="small" v-model="models[item.model]"></el-input-number>
                </div>

                <div :class="{mr: item.mr}" :key="i" v-else-if="item.type === 'select'" class="time el-input-group select">
                    <span class="time-span ellipse" :title="item.label" v-text="item.label + ':'"></span>
                    <el-autocomplete
                        size="small"
                        v-model="models[item.model]"
                        :fetch-suggestions="item.fetchSuggestions">
                    </el-autocomplete>
                </div>

                <div :class="{mr: item.mr}" :key="i" v-else-if="item.type === 'radio'" class="time el-input-group radio">
                    <span class="ellipse" :title="item.label" v-text="item.label + ':'"></span>
                    <el-radio v-model="models[item.model]" v-for="(r, i) in item.radios" :key="i" :label="i">{{item.radios[i]}}</el-radio>
                </div>

                <div :class="{mr: item.mr}" :key="i" v-else-if="item.type === 'address'" class="time el-input-group address">
                    <span class="time-span ellipse" :title="item.label" v-text="item.label + ':'"></span>
                    <area-cascader type='text' v-model="area" :level='1' :data="pcaa" @change="changeArea()"></area-cascader>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import pcaa from 'area-data/pcaa'

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
    },

    data () {
        return {
            holder: '上传耳牌号文件',
            pcaa,
            area: null
        }
    },

    methods: {
        selectFile (item) {
            let file = this.$refs.erpai[0].files[0]
            this.models[item.model] = file
            this.holder = file.name
        },

        changeArea () {
            console.log(this.area)
        }
    }
}
</script>
