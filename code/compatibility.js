/*
 兼容性相关
 Thanks：Coco
*/


/**
 * [cssTest description] 用于简单的 CSS 特性检测，来自：https://github.com/chokcoco/iCSS/issues/9
 * @param property {String}  需要检测的 CSS 属性名
 * @param value {String}  样式的具体属性值
 * @return {Boolean}  返回检查结果
 */
function cssTest(property, value) {
  // 用于测试的元素，隐藏在页面上
  var ele = document.getElementById('test-display-none');

  // 只有一个参数的情况
  if(arguments.length === 1) {
    if(property in ele.style) {
      return true;
    }
    // 两个参数的情况
  }else if(arguments.length === 2){
    ele.style[property] = value;

    if(ele.style[property]) {
      return true;
    }
  }
  return false;
}


/**
 * [pseudoHack description] IE6,7兼容伪类设置
 * @param dom {Object}   dom元素
 * @return {Null}  无返回
 */
function pseudoHack(dom) {
  if (document.querySelector || !dom && dom.nodeType !== 1) return;

  var content = dom.getAttribute("data-content") || '';
  var before = document.createElement("before"),
    after = document.createElement("after");

  // 内部content
  before.innerHTML = content;
  after.innerHTML = content;
  // 前后分别插入节点
  dom.insertBefore(before, dom.firstChild);
  dom.appendChild(after);
}


/**
 * [webpAnimataionSupportDetect description] 检测对webp的支持，来自：https://developers.google.com/speed/webp/faq
 * 原理:
 * 预先生成好webp格式的图片, 保存经过base64编码后的结果
 * 生成相应的img标签, 将src设置为相应的base64地址
 * 如果img标签能够成功加载(加载后的图片有宽和高), 则说明支持相应的webp格式
 * 参数中的feature需要设置为'animation'
 * @param feature {String} [lossy|lossless|alpha|animation]
 * @param {Function} callback
 * @return {Object}  返回callback结果
 */
function webpAnimataionSupportDetect (feature, callback) {
  var kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
  };
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = 'data:image/webp;base64,' + kTestImages[feature];
}

/**
 * [localStorageTest description] localStorage支持度检测
 * @return {Boolean}  返回检测结果
 */
function localStorageTest() {
  var mod = 'test';
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch(e) {
    return false;
  }
}


/**
 * [sessionStorageTest description] sessionStorage支持度检测
 * @return {Boolean}  返回检测结果
 */
function sessionStorageTest() {
  var mod = 'test';
  try {
    sessionStorage.setItem(mod, mod);
    sessionStorage.removeItem(mod);
    return true;
  } catch(e) {
    return false;
  }
}