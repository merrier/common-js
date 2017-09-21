/**
 * @description 常用JS函数
 * @author  Coco
 * @last update 2016.05.03
 *
 */
(function() {

	// 产生随机颜色
    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    }

	// 添加样式
    function css(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

	// requestAnimationFrame
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


	/**
	 *@description 判定一个字符串是否包含另外一个字符串
	 *@param:target 目标字符串
	 *@param:str 父字符串
	 *@param:separator 分隔符
	 */
	function contains(target, str, separator) {
		return separator ?
			(separator + target + separator).indexOf(separator + str + separator) > -1 : //需要判断分隔符
			target.indexOf(str) > -1; //不需判断分隔符
	}

	/**
	 *@description 判定目标字符串是否位于原字符串的开始之处
	 *@param:target 目标字符串
	 *@param:str 父字符串
	 *@param:ignorecase 是否忽略大小写
	 */
	function startsWith(target, str, ignorecase) {
		var start_str = target.substr(0, str.length);
		return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : //
			start_str === str;
	}

	/**
	 *@description 判定目标字符串是否位于原字符串的末尾
	 *@param:target 目标字符串
	 *@param:str 父字符串
	 *@param:ignorecase 是否忽略大小写
	 */
	function startsWith(target, str, ignorecase) {
		var end_str = target.substring(target.length - str.length);
		return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : //
			end_str === str;
	}

	/**
	 *@description 将一个字符串重复自身N次，如 repeat("Co")得到 CoCo。
	 *@param:target 目标字符串
	 *@param:n 重复次数
	 */
	function repeat(target, n) {
		var s = target,
			total = "";
		while (n > 0) {
			if (n % 2 == 1)
				total += s;
			if (n == 1)
				break;
			s += s;
			n = n >> 1; // >>是右移位运算符，相当于将n除以2取其商,或说开2二次方
		}
		return total;
	}

	/**
	 *@description 用于对字符串进行截断处理，当超过限定长度，默认添加三个点号或其它
	 *@param:target 目标字符串
	 *@param:length 最长长度，不设置则为默认30
	 *@param:truncation 非默认添加的内容
	 */
	function truncate(target, length, truncate) {
		length = length || 30;
		truncate = truncate === void(0) ? '...' : truncate;

		return target.length > length ?
			target.slice(0, length - truncate.length) + truncate : String(target);
	}

	/**
	 *@description 移除字符串中的html标签。
	 *@param:target 目标字符串
	 */
	function stripTags(target) {
		return String(target || "").replace(/<[^>]+>/g); //[^>] 匹配除>以外的任意字符
	}

	/**
	 *@description 移除字符串中所有的script标签及内容。为弥补stripTags方法的，此方法应在stripTags之前调用。
	 *@param:target 目标字符串
	 */
	function stripScripts(target) {
		return String(target || "").replace(/<script[^>]*>([\S\s]*?)<\/script>/img); //[\S\s]*? 懒惰匹配任意字符串尽可能少
	}

	/**
	 *@description 将字符串经过 html 转义得到适合在页面中显示的内容，如将 < 替换为 &lt;
	 *@param:target 目标字符串
	 */
	function escapeHTML(target) {
		return target.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	/**
	 *@description 与 trim 相反， pad 可以为字符串的某一端添加字符串。如pad("Coco",6) -> 00Coco
	 *@param:target 目标字符串
	 *@param:n 目标长度
	 */
	function pad(target, n) {
		var zero = new Array(n).join('0');
		var str = zero + target;
		var result = str.substr(-n); //-n表示由右边起第n位开始截取
		return result;
	}

	/**
	 *@description 在 C 语言中，有一个叫 printf 的方法，我们可以在后面添加不同的类型的参数嵌入到将要输出的字符串中。
	 *@param:str 目标字符串
	 *@param:object 替换对象
	 */
	function format(str, object) {
		var array = Array.prototype.slice.call(arguments, 1); //将带有length属性的对象转化为数组

		return str.replace(/\\?\#{([^{}]+)\}/gm, function(match, name) {
			if (match.charAt(0) == '\\')
				return match.slice(1);
			var index = Number(name)
			if (index >= 0)
				return array[index];
			if (object && object[name] !== void 0)
				return object[name];
			return '';
		});
	}
	//用法：
	//var a = format("Result is #{0},#{1}", 22, 33);
	//alert(a);//"Result is 22,33"
	//var b = format("#{name} is a #{sex}", {
	//name: "Jhon",
	//sex: "man"
	//});
	//alert(b);//"Jhon is a man"
	//

	/**
	 *@description 在字符串两端添加双引号，然后内部需要转义的地方都要转义，用于接装 JSON的键名或模析系统中。
	 *@param:target 目标字符串
	 */
	//http://code.google.com/p/jquery-json/
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

	function quote(target) {
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
	 *@description 清除字符串两端的空白字符
	 *@param:target 目标字符串
	 */
	function trim(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	//就是爱折腾法
	//全过程只用了 indexOf 与 substring 这个专门为处理字符串而生的原生方法，没有使用到正则，在第一次遍历中砍掉前面的空白，第二次砍掉后面的空白。
	function trim(str) {
		var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
		\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'; //所有可能的空白符

		for (var i = 0; i < str.length; i++) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(i);
				break;
			}
		}
		for (i = str.length - 1; i >= 0; i--) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(0, i + 1);
				break;
			}
		}
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	}
	//上述方法的字数压缩版，前面部分的空白由正则替换负责砍掉，后面用原生方法处理
	function trim(str) {
		str = str.replace(/^\s+/, '');

		for (var i = str.length - 1; i >= 0; i--) {
			if (/\S/.test(str.charAt(i))) {
				str = str.substring(0, i + 1);
				break;
			}
		}
		return str;
	}

	// 计算字符的字节长度（汉字算2个字节），并输出指定长度的字符 + "..."
	// @param str : 传入字符
	// @param num : 要截断的字节长度（汉字算2个字节）
	// @example : cutStrForNum("12345678910abc",9) -> "123456789..."
	function cutStrForNum(str, num) {
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			if (str[i].match(/[^x00-xff]/ig) != null) //全角
				len += 2;
			else
				len += 1;
		}

		if (len >= num) {
			newStr = str.substring(0, num) + "...";
			return newStr;
		} else {
			return str
		}
	}

	// 将数字转换为 每3位添加一个逗号,
	// @param num ：传入的数字
	// @example: 123456 -> 123,456
	function numOfComma(num) {
		num = "" + num; //数字转换为字符串

		var len = num.length,
			commaNum = parseInt((len - 1) / 3),
			leftNum = len % 3 == 0 ? 3 : len % 3,
			result = "";

		if (len <= 3) { //长度小于3
			result = num;
		} else {
			result = num.slice(0, leftNum);
			for (var i = commaNum; i >= 1; i--) {
				result += "," + num.slice(len - i * 3, len - (i - 1) * 3);
			}
		}
		return result;
	}

	// 获取文本框光标位置
	// @example obj -- 需要获取光标位置的 input | textarea
	// 返回光标所在索引 index
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
				if (obj.tagName == "textarea") {
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

	// IE67 兼容伪类设置
	// 传入单个 Dom 结构
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

	// JS 动态设定 document 的 font-size
	// 以 320 的设备宽度为基准，320 下 10px 为 1rem
	(function(doc, win) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) {
					return;
				}
				docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
			};

		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
		recalc();
		window.recalc = recalc;
	})(document, window);

	// 设置 Cookie 值
	function setCookie(name, value, Hours) {
		var d = new Date(),
			offset = 8,
			utc = d.getTime() + (d.getTimezoneOffset() * 60000),
			nd = utc + (3600000 * offset),
			exp = new Date(nd);

		exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
		document.cookie = name + "=" + decodeURIComponent(value) + ";path=/;expires=" + exp.toGMTString() + ";";
	}

	// 获取cookie值
	function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) return encodeURIComponent(arr[2]);
		return null;
	}

	// 加载 CSS 文件
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

	// 加载 JS 文件
	function loadScript(src) {
		var scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.src = src;
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(scriptNode);
	}

	// 返回一个随机数时间戳
	function uniqueId() {
		var a = Math.random,
			b = parseInt;
		return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
	}

	/**
	 * md5加密函数，
	 * hex_md5("") -- 16位加密
	 * hex_md5("",32) -- 32位加密
	 * @param  {[String]} sMessage [需要加密的字符串]
	 * @param  {[Number]} bit      [加密返回的位数]
	 * @return {[String]}          [返回md5加密后的字符串]
	 */
	function hex_md5(sMessage, bit) {
		function RotateLeft(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}

		function AddUnsigned(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			if (lX4 | lY4) {
				if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			} else return (lResult ^ lX8 ^ lY8);
		}

		function F(x, y, z) {
			return (x & y) | ((~x) & z);
		}

		function G(x, y, z) {
			return (x & z) | (y & (~z));
		}

		function H(x, y, z) {
			return (x ^ y ^ z);
		}

		function I(x, y, z) {
			return (y ^ (x | (~z)));
		}

		function FF(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function GG(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function HH(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function II(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function ConvertToWordArray(sMessage) {
			var lWordCount;
			var lMessageLength = sMessage.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		}

		function WordToHex(lValue) {
			var WordToHexValue = "",
				WordToHexValue_temp = "",
				lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
			}
			return WordToHexValue;
		}
		var x = Array();
		var k, AA, BB, CC, DD, a, b, c, d
		var S11 = 7,
			S12 = 12,
			S13 = 17,
			S14 = 22;
		var S21 = 5,
			S22 = 9,
			S23 = 14,
			S24 = 20;
		var S31 = 4,
			S32 = 11,
			S33 = 16,
			S34 = 23;
		var S41 = 6,
			S42 = 10,
			S43 = 15,
			S44 = 21;
		// Steps 1 and 2. Append padding bits and length and convert to words
		x = ConvertToWordArray(sMessage);
		// Step 3. Initialise
		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;
		// Step 4. Process the message in 16-word blocks
		for (k = 0; k < x.length; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = AddUnsigned(a, AA);
			b = AddUnsigned(b, BB);
			c = AddUnsigned(c, CC);
			d = AddUnsigned(d, DD);
		}
		if (bit == 32) {
			return WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
		} else {
			return WordToHex(b) + WordToHex(c);
		}
	}
})();
