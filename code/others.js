/*
 其他函数
 */

/**
 * [copyTextToClipboard description] 将文本复制到剪贴板，来自：https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * @param text {String}  需要复制的文本
 * @return {Null}  无返回
 */
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

/**
 * [getJsDir description] 获取js所在路径
 * @param src {String}  html中的script代码
 * @return {String}  js所在路径
 */
function getJsDir (src) {
  var script = null;

  if (src) {
    script = [].filter.call(document.scripts, function (v) {
      return v.src.indexOf(src) !== -1;
    })[0];
  } else {
    script = document.scripts[document.scripts.length - 1];
  }

  return script ? script.src.substr(0, script.src.lastIndexOf('/')) : script;
}


/**
 * [getRequestParams description] url中query解析
 * @param paras {Null} 参数可以为空，此时返回请求参数Map本身
 *              {String} 参数可以为请求key，以便返回querystring中key对应的value
 * @return {Object/String}  根据参数不同，要返回不同的结果，object或者字符串
 */
function getRequestParams(paras) {
  const url = window.location.search;
  const paraString = url.substring(1).split("&");
  const paraObj = {};
  for (var i = 0, len = paraString.length; i < len; i++) {
    const j = paraString[i];
    if (j) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
  }

  if (!paras) return paraObj;
  const returnValue = paraObj[paras.toLowerCase()];
  return returnValue ? returnValue.trim() : "";
}


/**
 * [getJsDir description] 获取文本框光标位置
 * @param obj {Object}  需要获取光标位置的 input | textarea dom对象
 * @return {Number}  返回光标所在索引
 */
function getInputIndex(obj) {
  var result = 0;
  // 非IE系，支持 obj.selectionStart
  if (obj.selectionStart !== undefined) {
    result = obj.selectionStart;
    // IE
  } else {
    try {
      var rng;
      // TEXTAREA
      if (obj.tagName === "textarea") {
        rng = event.srcElement.createTextRange();
        rng.moveToPoint(event.x, event.y);
        // Text
      } else {
        rng = document.selection.createRange();
      }
      rng.moveStart("character", -event.srcElement.value.length);
      result = rng.text.length;
    } catch (e) {}
  }
  return result;
}


/**
 * [setCookie description] 设置 Cookie 值
 * @param name {String}  Cookie的name属性
 * @param value {String}  Cookie的value属性
 * @param hours {Number}  过期时间，单位为小时
 * @return {Null}  无返回
 */
function setCookie(name, value, hours) {
  var d = new Date(),
    offset = 8,
    utc = d.getTime() + (d.getTimezoneOffset() * 60000),
    nd = utc + (3600000 * offset),
    exp = new Date(nd);

  exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
  document.cookie = name + "=" + decodeURIComponent(value) + ";path=/;expires=" + exp.toGMTString() + ";";
}


/**
 * [getCookie description] 获取 Cookie 值
 * @param name {String}  Cookie的name属性
 * @return {String}  Cookie的value值
 */
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr !== null) return encodeURIComponent(arr[2]);
  return null;
}


/**
 * [loadStyle description] 加载 CSS 文件
 * @param url {String}  css文件所在url
 * @return {Null}  无返回
 */
function loadStyle(url) {
  try {
    document.createStyleSheet(url)
  } catch (e) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink)
  }
}


/**
 * [loadStyle description] 加载 JS 文件
 * @param src {String}  js文件所在地址
 * @return {Null}  无返回
 */
function loadScript(src) {
  var scriptNode = document.createElement("script");
  scriptNode.type = "text/javascript";
  scriptNode.src = src;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(scriptNode);
}

/**
 * [getType description] 判断具体类型
 * @param any {Object}  需要判断的值
 * @return {String}  类型
 */
function getType(any) {
  var typeArray = Object.prototype.toString.call(any).split(" ");
  return typeArray[1].slice(0, this.length-1);
}


/**
 * [getUrlState description] 检查URL链接是否有效
 * @param URL {String}  需要检查的URL链接
 * @return {Boolean}  检查结果
 */
function getUrlState(URL){
  var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET",URL, false);
  try{
    xmlhttp.Send();
  }catch(e){
  }finally{
    var result = xmlhttp.responseText;
    if(result){
      if(xmlhttp.Status===200){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}


/**
 * [getType description] 获取当前路径
 * @return {String}  当前路径
 */
function getCurrentPath(){
  var currentPageUrl = "";
  if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
  }else {
    currentPageUrl = this.href.toString().toLowerCase();
  }
}


/**
 * [debounce description] 函数防抖动
 * @param func {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 * @param immediate {String}  是否第一次立即执行
 * @return {Function}  返回一个“防抖动”函数
 */
function debounce(func, delay, immediate) {
  var timer = null;
  return function() {
    const context = this;
    const args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
      const doNow = !timer;
      // 每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
      timer = setTimeout(function() {
        timer = null;
      }, delay);
      // 立即执行
      if (doNow) {
        func.apply(context, args);
      }
    } else {
      timer = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    }
  };
}

/**
 * [throttle description] 函数节流
 * @param func {Function}   实际要执行的函数
 * @param threshhold {Number}  执行间隔，单位是毫秒（ms）
 * @param immediate {String}  是否第一次立即执行
 * @return {Function}  返回一个“节流”函数
 */
function throttle(func, threshhold, immediate) {
  // 记录是否可执行
  var isRun = true;
  // 定时器
  var timer;
  immediate = immediate || true;
  // 默认间隔为 200ms
  threshhold || (threshhold = 200);
  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this;
    const args = arguments;
    // 第一次执行
    if (immediate && typeof timer === 'undefined') {
      func();
    }
    if (!isRun) return;
    isRun = false;
    // 保证间隔时间内执行
    clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(context, args);
      isRun = true;
    }, threshhold);
  };
}


