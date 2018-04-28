<template>
    <div class="admin-form">
        <p class="card-title">生产可视截图</p>

        <div class="border-main">
            <div class="form-summary">
                <el-input class="block" size="small" v-model="erpai">
                    <template slot="prepend">耳牌号:</template>
                </el-input>

                <el-input v-for="(item, i) in captures" :key="i" class="select-file double-width" size="small" disabled @click.native="$refs.erpai[i].click()" :value="item.model">
                    <template slot="prepend">上传生产可视截图:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
                </el-input>
                <el-button size="small" type="primary" @click="addCapture()">增设截图</el-button>
            </div>
        </div>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="note"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>

<script>
import { checkForm, checkSubmit } from '@/util/jskit'

export default {
    data () {
        return {
            erpai: '',
            captures: [{model: null}],
            note: ''
        }
    },

    methods: {
        selectFile (item, idx) {
            let file = this.$refs.erpai[idx].files[0]
            item.model = file.name
            item.file = file
        },

        addCapture () {
            this.captures.push({model: null})
        },

        submit () {
            if (!checkForm(this.captures) || !this.erpai) {
                return
            }
            if (!checkSubmit(this.submitter)) {
                return
            }
            console.log(this.captures, this.submitter)
        }
    }
}
</script>
