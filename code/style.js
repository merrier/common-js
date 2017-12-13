/*
 样式相关
 Thanks：Coco
*/

/**
 * [genRandomColor description] 产生随机颜色
 * @return {String}  随机rgb格式的颜色像素值
 */
function genRandomColor() {
  return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
}

/**
 * [addStyle description] 动态添加样式
 * @param css {String}  css代码
 * @return {Null}  无返回
 */
function addStyle(css) {
  var style = document.createElement("style");
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  document.getElementsByTagName('head')[0].appendChild(style);
}


/**
 * [addStyle description] requestAnimationFrame初始化
 * @return {Null}  无返回
 */
function initRequestAnimationFrame(){
  window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      }
  })();
}

/**
 * [hexToRgba description] 将hex格式像素值转换成rgba格式
 * @param color {String}  hex格式像素值
 * @param opacity {Number}  透明度
 * @return {String}  返回rgba格式像素值
 */
function hexToRgba(color, opacity) {
  color = color.replace('#', '');

  if (color.length === 3) {
    color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
  }

  var r = parseInt(color.slice(0, 2), 16);
  var g = parseInt(color.slice(2, 4), 16);
  var b = parseInt(color.slice(4, 6), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}

/**
 * [getPageHeight description] 获取页面高度
 * @return {Number}  页面高度
 */
function getPageHeight(){
  var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
    ? a
    : g.documentElement;
  return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}

/**
 * [getPageWidth description] 获取页面宽度
 * @return {Number}  页面宽度
 */
function getPageWidth(){
  var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"?
    a: g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}


/**
 * [getPageViewWidth description] 获取页面可视宽度
 * @return {Number}  页面可视宽度
 */
function getPageViewWidth(){
  var d = document, a = d.compatMode === "BackCompat" ?
    d.body: d.documentElement;
  return a.clientWidth;
}