/**
 * [appendQuery description] 给url添加query参数
 * @param url {String}   需要添加的url
 * @param query {String}  添加的query，一般为'name=value'
 * @return {String}  返回新url
 */
function appendQuery(url, query) {
  if (!query) {
    return url;
  }
  var search;
  var a = document.createElement("a");
  a.href = url;
  if (a.search) {
    search = a.search + "&" + query;
  } else {
    search = "?" + query;
  }
  return a.protocol + "//" + a.host + a.pathname + search + a.hash;
}


/**
 * [objToQuery description] 将object转换成query形式
 * @param obj {Object}   需要转换的object
 * @return {String}  返回query形式的字符串
 */
function objToQuery(obj) {
  return Object.keys(obj).map(function(k) {
    return [k, obj[k]].join('=');
  }).join('&');
}


/**
 * [cloneDeep description] 深度克隆object
 * @param obj {Object}   需要克隆的object
 * @return {Object}  克隆之后的新Object
 */
function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}


/**
 * [getBrowserName description] 获取当前浏览器的名称
 * @return {String}  浏览器名称
 */
function getBrowserName() {
  var browserName = "Other";
  var ua = window.navigator.userAgent;
  var browserRegExp = {
    Wechat: /micromessenger/,
    QQBrowser: /qqbrowser/,
    UC: /ubrowser|ucbrowser|ucweb/,
    Shoujibaidu: /baiduboxapp|baiduhd|bidubrowser|baidubrowser/,
    SamsungBrowser: /samsungbrowser/,
    MiuiBrowser: /miuibrowser/,
    Sogou : /sogoumobilebrowser|sogousearch/,
    Explorer2345 : /2345explorer|2345chrome|mb2345browser/,
    Liebao : /lbbrowser/,
    Weibo: /__weibo__/,
    OPPO: /oppobrowser/,
    toutiao: /newsarticle/,
    MobileQQ: /mobile.*qq/,
    Firefox: /firefox/,
    Maxthon: /maxthon/,
    Se360: /360se/,
    Ee360: /360ee/,
    Safari: /(iphone|ipad).*version.*mobile.*safari/,
    Chrome: /chrome|crios/,
    AndroidBrowser: /android.*safari|android.*release.*browser/
  };
  for (var i in browserRegExp) {
    if (browserRegExp[i].exec(ua.toLowerCase())) {
      browserName = i;
      break;
    }
  }
  return browserName;
}


/**
 * [getSystem description] 获取当前操作系统
 * @return {String}  操作系统名称+版本
 */
function getSystem() {
  var result = 'Android',
      ua = navigator.userAgent;

  if (ua.match(/(Android)\s+([\d.]+)/))
    return 'Android_' + ua.match(/(Android)\s+([\d.]+)/)[2];

  if (ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPhone\sOS)\s([\d_]+)/))
    return result = 'iOS_' + (ua.match(/(iPad).*OS\s([\d_]+)/) ? ua.match(/(iPad).*OS\s([\d_]+)/)[2] : ua.match(/(iPhone\sOS)\s([\d_]+)/)[2]);

  if (ua.match(/Windows Phone/))
    return result = 'WP';

  return result;
}


/**
 * [getDevice description] 获取当前设备类型
 * @return {String}  设备类型
 */
function getDevice() {
  var deviceName = 'PC',
      ua = navigator.userAgent;

  var iPad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var iPhone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var Android = ua.match(/(Android)\s+([\d.]+)/);
  var WP = ua.match(/(Windows Phone)\s+([\d.]+)/);

  if (iPad) {
    deviceName = 'iPad';
  }
  if (iPhone) {
    deviceName = 'iPhone';
  }
  if (Android) {
    if (!ua.toLowerCase().match(/mobile/)) {
      deviceName = 'Pad';
    } else if (ua.match(/chrome\/([\d.]+)/) && ua.toLowerCase().match(/mobile/)) {
      deviceName = 'Phone';
    } else if (ua.toLowerCase().match(/firefox\/([\d.]+)/) && ua.toLowerCase().match(/mobile/)) {
      deviceName = 'Phone';
    } else {
      deviceName = 'Phone';
    }
  }
  if (WP) {
    deviceName = 'Phone';
  }
  return deviceName;
}

/**
 * [getNetType description] 获取当前网络类型
 * @return {String}  网络类型
 */
function getNetType(){
  var netMatch = ua.match(/NetType\/([^\s]*)/i),
      netType = "WIFI";
  if (netMatch) netType = netMatch[1];
  return netType;
}