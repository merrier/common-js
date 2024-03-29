/*
 字符串操作
 Thanks：https://github.com/zenxds/CodeHeap/blob/master/js/str.js
*/


// 可以使用 \x 加 2位16进制字符标记一个单字节的字符
// 例如字符 'a' 可以表示为 \x61，用法类似\u 加4位16进制编码。
// \u 加四位十六进制数 或 \x 加2位十六进制数属于转义字符，在 js 字符串长度中只算 1 个

// \ 开始后接正数，可能被解析为8进制转义字符
// 一个八进制转义字符形成的条件是：斜线后面接的整数最长3位，至少1位，单个数字的字面值不大于8。
// 八进制转义字符的10进制数字字面值最大值为377(即10进制的255)，即 '\377' 被解析为一个字符，'\378' 被解析为2个字符： '\37' 和 '8'

// 字节长度
// 默认一个汉字占2字节
// 但可以定制
// 比如mysql存储时使用的是3个字节


/**
 * [genRandomId description] 生成随机ID
 * @param len {Number}  需要生成的ID的长度
 * @return {String}  生成的随机字符串ID
 */
function genRandomId(len){
  return Math.random().toString(36).substr(3, len);
}

/**
 * [getStringLength description] 求得计算机学上的字符串长度
 * @param str {String}  字符串
 * @param fix {Number}  修正，一个汉字占几个字节
 * @return {Number}  返回计算机学上的字符串长度
 */
function getStringLength(str, fix) {
  var fixNow = fix || 2;
  return String(str).replace(/[^\x00-\xff]/g, new Array(fixNow + 1).join("-")).length;
}

/**
 * [toAscii description] 将字符串转换成Ascii码形式，主要是对中文的转换
 * @param str {String}  字符串
 * @return {Number}  返回Ascii码形式的字符串
 */
function toAscii(str) {
  return str.replace(/[\u0080-\uffff]/g, function (ch){
    var code = ch.charCodeAt(0).toString(16);
    if (code.length <= 2) {
      while (code.length < 2) code = "0" + code;
      return "\\x" + code;
    } else {
      while (code.length < 4) code = "0" + code;
      return "\\u" + code;
    }
  })
}

/**
 * [byteCount description] 返回UTF-8字符串的字节大小
 * @param str {String}  字符串
 * @return {Number}  返回字节大小，即转换成Ascii码之后的字节大小
 */
function byteCount(str) {
  return encodeURI(str).split(/%..|./).length - 1;
}

/**
 * [truncate description] 字符串截断，超出部分用省略号代替
 * @param str {String}  字符串
 * @param length {Number}  最大长度
 * @param truncation {String}  代替部分
 * @return {String}  返回替换之后的字符串
 */
function truncate(str, length, truncation) {
  length = length || 30;
  truncation = truncation || "...";

  return str.length > length ? str.slice(0, length - truncation.length) + truncation : str;
}

/**
 * [trim description] 清除字符串两端的空白字符
 * @param str {String}  目标字符串
 * @return {String}  处理之后的字符串
 */
function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/**
 * [pad description] 与 trim 相反， pad 可以为字符串的某一端添加字符串。如pad("Merrier",9) -> 00Merrier
 * @param target {String}  目标字符串
 * @param n {Number}  目标长度
 * @return {String}  返回截取之后的字符串
 */
function pad(target, n) {
  var zero = new Array(n).join('0');
  var str = zero + target;
  return str.substr(-n); //-n表示由右边起第n位开始截取
}


/**
 * [stripHTMLTags description] 去除字符串中的html标签
 * @param str {String}  字符串
 * @return {String}  返回去除html标签之后的字符串
 */
function stripHTMLTags(str) {
  return (str + '').replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
}

/**
 * [stripScripts description] 去除字符串中的script代码
 * @param str {String}  字符串
 * @return {String}  返回去除script代码之后的字符串
 */
