/*
 对Date对象的操作
*/


/**
 * [formatDate description] 时间戳转换
 * @param date {Date}   Date对象
 * @param fmt {String}  转换格式
 * @return {String}  返回一个转换后的字符串
 */
function formatDate (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}


/**
 * [genTimeStamp description] 生成一个随机数时间戳，感谢：Coco
 * @return {String}  随机数时间戳
 */
function genTimeStamp() {
  var a = Math.random,
      b = parseInt;
  return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
}