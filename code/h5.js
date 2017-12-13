/*
 html5新特性相关
 Thanks：https://github.com/jsfront/src/blob/master/js.md
*/

/**
 * [getLocation description] 获取地理位置
 * @param callback {Function}  回调函数
 * @return {Null}  无返回
 */
function getLocation(callback){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(p){
        callback(p.coords.latitude, p.coords.longitude);
      },
      function(e){
        var msg = e.code + "\n" + e.message;
      }
    );
  }
}