function stripScripts(str) {
  return (str + "").replace(/<script[^>]*>([\S\s]*?)<\/script>/img, "");
}

/**
 * [stripScripts description] 把字符串转为安全的正则源码，文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param str {String}  字符串
 * @return {String}  返回安全的正则源码
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


/**
 * [addQuote description] 在字符串两端添加双引号，然后内部需要转义的地方都要转义，用于接装 JSON的键名或模析系统中，感谢：http://code.google.com/p/jquery-json/
 * @param target {String}  目标字符串
 * @return {String}  返回转义之后的字符串
 */
function addQuote(target) {
  var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g, //需要转义的非法字符
      meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
      };

  if (target.match(escapeable)) {
    return '"' + target.replace(escapeable, function(a) {
        var c = meta[a];
        if (typeof c === 'string') {
          return c;
        }
        return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)
      }) + '"';
  }
  return '"' + target + '"';
}


/**
 * [genRandomString description] 生成固定长度的随机字符串
 * @param length {Number}  字符串长度
 * @return {String}  返回随机字符串
 */
function genRandomString(length) {
  var str = '';

  while (str.length < length) {
    str += Math.random().toString(36).slice(2);
  }
  return str.substr(0, length);
}

/**
 * [ucfirst description] 首字母大写
 * @param str {String}  原字符串
 * @return {String}  返回新字符串
 */
function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

/**
 * [toHump description] 字符串转成驼峰格式
 * @return {String} 驼峰格式的字符串
 */
function toHump(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * [reverse description] 字符串反序输出
 * @param str {String}  原字符串
 * @return {String} 反序之后的字符串
 */
function reverse(str){
  return str.split('').reverse().join('');
}


/**
 * [isStartsWith description] 判断是否以给定字符串开始
 * @param str {String}  字符串
 * @param prefix {String}  前缀
 * @return {Boolean}  返回判断结果
 */
function isStartsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}

/**
 * [isEndsWith description] 判断是否以给定字符串结尾
 * @param str {String}  字符串
 * @param suffix {String}  后缀
 * @return {Boolean}  返回判断结果
 */
function isEndsWith(str, suffix) {
  var index = str.length - suffix.length;
  return index >= 0 && str.indexOf(suffix, index) === index;
}


/**
 * [isContains description] 判断一个字符串是否包含另外一个字符串
 * @param target {String}  目标字符串
 * @param str {String}  父字符串
 * @param separator {String}  分隔符
 * @return {Boolean}  返回判断结果
 */
function isContains(target, str, separator) {
  return separator ?
    (separator + target + separator).indexOf(separator + str + separator) > -1 : //需要判断分隔符
    target.indexOf(str) > -1; //不需判断分隔符
}


/**
 * [repeat description] 将一个字符串重复自身N次，如 repeat("Ha")得到HaHa。
 * @param target {String}  目标字符串
 * @param n {String}  重复次数
 * @return {String}  重复之后的字符串
 */
function repeat(target, n) {
  var s = target,
      total = "";
  while (n > 0) {
    if (n % 2 === 1)
      total += s;
    if (n === 1)
      break;
    s += s;
    n = n >> 1; // >>是右移位运算符，相当于将n除以2取其商,或说开二次方
  }
  return total;
}

/**
 * [escapeHTML description] 将字符串经过html转义得到适合在页面中显示的内容，如将 < 替换为 &lt;
 * @param target {String}  目标字符串
 * @return {String}  转义之后的字符串
 */
function escapeHTML(target) {
  return target.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


/**
 * [replaceAll description] 替换全部给定字符串
 * @param str {String}  原字符串
 * @param s1 {String}  需要替换掉的字符串
 * @param s2 {String}  用于替换的字符串
 * @return {String}  替换之后的字符串
 */
function replaceAll(str, s1, s2){
  return str.replace(new RegExp(s1, "gm"), s2);
}
