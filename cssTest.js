/**
 * Created by wangcong.merrier on 2017/8/4.
 */
/**
 * 用于简单的 CSS 特性检测
 * @param [String] property 需要检测的 CSS 属性名
 * @param [String] value 样式的具体属性值
 * @return [Boolean] 是否通过检查
 * Form：https://github.com/chokcoco/iCSS/issues/9
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