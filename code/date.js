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
 * [genTimeStamp description] 生成一个随机数时间戳，来自：Coco
 * @return {String}  随机数时间戳
 */
function genTimeStamp() {
  var a = Math.random,
      b = parseInt;
  return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
}


/**
 * [timeAgo description] 时间转换，转换为'几分钟前'、'几个月前'、'几天前'这种，来自：http://caibaojian.com/timestamp.html
 * @param agoTimeStamp {Number}  之前的时间戳
 * @param nowTimeStamp {Number}  当前时间戳，默认为new Date().getTime()
 * @return {String}  返回一个转换后的字符串
 */
function timeAgo(agoTimeStamp, nowTimeStamp){
  var now = new Date().getTime() || nowTimeStamp;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var diffValue = now - agoTimeStamp;

  if(diffValue < 0){
    return false;
  }

  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
  var result = '';

  if(monthC>=1){
    result="" + parseInt(monthC) + "个月前";
  }
  else if(weekC>=1){
    result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else{
    result="刚刚";
  }
  return result;
}