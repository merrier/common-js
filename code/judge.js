/*
 判断操作
 Thanks：https://github.com/zenxds/byte-tool/blob/master/index.js
 */

/**
 * [judgeDataType description] 判断数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
 * @param tgt {Any}  待判断的数据
 * @param type {String}  指定的类型
 * @return {Boolean/string}  判断出来的类型或和指定类型是否相同
 */
function judgeDataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
}


/**
 * [isObject description] 判断是否是Object类型，需要注意的是 null 的类型也是 object
 * @param tgt {value}  待判断的数据
 * @return {Boolean}  判断结果
 */
function isObject(value) {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}

/**
 * [isMobileOrPad description] 判断是否是 mobile 或者 ipad
 * @return {Boolean}  判断结果
 */
function isMobileOrPad () {
    let JudgmentOfUa = /android|mobi|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);​
    if (JudgmentOfUa) {
      return JudgmentOfUa;
    } else {
      const webgl = document.createElement("canvas").getContext("webgl");
      const info = webgl && webgl.getExtension("WEBGL_debug_renderer_info");
      const renderer = webgl && info && webgl.getParameter(info.UNMASKED_RENDERER_WEBGL); // GPU 型号，e.g., "Intel(R) Iris(TM) Plus Graphics 640"​
      return /Apple/i.test(renderer);
    }
};