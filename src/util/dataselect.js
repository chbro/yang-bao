/**
 * el-select下拉框数据
 */
export const getMedicines = (q, cb) => {
    let medicines = [
        {value: '伊维菌素注射注射液', key: 0},
        {value: '阿维菌素片', key: 1},
        {value: '硝氯酚片', key: 2},
        {value: '吡喹酮片', key: 3},
        {value: '双甲脒溶液', key: 4},
        {value: '氯氰菊酯', key: 5}
    ]
    cb(medicines)
}

export const getWays = (q, cb) => {
    let ways = [
        {value: '皮下注射', key: 0},
        {value: '口服', key: 1},
        {value: '药浴', key: 2},
        {value: '圈舍环境喷洒', key: 3}
    ]
    cb(ways)
}

export const getDoses = (q, cb) => {
    let doses = [
        {value: '0.3mg/kg', key: 0},
        {value: '4mg/kg', key: 1},
        {value: '35mg/kg', key: 2},
        {value: '1000倍稀释', key: 3},
        {value: '500倍稀释', key: 4}
    ]
    cb(doses)
}

export const getRegion = (q, cb) => {
    let regions = [
        {value: '总代理'},
        {value: '省级代理'},
        {value: '市级代理'},
        {value: '县级代理'}
    ]
    cb(regions)
}

export const getStages = (q, cb) => {
    let stages = [
        {value: '引种应激前期（引种前三天）', key: 0},
        {value: '引种应激后期（引种3—15天）', key: 1},
        {value: '非配种期公羊（后备种公羊）', key: 2},
        {value: '空怀期母羊（后备种母羊）', key: 3},
        {value: '配种期公羊', key: 4},
        {value: '配种期母羊', key: 5},
        {value: '怀孕前期（孕娠前三月）', key: 6},
        {value: '怀孕后期（孕娠后两月）', key: 7},
        {value: '哺乳期母羊', key: 8},
        {value: '羔羊诱导采食期（7—80日龄）', key: 9},
        {value: '育成羊（80—180日龄）', key: 10},
        {value: '预饲期（181—220日龄）', key: 11}
    ]
    cb(stages)
}

export const getConFeed = (q, cb) => {
    let conFeed = [
        {value: '玉米'},
        {value: '豆粕'},
        {value: '麸皮'},
        {value: '食盐'},
        {value: '预混料'}
    ]
    cb(conFeed)
}

export const getDryFeed = (q, cb) => {
    let dryFeed = [
        {value: '干草'},
        {value: '青草'}
    ]
    cb(dryFeed)
}
