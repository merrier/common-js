/*
 数字相关
 Thanks：Coco
*/


/**
 * [isDigit description] 判断是否为数字类型
 * @param value {String/Number}  需要判断的值
 * @return {String}  判断
 */
function isDigit(value) {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) === null || value === "") {
    return false
  } else {
    return true
  }
}


/**
 * [numOfComma description] 将数字转换为每3位添加一个逗号的格式，123456->123,456
 * @param num {Number}   原数字
 * @return {String}  转换后的"数字"
 */
function numOfComma(num) {
  num = "" + num; //数字转换为字符串

  var len = num.length,
    commaNum = parseInt((len - 1) / 3),
    leftNum = len % 3 === 0 ? 3 : len % 3,
    result = "";

  if (len <= 3) { //长度小于3
    result = num;
  } else {
    result = num.slice(0, leftNum);
    for (var i = commaNum; i >= 1; i--) {
      result += "," + num.slice(len - i * 3, len - (i - 1) * 3);
    }
  }
  return result;
}