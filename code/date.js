/*
 对Date对象的操作
*/


/**
 * [dateToString description] 获取字符串形式的年月日，使用数组的join方法返回连接起来的字符串
 * @param date {Date} 需要转换成字符串格式的日期
 * @return {String} 字符串格式的日期
 */
function dateToString(date) {
  return [date.getFullYear(),
    (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    (date.getDate() < 10) ? '0' + (date.getDate()) : date.getDate()
  ].join("-");
}

/**
 * [stringToDate description] 使字符串形式的日期返回为Date型的日期
 * @param str {String} 需要转换成日期格式的字符串
 * @return {Date} 日期
 */
function stringToDate(str) {
  const strArr = str.split('-');
  return new Date(strArr[0], strArr[1] - 1, strArr[2]);
}

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

/**
 * [generateDaysArray description] 根据开始时间和结束时间，返回其间所有天组成的数组
 * @param start {String} 字符串格式的开始日期
 * @param end {String} 字符串格式的结束日期
 * @return {Array} 其间所有天组成的数组
 */
function generateDaysArray(start, end) {
  // 获取传入字符串形式参数的Date型日期
  const retArr = [];

  if (start && end) {

    if (start === end) { // TODO: 优化这部分逻辑
      retArr.push(dateToString(stringToDate(start)));
      return retArr;
    }

    var st = stringToDate(start);
    const et = stringToDate(end);

    // 获取开始日期的年，月，日
    const yyyy = st.getFullYear(),
      mm = st.getMonth();
    var dd = st.getDate();
    // 循环
    while (st.getTime() !== et.getTime()) {
      // 使用dd++进行天数的自增

      st = new Date(yyyy, mm, dd++);
      retArr.push(dateToString(st));
    }
  }
  return retArr;
}


/**
 * [getDateDiff description] 根据开始时间和结束时间，计算相差的天数
 * @param start {String} 字符串格式的开始日期->"YYYY-MM-DD"
 * @param end {String} 字符串格式的结束日期->"YYYY-MM-DD"
 * @return {Number} 相差天数
 */
function getDateDiff(start, end) {
  var  aDate,  oDate1,  oDate2,  iDays;
  aDate  =  start.split("-");
  oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]); // 转换为12-18-2002格式
  aDate  =  end.split("-");
  oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
  iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24); // 把相差的毫秒数转换为天数
  return  iDays + 1; // 需要将最后一天加上
}