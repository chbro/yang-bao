<template>
    <div>
        <data-cur
            title="卫生与动物福利"
            modpath="welfare"
            @update:models="v => models = v"
            :has-remark="false"
            :radio-index="1"
            :models.sync="models"
            :items="items"
            :get-data="getWelfare"
            :post-data="postWelfare"
            :update-data="updateWelfare">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getWelfare, postWelfare, updateWelfare } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getWelfare,
            postWelfare,
            updateWelfare,
            items: [
                {label: '自检/主管上级检查时间', model: 'checkTime', type: 'time', block: 1},
                {type: 'radio', label: '圈舍内外是否合格', model: 'colonyHouse'},
                {type: 'radio', label: '饲料库房及加工车间是否合格', model: 'warehouseWorkshop', mr: 1},
                {type: 'radio', label: '杀虫灭鼠是否合格', model: 'killWormDeratization'},
                {type: 'radio', label: '消毒室制度是否执行', model: 'sterilizingRoom'},
                {type: 'radio', label: '是否赤手操作', model: 'operation', mr: 1},
                {type: 'radio', label: '是否一羊一针头', model: 'needleSheep'},
                {type: 'radio', label: '疫苗及针头的消毒处理是否合格', model: 'vaccine'},
                {type: 'radio', label: '是否做到人员安全防护是否合格', model: 'safetyProtection', mr: 1},
                {type: 'radio', label: '实验室垃圾与排水是否无害化处理', model: 'rubbishWater'},
                {type: 'radio', label: '是否遵守操作规范', model: 'operationSpecification'},
                {type: 'radio', label: '羊舍空气与温度是否合格', model: 'airTemperature'},
                {type: 'radio', label: '羊只运动与采光是否合格', model: 'exerciseDaylighting', mr: 1},
                {type: 'radio', label: '车辆进出是否消毒', model: 'carDisinfect'}
            ],
            models: {
                checkTime: null,
                airTemperature: 0,
                exerciseDaylighting: 0,
                carDisinfect: 0,
                colonyHouse: 0,
                warehouseWorkshop: 0,
                killWormDeratization: 0,
                sterilizingRoom: 0,
                operation: 0,
                needleSheep: 0,
                vaccine: 0,
                safetyProtection: 0,
                rubbishWater: 0,
                operationSpecification: 0
            }
        }
    }
}
</script>
