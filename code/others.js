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