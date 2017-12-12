/*
  正则匹配
  Thanks：https://github.com/talyssonoc/CommonRegexJS/blob/master/lib/commonregex.js
*/

/**
 * [regularExpressionTest description] 函数防抖动
 * @param type {String}   验证类型
 * @param val {String/Number}  进行验证的值
 * @return {Boolean}  返回验证结果
 */
function regularExpressionTest(type, val) {
  var testRule;
  switch (type) {
    case 'positive_integers':
      testRule = /^[0-9]*[1-9][0-9]*$/;    //正整数
      break;
    case 'positive_integers_zero':
      testRule = /^[0-9]*[0-9][0-9]*$/;    //正整数(包括0)
      break;
    case 'positive_floating_zero':
      testRule = /^\d+(\.\d+)?$/;    //非负浮点数(包括0)
      break;
    case 'positive_integers_zero_two_decimal':
      testRule = /^\d+(\.\d{1,2})?$/;        //非负数(小数点后最多有两位，包括0)
      break;
    case 'phone':
      testRule = /^1[35847][0-9][0-9]{8}$/;  //手机号
      break;
    case 'telephone':
      testRule = /^([0-9]{3,4}-)?[0-9]{7,8}$/;  //固话号
      break;
    case 'email':
      testRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+(([.-])[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;  //邮箱
      break;
    case 'time':
      testRule = /\b((0?[0-9]|1[0-2])(:[0-5][0-9])?(am|pm)|([01]?[0-9]|2[0-3]):[0-5][0-9])/gim;  //时间
      break;
    case 'link':
      testRule = /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gim;  // 链接
      break;
    case 'IPv4':
      testRule = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gm;  // IPv4地址
      break;
    case 'IPv6':
      testRule = /((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\b/gim;  //IPv6地址
      break;
    case 'hexColor':
      testRule = /#(?:[0-9a-fA-F]{3}){1,2}\b/gim;  // 十六进制颜色像素值
      break;
    case 'creditCard':
      testRule = /((?:(?:\d{4}[- ]){3}\d{4}|\d{16}))(?![\d])/gm;  //信用卡账号
      break;
  }
  return testRule.test(val);
}