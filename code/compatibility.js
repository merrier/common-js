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

