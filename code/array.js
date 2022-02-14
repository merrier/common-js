/*
 数组相关
*/

/**
 * [genDateArray description] 创建过去七天的数组
 * @return {Array}  过去七天的数组（Date类型）
 */
function genDateArray() {
    return [...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));;
}


/**
 * [getRandomItem description] 获取随机数组成员
 * @param arr {Array}  数组
 * @return {Any}  随机数组成员
 */
function getRandomItem(arr) {
    const randomItem = arr[Math.floor(Math.random() * arr.length)];
    return randomItem;
}

/**
 * [countItemNum description] 统计数组中各成员个数
 * @param arr {Array}  待统计数组
 * @return {Object}  统计结果
 */
function countItemNum(arr) {
    const count = arr.reduce((t, c) => {
        t[c] = t[c] ? ++ t[c] : 1;
        return t;
    }, {});
    return count;
}
