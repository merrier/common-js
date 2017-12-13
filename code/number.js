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


/**
 * [numberUpperFormat description] 数字转换，简单理解后面要有三个0，则是千，4个零，则是万。当然不一定是零，位数到了就行，反正都会省略掉（未做四舍五入）,来自：http://xjinjin.net/2016/08/12/unit-conversion/
 * @param input {Number}   原数字
 * @return {String}  转换后的"数字"
 */
function numberUpperFormat(input) {

  // 可以随意的增删改units内容实现单位的配置
  var units = [
    { num: 3, unit: '千' },
    { num: 4, unit: '万' },
    { num: 6, unit: '百万' },
    { num: 7, unit: '千万' },
    { num: 8, unit: '亿' }];

  // 精确到整数
  var num = input.toFixed('0');

  if (num.length <= 3) {

    // 千以下不加单位
    return num;
  }

  // 保证前面至少留一位
  var len = num.length - 1;
  var isFind = false;
  for (var i = 0, length = units.length; i < length; i++) {
    var item = units[i];
    if (len >= item.num && len < units[i + 1].num) {
      isFind = true;
    } else if (i === length - 2) {
      isFind = true;
      item = units[++i];
    }
    if (isFind) {
      // 确认区间后，返回前几位加上单位
      return '' + num.slice(0, num.length - item.num) + item.unit;
    }
  }
}


/**
 * [digitUppercase description] 金额的大写转换，来自：https://segmentfault.com/g/1570000011077131/d/1560000011078444
 * @param n {Number}  原金额数字
 * @return {String}  大写的金额
 */
function digitUppercase(n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var j = 0; j < unit[0].length && n > 0; j++) {
    var p = '';
    for (var k = 0; k < unit[1].length && n > 0; k++) {
      p = digit[n % 10] + unit[1][k] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][j] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
}


/**
 * [formatDuration description] 时间转换，多用于视频播放时的剩余时间显示
 * @param t {Number/String}  视频的秒数
 * @return {String}  转换后的时间，例如：'389:03','00:05'
 */
function formatDuration (t) {
  if (!t) { return ''; }
  var m = Math.floor(t / 60);
  var s = t % 60;
  if (m < 10) { m = '0' + m; }
  if (s < 10) { s = '0' + s; }
  return m + ':' + s;
}