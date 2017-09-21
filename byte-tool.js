// https://github.com/zenxds/byte-tool/blob/master/index.js

/**
 * & 保证右移后的结果范围，也就是bytes控制范围
 * bits控制移动位数
 */
var move = function(v, bits, bytes) {
    return (v >> bits) & (Math.pow(2, (typeof bytes == 'undefined' ? 1 : bytes) * 8) - 1)
}

/**
 * number to 2 byte
 */
var bs2 = function(v) {
    return [move(v, 8), move(v, 0)]
}

/**
 * number to 4 byte
 */
var bs4 = function(v) {
    return bs2(move(v, 16, 2)).concat(bs2(move(v, 0, 2)))
}

/**
 * number to 8 byte
 * 按位操作符（Bitwise operators） 将其操作数（operands）当作32位的比特序列
 */
var bs8 = function(v) {
    return bs4(v / Math.pow(2, 32)).concat(bs4(v, 0, 4))
}

/**
 * byte a string
 * str to code array
 */
var bss = function(str) {
    var ret = []
    if (!str) {
        return ret
    }

    for (var i = 0; i < str.length; i++) {
        ret.push(str.charCodeAt(i))
    }

    return ret
}

module.exports = {
    bs2: bs2,
    bs4: bs4,
    bs8: bs8,
    bss: bss
}