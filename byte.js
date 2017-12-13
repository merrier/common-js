/*
 字节操作
 Thanks：https://github.com/zenxds/byte-tool/blob/master/index.js
 */

/**
 * [move description] 将数字右移
 * @param v {String}   原数字
 * @param bits {Number}  移动位数
 * @param bytes {Number}  控制右移之后的结果范围
 * @return {Number}  返回右移结果
 */

function move(v, bits, bytes){
  return (v >> bits) & (Math.pow(2, (typeof bytes === 'undefined' ? 1 : bytes) * 8) - 1);
}


/**
 * [bs2 description] 通过字节操作将数字转换成有2个字节的数组
 * @param v {Number}   原数字
 * @return {Array}  转换后的数组
 */
var bs2 = function(v) {
    return [move(v, 8), move(v, 0)]
};

/**
 * [bs4 description] 通过字节操作将数字转换成有4个字节的数组
 * @param v {Number}   原数字
 * @return {Array}  转换后的数组
 */
var bs4 = function(v) {
    return bs2(move(v, 16, 2)).concat(bs2(move(v, 0, 2)))
};


/**
 * [bs8 description] 通过字节操作将数字转换成有8个字节的数组
 * @param v {Number}   原数字
 * @return {Array}  转换后的数组
 */
var bs8 = function(v) {
    return bs4(v / Math.pow(2, 32)).concat(bs4(v, 0, 4))
};